import { Link } from 'react-router-dom';
import { useRef } from 'react';
import * as Yup from 'yup';
import { Container, Footer, Form, FormContainer, Gif } from './styles';
import Input from '../../components/input';
import gif from './styles/gif.gif';
import logo from '../../assets/logo.png';
import { getValidationErrors } from './validation';

export default function Signup() {
  const formRef = useRef(null);

  const handleSubmit = async (data) => {
    try {
      formRef.current.setErrors([]);
      const schema = Yup.object().shape({
        name: Yup.string().required('Name is obligatory'),
        email: Yup.string().required('Email obligatory').email('Invalid email'),
        username: Yup.string().required('Username is Required'),
        password: Yup.string().required('Password is Required'),
      });
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);
        formRef.current.setErrors(errors);
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
