export default async function handler(req, res) {
  const username = "TiboTsr";
  const url = `https://wakatime.com/api/v1/users/${username}/stats/last_7_days`;

  try {
    const wakatimeRes = await fetch(url);

    if (!wakatimeRes.ok) {
      console.error(`Erreur WakaTime: ${wakatimeRes.status}`);
      return res.status(wakatimeRes.status).json({ error: 'WakaTime API error' });
    }

    const data = await wakatimeRes.json();

    const totalSeconds = data.data.total_seconds || 0;
    const hours = Math.round(totalSeconds / 3600);

    res.status(200).json({
      hours: hours
    });
  } catch (e) {
    console.error("Erreur serveur:", e);
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
