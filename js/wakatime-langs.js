export async function fetchWakaTimeLanguages() {
  try {
    const res = await fetch('/api/wakatime-debug');
    if (!res.ok) throw new Error('API WakaTime-debug error');
    const data = await res.json();
    if (data.data && Array.isArray(data.data.languages)) {
      return data.data.languages;
    }
    return [];
  } catch (e) {
    console.error('Erreur fetchWakaTimeLanguages:', e);
    return [];
  }
}
