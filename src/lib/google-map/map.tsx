import { Wrapper, Status } from '@googlemaps/react-wrapper'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { GCP } from '@/config'
import React from 'react'

const render = (status: Status) => {
  return <div>{status}</div>
}

type MapWrapperProps = {
  children: ReactNode
}

export const MapWrapper = ({ children }: MapWrapperProps) => {
  return (
    <Wrapper apiKey={GCP.MAP_KEY} render={render}>
      {children}
    </Wrapper>
  )
}

type MapViewProps = { children: ReactNode }

export const MapView = ({ children }: MapViewProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map>()

  useEffect(() => {
    if (ref.current && !map) {
      ;(async () => {
        const { results } = await new window.google.maps.Geocoder().geocode({
          address: '〒812-0012 福岡県福岡市博多区博多駅中央街１−１'
        })
        setMap(
          new window.google.maps.Map(ref.current!, {
            center: results[0].geometry.location,
            zoom: 12
          })
        )
      })()
    }
  }, [ref, map])

  return (
    <>
      <div
        css={{
          width: '100%',
          height: '500px'
        }}
        ref={ref}
      />
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          // set the map prop on the child component
          return React.cloneElement(child, { map })
        }
      })}
    </>
  )
}

export const Map = (props: MapViewProps) => {
  return (
    <MapWrapper>
      <MapView>{props.children}</MapView>
    </MapWrapper>
  )
}
