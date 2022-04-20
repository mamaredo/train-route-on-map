import { useState, useEffect } from 'react'

type MarkerProps = {
  short_name: string
} & google.maps.MarkerOptions
export const Marker = (options: MarkerProps) => {
  const [marker, setMarker] = useState<google.maps.Marker>()

  useEffect(() => {
    if (!marker) {
      setMarker(
        new google.maps.Marker({
          map: options.map
        })
      )
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null)
      }
    }
  }, [marker])

  useEffect(() => {
    if (marker) {
      marker.setOptions(options)
      const infowin = new google.maps.InfoWindow({
        content: options.short_name
      })

      // mouseoverイベントを取得するListenerを追加
      google.maps.event.addListener(marker, 'mouseover', function () {
        infowin.open(options.map, marker)
      })

      // mouseoutイベントを取得するListenerを追加
      google.maps.event.addListener(marker, 'mouseout', function () {
        infowin.close()
      })
    }
  }, [marker, options])

  return null
}
