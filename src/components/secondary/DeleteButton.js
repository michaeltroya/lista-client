import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//gql
import { useMutation, useQuery } from '@apollo/react-hooks';
import { DELETE_COMMENT, DELETE_LIST } from '../../graphql/mutations';
import { FETCH_USER_LISTS_QUERY } from '../../graphql/query';
import ConfirmModal from './ConfirmModal';

const DeleteButton = ({ listId, commentId, username, showText }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();
  const mutation = commentId ? DELETE_COMMENT : DELETE_LIST;
  useQuery(FETCH_USER_LISTS_QUERY, { variables: { username } });

  const [deleteListOrComment] = useMutation(mutation, {
    update(client) {
      setModalShow(false);
      if (!commentId) {
        const data = client.readQuery({
          query: FETCH_USER_LISTS_QUERY,
          variables: {
            username
          }
        });
        data.getUserLists.lists = data.getUserLists.lists.filter(list => list.id !== listId);
        client.writeQuery({
          query: FETCH_USER_LISTS_QUERY,
          data
        });
        history.push(`/${username}`);
      }
    },
    variables: {
      listId,
      commentId
    }
  });

  return (
    <div
      className={showText ? 'btn btn-clear delete-btn' : 'btn btn-clear'}
      onClick={() => (commentId ? deleteListOrComment() : setModalShow(true))}
    >
      <FontAwesomeIcon icon={faTrash} />
      {showText ? <h4>Delete list</h4> : null}
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        deleteListOrComment={deleteListOrComment}
      />
    </div>
  );
};

export default DeleteButton;
