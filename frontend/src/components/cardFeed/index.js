import React, { lazy, useCallback, useState, Suspense, useEffect } from 'react';
import TimeAgo from 'react-timeago';
import spanishString from 'react-timeago/lib/language-strings/es';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';

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
import { FaHeart, FaComment } from 'react-icons/fa';
import { FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const formatter = buildFormatter(spanishString);
const CommentList = lazy(() => import('../commentList'));

export default function CardFeed({ feed }) {
  const { isAuthor, isLiked, photo } = feed;

  const [commentsPhoto, setCommentsPhoto] = useState(photo.getComments);
  const [like, setLike] = useState(isLiked);
  const [comment, setComment] = useState('');
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const res = await api.post(`/comment/${photo.id}`, { body: comment });
      if (res.status === 200) {
        setCommentsPhoto((state) => [...state, res.data]);
      }
      setComment('');
      setDisabled(true);
    },
    [photo.id, comment]
  );

  const toggleLike = useCallback(
    async (photo_id) => {
      const res = await api.post(`/likes/${photo_id}`);
      if (res.status === 200) {
        setLike(!like);
      }
    },
    [like]
  );

  useEffect(() => {
    if (comment.trim()) {
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
          img={photo.uploadedBy.avatar_url}
          username={photo.uploadedBy.username}
        />
        <ModalMoreOptions isAuthor={isAuthor} photo={photo} />
      </CardHeader>
      <PhotoCard src={photo.photo_url} />
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
          {photo.uploadedBy.username}
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
          <TimeAgo date={`${photo.created_at}Z`} formatter={formatter} />
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
