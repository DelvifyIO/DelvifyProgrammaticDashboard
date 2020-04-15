import * as React from 'react';
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
  Button,
} from 'reactstrap';
import useForm from 'react-hook-form';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';

import { GlobalStateContext, GlobalDispatchContext } from '../context';
import { LoginData, getToken, setToken } from '../utils/auth';
import { login } from '../services/api';
import AuthLayout from '../components/AuthLayout';
import logoSrc from '../assets/img/brand/delvify_orange_trans.png';

const LogoImg = styled.img`
  max-width: 8rem;
  margin: -2rem 0;
`;

const handleLogin = async ({ email, password }: LoginData): Promise<void> => {
  const response = await login(email, password);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const authInfo = await response.json();
  return authInfo;
};

const Login: React.FC<RouteComponentProps> = () => {
  const [shouldRender, setShouldRender] = React.useState(false);
  const state = React.useContext(GlobalStateContext);
  const dispatch = React.useContext(GlobalDispatchContext);

  React.useEffect(() => {
    if (getToken()) {
      navigate('/dashboard/home');
      return;
    }
    setShouldRender(true);
  }, []);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data: LoginData): Promise<void> => {
    try {
      const { userInfo, token } = await handleLogin(data);
      setToken(token);
      dispatch({
        type: 'SET_USER_INFO',
        value: userInfo,
      });
      navigate('/dashboard/home');
    } catch (error) {
      console.log('error in onSubmit: ', error);
      console.log('errorMsg in onSubmit: ', error.message);
    }
  };

  return shouldRender ? (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="text-center bg-white">
            <LogoImg src={logoSrc} />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
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
                    innerRef={(ref) => register(ref, { required: true, pattern: /^\S+@\S+$/i })}
                  />
                  <FormFeedback>Please enter a valid email address</FormFeedback>
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
                    innerRef={(ref) => register(ref, { minLength: 6 })}
                  />
                  <FormFeedback>Password min length: 6 characters</FormFeedback>
                </InputGroup>
              </FormGroup>
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
  ) : <></>;
};

export default Login;
