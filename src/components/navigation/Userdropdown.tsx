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
          src={user?.image ? `https://eager-dog-tie.cyclic.app/api/images/${user.image}` : user?.name}
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
