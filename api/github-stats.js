export default async function handler(req, res) {
  const username = "TiboTsr";
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "Missing GitHub token" });
  }

  const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
    headers: { Authorization: `Bearer ${GITHUB_TOKEN}` }
  });
  const repos = await reposResponse.json();
  const totalStars = Array.isArray(repos) ? repos.reduce((acc, repo) => acc + repo.stargazers_count, 0) : 0;

  const today = new Date();
  const lastYear = new Date(today);
  lastYear.setFullYear(today.getFullYear() - 1);
  const from = lastYear.toISOString().slice(0, 10);
  const to = today.toISOString().slice(0, 10);
  const query = `query { user(login: \"${username}\") { contributionsCollection(from: \"${from}T00:00:00Z\", to: \"${to}T23:59:59Z\") { contributionCalendar { totalContributions } } } }`;
  const graphqlResponse = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`
    },
    body: JSON.stringify({ query })
  });
  const graphqlData = await graphqlResponse.json();
  const totalContributions = graphqlData?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;

  res.status(200).json({
    repos: Array.isArray(repos) ? repos.length : 0,
    stars: totalStars,
    commits: totalContributions
  });
}
