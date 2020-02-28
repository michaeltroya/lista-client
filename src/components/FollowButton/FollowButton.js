import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery, useMutation } from '@apollo/react-hooks';
//queries
import { FOLLOW_USER } from '../../graphql/server';
import { GET_USER_DATA, GET_AUTHENTICATED } from '../../graphql/client';

const FollowButton = ({ usernamePath, user }) => {
  const {
    data: {
      userDetails: { username, following }
    }
  } = useQuery(GET_USER_DATA);

  const {
    data: { authenticated }
  } = useQuery(GET_AUTHENTICATED);

  const [follow] = useMutation(FOLLOW_USER, {
    update(cache, { data }) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      username: usernamePath
    }
  });

  const handleFollow = () => {
    follow();
  };

  return (
    <Fragment>
      {authenticated ? (
        username === user ? null : following.find(users => users === usernamePath) ? (
          <button className="btn" onClick={handleFollow}>
            Unfollow
          </button>
        ) : (
          <button className="btn" onClick={handleFollow}>
            Follow
          </button>
        )
      ) : (
        <Link to="/login" className="btn">
          Follow
        </Link>
      )}
    </Fragment>
  );
};

export default FollowButton;
