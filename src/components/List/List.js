import React from 'react';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const List = ({
  list: {
    username,
    title: { phrase, count, description },
    tags,
    items,
    commentCount,
    likeCount
  }
}) => {
  return (
    <div className="list-card">
      <header className="list-card-header">
        <h3>{`${phrase} ${count} ${description}`}</h3>
        <h4>@{username}</h4>
        <div className="list-card-tags">
          {tags.map((tag, index) => (
            <p className="tag" key={index}>
              {tag}
            </p>
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
        <p>Expand List</p>
      </div>
    </div>
  );
};
export default List;
