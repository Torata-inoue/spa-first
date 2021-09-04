import React, {useEffect} from 'react'
import Timeline from "./components/timeline";
import Prize from "./components/prize";
import PointHistory from "./components/pointHistory";
import PrizeExchangeHistory from "./components/prizeExchangeHistory";
import Mypage from "./components/mypage";
import Profile from "./components/profile";
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
      <Route exact path={"/"} component={Timeline} />
      <Route exact path={"/prize"} component={Prize} />
      <Route exact path={"/pointHistory"} component={PointHistory} />
      <Route exact path={"/prizeExchangeHistory"} component={PrizeExchangeHistory} />
      <Route exact path={"/mypage/receive"} component={Mypage} />
      <Route exact path={"/mypage/send"} component={Mypage} />
      <Route exact path={"/profile"} component={Profile} />
    </BrowserRouter>
  )
}

export default App
