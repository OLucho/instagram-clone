import { Link } from 'react-router-dom';
import { Container, Footer, Form, FormContainer, Gif } from './styles';
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
          <input value="" name="" />

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
