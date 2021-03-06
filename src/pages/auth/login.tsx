import React, { FormEvent, useEffect, useState } from "react";
import { Button, Form, Row, Spinner, Stack } from "react-bootstrap";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { USER } from "../../common/constants";
import { IErrorResponse, IUser, LocationState } from "../../common/types";
import { toastError } from "../../common/utils";
import useUserContext from "../../hooks/useUserContext";
import { LoginSuccess } from "../../store/actions";
import { login } from "./api";
import GoogleLoginButton from "./components/GoogleLoginButton";
import { FullScreenContainer, LoginContainer } from "./styles";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, dispatch } = useUserContext();
  const history = useHistory();
  const location = useLocation<LocationState>();
  let { from } = location.state || { from: { pathname: "/" } };
  const { search } = location;

  if (user) {
    history.replace(from);
  }

  useEffect(() => {
    if (search) {
      const params = new URLSearchParams(search);
      toast.error(`${params.get("message")}`, { position: "top-center" });
    }
  }, [search]);

  const { isLoading: loading, mutateAsync: Login } = useMutation(
    USER.LOGIN,
    login,
    {
      onSuccess: (response) => {
        const { user: userRes, accessToken } = response.data;
        if (userRes.role === "admin") {
          toast.error("Please check your credentials.", {
            position: "top-center",
          });
          return;
        }
        const userInfo: IUser = {
          ...userRes,
          avatar: `https://ui-avatars.com/api/?name=${userRes.name}&background=0D8ABC&color=fff`,
          accessToken,
        };
        dispatch(LoginSuccess(userInfo));
      },
      onError: (err: IErrorResponse) => {
        toastError(err);
      },
    }
  );

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Login({ email, password });
  };

  return (
    <FullScreenContainer className="d-flex align-items-center">
      <LoginContainer className="border rounded-3 px-4 py-5 shadow bg-body d-flex">
        <Stack>
          <Row className="text-center mb-1 text-primary">
            <h2>Login</h2>
          </Row>
          <Row>
            <Form onSubmit={(e) => handleLogin(e)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Input your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="w-100 mt-3 mb-2 classroom-btn"
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Please wait...
                    </>
                  ) : (
                    <>Sign In</>
                  )}
                </Button>
                <div className="d-flex flex-row justify-content-end fst-italic pt-2 pb-3">
                  <Link to="/reset-password/provide-email">
                    <span className="text-secondary">Forgot password?</span>
                  </Link>
                </div>
                <GoogleLoginButton />
              </Form.Group>
              <Form.Group className="mt-3 text-center">
                Don't have account yet? <Link to="/register">Register now</Link>
              </Form.Group>
            </Form>
          </Row>
        </Stack>
      </LoginContainer>
    </FullScreenContainer>
  );
};

export default LoginPage;
