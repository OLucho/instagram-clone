import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaSignOutAlt, FaUser } from 'react-icons/fa';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import {
  Nav,
  Container,
  ContainerSearch,
  Img,
  ContainerOptions,
  Input,
} from './styles';
import ModalUploadPhoto from '../modal/modalUploadPhoto';

export default function Header() {
  const [term, setTerm] = useState('');
  const { user, signOut } = useAuth();

  return (
    <>
      <Nav>
        <Container>
          <Link to="/">
            <Img src={logo} alt="logo" />
          </Link>
          <ContainerSearch>
            <FaSearch color="#ccc" size={15} />
            <Input
              placeholder="Search"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
            />
          </ContainerSearch>

          <ContainerOptions>
            <ModalUploadPhoto />
            <Link to={`/profile/${user && user.username}`}>
              <FaUser color="#222" size={25} />
            </Link>

            <FaSignOutAlt onClick={signOut} size={25} color="#222" />
          </ContainerOptions>
        </Container>
      </Nav>
    </>
  );
}
