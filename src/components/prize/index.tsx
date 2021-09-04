import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser} from "../../features/user/slice";
import {selectPrizes, fetchAsyncGet as getPries} from "../../features/prize/slice";
import {fetchAsyncCreate as postExchangePrize} from "../../features/prizeExchangeHistory/slice";
import Menu from "../parts/menu";

const Prize: React.FC = () => {
  const auth = useSelector(selectAuthUser);
  const prizes = useSelector(selectPrizes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(getPries());
    };
    fetchInitState();
  }, [dispatch]);

  const sendPrizeHandler = (e: any) => {
    const prize_id = e.currentTarget.dataset.prize_id;
    const postExchange = async () => {
      await dispatch(postExchangePrize(prize_id));
    }
    postExchange();
  }

  return (
    <>
      <div className={"container"}>
        <Menu></Menu>

        {/*Auth User*/}
        <div className="row mb-5">
          <div className={"card col-12"}>
            <div className={"card-body"}>
              <p>名前: {auth.name}</p>
              <p>ポイント: {auth.point}</p>
              <p>ランク: {auth.rank}</p>
            </div>
          </div>
        </div>

        {/*Prize*/}
        <div className={"card mb-5"}>
          <div className={"card-header"}>
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item">
                <Link to={"/prize"} className={"nav-link active"}>景品交換</Link>
              </li>
              <li className="nav-item">
                <Link to={"/pointHistory"} className={"nav-link"}>ポイント履歴</Link>
              </li>
              <li className="nav-item">
                <Link to={"/prizeExchangeHistory"} className={"nav-link"}>景品交換履歴</Link>
              </li>
            </ul>
          </div>
          <div className={"card-body"}>
            <div className={"d-flex flex-wrap"}>
              {
                prizes.map((prize: any, index: number) =>
                  (
                    <div key={index} className={"card col-4"}>
                      <div className={"card-body"}>
                        <p>景品名: {prize.name}</p>
                        <p>交換ポイント: {prize.exchange_point}</p>
                        <p>ランク: {prize.rank}</p>
                      </div>
                      <div className={"card-footer"}>
                        <button onClick={sendPrizeHandler} className={"btn btn-primary"} data-prize_id={prize.id}>交換申請する</button>
                      </div>
                    </div>
                  )
                )
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Prize;