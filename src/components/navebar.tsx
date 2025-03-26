import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Home, ListIcon } from "lucide-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { CashRegister, SignIn, SignOut, XCircle } from "@phosphor-icons/react";
import Link from "next/link"; // Importando o Link do Next.js
import { Tooltip } from "@material-tailwind/react";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <ListItem key="Home" disablePadding>
          <Link href="/" passHref>
            {/* passHref força passar para que seja enviado as propriedades di href */}
            <ListItemButton>
              <ListItemIcon>
                <Home size={32} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>

        {!isLoggedIn && (
          <ListItem key="Login" disablePadding>
            <ListItemButton onClick={handleOpenLogin}>
              <ListItemIcon>
                <SignIn size={32} />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
        )}

        {isLoggedIn && (
          <ListItem key="Logout" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SignOut size={32} />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        <ListItem key="Cadastrar-se" disablePadding>
          <Link href="/register" passHref>
            <ListItemButton>
              <ListItemIcon>
                <CashRegister size={32} />
              </ListItemIcon>
              <ListItemText primary="Cadastrar-se" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {/* Navbar */}
      <div className="bg-green-600 relative flex justify-end items-center px-2 py-2">
        <div className="absolute left-0 px-3 font-bold">
          <p className="text-white">PetDev a serviço do cliente</p>
        </div>
        <div className="flex items-center">
          <div className="flex justify-end px-3">
            {!isMobile && <p className="text-white">Bem vindo, Micael</p>}
          </div>
          <Tooltip content="Menu">
            <Button
              onClick={toggleDrawer(true)}
              className="object-cover hover:rotate-90 duration-700 text-white"
            >
              <ListIcon size={isMobile ? "20" : "32"} />
            </Button>
          </Tooltip>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </div>
      </div>

      {/* Modal de Login */}
      <Modal open={openLogin} onClose={handleCloseLogin}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: isMobile ? "90%" : "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
          }}
        >
          <div className="flex justify-end pb-5">
            <div className="flex items-center justify-center w-full">
              <p className="flex justify-center font-bold ml-10 text-2xl">
                PETDEV
              </p>
            </div>
            <button onClick={handleCloseLogin}>
              <XCircle color="red" size={42} />
            </button>
          </div>
          <Card className="border-2 border-black">
            <CardContent>
              <Typography
                variant="h6"
                component="div"
                gutterBottom
                className="text-center font-bold"
              >
                Login
              </Typography>
              <TextField
                fullWidth
                label="E-mail"
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Senha"
                variant="outlined"
                type="password"
                margin="normal"
              />
              <Typography className="text-right text-xs cursor-pointer text-blue-500">
                Esqueceu sua Senha? Clique aqui
              </Typography>
              <Button
                fullWidth
                variant="contained"
                className="bg-green-600"
                sx={{ mt: 2 }}
              >
                Entrar
              </Button>
              <Link href={"/register"} passHref>
                <Button
                  fullWidth
                  onClick={handleCloseLogin}
                  variant="contained"
                  className="bg-red-500"
                  sx={{ mt: 2 }}
                >
                  Registrar-se
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
}
