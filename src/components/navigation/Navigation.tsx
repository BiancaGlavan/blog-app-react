import { useTheme, useMediaQuery, IconButton, Drawer, Typography, Container, Box, Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SidebarNav from "./SidebarNav";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import CreateIcon from '@mui/icons-material/Create';

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
        color: ${props => props.theme.palette.secondary.main};
      }
    }
  }
`;

const Navigation = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              <Typography className="menu-link" variant="subtitle1">Articles</Typography>
            </Link>
            <Link to={"/categories"}>
              <Typography className="menu-link" variant="subtitle1">Categories</Typography>
            </Link>
            <Login />
            <Register />
          </>
        )}
        <Link to={"/editor"}>
          <Tooltip title="Write">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </Link>
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
