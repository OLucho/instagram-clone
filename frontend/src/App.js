import styled from 'styled-components';
import { BaseModalBackground, ModalProvider } from 'styled-react-modal';
import Providers from './hooks/providers';
import Routes from './routes';

const fadingBackground = styled(BaseModalBackground)`
  opacity: ${(props) => props.opacity};
  transition: opacity ease 200ms;
`;
function App() {
  return (
    <Providers>
      <ModalProvider backgroundComponent={fadingBackground}>
        <Routes />
      </ModalProvider>
    </Providers>
  );
}

export default App;
