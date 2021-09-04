import React, {useEffect, useState} from "react";
import Menu from "../parts/menu";
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncEditAuth, selectAuthUser} from "../../features/user/slice";

const Profile: React.FC = () => {
  const auth = useSelector(selectAuthUser);
  const [authState, setAuthState] = useState(auth);
  const dispatch = useDispatch();

  useEffect(() => {
    setAuthState(auth);
  }, [auth]);

  const handleInput = (e: any) => {
    const target = e.currentTarget;
    setAuthState({...authState, [target.name]: target.value});
  };

  const handleClick = () => {
    const editUser = async () => {
      await dispatch(fetchAsyncEditAuth({name: authState.name, comment: authState.comment}))
    }
    editUser();
  }

  return (
    <div className={"container"}>
      <Menu></Menu>
      <div className={"card"}>
        <div className={"card-body"}>
          名前: <input
                  type="text"
                  name={"name"}
                  className={"form-control mb-3"}
                  value={authState.name}
                  onInput={handleInput}
                />
          コメント: <input
                      type="text"
                      name={"comment"}
                      className={"form-control"}
                      value={authState.comment}
                      onInput={handleInput}
                    />
        </div>
        <div className={"card-footer"}>
          <button className={"btn btn-primary"} onClick={handleClick}>送信する</button>
        </div>
      </div>
    </div>
  )
}

export default Profile;