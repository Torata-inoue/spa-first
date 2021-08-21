import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {selectComments, fetchAsyncGet, fetchAsyncCreate, CommentState } from './slice';

const Comment: React.FC = () => {
  const comments: CommentState[] = useSelector(selectComments);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchComments = async () => {
      await dispatch(fetchAsyncGet());
    };
    fetchComments();
  }, [dispatch]);

  const [text, setText] = useState('');


  const handleBtnClicked = () => {
    dispatch(fetchAsyncCreate(text));
    setText('');
  }

  return (
      <>
        <input
          value={text}
          id="inputs"
          type="text"
          placeholder="Please input comment"
          onChange={e => setText(e.target.value)}
        />
        <button onClick={handleBtnClicked}>送信</button>
        <ul>
          {comments.map((comment, key) => (<li key={key}>{comment.body}</li>))}
        </ul>
      </>
  )
};

export default Comment;
