export default async function handler(req, res) {
  const normalizeToken = (value) => {
    if (!value || typeof value !== "string") return "";
    return value.trim().replace(/^"|"$/g, "");
  };

  const GITHUB_PRIVATE_TOKEN = normalizeToken(process.env.GITHUB_PRIVATE_TOKEN);
  const GITHUB_TOKEN = normalizeToken(process.env.GITHUB_TOKEN);

  const repoParam = (req.query.repo || "").trim();
  if (!repoParam) {
    return res.status(400).json({ error: "Missing repo param" });
  }

  const normalizeRepo = (value) => {
    if (value.startsWith("http")) {
      try {
        const url = new URL(value);
        if (url.hostname !== "github.com") return null;
        const parts = url.pathname.split("/").filter(Boolean);
        if (parts.length < 2) return null;
        return `${parts[0]}/${parts[1].replace(/\.git$/, "")}`;
      } catch (error) {
        return null;
      }
    }
    return value.includes("/") ? value : null;
  };

  const repo = normalizeRepo(repoParam);
  if (!repo) {
    return res.status(400).json({ error: "Invalid repo format" });
  }

  try {
    const baseHeaders = {
      "User-Agent": "portfolio-live-projects",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28"
    };

    const requestRepo = async (authorizationHeader) => {
      const headers = { ...baseHeaders };
      if (authorizationHeader) {
        headers.Authorization = authorizationHeader;
      }
      return fetch(`https://api.github.com/repos/${repo}`, { headers });
    };

    const tokenCandidates = [
      GITHUB_PRIVATE_TOKEN,
      GITHUB_TOKEN,
    ].filter(Boolean);

    const authorizationCandidates = tokenCandidates.flatMap((token) => [
      `Bearer ${token}`,
      `token ${token}`,
    ]);

    if (authorizationCandidates.length === 0) {
      authorizationCandidates.push("");
    }

    let response = null;
    for (const authorizationHeader of authorizationCandidates) {
      response = await requestRepo(authorizationHeader);
      if (response.ok) break;
      if (response.status !== 401 && response.status !== 403 && response.status !== 404) {
        break;
      }
    }

    if (!response.ok) {
      let githubMessage = "GitHub API error";
      try {
        const payload = await response.json();
        if (payload && typeof payload.message === "string") {
          githubMessage = payload.message;
        }
      } catch (error) {
        // ignore JSON parsing errors
      }
      return res.status(response.status).json({ error: githubMessage });
    }

    const data = await response.json();
    const isPrivate = Boolean(data.private);

    let activity = data.pushed_at || data.updated_at || null;
    
    try {
      const lastAuthHeader = authorizationCandidates.find(h => response.ok) || "";
      const headers = { ...baseHeaders };
      if (lastAuthHeader) {
        headers.Authorization = lastAuthHeader;
      }
      
      // Use events API to capture activity across all branches
      const eventsResponse = await fetch(`https://api.github.com/repos/${repo}/events?per_page=30`, { headers });
      
      if (eventsResponse.ok) {
        const events = await eventsResponse.json();
        const botPatterns = [
          /\[bot\]$/i,
          /^dependabot/i,
          /^github-actions/i,
          /^renovate/i,
          /^greenkeeper/i
        ];
        
        const realEvent = events.find(event => {
          if (event.type !== 'PushEvent') return false;
          
          const actorLogin = event?.actor?.login || "";
          const actorName = event?.actor?.display_login || "";
          
          const isBot = botPatterns.some(pattern => 
            pattern.test(actorLogin) || 
            pattern.test(actorName)
          );
          
          return !isBot;
        });
        
        if (realEvent && realEvent.created_at) {
          activity = realEvent.created_at;
        }
      }
    } catch (error) {
      // Fallback to pushed_at if events API fails
    }

    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({ activity, isPrivate });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
}
