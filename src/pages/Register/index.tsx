import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { Modal, Grid, TextField, Paper, Button, IconButton } from '@material-ui/core'
import { ArrowBackIos } from '@material-ui/icons'
import Loading from 'react-loading'

import "./styles.css"
import AuthContext from '../../contexts/auth';


interface Errors {
  userEmail: String;
  userPassword: String;
  userName: String
}

const Register: React.FC = () => {
  const { loading, Register, alert, setAlert } = useContext(AuthContext);

  const [email, setEmail] = useState<String>('')
  const [password, setPassword] = useState<String>('')
  const [username, setUserName] = useState<String>('')
  const [errors, setErrors] = useState<Errors>({ 'userEmail': '', 'userPassword': '', 'userName': '' })
  const [modal, setModal] = useState<boolean>(false)

  const handleRegister = (event: any) => {
    event.preventDefault()
    const formvalidade = validade({ userEmail: email, userPassword: password, userName: username })
    formvalidade && Register({ email, password, username }, () => { setModal(true) })
  }

  const validade = (values: any) => {
    const newErrors = { 'userEmail': '', 'userPassword': '', 'userName': '' }

    if (!values.userEmail.includes('@') || !values.userEmail.includes('.')) {
      newErrors.userEmail = "Por favor, insira um email valido";
    }
    if (values.userPassword.length < 8 || !values.userPassword || !values.userEmail.includes('@')) {
      newErrors.userPassword = "Por favor, insira uma senha com 8 caracteres ou mais"
    }
    if (values.userName.length < 6 || !values.userName) {
      newErrors.userName = "Por favor, insira um nome com 6 caracteres ou mais"
    }

    setErrors(newErrors)

    if (newErrors.userEmail.length === 0 && newErrors.userPassword.length === 0 && newErrors.userName.length === 0) {
      return true;
    }
    return false;
  }

  const handleChange = (event: any, label: String) => {
    if (label === "password") {
      setPassword(event.target.value)
    }
    if (label === "email") {
      setEmail(event.target.value)
    }
    if (label === "username") {
      setUserName(event.target.value)
    }
  }

  return (
    <>
      <Modal
        style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
        open={modal}
        onClose={() => { }}
      >
        <div className="paperRegister">
          <h2> Cadastrado com sucesso </h2>
          <p>Você está cadastrado na plataforma, prossiga para a tela de login</p>
          <Link onClick={() => { setModal(false) }} className="LinkRegister" to="/login">LOGIN</Link>
        </div>
      </Modal>
      <Link to="/login">
        <IconButton style={{ position: "absolute", margin: "20px" }} aria-label="delete">
          <ArrowBackIos />
        </IconButton>
      </Link>
      {alert ? <Alert onClick={() => { setAlert("") }} style={{ position: "absolute", width: "95%", margin: "20px" }} severity="error">{alert}</Alert> : <></>}
      <Grid container component="main" className="gridRootLogin">
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className="paperLogin">
            {loading ? <Loading type={'bubbles'} height={'20%'} width={'100%'} color={'#5434af'} /> :
              <>
                <h2 className="titleLogin">
                  Cadastrar
                </h2>
                <form onSubmit={handleRegister} className="formLogin">
                  <TextField
                    error={errors.userName ? true : false}
                    helperText={errors.userName}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    value={username}
                    onChange={(event) => handleChange(event, "username")}
                    name="username"
                    label="Nome do usuario"
                    type="text"
                    id="username"
                  />
                  <TextField
                    error={errors.userEmail ? true : false}
                    helperText={errors.userEmail}
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
                    error={errors.userPassword ? true : false}
                    helperText={errors.userPassword}
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
                    Concluir
                  </Button>
                </form>
              </>
            }
          </div>
        </Grid>
        <Grid item xs={false} sm={4} md={7} className="imageLogin" />
      </Grid >
    </>
  );
}

export default Register;