import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useQuery, useMutation } from '@apollo/react-hooks';
//queries
import { FOLLOW_USER } from '../../graphql/server';
import { GET_AUTHENTICATED, GET_USER_DATA } from '../../graphql/client';
import { FETCH_USER_DETAILS_QUERY } from '../../graphql/server';

const FollowButton = ({ currentProfile }) => {
  const [isFollowed, setFollowed] = useState(false);

  const {
    data: {
      userDetails: { username, following }
    }
  } = useQuery(GET_USER_DATA);

  const {
    data: { authenticated }
  } = useQuery(GET_AUTHENTICATED);

  const [follow] = useMutation(FOLLOW_USER, {
    update(cache, result) {
      const data = cache.readQuery({ query: FETCH_USER_DETAILS_QUERY, variables: { username } });
      if (data.getUserDetails.following.find(users => users === currentProfile)) {
        data.getUserDetails.following = data.getUserDetails.following.filter(
          users => users !== currentProfile
        );
        setFollowed(false);
      } else {
        data.getUserDetails.following.push(currentProfile);
        setFollowed(true);
      }
      cache.writeQuery({ query: FETCH_USER_DETAILS_QUERY, data });
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
