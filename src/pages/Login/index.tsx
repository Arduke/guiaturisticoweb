import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Grid, TextField, Button, Paper, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { ArrowBackIos } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import Loading from "react-loading";
import { GoogleLogin } from "react-google-login";

import "./styles.css";
import AuthContext from "../../contexts/auth";

const Login = () => {
  const { signed, loading, Login, LoginWithGoogle, alert, setAlert } =
    useContext(AuthContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clientId = process.env.REACT_APP_GOOGLE_API_KEY;

  useEffect(() => {
    if (signed) {
      history.push("/");
    }
  }, [signed, history]);

  const handleLogin = (event: any) => {
    event.preventDefault();
    Login(email, password, () => {
      history.push("/");
    });
  };

  const handleChange = (event: any, label: string) => {
    label === "password"
      ? setPassword(event.target.value)
      : setEmail(event.target.value);
  };

  const OnLoginSuccess = (res: any) => {
    const { name, email, googleId, imageUrl } = res.profileObj;
    LoginWithGoogle(name, email, googleId, imageUrl, () => {
      history.goBack();
    });
  };

  const OnLoginFailure = (res: any) => {
  };

  return (
    <>
      <Link to="/">
        <IconButton
          style={{ position: "absolute", margin: "20px" }}
          aria-label="delete"
        >
          <ArrowBackIos color="primary" />
        </IconButton>
      </Link>
      {alert ? (
        <Alert
          onClick={() => {
            setAlert("");
          }}
          style={{ position: "absolute", width: "95%", margin: "20px" }}
          severity="error"
        >
          {alert}
        </Alert>
      ) : (
        <></>
      )}
      <Grid container component="main" className="gridRootLogin">
        <Grid item xs={false} sm={4} md={7} className="imageLogin" />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paperLogin">
            {loading ? (
              <Loading
                type={"bubbles"}
                height={"20%"}
                width={"100%"}
                color={"#5434af"}
              />
            ) : (
              <>
                <h2 className="titleLogin">Login</h2>
                <form onSubmit={handleLogin} className="formLogin">
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={email}
                    onChange={(event) => handleChange(event, "email")}
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                    autoFocus
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={password}
                    onChange={(event) => handleChange(event, "password")}
                    name="password"
                    label="Senha"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  {/* <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Lembrar-me"
                                />*/}
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className="submitLogin"
                  >
                    Acessar
                  </Button>
                  <Grid container>
                    <Grid item>
                      <Link to="/register">
                        {"N??o tem uma conta? Registre-se"}
                      </Link>
                    </Grid>
                  </Grid>
                </form>
                <div className="g-signin">
                  {clientId ? (
                    <GoogleLogin
                      autoLoad={false}
                      clientId={clientId}
                      onSuccess={OnLoginSuccess}
                      onFailure={OnLoginFailure}
                      buttonText="Continuar com Google"
                    />
                  ) : (
                    <> Servi??o de login indisponivel </>
                  )}
                </div>
              </>
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
