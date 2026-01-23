async function fetchWakaTimeStats(username = "TiboTsr") {
  const url = `https://wakatime.com/api/v1/users/${username}/stats/last_year`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des stats WakaTime");
    }
    const data = await response.json();
    return {
      hours: Math.round(data.data.total_hours || 0)
    };
  } catch (e) {
    console.error("Erreur WakaTime:", e);
    return null;
  }
}

