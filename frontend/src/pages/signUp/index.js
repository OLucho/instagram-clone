import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import {
  Container,
  Footer,
  Form,
  FormContainer,
  Gif,
  ErrorMessage,
} from './styles';
import Input from '../../components/input';
import gif from './styles/gif.gif';
import logo from '../../assets/logo.png';
import { getValidationErrors } from '../../utils/validation';
import api from '../../api';

export default function Signup() {
  const formRef = useRef(null);
  const history = useHistory();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors([]);
      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        username: Yup.string().required().max(8),
        password: Yup.string().required(),
      });
      await schema.validate(data, { abortEarly: false });
      await api.post('/user', data);
      history.push('/signin');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current.setErrors(errors);
      }
      if (error.response) {
        setServerError(error.response.data.message);
      }
    }
  };

  return (
    <Container>
      <Gif src={gif} alt="gif" />

      <FormContainer>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <img src={logo} alt="logo" />
          <span>Register to upload images </span>
          <hr />
          {serverError && (
            <ErrorMessage>
              <p>{serverError}</p>
            </ErrorMessage>
          )}
          <Input name="name" placeholder="Enter your name" />
          <Input name="username" placeholder="Enter your username" />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
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
