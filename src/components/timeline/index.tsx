import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectUsers,
  fetchAsyncGet as getUsers,
  selectAuthUser,
  fetchAsyncPutStamina, decreaseStamina
} from "../../features/user/slice";
import {selectComments, fetchAsyncGet as getComments, fetchAsyncCreate as createComment, fetchAsyncCreateReaction} from "../../features/comment/slice";
import {Link, useParams} from "react-router-dom";

const Timeline: React.FC = () => {
  const users = useSelector(selectUsers);
  const comments = useSelector(selectComments);
  const auth = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const [commentState, setCommentState] = useState('');
  const [nomineeState, setNomineeState] = useState(0);
  // const [pageState, setPageState] = useState(1);
  //
  // let {page} = useParams<{page?: string|undefined}>();
  // setPageState(typeof page === 'undefined' ? 1 : Number(page));
  // console.log(pageState);

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(getUsers());
      await dispatch(getComments(1));
    };
    fetchInitState();
  }, [dispatch]);

  const sendCommentHandler = () => {
    const postComment = async () => {
      await dispatch(createComment({comment: commentState, nominees: [nomineeState]}));
    }
    postComment();
    setCommentState('');
    setNomineeState(0)
  }

  const sendReactionHandler = (e: any) => {
    const comment_id = e.currentTarget.dataset.comment_id;
    const target_id = e.currentTarget.dataset.user_id;
    const postReaction = async () => {
      await dispatch(fetchAsyncCreateReaction({comment_id, target_id}))
      dispatch(decreaseStamina(auth));
    };
    postReaction();
  }

  const recoverStaminaHandler = () => {
    const recoverStamina = async () => {
      await dispatch(fetchAsyncPutStamina({id: auth.id}))
    }
    recoverStamina();
  }

  return (
    <>
    <div className="container">

      {/*links*/}
      <div className="row mb-5">
        <div className="card col-12">
          <div className="card-body">
            <ul>
              <li><Link to="/prize">景品交換ページへ</Link></li>
              <li><Link to="/profile">プロフィール設定へ</Link></li>
              <li><Link to="/mypage">マイページへ</Link></li>
            </ul>
          </div>
        </div>
      </div>


      {/*ログインユーザー詳細エリア*/}
      <div className="row mb-5">
        <div className="card col-12">
          <div className="card-body">
            <p>名前: {auth.name}</p>
            <p>ポイント: {auth.point}</p>
            <p>ランク: {auth.rank}</p>
            <p>スタミナ: {auth.stamina} {auth.stamina <= 5 ? <a href="#" onClick={recoverStaminaHandler}>スタミナ回復する</a> : ''}</p>
          </div>
        </div>
      </div>

      {/*フォームエリア*/}
      <div className="row mb-5">
        <div className="card col-12">
          <div className="card-body">
            <select className="custom-select mb-3" value={nomineeState} onChange={e => setNomineeState(parseInt(e.target.value))}>
              <option selected>ユーザーを選択してください</option>
              {
                users.map((user: any) => (<option key={user.id} value={user.id}>{user.name}</option>))
              }
            </select>
            <div className="form-group">
              <textarea
                className="form-control"
                name="comment"
                rows={5}
                placeholder="コメントを入力してください"
                value={commentState}
                onChange={e => setCommentState(e.target.value)}>
              </textarea>
            </div>
            <button className="btn btn-primary" onClick={sendCommentHandler}>送信する</button>
          </div>
        </div>
      </div>

      {/*TimelineArea*/}
      <div className="mb-5">
        {
          comments.map((comment: any, comment_index: number) =>
            (
              <div key={comment_index} className="row mb-5">
                <div className="card col-12">
                  <div className="card-header">
                    {comment.user.name}
                    <a href="#javascript" onClick={sendReactionHandler} data-comment_id={comment.comment.id} data-user_id={comment.user.id} className="ml-2">❤</a>
                  </div>
                  <div className="card-body">
                    コメント: {comment.comment.text}<br />
                    いいね数: {comment.reaction_count}
                  </div>
                  <div className="card-footer">
                    <div className="row">
                      {
                        comment.nominees.map((nominee: any, index: number) =>
                          (
                            <div key={`${comment_index}-${index}`} className="mr-3">
                              {nominee.name}
                              <a href="#javascript" onClick={sendReactionHandler} data-comment_id={comment.comment.id} data-user_id={nominee.id} className="ml-2">❤</a>
                            </div>
                          )
                        )
                      }
                    </div>
                    <div className="row">

                    </div>
                  </div>
                </div>
              </div>
            )
          )
        }
      </div>

      {/*ページネーション*/}
      <div className="mx-auto">
        {/*<Link to={`/${page - 1}`}>前へ</Link>*/}
        {/*<Link to={`/${page + 1}`}>次へ</Link>*/}
      </div>

    </div>
    </>
  );
};

export default Timeline;
