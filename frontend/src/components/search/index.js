import React from 'react';
import {
  Container,
  ContainerResult,
  ContainerProfile,
  ContainerEmpty,
} from './styles';
import Profile from '../profile';
import Spinner from '../spinner';
import { useSearch } from '../../hooks/search';

export default function SearchContainer({ toggleClose }) {
  const { loading, users } = useSearch();
  return (
    <Container>
      {loading ? (
        <Spinner style={{ marginTop: '10px' }} />
      ) : (
        <ContainerResult>
          {users.length > 0 ? (
            users.map((user) => (
              <ContainerProfile key={user.id} onClick={toggleClose}>
                <Profile
                  direction="row"
                  img={user.avatar}
                  username={user.username}
                  name={user.name}
                />
              </ContainerProfile>
            ))
          ) : (
            <ContainerEmpty>
              <p>No Results •</p>
            </ContainerEmpty>
          )}
        </ContainerResult>
      )}
    </Container>
  );
}
