import React, { Fragment, useState } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST } from '../../../graphql/mutations';

import Nav from '../../layout/Nav/Nav';
import { Container } from 'react-bootstrap';

const CreateList = props => {
  const [itemCount, setItemCount] = useState(0);

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

  const handleTitleSubmit = e => {
    e.preventDefault();
    console.log(itemCount);
  };

  return (
    <Fragment>
      <Nav type="compose" history={props.history} />
      <Container>
        {itemCount === 0 ? (
          <form onSubmit={handleTitleSubmit}>
            <h3>Title</h3>
            <input type="number" placeholder="Amount" />
            <input type="text" placeholder="Description" />
            <input type="submit" className="btn" />
          </form>
        ) : null}
      </Container>
    </Fragment>
  );
};

export default CreateList;
