import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {selectPrizeExchangeHistories} from "../../features/prizeExchangeHistory/slice";
import {fetchAsyncGet} from "../../features/prizeExchangeHistory/slice";
import Menu from "../parts/menu";
import Auth from "../parts/user/Auth";

const PrizeExchangeHistory: React.FC = () => {
  const histories = useSelector(selectPrizeExchangeHistories);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(fetchAsyncGet());
    };
    fetchInitState()
  }, [dispatch]);

  return (
    <div className={"container"}>
      <Menu />

      <Auth />

      {/*History*/}
      <div className={"card mb-5"}>
        <div className={"card-header"}>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <Link to={"/prize"} className={"nav-link"}>景品交換</Link>
            </li>
            <li className="nav-item">
              <Link to={"/pointHistory"} className={"nav-link"}>ポイント履歴</Link>
            </li>
            <li className="nav-item">
              <Link to={"/prizeExchangeHistory"} className={"nav-link active"}>景品交換履歴</Link>
            </li>
          </ul>
        </div>
        <div className={"card-body"}>
          <table className={"table table-striped"}>
            <thead>
            <tr>
              <th>日付</th>
              <th>景品名</th>
              <th>状態</th>
            </tr>
            </thead>
            <tbody>
            {
              histories.map((history: any, index: number) => (
                <tr key={index}>
                  <td>{history.created_at}</td>
                  <td>{history.prize}</td>
                  <td>{history.status}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PrizeExchangeHistory;