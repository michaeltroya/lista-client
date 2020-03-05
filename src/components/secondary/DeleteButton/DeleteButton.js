import React from 'react';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
//gql
import { useMutation } from '@apollo/react-hooks';
import { DELETE_COMMENT } from '../../../graphql/mutations';

const DeleteButton = ({ listId, commentId }) => {
  const mutation = commentId ? DELETE_COMMENT : null;

  const [deleteListOrComment] = useMutation(mutation, {
    variables: {
      listId,
      commentId
    }
  });

  return <FontAwesomeIcon icon={faTrash} onClick={() => deleteListOrComment()} />;
};

export default DeleteButton;
