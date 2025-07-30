
export const fetchIsochrones = async (lng: number, lat: number, isochronesParam:any) => {
  try {
    const res = await fetch('/api/isochrones', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ lng, lat, isochronesParam }),
    })

    if (!res.ok) throw new Error('Failed to fetch isochrones')

    const data = await res.json()
    return data.features
  } catch (err) {
    console.error('Client fetchIsochrones error:', err)
    return []
  }
}
