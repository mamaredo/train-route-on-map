import { StationAddress } from '../types'

export const getStationAddress = async (stations: StationAddress[]) => {
  const res = await Promise.all(
    stations.map(async ({ address }) => {
      const { results } = await new google.maps.Geocoder().geocode({ address })
      const { short_name } = results[0].address_components[0]
      const { lat, lng } = results[0].geometry.location
      return { short_name, lat: lat(), lng: lng() }
    })
  )
  console.log(res)

  return res
}
