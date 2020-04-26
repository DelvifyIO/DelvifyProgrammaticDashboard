import React, { useState, useCallback, useContext } from 'react';
import { RouteComponentProps } from "@reach/router";
import { navigate } from 'gatsby';
import _ from 'lodash';
import {
  Button,
  Card,
  CardBody,
  CardHeader, CardTitle,
  Col,
  Form, FormFeedback,
  FormGroup, Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";
import logoSrc from "../assets/img/brand/delvify_orange_trans.png";
import AuthLayout from "../components/AuthLayout";
import styled from "@emotion/styled";
import { Auth, API } from 'aws-amplify';
import useForm from 'react-hook-form';
import {REGISTER_TYPE, RegisterData, setToken} from "../utils/auth";
import inputPattern from "../utils/patterns";
import {GlobalDispatchContext, GlobalStateContext} from "../context";

//TODO: Update logo component
const LogoImg = styled.img`
  max-width: 8rem;
  margin: -2rem 0;
`;

const Register: React.FC<RouteComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const type = _.get(props, ['location', 'state', 'type'], REGISTER_TYPE.CREATE_USER);
  const { tempUser } = useContext(GlobalStateContext);

  const dispatch = useContext(GlobalDispatchContext);

  const signUp = useCallback(async (data: RegisterData) => {
    const { name, email, password } = data;
    const result = await Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        name
      }
    });
    navigate(`/confirmation?email=${email}`, { replace: true });
    setLoading(false);
    console.log(result);
  }, []);

  const createUser = useCallback(async (data: RegisterData) => {
    const { name, email } = data;
    const result = await API.post('AdminQueries', '/createUser', {
      body: { username: email, name: name }
    });
    // navigate(`/confirmation?email=${email}`, { replace: true });
    setLoading(false);
    console.log(result);
  }, []);

  const newPassword = useCallback(async (data: RegisterData) => {
    const { name, password } = data;
    const user = await Auth.completeNewPassword(tempUser, password, { name: name });

    setToken(user.signInUserSession.accessToken.jwtToken);
    dispatch({
      type: 'SET_USER_INFO',
      value: user,
    });
    setLoading(false);
    console.log(user);
    // navigate('/dashboard/home', { replace: true });
  }, []);

  const onSubmit = async (data: RegisterData): Promise<void> => {
    setLoading(true);
    setError(null);
    console.log(data);
    try {
      if (type === REGISTER_TYPE.NEW_PASSWORD) {
        return newPassword(data);
      } else if (type === REGISTER_TYPE.NEW_USER){
        return signUp(data);
      } else {
        return createUser(data);
      }

    } catch (error) {
      setLoading(false);
      console.log('error in onSubmit: ', error);
      if (error.code === 'UsernameExistsException') {
        setFormError('email', 'Existed', error.message);
      } else {
        setError(error.message);
      }
    }
  };

  const { register, handleSubmit, errors, setError: setFormError } = useForm();


  return (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="text-center bg-white">
            <LogoImg src={logoSrc} />
            <CardTitle className="h3 text-center">{ type === REGISTER_TYPE.NEW_PASSWORD ? 'Update Password' : 'New user' }</CardTitle>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-building" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={!!errors.name}
                    placeholder="Client Name"
                    type="text"
                    name="name"
                    innerRef={(ref) => register(ref, { required: true })}
                  />
                </InputGroup>
              </FormGroup>
              {
                type !== REGISTER_TYPE.NEW_PASSWORD &&
                  <FormGroup>
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
                        innerRef={(ref) => register(ref, { required: true, pattern: inputPattern.email })}
                      />
                      { errors.email && <FormFeedback>{ errors.email.message }</FormFeedback> }
                    </InputGroup>
                  </FormGroup>
              }

              {
                type !== REGISTER_TYPE.CREATE_USER &&
                  <FormGroup>
                    <InputGroup className="input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        invalid={!!errors.password}
                        placeholder="Password"
                        type="password"
                        name="password"
                        innerRef={(ref) => register(ref, {required: true, pattern: inputPattern.password})}
                      />
                      {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
                    </InputGroup>
                  </FormGroup>
              }
              { !!error && <code>{error}</code> }
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Register
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </AuthLayout>
  )
};


export default Register;
