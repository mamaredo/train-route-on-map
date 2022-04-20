import { LatLng } from '@/features/train-route-map'
import { useState, useEffect } from 'react'

type DirectionProps = {
  start: LatLng
  goal: LatLng
}

const composeOrigin = (location: LatLng) => {
  return new google.maps.LatLng(location)
}

export const Direction = <T extends google.maps.DirectionsRendererOptions>(
  options: DirectionProps & T
) => {
  const [renderer, setRenderer] = useState<google.maps.DirectionsRenderer>()

  useEffect(() => {
    if (!renderer) {
      setRenderer(
        new google.maps.DirectionsRenderer({
          map: options.map
        })
      )
    }

    return () => {
      if (renderer) {
        renderer.setMap(null)
      }
    }
  }, [renderer])

  useEffect(() => {
    if (!renderer || !options.map) {
      console.log('!render')
      // console.log('route')
      return
    }

    const request = {
      origin: composeOrigin(options.start),
      destination: composeOrigin(options.goal),
      travelMode: 'DRIVING'
    }

    console.log('serviec')
    const service = new google.maps.DirectionsService()
    if (!service) return
    service.route(
      request as google.maps.DirectionsRequest,
      (result, status) => {
        if (status != google.maps.DirectionsStatus.OK) return
        renderer.setDirections(result)
        renderer.setMap(options.map!)
      }
    )
    console.log('route')
  }, [renderer, options])

  return null
}
