async function fetchWakaTimeStats() {
  const url = `/api/wakatime`; 
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des stats");
    }
    const data = await response.json();
    return {
      hours: data.hours
    };
  } catch (e) {
    console.error("Erreur WakaTime:", e);
    return null;
  }
}