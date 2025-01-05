import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from "../assets/inteliconvo-img.png";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const Sidebar = () => {
  //   const drawerWidth = 240;

  const drawerItems = [
    { text: "Home", icon: <HomeIcon /> },
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Users", icon: <PeopleIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          flexShrink: 0,
          width: "75px",
          backgroundColor: "#E4F5FF",
          [`& .MuiDrawer-paper`]: {
            backgroundColor: "#E4F5FF",
            width: "75px",
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <List>
          {drawerItems.map((item, index) => (
            <ListItem button key={index}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              {/* <ListItemText primary={item.text} /> */}
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          //   p: 3,
          //   marginLeft: `${drawerWidth}px`,
        }}
      >
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            padding: 0,
            backgroundColor: "white",
            boxShadow: 0,
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="Logo" height={40} width={190} />

            {/* div for images aligned to the right */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <Badge badgeContent={4} color="error">
                <NotificationsRoundedIcon fontSize="medium" color="action" />
              </Badge>
              <HelpRoundedIcon fontSize="medium" color="action" />
              <SettingsRoundedIcon fontSize="medium" color="action" />
              <AccountCircleRoundedIcon fontSize="medium" color="primary" />
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
};

export default Sidebar;
