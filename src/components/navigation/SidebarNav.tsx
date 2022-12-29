import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

const StyledSidebarNav = styled("div")`
  padding: 20px;

    .menu-links {
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;

const SidebarNav = () => {
  return (
    <StyledSidebarNav>
      <Typography variant="subtitle1">BB</Typography>
      <Box className="menu-links">
      <Link to={"/articles"}>
        <Typography variant="subtitle1">Articles</Typography>
      </Link>
      <Link to={"/categories"}>
        <Typography variant="subtitle1">Categories</Typography>
      </Link>
      <Login />
      <Register />
      </Box>
    </StyledSidebarNav>
  );
};

export default SidebarNav;
