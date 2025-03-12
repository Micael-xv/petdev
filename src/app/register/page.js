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
import Link from "next/link";

const TextFieldMask = IMaskMixin(({ inputRef, ...props }) => (
  <TextField {...props} inputRef={inputRef} />
));

export default function BasicCard() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Card
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: isMobile ? "92%" : "30%",
          height: isMobile ? "75vh" : "85vh",
          border: "2px solid #151316",
        }}
      >
        <CardContent>
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
                  id="username"
                  label="Nome de usuário"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="password"
                  label="Senha"
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  fullWidth
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
            </Grid>
          </Box>

          <CardActions
            sx={{
              justifyContent: "center",
              marginTop: isMobile ? "10%" : "5%",
            }}
          >
            <Button variant="contained" className="bg-green-500" href="/">
              Registrar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}
