// api/wakatime.js
export default async function handler(req, res) {
  const username = "TiboTsr";
  const url = `https://wakatime.com/api/v1/users/${username}/stats/all_time`;
  const apiKey = process.env.WAKATIME_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Missing WAKATIME_API_KEY" });
  }

  const headers = {
    Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`
  };

  try {
    const wakatimeRes = await fetch(url, { headers });

    if (!wakatimeRes.ok) {
      console.warn(`All Time non disponible (${wakatimeRes.status}), tentative last_year...`);
      
      const fallbackUrl = `https://wakatime.com/api/v1/users/${username}/stats/last_year`;
      const fallbackRes = await fetch(fallbackUrl, { headers });
      
      if (!fallbackRes.ok) {
         return res.status(fallbackRes.status).json({ error: 'WakaTime API error' });
      }
      
      const data = await fallbackRes.json();
      const totalSeconds = data.data.total_seconds || 0;
      return res.status(200).json({
        hours: Math.round(totalSeconds / 3600),
        range: 'last_year'
      });
    }

    const data = await wakatimeRes.json();
    const totalSeconds = data.data.total_seconds || 0;
    
    res.status(200).json({
      hours: Math.round(totalSeconds / 3600),
      range: 'all_time'
    });

  } catch (e) {
    console.error("Erreur Serveur:", e);
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
