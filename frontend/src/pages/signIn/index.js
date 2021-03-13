/* eslint-disable react/no-unescaped-entities */
import { Link, useHistory } from 'react-router-dom';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import { Container, Footer, Form, FormContainer, ErrorMessage } from './styles';
import Input from '../../components/input';
import logo from '../../assets/logo.png';
import { getValidationErrors } from '../../utils/validation';
import { useAuth } from '../../hooks/auth';

export default function Signup() {
  const formRef = useRef(null);
  const history = useHistory();

  const { signIn } = useAuth();

  const [serverError, setServerError] = useState('');

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors([]);
      const schema = Yup.object().shape({
        username: Yup.string().required('Username is Required').max(8),
        password: Yup.string().required('Password is Required').min(5),
      });
      await schema.validate(data, { abortEarly: false });

      await signIn({ username: data.username, password: data.password });
      history.push('/');
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
      <FormContainer>
        <Form onSubmit={handleSubmit} ref={formRef}>
          <img src={logo} alt="logo" />
          <span>Log in to watch photos and videos </span>
          <hr />
          {serverError && (
            <ErrorMessage>
              <p>{serverError}</p>
            </ErrorMessage>
          )}
          <Input name="username" placeholder="Enter your username" />
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
          />
          <button type="submit">Log In</button>
          <hr />

          <span className="footer">
            Watch what your friends have prepared for you
          </span>
        </Form>

        <Footer>
          <p>
            Don't have an Account yet? <Link to="signup">Sign Up!</Link>
          </p>
        </Footer>
      </FormContainer>
    </Container>
  );
}
