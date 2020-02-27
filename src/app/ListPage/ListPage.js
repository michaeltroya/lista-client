import React, { Fragment } from 'react';
//gql
import { useQuery } from '@apollo/react-hooks';
//bs imports
import { Container, Spinner } from 'react-bootstrap';
//comps
import List from '../../components/ListCard/ListCard';
import Nav from '../../components/Nav/Nav';
//queries
import { FETCH_LIST_QUERY } from '../../graphql/serverQueries';

const ListPage = props => {
  const listIdPath = props.location.pathname.split('/')[3];

  const { loading, error, data } = useQuery(FETCH_LIST_QUERY, {
    variables: {
      listId: listIdPath
    }
  });

  if (error) {
    return <h1>{error.graphQLErrors[0].message}</h1>;
  }

  return (
    <Fragment>
      <Nav type="home" />
      <div className="profile">
        <Container>
          {loading ? (
            <Spinner animation="border" className="orange-spinner" />
          ) : (
            <List list={data.getList} key={data.getList.id} />
          )}
        </Container>
      </div>
    </Fragment>
  );
};

export default ListPage;
