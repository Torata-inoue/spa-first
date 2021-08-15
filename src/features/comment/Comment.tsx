import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {selectComments, fetchAsyncGet, CommentState, commentSlice} from './slice';

const Comment: React.FC = () => {
  const comments: CommentState[] = useSelector(selectComments);
  const dispatch = useDispatch();
  const fetchComments = async () => {
    await dispatch(fetchAsyncGet);
  };
  fetchComments();

  return (
    <div>
      {comments.map((comment) => comment.body)}
    </div>
  )
}

export default Comment;
