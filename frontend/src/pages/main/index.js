import { useEffect } from 'react';
import Profile from '../../components/profile';
import { useAuth } from '../../hooks/auth';
import { useFeed } from '../../hooks/feed';
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
import CardFeed from '../../components/cardFeed';

export default function Main() {
  const { user } = useAuth();
  const { follows, loading, getFollows } = useFollow();
  const { getFeeds, feeds } = useFeed();

  useEffect(() => {
    getFollows();
    getFeeds();
  }, [getFeeds, getFollows]);
  return (
    <>
      <Layout>
        <Container>
          <Aside>
            <ContainerOwner>
              <Profile
                img={user && user.avatar}
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
                    img={follow.avatar}
                    name={follow.name}
                  />
                ))}
              {loading && <Spinner />}
            </ContainerFollows>
          </Aside>

          <ContainerFeeds>
            {feeds.length > 0 &&
              feeds.map((feed) => <CardFeed key={feed.photo.id} feed={feed} />)}
          </ContainerFeeds>
        </Container>
      </Layout>
    </>
  );
}
