import React, { Fragment, useState } from 'react';
//gql
import { useMutation } from '@apollo/react-hooks';
import { CREATE_LIST } from '../../../graphql/mutations';
import { FETCH_USER_LISTS_QUERY } from '../../../graphql/query';
import { Container } from 'react-bootstrap';
//comps
import Nav from '../../layout/Nav/Nav';
import CreateListItems from './CreateListItems';
import CreateListTags from './CreateListTags';

const CreateList = props => {
  const [title, setTitle] = useState({
    phrase: 'Top',
    count: 3,
    description: ''
  });

  const [items, setItems] = useState([]);

  const [tags, setTags] = useState([]);

  const [createList] = useMutation(CREATE_LIST, {
    update(client, { data: { createList: list } }) {
      const data = client.readQuery({
        query: FETCH_USER_LISTS_QUERY,
        variables: {
          username: list.username
        }
      });
      data.getUserLists.lists.push(list);
      client.writeQuery({
        query: FETCH_USER_LISTS_QUERY,
        data
      });
      props.history.push(`/${list.username}`);
    },
    onError(err) {
      console.log(err.graphQLErrors);
    },
    variables: {
      title,
      tags,
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
        <Fragment>
          <CreateListTags tags={tags} setTags={setTags} />
          <CreateListItems items={items} setItems={setItems} handleItemsSubmit={handleItemsSubmit} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default CreateList;
