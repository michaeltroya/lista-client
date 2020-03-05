import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST } from '../../../graphql/mutations';

import Nav from '../../layout/Nav/Nav';

const CreateList = props => {
  const [createList, { loading }] = useMutation(CREATE_LIST, {
    variables: {
      title: {
        phrase: 'Top',
        count: 56,
        description: 'Best Cars'
      },
      tags: [],
      items: []
    }
  });

  return (
    <Fragment>
      <Nav type="compose" history={props.history} />
      <button onClick={() => createList()}>cli</button>
    </Fragment>
  );
};

export default CreateList;
