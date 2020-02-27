import React from 'react';
import { Link } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

const List = ({
  list: {
    id,
    username,
    title: { phrase, count, description },
    tags,
    items,
    commentCount,
    likeCount,
    createdAt
  }
}) => {
  return (
    <div className="list-card">
      <header className="list-card-header">
        <h3>{`${phrase} ${count} ${description}`}</h3>
        <h4>
          <Link to={`/${username}`}>{`@${username}`}</Link>
        </h4>
        <p>{moment(createdAt).fromNow()}</p>
        <div className="list-card-tags">
          {tags.map((tag, index) => (
            <Link to={`/tag/${tag}`} key={index} className="tag">
              {tag}
            </Link>
          ))}
        </div>
      </header>
      <main className="list-card-body">
        {items.map(item => (
          <div className="list-card-item" key={item.order}>
            <h4>{item.name}</h4>
          </div>
        ))}
      </main>
      <footer className="list-card-footer">
        <div className="list-card-actions">
          <div className="list-card-comments">
            <p>{commentCount}</p>
            <FontAwesomeIcon icon={faComments} className="add-icon" />
          </div>
          <div className="list-card-likes">
            <p>{likeCount}</p>
            <FontAwesomeIcon icon={faHeart} className="add-icon" />
          </div>
        </div>
      </footer>
      <div className="list-card-expand">
        <Link to={`${username}/list/${id}`}>Expand List</Link>
      </div>
    </div>
  );
};
export default List;
