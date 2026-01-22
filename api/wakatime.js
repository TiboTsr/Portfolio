// /api/wakatime.js (Vercel serverless function)

export default async function handler(req, res) {
  const username = "TiboTsr";
  const url = `https://wakatime.com/api/v1/users/${username}/stats/last_year`;
  try {
    const wakatimeRes = await fetch(url);
    if (!wakatimeRes.ok) {
      return res.status(wakatimeRes.status).json({ error: 'WakaTime API error' });
    }
    const data = await wakatimeRes.json();
    res.status(200).json({
      hours: Math.round(data.data.total_hours || 0)
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
