export default async function handler(req, res) {
  const username = "TiboTsr";
  const apiKey = process.env.WAKATIME_API_KEY; 
  const url = `https://wakatime.com/api/v1/users/${username}/stats/last_7_days`;

  try {
    const token = Buffer.from(apiKey).toString('base64');

    const wakatimeRes = await fetch(url, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });

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