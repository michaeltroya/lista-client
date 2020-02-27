import React, { Fragment } from 'react';
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
  },
  authenticated
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
            {authenticated ? (
              <Fragment>
                <p>{commentCount}</p>
                <FontAwesomeIcon icon={faComments} />
              </Fragment>
            ) : (
              <Fragment>
                <p>{likeCount}</p>
                <Link to="/login">
                  <FontAwesomeIcon icon={faComments} />
                </Link>
              </Fragment>
            )}
          </div>
          <div className="list-card-likes">
            {authenticated ? (
              <Fragment>
                <p>{likeCount}</p>
                <FontAwesomeIcon icon={faHeart} />
              </Fragment>
            ) : (
              <Fragment>
                <p>{likeCount}</p>
                <Link to="/login">
                  <FontAwesomeIcon icon={faHeart} />
                </Link>
              </Fragment>
            )}
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
