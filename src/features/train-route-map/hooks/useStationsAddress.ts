import { useEffect, useState } from 'react'
import { getStationAddress } from '../api/getStationAddress'
import { LatLng, StationAddress } from '../types'

const sleep = async () =>
  await new Promise(resolve =>
    setTimeout(() => {
      resolve(() => console.log('sleep'))
    }, 2000)
  )

type Stations = {
  short_name: string
  lat: number
  lng: number
}
export const useStationsAddress = (
  stationsAddress: [StationAddress[], StationAddress[]]
) => {
  const [stations, setStations] = useState<Stations[]>()

  useEffect(() => {
    console.log('useEffect')
    ;(async () => {
      const res1 = await getStationAddress(stationsAddress[0])
      await sleep()
      const res2 = await getStationAddress(stationsAddress[1])
      setStations([...res1, ...res2])
      // setMarker(res1[0])
    })()
  }, [])

  return {
    stations
  }
}
