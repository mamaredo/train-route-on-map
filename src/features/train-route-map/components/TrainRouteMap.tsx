import { Map, Marker, Direction } from '@/lib/google-map'
import { data1, data2 } from '../data'
import { useStationsAddress } from '../hooks/useStationsAddress'

// import { StationsMarker } from './StationsMarker'

export type TrainRouteMapProps = {
  // TrainRouteMapProps type
}

export const TrainRouteMap = ({}: TrainRouteMapProps) => {
  const { stations } = useStationsAddress([data1, data2])
  // const stationsLatLng = locations

  if (!stations) {
    return <div>now loading...</div>
  }

  return (
    <Map>
      {stations.map(({ lat, lng, short_name }) => {
        // <StationsMarker short_name={short_name} location={{ lat, lng }} />
        return (
          <Marker
            key={lat}
            position={{ lat: lat, lng: lng }}
            short_name={short_name}
          />
        )
      })}
      <Direction start={stations[0]} goal={stations[stations.length - 1]} />
    </Map>
  )
}
