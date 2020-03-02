import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
import { LIKE_UNLIKE } from '../../../graphql/server';
//Redux Imports
import { useSelector } from 'react-redux';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as SolidHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = ({ listId, likeCount, likes }) => {
  const [liked, setLiked] = useState(false);
  const authenticated = useSelector(state => state.user.authenticated);
  const username = useSelector(state => state.user.credentials.username);

  useEffect(() => {
    if (authenticated && likes.find(like => like.username === username)) {
      setLiked(true);
    } else setLiked(false);
  }, [likes, authenticated, username]);

  const [likeList] = useMutation(LIKE_UNLIKE, {
    variables: {
      listId
    }
  });

  const handleLike = () => {
    likeList();
  };

  return (
    <Fragment>
      <p>{likeCount}</p>
      {authenticated ? (
        liked ? (
          <FontAwesomeIcon icon={SolidHeart} onClick={handleLike} />
        ) : (
          <FontAwesomeIcon icon={faHeart} onClick={handleLike} />
        )
      ) : (
        <Link to="/login">
          <FontAwesomeIcon icon={faHeart} />
        </Link>
      )}
    </Fragment>
  );
};

export default LikeButton;
