/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../../components/layout';
import avatar from '../../assets/avatar.png';
import api from '../../api';
import {
  Container,
  DescriptionContainer,
  ImgProfile,
  Username,
  ButtonFollow,
  CountsContainer,
  Button,
  Description,
  ContainerPhotos,
  Photo,
} from './styles';
import { useFeed } from '../../hooks/feed';

export default function Profile() {
  const { username } = useParams();

  const [user, setUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [count, setCount] = useState(null);

  const [loading, setLoading] = useState(false);

  const { deleteFollowAction } = useFeed();

  useEffect(() => {
    async function getProfile() {
      const res = await api.get(`/user/${username}`);
      console.log(res.data);
      const {
        isFollow: _isFollow,
        isProfile: _isProfile,
        userFollowersCount,
        userFollowsCount,
        userPhotosCount,
        user: _user,
      } = res.data;
      setIsFollow(_isFollow);
      setCount({
        userFollowersCount,
        userFollowsCount,
        userPhotosCount,
      });
      setIsProfile(_isProfile);
      setUser(_user);
      setPhotos(_user.photos);
    }
    getProfile();
  }, [username]);

  const loadingMemo = useMemo(() => !(user && user.id), [user]);

  if (loadingMemo) {
    return <p>Loading..</p>;
  }
  async function handleFollowButton(id) {
    try {
      setLoading(true);
      deleteFollowAction(id);
      setIsFollow(!isFollow);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Container>
        <DescriptionContainer>
          {user.avatar ? (
            <ImgProfile src={`data:image/png;base64, ${user.avatar}`} />
          ) : (
            <ImgProfile src={avatar} />
          )}

          <div>
            <Username>{user.username}</Username>
            {isProfile ? (
              <Link to={`/edit/${username}`}>
                <Button>Edit Profile</Button>
              </Link>
            ) : isFollow ? (
              <ButtonFollow
                onClick={() => handleFollowButton(user.id)}
                disabled={!!loading}
              >
                {loading ? 'Loading...' : 'Following'}
              </ButtonFollow>
            ) : (
              <ButtonFollow
                onClick={() => handleFollowButton(user.id)}
                disabled={!!loading}
              >
                {loading ? 'Loading...' : 'Follow'}
              </ButtonFollow>
            )}
            <CountsContainer>
              <span>{count.userPhotosCount}:Photos</span>
              <span>{count.userFollowersCount} Followers</span>
              <span>{count.userFollowsCount} Following</span>
            </CountsContainer>
          </div>

          <Description>
            <p>{user.name}</p>
            <span>{user.bio}</span>
          </Description>
        </DescriptionContainer>

        <ContainerPhotos>
          {photos.length > 0 &&
            photos.map((photo) => (
              <Link key={photo.id} to={`/photo/${photo.id}`}>
                <Photo src={`data:image/png;base64, ${photo.key}`} />
              </Link>
            ))}
        </ContainerPhotos>
      </Container>
    </Layout>
  );
}
