import React from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import dayjs from 'dayjs';
//Redux Imports
import { useSelector } from 'react-redux';
import LikeButton from '../LikeButton/LikeButton';

const List = ({
  list: {
    id,
    username,
    title: { phrase, count, description },
    tags,
    items,
    likes,
    commentCount,
    likeCount,
    createdAt
  }
}) => {
  const currentUsername = useSelector(state => state.user.credentials.username);
  const authenticated = useSelector(state => state.user.authenticated);

  const handleDelete = () => {
    console.log('delete');
  };

  return (
    <div className="list-card">
      <header className="list-card-header">
        <h3>{`${phrase} ${count} ${description}`}</h3>

        <h4>
          <Link to={`/${username}`}>{`@${username}`}</Link>
        </h4>
        <p>{dayjs(createdAt).format('h:mm A · MMM DD, YYYY')}</p>
        <div className="list-card-tags">
          {tags.map((tag, index) => (
            <Link to={`/tag/${tag}`} key={index} className="card-tag">
              {tag}
            </Link>
          ))}
        </div>
      </header>
      <main className="list-card-body">
        {items.map(item => (
          <div className="list-card-item" key={item.order}>
            <div className="item-order">
              <h3>{item.order}</h3>
            </div>
            <div className="item-name">
              <h4>{item.name}</h4>
            </div>
          </div>
        ))}
      </main>
      <footer className="list-card-footer">
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
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          ) : null}
        </div>
      </footer>
      <div className="list-card-expand">
        <Link to={`/${username}/list/${id}`}>Expand List</Link>
      </div>
    </div>
  );
};
export default List;
