import { Marker } from '@/lib/google-map'
import { LatLng } from '../types'

type StationMarkerProps = {
  location: LatLng[]
  short_name: string
}

export const StationsMarker = ({
  location,
  short_name
}: StationMarkerProps) => {
  return (
    <>
      {location.map(({ lat, lng }) => {
        return (
          <Marker key={lat} short_name={short_name} position={{ lat, lng }} />
        )
      })}
    </>
  )
}
