import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  selectUsers,
  fetchAsyncGet as getUsers
} from "../../features/user/slice";
import {selectComments, fetchAsyncGet as getComments, fetchAsyncCreate as createComment} from "../../features/comment/slice";
import {Link, useParams, useHistory} from "react-router-dom";
import Menu from "../parts/menu";
import Card from "./card";
import Auth from "../parts/user/Auth";
import {user} from "../../features/user/types";
import {comment} from "../../features/comment/types";

const Timeline: React.FC = () => {
  const users: user[] = useSelector(selectUsers);
  const comments: comment[] = useSelector(selectComments);
  const history = useHistory();
  const dispatch = useDispatch();

  const [commentState, setCommentState] = useState<string>('');
  const [nomineeState, setNomineeState] = useState<number>(0);

  const params = useParams<{page?: string|undefined}>();
  let page: number = typeof params.page === 'undefined' ? 1 : Number(params.page);

  const sendCommentHandler = () => {
    const postComment = async () => {
      await dispatch(createComment({comment: commentState, nominees: [nomineeState]}));
    }
    postComment();
    setCommentState('');
    setNomineeState(0);
    history.push('/timeline/1');
  }

  const getCommentsHandler = async () => await dispatch(getComments(page));

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(getUsers());
    };
    fetchInitState();
    getCommentsHandler();
  }, [dispatch]);

  useEffect(() => {
    getCommentsHandler();
    window.scrollTo(0, 0);
  }, [page])


  return (
    <>
    <div className="container">

      <Menu />

      <Auth />

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
          comments.map(
            (comment: any, comment_index: number) => {
              if (comment_index > 4) {
                return;
              }
              return <Card comment={comment} key={comment_index} />
            }
          )
        }
      </div>

      {/*ページネーション*/}
      <div className="mx-auto">
        <Link to={`/timeline/${page - 1}`}>前へ</Link>
        <Link to={`/timeline/${page + 1}`}>次へ</Link>
      </div>

    </div>
    </>
  );
};

export default Timeline;
