import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
//queries
import { FOLLOW_USER } from '../../../graphql/server';
import { FETCH_USER_DETAILS_QUERY } from '../../../graphql/server';
//Redux Imports
import { useSelector } from 'react-redux';

const FollowButton = ({ currentProfile }) => {
  const [isFollowed, setFollowed] = useState(false);
  const username = useSelector(state => state.user.userData.username);
  const following = useSelector(state => state.user.userData.following);
  const authenticated = useSelector(state => state.user.authenticated);

  const [follow] = useMutation(FOLLOW_USER, {
    update(cache, _) {},
    variables: {
      username: currentProfile
    }
  });

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
