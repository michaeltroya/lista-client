import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery, useMutation } from '@apollo/react-hooks';
//queries
import { FOLLOW_USER } from '../../../graphql/server';
import { FETCH_USER_DETAILS_QUERY } from '../../../graphql/server';
//Redux Imports
import { useSelector } from 'react-redux';

const FollowButton = ({ currentProfile }) => {
  const [isFollowed, setFollowed] = useState(false);
  const username = useSelector(state => state.user.userDetails.username);
  const following = useSelector(state => state.user.userDetails.following);
  const authenticated = useSelector(state => state.user.authenticated);

  const [follow] = useMutation(FOLLOW_USER, {
    update(cache, _) {
      const data = cache.readQuery({ query: FETCH_USER_DETAILS_QUERY, variables: { username } });
      console.log(data);
    },
    variables: {
      username: currentProfile
    }
  });

  useEffect(() => {
    if (authenticated && following.find(users => users === currentProfile)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [authenticated, following, currentProfile]);

  const handleFollow = () => {
    follow();
  };

  return (
    <Fragment>
      {authenticated ? (
        username === currentProfile ? null : isFollowed ? (
          <button className="btn btn-dimmed" onClick={handleFollow}>
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
