import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Badge, Box, IconButton, Toolbar } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';

const Appbar = () => {
  const [notifications] = useState([]);

  return (
    <AppBar elevation={0}>
      <Toolbar>
        <RouterLink to="/">{/* <Logo /> goes here */}</RouterLink>
        <Box sx={{ flexGrow: 1 }} />
        {/* <IconButton color="inherit">
          <Badge
            badgeContent={notifications.length}
            color="primary"
            variant="dot"
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton color="inherit">
          <InputIcon />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Appbar;
