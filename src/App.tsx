import React, {useEffect} from 'react'
import Timeline from "./components/timeline";
import Prize from "./components/prize";
import {Route, BrowserRouter} from "react-router-dom";
import {fetchAsyncGetAuth} from "./features/user/slice";
import {useDispatch} from 'react-redux';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(fetchAsyncGetAuth());
    };
    fetchInitState();
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Route exact path="/" component={Timeline} />
      <Route exact path="/prize" component={Prize} />
    </BrowserRouter>
  )
}

export default App
