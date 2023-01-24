import { Avatar, Box, Divider, IconButton, Menu, MenuItem, Typography } from "@mui/material";
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
        sx={{ mt: "40px" }}
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
       <Box className="user-info" sx={{padding: '10px 20px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
       <Typography variant="subtitle2" textAlign="center" sx={{ textTransform: "uppercase" }}>
          {user.name}
        </Typography>

        <Typography variant="subtitle2" textAlign="center">
          Role: {user.role}
        </Typography>

        <Typography variant="caption" textAlign="center" color="GrayText">
          {user.email}
        </Typography>

       </Box>
        <Divider />

        <MenuItem onClick={handleCloseUserMenu}>
          <Link to={"/profile"}>
            {" "}
            <Typography variant="subtitle2" textAlign="center">
              {"Profile"}
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography variant="subtitle2" textAlign="center">
            {"Logout"}
          </Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default UserDropdown;
