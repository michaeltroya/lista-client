import React from 'react';
import { Link } from 'react-router-dom';

//Dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//Redux Imports
import { useSelector } from 'react-redux';

import DeleteButton from '../../secondary/DeleteButton/DeleteButton';

const ListComments = ({ comments, listId }) => {
  const currentUsername = useSelector(state => state.user.credentials.username);
  dayjs.extend(relativeTime);

  return (
    <section className="list-comments">
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <div className="comment-details">
            <Link to={`/${comment.username}`}>
              <h3 className="o-text">@{comment.username}</h3>
            </Link>
            <p>{comment.body}</p>
          </div>
          <p className="g-text comment-date">{dayjs(comment.createdAt).fromNow()}</p>
          {currentUsername === comment.username ? (
            <DeleteButton commentId={comment.id} listId={listId} />
          ) : null}
        </div>
      ))}
      <div className="enter-comment"></div>
    </section>
  );
};

export default ListComments;
