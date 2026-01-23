// /api/wakatime-debug.js (Vercel serverless function DEBUG)

export default async function handler(req, res) {
  const username = "TiboTsr";
  const url = `https://wakatime.com/api/v1/users/${username}/stats/last_year`;
  try {
    const wakatimeRes = await fetch(url);
    if (!wakatimeRes.ok) {
      return res.status(wakatimeRes.status).json({ error: 'WakaTime API error' });
    }
    const data = await wakatimeRes.json();
    // On retourne tout l'objet pour debug
    res.status(200).json({
      total_hours: data.data.total_hours,
      human_readable_total: data.data.human_readable_total,
      data: data.data
    });
  } catch (e) {
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
