import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//Dayjs imports
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//Redux Imports
import { useSelector } from 'react-redux';
//gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_COMMENT } from '../../../graphql/mutations';
//comps
import DeleteButton from '../../secondary/DeleteButton/DeleteButton';

const ListComments = ({ comments, listId }) => {
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const authenticated = useSelector(state => state.user.authenticated);
  const currentUsername = useSelector(state => state.user.credentials.username);
  dayjs.extend(relativeTime);

  const [createComment] = useMutation(CREATE_COMMENT, {
    update() {
      setBody('');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      listId,
      body
    }
  });

  const handleCreateComment = e => {
    e.preventDefault();
    createComment();
  };

  return (
    <Fragment>
      {comments.length > 0 ? (
        <section className="list-comments">
          {comments.map(comment => (
            <div className="comment" key={comment.id}>
              <p>
                <Link to={`/${comment.username}`} className="o-text">{`@${comment.username}   `}</Link>
                {comment.body}
              </p>

              <p className="g-text comment-date">{dayjs(comment.createdAt).fromNow()}</p>
              {currentUsername === comment.username ? (
                <DeleteButton commentId={comment.id} listId={listId} />
              ) : null}
            </div>
          ))}
        </section>
      ) : null}
      {Object.keys(errors).length > 0 ? (
        <div className="form-errors">
          {Object.values(errors).map(err => (
            <h4 key={err}>{err}</h4>
          ))}
        </div>
      ) : null}

      {authenticated ? (
        <div className="create-comment">
          <form onSubmit={handleCreateComment} className="comment-form">
            <input
              type="text"
              onChange={e => setBody(e.target.value)}
              name="comment"
              value={body}
              placeholder="Add a comment..."
            />
            <input type="submit" value="Post" className="btn" />
          </form>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ListComments;
