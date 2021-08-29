import React, {SyntheticEvent, useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectUsers, fetchAsyncGet as getUsers} from "../../features/user/slice";
import {selectComments, fetchAsyncGet as getComments, fetchAsyncCreate as createComment} from "../../features/comment/slice";
import {selectNominees, fetchAsyncGet as getNominees} from "../../features/nominee/slice";
import {fetchAsyncCreate as createReaction} from "../../features/reaction/slice";

const Timeline: React.FC = () => {
  const users = useSelector(selectUsers);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const [commentState, setCommentState] = useState('');
  const [nomineeState, setNomineeState] = useState(0);

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(getUsers());
      await dispatch(getComments());
    };
    fetchInitState();
  }, [dispatch]);

  const sendCommentHandler = () => {
    const postComment = async () => {
      await dispatch(createComment({commentState, nominees: [nomineeState]}));
    }
    postComment();
    setCommentState('');
    setNomineeState(0)
  }

  const sendReactionHandler = (e: any) => {
    const comment_id = e.currentTarget.dataset.comment_id;
    const target_id = e.currentTarget.dataset.user_id;
    const postReaction = async () => {
      await dispatch(createReaction({comment_id, target_id}))
    };
    postReaction();
  }

  const sendStaminaHandler = () => {

  }

  return (
    <>
    <div className="container">

      {/*ログインユーザー詳細エリア*/}


      {/*フォームエリア*/}
      <div className="row mb-5">
        <div className="card">
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
                <div className="card">
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

    </div>
    </>
  );
};

export default Timeline;
