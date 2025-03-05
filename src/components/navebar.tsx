import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Modal from '@mui/material/Modal'; // Importando o Modal do MUI
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ListIcon } from 'lucide-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CashRegister, SignIn, SignOut, XCircle } from '@phosphor-icons/react';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery("(max-width:600px)"); // Define o breakpoint para telas menores que 600px
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Estado para verificar se o usuário está logado
  const [openLogin, setOpenLogin] = React.useState(false); // Estado para abrir o modal

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
        {!isLoggedIn && (
          <ListItem key="Login" disablePadding>
            <ListItemButton onClick={handleOpenLogin}> {/* Abre o modal */}
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
        {["Cadastrar-se"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton> {/* Navegue para a página de registro */}
              <ListItemIcon>
                <CashRegister size={32}/>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
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
          <Button onClick={toggleDrawer(true)} className="text-white">
            <ListIcon size={isMobile ? "20" : "32"} />
          </Button>
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
            width: isMobile ? "90%" : 'auto',
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 5,
          }}
        >
          <div className="flex justify-end pb-5">
            <div className="flex items-center justify-center w-full">
              <p className="flex justify-center font-bold ml-10">PETDEV</p>
            </div>
            <button onClick={handleCloseLogin}><XCircle size={42} /></button>
          </div>
          <Card className="border-2 border-black">
            <CardContent>
              <Typography variant="h6" component="div" gutterBottom className="text-center">
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
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Entrar
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </>
  );
}