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
          width: isMobile ? "80%" : "30%",
          height: isMobile ? "50vh" : "80vh",
          border: "3px solid #e0e0e0",
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
                <TextField
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
                <TextField id="cpf" label="CPF" variant="outlined" fullWidth />
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

          <CardActions sx={{ justifyContent: "center" }}>
            <Button variant="contained" className="bg-green-500">
              Registrar
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </Box>
  );
}
