// import axios from "axios";

// export const fetchIsochrones = async (lng: number, lat: number, profile: string) => {
//   try {
//     const res = await axios.post(
//       `https://api.deploily.cloud/ors/v2/isochrones/${profile}`,
//       {
//         locations: [[lng, lat]],
//         range: [ 10,20 ],
//         interval:20,
//         units: "km", 
//         range_type: "distance",
//         },
//       {
//         headers: {
//           apikey: process.env.NEXT_PUBLIC_ORS_API_KEY,
//           Accept:' application/json;charset=UTF-8, */*',
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     return res.data.features;
//   } catch (err) {
//     console.error('ORS Isochrone fetch error:', err);
//     return [];
//   }
// };
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
