import React, {useEffect} from "react";
import Menu from "../parts/menu";
import {useDispatch, useSelector} from "react-redux";
import {fetchAsyncGet, selectReactions} from "../../features/reaction/slice";
import {Link, useParams} from "react-router-dom";
import Auth from "../parts/user/Auth";

const Mypage = (): JSX.Element => {
  const reactions = useSelector(selectReactions);
  const dispatch = useDispatch();

  const {action, user_id}: {action: string, user_id: string|undefined} = useParams<{action: string, user_id: string|undefined}>();

  const getReactions = async () => {
    await dispatch(fetchAsyncGet());
  }

  useEffect(() => {
    getReactions();
  }, [dispatch, action]);

  return (
    <div className={"container"}>
      <Menu />

      <Auth />

      <div className={"card"}>
        <div className={"card-header"}>
          <ul className="nav nav-tabs card-header-tabs">
            <li className="nav-item">
              <Link to={`/mypage/send`} className={`nav-link ${action === 'send' ? 'active' : ''}`}>送った</Link>
            </li>
            <li className="nav-item">
              <Link to={`/mypage/receive`} className={`nav-link ${action === 'receive' ? 'active' : ''}`}>もらった</Link>
            </li>
          </ul>
        </div>
        <div className={"card-body"}>
          {action === 'send' ? '送った' : 'もらった'}相手
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
              reactions[action].map((reaction: any, index: number) => (
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
