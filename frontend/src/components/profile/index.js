import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import { Container, Img, Username, Name } from './styles';

export default function Profile({
  direction,
  usidebar = false,
  img,
  isOwner = false,
  username,
  name,
}) {
  return (
    <Container direction={direction} usidebar={usidebar}>
      <Link to={`/profile/${username}`}>
        {img ? (
          <Img
            src={`data:image/png;base64, ${img}`}
            alt="avatar"
            usidebar={usidebar}
            isOwner={isOwner}
          />
        ) : (
          <Img src={avatar} usidebar={usidebar} isOwner={isOwner} />
        )}
      </Link>
      <div>
        <Link to={`/profile/${username}`}>
          {username && <Username usidebar={usidebar}>{username}</Username>}
        </Link>
        {name && <Name>{name}</Name>}
      </div>
    </Container>
  );
}
