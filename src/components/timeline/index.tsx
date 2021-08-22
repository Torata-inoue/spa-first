import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectUsers, fetchAsyncGet as getUsers} from "../../features/user/slice";
import {selectComments, fetchAsyncGet as getComments} from "../../features/comment/slice";
import {selectNominees, fetchAsyncGet as getNominees} from "../../features/nominee/slice";

const Timeline: React.FC = () => {
  const users = useSelector(selectUsers);
  const comments = useSelector(selectComments);
  const dispatch = useDispatch();

  // 削除予定？
  const Collection = [];
  const nominees = useSelector(selectNominees);
  // .削除予定

  useEffect(() => {
    const fetchInitState = async () => {
      await dispatch(getUsers());
      await dispatch(getComments());

      // 削除予定？
      await dispatch(getNominees());
      // .削除予定
    };
    fetchInitState();
  }, [dispatch]);

  // 削除予定？
  useEffect(() => {
    const fetchCommentsDetail = async () => {
      comments.map((comment: any) => {
        console.log(users);
        comment.user = users.filter((user: any) => user.id === comment.user_id);
        comment['nominees'] = nominees.filter((nominee: any) => nominee.comment_id === comment.id);
      });
    };
    fetchCommentsDetail();
  }, [comments]);
  // .削除予定？

  return (
    <>
    <div className="container">

      {/*ログインユーザー詳細エリア*/}


      {/*フォームエリア*/}
      <div className="row mb-5">
        <div className="card">
          <div className="card-body">
            <select className="custom-select mb-3">
              <option selected>ユーザーを選択してください</option>
              {
                users.map((user: any) => (<option value={user.id}>{user.name}</option>))
              }
            </select>
            <div className="form-group">
              <textarea className="form-control" name="comment" rows={5} placeholder="コメントを入力してください"> </textarea>
            </div>
            <button className="btn btn-primary">送信する</button>
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
