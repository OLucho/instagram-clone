import { useEffect } from 'react';
import Profile from '../../components/profile';
import { useAuth } from '../../hooks/auth';
import Layout from '../../components/layout';
import {
  Aside,
  ContainerOwner,
  ContainerFollows,
  ContainerFeeds,
  Container,
} from './styles';
import { useFollow } from '../../hooks/follow';
import Spinner from '../../components/spinner';

export default function Main() {
  const { user } = useAuth();
  const { follows, loading, getFollows } = useFollow();

  useEffect(() => {
    getFollows();
  }, [getFollows]);

  return (
    <>
      <Layout>
        <Container>
          <Aside>
            <ContainerOwner>
              <Profile
                img={user && user.avatar_url}
                username={user && user.username}
                isOwner
                name={user && user.name}
              />
            </ContainerOwner>

            <ContainerFollows>
              {follows &&
                follows.map((follow) => (
                  <Profile
                    key={follow.id}
                    direction="column"
                    usidebar
                    username={follow.username}
                    img={follow.avatar_url}
                    name={follow.name}
                  />
                ))}
              {loading && <Spinner />}
            </ContainerFollows>
          </Aside>

          <ContainerFeeds />
        </Container>
      </Layout>
    </>
  );
}
