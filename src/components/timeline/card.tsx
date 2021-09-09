import React from "react";
import {fetchAsyncCreateReaction} from "../../features/comment/slice";
import {decreaseStamina, selectAuthUser} from "../../features/user/slice";
import {useDispatch, useSelector} from "react-redux";

const Card = ({comment, key}: {comment: any, key: number}): JSX.Element => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuthUser);

  const sendReactionHandler = (e: any) => {
    const comment_id: number = e.currentTarget.dataset.comment_id;
    const target_id: number = e.currentTarget.dataset.user_id;
    const postReaction = async () => {
      await dispatch(fetchAsyncCreateReaction({comment_id, target_id}))
      dispatch(decreaseStamina(auth));
    };
    postReaction();
  }

  return (
    <div key={key} className="row mb-5">
      <div className="card col-12">
        <div className="card-header">
          {comment.user.name}
          <a onClick={sendReactionHandler} data-comment_id={comment.comment.id} data-user_id={comment.user.id} className="ml-2">❤</a>
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
                  <div key={`${key}-${index}`} className="mr-3">
                    {nominee.name}
                    <a onClick={sendReactionHandler} data-comment_id={comment.comment.id} data-user_id={nominee.id} className="ml-2">❤</a>
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
  );
};

export default Card;