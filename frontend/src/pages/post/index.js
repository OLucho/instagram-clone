import React, { useEffect, useState } from 'react';
import TimeAgo from 'react-timeago';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import spanishString from 'react-timeago/lib/language-strings/es';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import api from '../../api';
import {
  Container,
  ContainerPhoto,
  ContainerPost,
  HeaderPost,
  Img,
  ContainerComments,
  TimeStyle,
  ContainerOptions,
} from './styles';
import Profile from '../../components/profile';
import Spinner from '../../components/spinner';

const formatter = buildFormatter(spanishString);

export default function Post() {
  const { photoId } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function getPost() {
      const res = await api.get(`/photo/${photoId}`);
      const { photo } = res.data;
      setPost(photo);
      setComments(photo.comment);
    }
    getPost();
  }, [photoId]);

  if (!post) {
    return <Spinner />;
  }
  return (
    <Layout>
      <Container>
        <ContainerPhoto>
          <Img src={`data:image/png;base64, ${post.key}`} />
        </ContainerPhoto>

        <ContainerPost>
          <HeaderPost>
            <Profile img={post.user.avatar} username={post.user.username} />
            <p style={{ margin: '5px 0' }}>{post.body}</p>
          </HeaderPost>
          <ContainerComments>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div>
                  <Profile
                    img={comment.user.avatar}
                    username={comment.user.username}
                  />
                  <p>{comment.body}</p>
                  <TimeStyle>
                    <TimeAgo
                      date={`${comment.createdAt}`}
                      formatter={formatter}
                    />
                  </TimeStyle>
                </div>
              ))
            ) : (
              <p>No comments </p>
            )}
          </ContainerComments>
          <ContainerOptions>
            <span>♥ {post.likes.length} Likes</span>
          </ContainerOptions>
        </ContainerPost>
      </Container>
    </Layout>
  );
}
