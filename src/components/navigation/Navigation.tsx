import { useTheme, useMediaQuery, IconButton, Drawer, Typography, Container, Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CreateIcon from "@mui/icons-material/Create";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, setUser } from "../../redux/features/authSlice";
import UserDropdown from "./Userdropdown";
import { useGetMyProfileQuery } from "../../redux/features/apiSlice";

const StyledNavigation = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;

  .menu-links {
    display: flex;
    gap: 20px;
    align-items: center;

    .menu-link {
      &:hover {
        color: ${(props) => props.theme.palette.secondary.main};
      }
    }
  }
`;

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const { data: userProfile, isSuccess } = useGetMyProfileQuery({}, { skip: !authState.isAuth });


  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (userProfile && userProfile.profile) {
      dispatch(setUser(userProfile.profile));

    console.log('userProfile', userProfile);
    }
  }, [userProfile]);
  
  return (
    <StyledNavigation>
      {isMobile && (
        <IconButton onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      )}
      {!isMobile && (
        <Link to={"/"}>
          <Typography>BB</Typography>
        </Link>
      )}
      <Box className="menu-links">
        {!isMobile && (
          <>
            <Link to={"/articles"}>
              <Typography className="menu-link" variant="subtitle1">
                Articles
              </Typography>
            </Link>
            <Link to={"/categories"}>
              <Typography className="menu-link" variant="subtitle1">
                Categories
              </Typography>
            </Link>
            {!authState.isAuth && (
              <>
                <Login />
                <Register />
              </>
            )}
          </>
        )}
        {authState.isAuth && authState.user && <UserDropdown user={authState.user} handleLogout={handleLogout} />}
        {authState.isAuth && authState.user && <Link to={"/editor"}>
          <Tooltip title="Write">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </Link>}
      </Box>
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
        <SidebarNav />
      </Drawer>
    </StyledNavigation>
  );
};

export default Navigation;
