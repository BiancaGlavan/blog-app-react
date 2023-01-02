import { Avatar, Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IUser } from "../../redux/features/authSlice";

interface IPropsUserDropdown {
  user: IUser;
  handleLogout: () => void;
}

const UserDropdown = ({ user, handleLogout }: IPropsUserDropdown) => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, margin: "0 10px" }}>
        <Avatar
          sx={{ width: 30, height: 30 }}
          alt="My profile"
          src="https://images.unsplash.com/photo-1670718089430-d75ba6c1a194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        />
      </IconButton>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography textAlign="center">
            <Link to={"/profile"}>{"My profile"}</Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography textAlign="center">{"Logout"}</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserDropdown;
