import { NextRequest, NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { lng, lat, isochronesParam } = body

  if (!lng || !lat || !isochronesParam) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  try {
    const orsKey = process.env.NEXT_PUBLIC_ORS_API_KEY

    if (!orsKey) {
      return NextResponse.json({ error: 'ORS API key is not set' }, { status: 500 })
    }

    const response = await axios.post(
      `https://api.deploily.cloud/ors/v2/isochrones/${isochronesParam.profile}`,
      {
        locations: [[lng, lat]],
          range: [1, isochronesParam.rangeValue],
          interval: isochronesParam.intervalValue,
          units: isochronesParam.unity,
          range_type: isochronesParam.rangeType,
      },
      {
        headers: {
            apikey:orsKey,
            Accept: ' application/json;charset=UTF-8, */*',
              'Content-Type': 'application/json',
          },
      }
    )
    console.log('Calling ORS API with', { lng, lat, orsKey })

    return NextResponse.json(response.data)
  } catch (err: any) {
    console.error('ORS API error:', err.response?.data || err.message)
    return NextResponse.json({ error: 'ORS request failed' }, { status: 500 })
  }
}
