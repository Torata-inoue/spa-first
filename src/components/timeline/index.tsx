import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectUsers, fetchAsyncGet as getUsers} from "../../features/user/slice";
import {selectComments, fetchAsyncGet as getComments, fetchAsyncCreate as createComment} from "../../features/comment/slice";
import {selectNominees, fetchAsyncGet as getNominees} from "../../features/nominee/slice";

const Timeline: React.FC = () => {
  const users = useSelector(selectUsers);
  // const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [nominee, setNominee] = useState(0);

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(getUsers());
    };
    fetchInitState();
  }, [dispatch]);

  const sendCommentHandler = () => {
    const postComment = async () => {
      await dispatch(createComment({comment, nominees: [nominee]}));
    }
    postComment();
    setComment('');
    setNominee(0)
  }

  return (
    <>
    <div className="container">

      {/*ログインユーザー詳細エリア*/}


      {/*フォームエリア*/}
      <div className="row mb-5">
        <div className="card">
          <div className="card-body">
            <select className="custom-select mb-3" value={nominee} onChange={e => setNominee(parseInt(e.target.value))}>
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
                value={comment}
                onChange={e => setComment(e.target.value)}>
              </textarea>
            </div>
            <button className="btn btn-primary" onClick={sendCommentHandler}>送信する</button>
          </div>
        </div>
      </div>

      {/*TimelineArea*/}
      <div className="row mb-5">
        <div className="card">
          <div className="card-body">

          </div>
          <div className="card-footer">

          </div>
        </div>
      </div>

    </div>
    </>
  );
};

export default Timeline;

// import {selectComments, fetchAsyncGet, fetchAsyncCreate, CommentState } from './slice';
//
// const Comment: React.FC = () => {
//   const comments: CommentState[] = useSelector(selectComments);
//   const dispatch = useDispatch();
//
//   useEffect(() => {
//     const fetchComments = async () => {
//       await dispatch(fetchAsyncGet());
//     };
//     fetchComments();
//   }, [dispatch]);
//
//   const [text, setText] = useState('');
//
//
//   const handleBtnClicked = () => {
//     dispatch(fetchAsyncCreate(text));
//     setText('');
//   }
//
//   return (
//     <>
//       <input
//         value={text}
//         id="inputs"
//         type="text"
//         placeholder="Please input comment"
//         onChange={e => setText(e.target.value)}
//       />
//       <button onClick={handleBtnClicked}>送信</button>
//       <ul>
//         {comments.map((comment, key) => (<li key={key}>{comment.body}</li>))}
//       </ul>
//     </>
//   )
// };
//
// export default Comment;
