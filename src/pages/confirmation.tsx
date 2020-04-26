import React, {useState, useCallback, useEffect} from 'react';
import {RouteComponentProps} from "@reach/router";
import queryString from 'query-string';
import { navigate } from 'gatsby';
import {
  Button,
  Card,
  CardBody,
  CardHeader, CardSubtitle, CardText, CardTitle,
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
import { Auth } from 'aws-amplify';
import useForm from 'react-hook-form';
import { ConfirmationData } from "../utils/auth";
import inputPattern from "../utils/patterns";

//TODO: Update logo component
const LogoImg = styled.img`
  max-width: 8rem;
  margin: -2rem 0;
`;

const Confirmation: React.FC<RouteComponentProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const { email } = queryString.parse(props.location.search);
    setUsername(email);
  });

  const onSubmit = async (data: ConfirmationData): Promise<void> => {
    setLoading(true);
    setError(null);
    const { code } = data;
    console.log(data);
    try {
      await Auth.confirmSignUp(username, code);
      setLoading(false);
      navigate('/login', { replace: true });
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.log('error in onSubmit: ', error);
    }
  };

  const { register, handleSubmit, errors } = useForm();


  return (
    <AuthLayout>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="text-center bg-white">
            <LogoImg src={logoSrc} />
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <CardTitle className="h2 text-center">Check your email</CardTitle>
            <CardSubtitle className="h3 text-center mb-3">We've sent a six­ digit confirmation code</CardSubtitle>
            <Form role="form" onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="fas fa-shield-alt" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    invalid={!!errors.code}
                    placeholder="Verification Code"
                    type="text"
                    name="code"
                    innerRef={(ref) => register(ref, { required: true, pattern: inputPattern.code })}
                  />
                  { errors.code && <FormFeedback>{ errors.code.message }</FormFeedback> }
                </InputGroup>
              </FormGroup>
              { !!error && <code>{error}</code> }
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Verify
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </AuthLayout>
  )
};


export default Confirmation;
