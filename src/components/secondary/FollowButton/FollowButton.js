import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
import { FOLLOW_USER } from '../../../graphql/server';
//Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { SET_FOLLOWERS } from '../../../redux/types';

const FollowButton = ({ currentProfile }) => {
  const dispatch = useDispatch();
  const [isFollowed, setFollowed] = useState(false);
  const username = useSelector(state => state.user.credentials.username);
  const following = useSelector(state => state.user.following);
  const authenticated = useSelector(state => state.user.authenticated);

  const [follow] = useMutation(FOLLOW_USER, {
    update(
      _,
      {
        data: {
          followUser: { following }
        }
      }
    ) {
      dispatch({ type: SET_FOLLOWERS, payload: following });
    },
    variables: {
      username: currentProfile
    }
  });

  const handleFollow = () => {
    follow();
  };

  useEffect(() => {
    if (authenticated && following.find(users => users === currentProfile)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [authenticated, following, currentProfile]);

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
