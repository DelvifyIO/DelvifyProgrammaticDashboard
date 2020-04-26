import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';
import {
  Col,
  CardHeader,
  Card,
  CardBody,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  FormFeedback,
  Button, CardTitle,
} from 'reactstrap';
import useForm from 'react-hook-form';
import styled from '@emotion/styled';
import { Auth } from 'aws-amplify';
import { navigate } from 'gatsby';

import { GlobalStateContext, GlobalDispatchContext } from '../context';
import {LoginData, getToken, setToken, REGISTER_TYPE} from '../utils/auth';
import { login } from '../services/api';
import AuthLayout from '../components/AuthLayout';
import logoSrc from '../assets/img/brand/delvify_orange_trans.png';

const LogoImg = styled.img`
  max-width: 8rem;
  margin: -2rem 0;
`;

const Login: React.FC<RouteComponentProps> = (props) => {
  const [error, setError] = useState(null);

  const dispatch = React.useContext(GlobalDispatchContext);

  // React.useEffect(() => {
  //   if (getToken()) {
  //     navigate('/dashboard/home');
  //     return;
  //   }
  //   setShouldRender(true);
  // }, []);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data: LoginData): Promise<void> => {
    const { email, password } = data;
    setError(null);
    try {
      const user = await Auth.signIn(email, password);
      console.log(user);
      if (user.signInUserSession) {
        setToken(user.signInUserSession.accessToken.jwtToken);
        dispatch({
          type: 'SET_USER_INFO',
          value: user,
        });
        // navigate('/dashboard/home', { replace: true });
      } else if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        dispatch({
          type: 'SET_TEMP_USER',
          value: user,
        });
        navigate('/register', { state: { type: REGISTER_TYPE.NEW_PASSWORD } })
      }
    } catch (error) {
      setError(error.message);
      console.log('error in onSubmit: ', error);
      console.log('errorMsg in onSubmit: ', error.message);
    }
  };

  return (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="text-center bg-white">
            <LogoImg src={logoSrc} />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <CardTitle className="h3 text-center">{ 'Welcome' }</CardTitle>
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={!!errors.email}
                    placeholder="Email"
                    type="email"
                    name="email"
                    innerRef={(ref) => register(ref, { required: false, pattern: /^\S+@\S+$/i })}
                  />
                  { errors.email && <FormFeedback>{ errors.email.message }</FormFeedback> }
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={!!errors.password}
                    placeholder="Password"
                    type="password"
                    name="password"
                    innerRef={(ref) => register(ref, { required: false, minLength: 6 })}
                  />
                  { errors.password && <FormFeedback>{ errors.password.message }</FormFeedback> }
                </InputGroup>
              </FormGroup>
              { !!error && <code>{error}</code> }
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                    Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a className="text-light" href="#pablo" onClick={(e) => e.preventDefault()}>
              <small>Create new account</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </AuthLayout>
  );
};

export default Login;
