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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { ListIcon } from 'lucide-react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { SignIn, SignOut } from '@phosphor-icons/react';

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery('(max-width:600px)'); // Define o breakpoint para telas menores que 600px
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Estado para verificar se o usuário está logado

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {!isLoggedIn && (
          <ListItem key="Login" disablePadding>
            <ListItemButton>
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
        {['Register'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="bg-green-600 relative flex justify-end items-center px-2 py-2">
      <div className='absolute left-0 px-3 font-bold'>
        <p className='text-white'>PetDev a serviço do cliente</p>
      </div>
      <div className='flex items-center'>
        <div className='flex justify-end px-3'>
          <p className=' text-white'>Bem vindo, Micael</p>
        </div>
        <Button onClick={toggleDrawer(true)} className='text-white'>
          <ListIcon size={isMobile ? '20' : '32'} />
        </Button>
        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </div>
    </div>
  );
}