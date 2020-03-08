import React, { Fragment, useState, useEffect } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST } from '../../../graphql/mutations';

import Nav from '../../layout/Nav/Nav';
import { Container } from 'react-bootstrap';

const CreateList = props => {
  const [itemCount, setItemCount] = useState(3);
  const [items, setItems] = useState([]);

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
    for (let i = 0; i < itemCount; i++) {
      const item = {
        order: i + 1,
        name: '',
        description: ''
      };

      setItems([...items, item]);
    }

    console.log(items);
  };

  const handleItemsSubmit = e => {
    e.preventDefault();
  };

  return (
    <Fragment>
      <Nav type="compose" history={props.history} />
      <div className="create-list-title">
        <Container>
          <form onSubmit={handleTitleSubmit}>
            <h3>Title</h3>
            <input
              type="number"
              placeholder="Amount"
              value={itemCount}
              onChange={e => setItemCount(e.target.value)}
              min="3"
              max="100"
            />
            <input type="text" placeholder="Description" />
            <input type="submit" className="btn" />
          </form>
        </Container>
      </div>
    </Fragment>
  );
};

export default CreateList;
