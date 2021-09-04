import React, {useEffect} from "react";
import Menu from "../parts/menu";
import {useDispatch, useSelector} from "react-redux";
import {selectAuthUser} from "../../features/user/slice";
import {fetchAsyncGet, selectReactions} from "../../features/reaction/slice";

const Mypage: React.FC = () => {
  const auth = useSelector(selectAuthUser);
  const reactions = useSelector(selectReactions);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(fetchAsyncGet());
    };
    fetchInitState();
  }, [dispatch]);
  console.log(reactions);

  return (
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

      <div className={"card"}>
        <div className={"card-body"}>
          送った相手
          <table className={"table table-striped"}>
            <thead>
            <tr>
              <th>日付</th>
              <th>相手</th>
              <th>コメント</th>
            </tr>
            </thead>
            <tbody>
            {
              reactions.send.map((reaction: any, index: number) => (
                <tr key={index}>
                  <td>{reaction.created_at}</td>
                  <td>{reaction.target.name}</td>
                  <td>{reaction.comment}</td>
                </tr>
              ))
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Mypage;
