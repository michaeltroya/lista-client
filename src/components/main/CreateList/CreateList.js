import React, { Fragment, useState } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST } from '../../../graphql/mutations';
import { Container } from 'react-bootstrap';
import Nav from '../../layout/Nav/Nav';
import CreateListItems from './CreateListItems';

const CreateList = props => {
  const [title, setTitle] = useState({
    phrase: 'Top',
    count: 3,
    description: ''
  });

  const [items, setItems] = useState([]);

  const [createList] = useMutation(CREATE_LIST, {
    update(
      _,
      {
        data: {
          createList: { username }
        }
      }
    ) {
      props.history.push(`/`);
    },
    onError(err) {
      console.log(err.graphQLErrors);
    },
    variables: {
      title,
      tags: ['test'],
      items
    }
  });

  const handleTitleSubmit = e => {
    e.preventDefault();
    const list = [];
    for (let i = 0; i < title.count; i++) {
      const item = {
        name: '',
        description: ''
      };

      list.push(item);
    }
    setItems([...list]);
  };

  const handleReset = () => {
    setTitle({
      phrase: 'Top',
      count: 3,
      description: ''
    });
    setItems([]);
  };

  const handleItemsSubmit = e => {
    e.preventDefault();
    createList();
  };

  return (
    <Fragment>
      <Nav type="compose" history={props.history} />
      <section className="create-list-title">
        <Container>
          <form onSubmit={handleTitleSubmit}>
            <div className="title-count">
              <h2>Top</h2>
              <input
                type="number"
                placeholder="Amount"
                value={title.count}
                onChange={e => setTitle({ ...title, count: e.target.value })}
                min="3"
                max="100"
                className="form-input number-input"
              />
            </div>
            <input
              type="text"
              placeholder="Description"
              className="form-input"
              value={title.description}
              onChange={e => setTitle({ ...title, description: e.target.value })}
            />
            <div className="buttons">
              <input type="submit" className="btn" value="Start" />
              <input type="button" className="btn btn-dimmed" value="Reset" onClick={handleReset} />
            </div>
          </form>
        </Container>
      </section>
      {items.length === 0 ? null : (
        <CreateListItems items={items} setItems={setItems} handleItemsSubmit={handleItemsSubmit} />
      )}
    </Fragment>
  );
};

export default CreateList;
