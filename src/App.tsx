import React from 'react'
import Timeline from "./components/timeline";
import Prize from "./components/prize";
import {Route, BrowserRouter} from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Timeline} />
      <Route exact path="/prize" component={Prize} />
    </BrowserRouter>
  )
}

export default App
