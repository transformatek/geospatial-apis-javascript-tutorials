import axios from 'axios'

export const reverseGeocode = async (lat: number, lng: number) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )

    const address = res.data.address
    const city = address?.city || address?.town || address?.village || 'Unknown'
    const country = address?.country || 'Unknown'

    return { city, country }
  } catch (error) {
    console.error('Reverse geocoding error:', error)
    return { city: 'Unknown', country: 'Unknown' }
  }
}
