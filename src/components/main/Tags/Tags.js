import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//comps
import ListCard from '../../secondary/ListCard/ListCard';
import Nav from '../../layout/Nav/Nav';
//queries
import { FETCH_TAG_LISTS_QUERY } from '../../../graphql/query';

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
            data.getTagLists.map(list => <ListCard list={list} key={list.id} />)
          )}
        </Container>
      </section>
    </Fragment>
  );
};

export default Tags;
