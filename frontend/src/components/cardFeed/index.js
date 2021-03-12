/* eslint-disable no-unused-vars */
import React, { useCallback, useState, Suspense, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import spanishString from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { FaHeart, FaComment } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ModalMoreOptions from '../modal/modalMoreOptions';
import Profile from '../profile';
import {
  Card,
  CardHeader,
  PhotoCard,
  CardControls,
  CardDetails,
  TimeAgo as StylesTimeAgo,
  CardFooter,
} from './styles';
import api from '../../api';
import CommentList from '../commentsList';

const formatter = buildFormatter(spanishString);

export default function CardFeed({ feed }) {
  const { isAuthor, isLiked, photo } = feed;

  const [commentsPhoto, setCommentsPhoto] = useState(photo.comment);
  const [like, setLike] = useState(isLiked);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await api.post(`/comment/${photo.id}`, { body: comment });
      if (res.status === 201) {
        setCommentsPhoto((state) => [...state, res.data]);
      }
      setComment('');
      setDisabled(true);
    },
    [photo.id, comment]
  );

  const toggleLike = useCallback(
    async (photoId) => {
      const res = await api.post(`/like/${photoId}`);
      if (res.status === 201) {
        setLike(!like);
      }
    },
    [like]
  );

  useEffect(() => {
    if (comment.length > 5) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [comment]);

  return (
    <Card>
      <CardHeader>
        <Profile
          direction="row"
          img={photo.user.avatar}
          username={photo.user.username}
        />
        <ModalMoreOptions isAuthor={isAuthor} photo={photo} />
      </CardHeader>
      <PhotoCard src={`data:image/png;base64, ${photo.key}`} />
      <CardControls>
        {like ? (
          <FaHeart
            onClick={() => toggleLike(photo.id)}
            size={18}
            style={{ color: '#fc4850', marginRight: 10 }}
          />
        ) : (
          <FiHeart
            onClick={() => toggleLike(photo.id)}
            size={18}
            style={{ marginRight: 10 }}
          />
        )}
        <Link to={`/photo/${photo.id}`}>
          <FaComment size={18} color="#2c2c2c" />
        </Link>
      </CardControls>

      <CardDetails>
        <p style={{ fontWeight: 'bold' }}>
          {photo.user.username}
          <span
            style={{
              marginLeft: 5,
              fontWeight: 'normal',
              marginBottom: 10,
              display: 'inline-block',
            }}
          >
            {photo.body}
          </span>
        </p>

        <Suspense fallback={<p>Loading..</p>}>
          {commentsPhoto.length > 0 && <CommentList comments={commentsPhoto} />}
        </Suspense>

        <StylesTimeAgo>
          <TimeAgo date={`${photo.createdAt}Z`} formatter={formatter} />
        </StylesTimeAgo>

        <Link
          to={`/photo/${photo.id}`}
          style={{
            fontWeight: 'bold',
            textDecoration: 'none',
            color: '#999',
            marginTop: '10px',
            display: 'block',
          }}
        >
          More details..
        </Link>
      </CardDetails>

      <CardFooter>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add new Comment"
          />
          <button type="submit" disabled={disabled}>
            Publish
          </button>
        </form>
      </CardFooter>
    </Card>
  );
}
