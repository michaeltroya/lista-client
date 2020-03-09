import React from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-regular-svg-icons';
//Redux Imports
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import LikeButton from '../LikeButton/LikeButton';
import DeleteButton from '../DeleteButton/DeleteButton';

const List = ({
  list: {
    id,
    username,
    title: { phrase, count, description },
    tags,
    likes,
    commentCount,
    likeCount,
    createdAt
  }
}) => {
  const currentUsername = useSelector(state => state.user.credentials.username);
  const authenticated = useSelector(state => state.user.authenticated);

  return (
    <div className="list-card">
      <div className="list-card-header">
        <h3>{`${phrase} ${count} ${description}`}</h3>
        <Link to={`/${username}`} className="o-text">{`@${username}`}</Link>
        <div className="list-card-tags">
          {tags.map((tag, index) => (
            <Link to={`/tag/${tag}`} key={index} className="card-tag">
              #{tag}
            </Link>
          ))}
        </div>
        <p>{dayjs(createdAt).format('h:mm A · MMM DD, YYYY')}</p>
      </div>
      <div className="list-card-footer">
        <div className="list-card-actions">
          <div className="list-card-comments">
            <p>{commentCount}</p>
            {authenticated ? (
              <FontAwesomeIcon icon={faComments} />
            ) : (
              <Link to="/login">
                <FontAwesomeIcon icon={faComments} />
              </Link>
            )}
          </div>
          <div className="list-card-likes">
            <LikeButton likeCount={likeCount} likes={likes} listId={id} />
          </div>
          {authenticated && currentUsername === username ? (
            <DeleteButton listId={id} username={currentUsername} />
          ) : null}
        </div>
      </div>
      <Link to={`/${username}/list/${id}`}>
        <div className="list-card-expand">View</div>
      </Link>
    </div>
  );
};
export default List;
