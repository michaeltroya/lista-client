import React, { Fragment, useState } from 'react';
//gql
import { useMutation, useQuery } from '@apollo/react-hooks';
import { CREATE_LIST } from '../../../graphql/mutations';
import { FETCH_USER_LISTS_QUERY } from '../../../graphql/query';
import { Container } from 'react-bootstrap';
//Redux Imports
import { useSelector } from 'react-redux';
//comps
import Nav from '../../layout/Nav/Nav';
import CreateListItems from './CreateListItems';
import CreateListTags from './CreateListTags';

const CreateList = props => {
  const username = useSelector(state => state.user.credentials.username);
  useQuery(FETCH_USER_LISTS_QUERY, { variables: { username } });
  const [title, setTitle] = useState({
    phrase: 'Top',
    count: 3,
    description: ''
  });

  const [items, setItems] = useState([]);
  const [tags, setTags] = useState([]);
  const [submittedTitle, setSubmittedTitle] = useState(false);

  const [errors, setErrors] = useState({});

  const [createList] = useMutation(CREATE_LIST, {
    update(client, { data: { createList: list } }) {
      const data = client.readQuery({
        query: FETCH_USER_LISTS_QUERY,
        variables: {
          username
        }
      });
      data.getUserLists.lists = [list, ...data.getUserLists.lists];
      client.writeQuery({
        query: FETCH_USER_LISTS_QUERY,
        data
      });
      props.history.push(`/${username}`);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
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
    setSubmittedTitle(true);
  };

  const handleReset = () => {
    setTitle({
      phrase: 'Top',
      count: 3,
      description: ''
    });
    setItems([]);
    setSubmittedTitle(false);
  };

  const handleItemsSubmit = e => {
    e.preventDefault();
    createList();
  };

  return (
    <Fragment>
      <Nav type="compose" history={props.history} />
      {Object.keys(errors).length > 0 ? (
        <div className="form-errors">
          <Container>
            {Object.values(errors).map(err => (
              <h4 key={err}>{err}</h4>
            ))}
          </Container>
        </div>
      ) : null}
      <section className="create-list-title">
        <Container>
          {submittedTitle ? (
            <div className="submitted-title">
              <h1>{`${title.phrase} ${title.count} ${title.description}`}</h1>
              <input type="button" className="btn btn-dimmed" value="Reset" onClick={handleReset} />
            </div>
          ) : (
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
                placeholder="List description"
                className="form-input"
                value={title.description}
                onChange={e => setTitle({ ...title, description: e.target.value })}
              />
              <div className="buttons">
                {title.description === '' ? null : <input type="submit" className="btn" value="Start" />}
              </div>
            </form>
          )}
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
