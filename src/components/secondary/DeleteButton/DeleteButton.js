import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//gql
import { useMutation } from '@apollo/react-hooks';
import { DELETE_COMMENT, DELETE_LIST } from '../../../graphql/mutations';
import { FETCH_USER_LISTS_QUERY } from '../../../graphql/query';
import ConfirmModal from '../ConfirmModal';

const DeleteButton = ({ listId, commentId, username }) => {
  const [modalShow, setModalShow] = React.useState(false);
  const history = useHistory();
  const mutation = commentId ? DELETE_COMMENT : DELETE_LIST;

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
    <Fragment>
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => (commentId ? deleteListOrComment() : setModalShow(true))}
      />
      <ConfirmModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        deleteListOrComment={deleteListOrComment}
      />
    </Fragment>
  );
};

export default DeleteButton;
