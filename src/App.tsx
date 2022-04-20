import './App.css'

import { Map } from '@/lib/google-map'
import { TrainRouteMap } from '@/features/train-route-map'

function App() {
  const location = {
    lat: 33.5892458,
    lng: 130.4190482
  }
  return (
    <div>
      {/* <Map> */}
      <TrainRouteMap />
      {/* </Map> */}
    </div>
  )
}

export default App
