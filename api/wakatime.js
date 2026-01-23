export default async function handler(req, res) {
  const username = "TiboTsr";
  const apiKey = process.env.WAKATIME_API_KEY; 
  const url = `https://wakatime.com/api/v1/users/${username}/stats/last_7_days`;

  if (!apiKey) {
    console.error("ERREUR: La variable WAKATIME_API_KEY est manquante.");
    return res.status(500).json({ error: 'Configuration serveur manquante (API Key)' });
  }

  try {
    const token = Buffer.from(apiKey).toString('base64');

    const wakatimeRes = await fetch(url, {
      headers: {
        'Authorization': `Basic ${token}`
      }
    });

    if (!wakatimeRes.ok) {
      const errorText = await wakatimeRes.text();
      console.error(`Erreur WakaTime (${wakatimeRes.status}): ${errorText}`);
      return res.status(wakatimeRes.status).json({ error: 'WakaTime API error', details: errorText });
    }

    const data = await wakatimeRes.json();
    
    if (!data || !data.data) {
       return res.status(500).json({ error: 'Format de réponse inattendu' });
    }

    res.status(200).json({
      hours: Math.round(data.data.total_hours || 0)
    });

  } catch (e) {
    console.error("Erreur Serveur:", e);
    res.status(500).json({ error: 'Server error', details: e.message });
  }
}
