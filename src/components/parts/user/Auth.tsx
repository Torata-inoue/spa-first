import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncPutStamina, selectAuthUser} from "../../../features/user/slice";
import {user} from "../../../features/user/types";

const Auth = () => {
  const auth: user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const recoverStaminaHandler = () => {
    const recoverStamina = async () => {
      await dispatch(fetchAsyncPutStamina({id: auth.id}))
    }
    recoverStamina();
  }

  return (
    <>
      {/*Auth User*/}
      <div className="row mb-5">
        <div className={"card col-12"}>
          <div className={"card-body"}>
            <img style={{height: 100, width: 100}} src={auth.icon_path} alt={"img"}/>
            <p>名前: {auth.name}</p>
            <p>ポイント: {auth.point}</p>
            <p>ランク: {auth.rank}</p>
            <p>スタミナ: {auth.stamina} {auth.stamina <= 5 ? <a onClick={recoverStaminaHandler}>スタミナ回復する</a> : ''}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth;