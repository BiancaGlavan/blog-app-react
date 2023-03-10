import { useTheme, useMediaQuery, IconButton, Drawer, Typography, Container, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import SidebarNav from "./SidebarNav";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, setUser } from "../../redux/features/authSlice";
import UserDropdown from "./Userdropdown";
import { useGetMyProfileQuery } from "../../redux/features/apiSlice";

const StyledNavigation = styled("div")`
  .navigation-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }

  .menu-links {
    display: flex;
    gap: 20px;
    align-items: center;

    .menu-link {
      font-weight: 500;
      &:hover {
        color: ${(props) => props.theme.palette.primary.main};
      }
    }
  }

  .logo {
    font-weight: 500;
    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }

  .loader-img {
    width: 20px;
    
  }
`;

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const authState = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    data: userProfile,
    isSuccess,
    isError,
    isLoading: isLoadingUserProfile,
  } = useGetMyProfileQuery({}, { skip: !authState.isAuth });

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

      console.log("userProfile", userProfile);
    }
  }, [userProfile]);

  useEffect(() => {
    if (isError) {
      dispatch(logout());
    }
  }, [isError]);

  return (
    <StyledNavigation className="Navigation">
      <Container className="navigation-container">
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        )}

        {!isMobile && (
          <Link to={"/"}>
            <Typography variant="subtitle1" className="logo">
              Keep the Pot Boiling
            </Typography>
          </Link>
        )}

        <Box className="menu-links">
          {!isMobile && (
            <>
              <Link to={"/"}>
                <Typography className="menu-link" variant="subtitle1">
                  Home
                </Typography>
              </Link>
              <Link to={"/articles"}>
                <Typography className="menu-link" variant="subtitle1">
                  Articles
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
          {isLoadingUserProfile && <img className="loader-img" src="../images/animated-loader.svg" />}
          {authState.isAuth && authState.user && (
            <>
              <Link to={"/articles/add"}>
                <Typography className="menu-link" variant="subtitle1">
                  Write
                </Typography>
              </Link>
            </>
          )}

          {authState.isAuth && userProfile?.profile.role === "admin" && (
            <Link to={"/admin"}>
              <Typography className="menu-link" variant="subtitle1">
                Admin
              </Typography>
            </Link>
          )}
          {authState.isAuth && authState.user && <UserDropdown user={authState.user} handleLogout={handleLogout} />}
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
      </Container>
    </StyledNavigation>
  );
};

export default Navigation;
