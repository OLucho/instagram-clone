/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Layout from '../../components/layout';
import api from '../../api';
import { Form, Container, FormContainer } from './styles';
import avatar from '../../assets/avatar.png';

export default function Edit() {
  const { user, error: serverError, editUser, setError } = useAuth();

  const [avatarUser, setAvatarUser] = useState('');
  const [userData, setUserData] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    password: user.password,
    bio: user.bio,
  });

  const formRef = useRef(null);
  const inputRef = useRef(null);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleAvatar = useCallback(async () => {
    try {
      const avatarToUpload = inputRef.current.files[0];
      const formData = new FormData();
      formData.append('file', avatarToUpload, avatarToUpload.name);
      await api.post('/user/avatar', formData);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      }
    }
  }, []);

  const updateUserData = () => {
    const { name, username, bio, email, password } = userData;

    editUser({ name, username, bio, email, password });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatarUser) {
      handleAvatar();
    }
    updateUserData();
  };

  return (
    <>
      <Layout>
        <Container>
          <FormContainer>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <span>Edit your profile</span>
              {serverError && serverError.map((e) => <p>♦{e}</p>)}
              {avatarUser ? (
                <img src={avatarUser} alt="avatar" />
              ) : user.avatar ? (
                <img
                  src={`data:image/png;base64, ${user.avatar}`}
                  alt="avatar"
                />
              ) : (
                <img src={avatar} alt="avatar" />
              )}

              <input
                name="file"
                type="file"
                ref={inputRef}
                onChange={(e) =>
                  setAvatarUser(URL.createObjectURL(e.target.files[0]))
                }
              />
              <input
                name="name"
                placeholder="Name"
                value={userData.name}
                onChange={handleChange}
              />
              <input
                name="username"
                placeholder="Username"
                value={userData.username}
                onChange={handleChange}
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={handleChange}
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={userData.email}
                onChange={handleChange}
              />
              <input
                name="bio"
                placeholder="Bio"
                value={userData.bio}
                onChange={handleChange}
              />

              <p>To persist changes you must login again</p>
              <button type="submit">Update</button>
            </Form>
          </FormContainer>
        </Container>
      </Layout>
    </>
  );
}
