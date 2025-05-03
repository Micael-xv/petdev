"use client";
import * as React from "react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  useMediaQuery,
  Box,
  Grid,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IMaskMixin } from "react-imask";

const TextFieldMask = IMaskMixin(({ inputRef, ...props }) => (
  <TextField {...props} inputRef={inputRef} />
));

export default function BasicCard() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfPassword, setConfPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [serverError, setServerError] = React.useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailValidation = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError(!validateEmail(value)); // Valida o formato completo do email
  };

  const handlePasswordValidation = () => {
    if (password !== confirmPassword) {
      setPasswordError("As senhas não coincidem");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    handlePasswordValidation();
    if (!email || !password || !confirmPassword) {
      setServerError("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await api.post("/register", { email, password });
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      setServerError("Erro ao realizar o cadastro. Tente novamente.");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfPassword = () => {
    setConfPassword(!showConfPassword);
  };

  const handleMouseDownConfPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
      sx={{
        height: "100vh", // Define a altura total da viewport
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: isMobile ? "92%" : "40%",
          padding: "24px",
          border: "2px solid #151316",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          margin: "16px 0", // Adiciona margem para evitar corte no scroll
        }}
      >
        <CardContent sx={{ width: "100%" }}>
          <Typography
            variant="h5"
            component="div"
            align="center"
            fontWeight="bold"
          >
            Cadastro
          </Typography>
          <Box mt={4} width="100%">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="name"
                  label="Nome"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldMask
                  mask="000.000.000-00"
                  definitions={{
                    0: /[0-9]/,
                  }}
                  id="cpf"
                  label="CPF"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextFieldMask
                  mask="(00) 00000-0000"
                  definitions={{
                    0: /[0-9]/,
                  }}
                  id="phone"
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailValidation}
                  error={emailError}
                  helperText={emailError ? "O email deve conter @" : ""}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Senha"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="confPassword"
                  label="Confirme sua senha"
                  variant="outlined"
                  type={showConfPassword ? "text" : "password"}
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!!passwordError}
                  helperText={passwordError}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfPassword}
                          onMouseDown={handleMouseDownConfPassword}
                          edge="end"
                        >
                          {showConfPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          {serverError && (
            <Typography
              color="error"
              variant="body2"
              align="center"
              sx={{ mt: 2 }}
            >
              {serverError}
            </Typography>
          )}
        </CardContent>
        <CardActions
          sx={{
            justifyContent: "center",
            marginTop: "16px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            className="bg-green-500"
            onClick={handleSubmit}
            style={{ width: "95%" }}
          >
            Cadastrar
          </Button>
        </CardActions>
        <CardActions
          sx={{
            justifyContent: "center",
            marginTop: "8px",
            width: "100%",
          }}
        >
          <Button
            variant="contained"
            className="bg-green-500"
            onClick={() => (window.location.href = "/")}
            size="small"
          >
            Voltar
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
