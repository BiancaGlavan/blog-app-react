import { Typography, useTheme, useMediaQuery, IconButton, Drawer, Box, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import UserDropdown from "../navigation/Userdropdown";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";

const StyledAdminNav = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: ${(props) => props.theme.palette.secondary.main};

  .nav-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .go-back {
    font-weight: 500;
    color: #fff;
    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const AdminNav = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <StyledAdminNav className="AdminNav" variant="outlined" square>
     
      <Box className="nav-left">
        {isMobile && (
          <IconButton sx={{color: '#fff'}} onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}

        <Link to={"/"}>
          <Typography className="go-back" variant="subtitle1">
            Go to website
          </Typography>
        </Link>
      </Box>
      {authState.isAuth && authState.user && <UserDropdown user={authState.user} handleLogout={handleLogout} />}

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 280 },
        }}
      >
        <AdminSidebar />
      </Drawer>
      
    </StyledAdminNav>
  );
};

export default AdminNav;
