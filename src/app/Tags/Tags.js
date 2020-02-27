import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/ListCard/ListCard';
import Nav from '../../components/Nav/Nav';

const Tags = props => {
  const tagPath = props.location.pathname.split('/')[2];

  const { loading, data } = useQuery(FETCH_TAG_LISTS_QUERY, {
    variables: {
      tag: tagPath
    }
  });

  return (
    <Fragment>
      <Nav type="home" />
      <section className="tags">
        <Container>
          {loading ? <Spinner animation="border" className="orange-spinner" /> : <h1>{tagPath}</h1>}
          {loading ? (
            <Spinner animation="border" className="orange-spinner" />
          ) : (
            data.getTagLists.map(list => <List list={list} key={list.id} />)
          )}
        </Container>
      </section>
    </Fragment>
  );
};

const FETCH_TAG_LISTS_QUERY = gql`
  query TagLists($tag: String!) {
    getTagLists(tag: $tag) {
      id
      username
      title {
        phrase
        count
        description
      }
      tags
      items {
        name
        description
        order
      }
      commentCount
      likeCount
    }
  }
`;

export default Tags;
