import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
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

  .link {
    font-weight: 500;
    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const SidebarNav = () => {
  const authState = useAppSelector((state) => state.auth);
  
  return (
    <StyledSidebarNav>
      <Link to={"/"}>
        <Typography variant="subtitle1" className="link">
          Keep the Pot Boiling
        </Typography>
      </Link>
      <Box className="menu-links">
        <Link to={"/articles"}>
          <Typography className="link" variant="subtitle1">
            Articles
          </Typography>
        </Link>
        <Link to={"/"}>
          <Typography className="link" variant="subtitle1">
            Home
          </Typography>
        </Link>
        {!authState.isAuth && (
                <>
                  <Login />
                  <Register />
                </>
              )}
      </Box>
    </StyledSidebarNav>
  );
};

export default SidebarNav;
