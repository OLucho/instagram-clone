import { Link } from 'react-router-dom';
import { Container, Footer, Form, FormContainer, Gif } from './styles';
import Input from '../../components/input';
import gif from './styles/gif.gif';
import logo from '../../assets/logo.png';

export default function Signup() {
  return (
    <Container>
      <Gif src={gif} alt="gif" />

      <FormContainer>
        <Form>
          <img src={logo} alt="logo" />
          <span>Register to upload images </span>
          <hr />
          <Input name="name" placeholder="Enter your name" />
          <Input name="username" placeholder="Enter your username" />
          <Input name="password" placeholder="Enter your password" />
          <Input name="email" placeholder="Enter your email" />
          <button type="submit">Register</button>
          <hr />

          <span className="footer">
            By registering you accept our conditions, cookie policies and
            services
          </span>
        </Form>

        <Footer>
          <p>
            Already have an account? <Link to="signin">Sign In!</Link>
          </p>
        </Footer>
      </FormContainer>
    </Container>
  );
}
