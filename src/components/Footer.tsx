import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import Register from "./navigation/Register";

const StyledFooter = styled("div")`
  background-color: ${(props) => props.theme.palette.secondary.main};

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    padding: 50px 10px;
    margin-top: 80px;

    ${(props) => props.theme.breakpoints.down("sm")} {
      padding: 30px 10px;
    }

  }

  .write-btn {
    width: 200px;
    border-radius: 0;
  }

  .footer-title {
    font-weight: 500;
    text-align: center;
    color: ${(props) => props.theme.palette.background.default};

    ${(props) => props.theme.breakpoints.down("sm")} {
      font-size: 18px;
    }
  }

  .footer-register {
    text-align: center;
    color: ${(props) => props.theme.palette.background.default};
  }

  .register {
    display: flex;
    gap: 4px;
    align-items: center;

    ${(props) => props.theme.breakpoints.down("sm")} {
      flex-direction: column;
    }
  }

  .msg {
    color: ${(props) => props.theme.palette.background.default};
  }

`;

const Footer = () => {
  const navigate = useNavigate();
  const authState = useAppSelector((state) => state.auth);
  const [msg, setMsg] = useState('');
  
  const handleWrite = () => {
    if(authState.isAuth && authState.user) {
      navigate("/articles/add");
    } else {
      setMsg("Please login!")
    }
  }
  return (
    <StyledFooter>
      <Box className="footer-content">
        <Typography className="footer-title" variant="h5">
          Write articles and make this blog awesome.
        </Typography>
        
          <Button className="write-btn" variant="contained" size="large" onClick={handleWrite}>
            Write
          </Button>
       {!authState.isAuth && !authState.user && <Typography className="msg" variant="body1">{msg}</Typography>}
       <Box className="register">
       <Typography className="footer-register" variant="body1">
          If you don't have a user account, please
        </Typography>
        <Register/>
       </Box>
      </Box>
    </StyledFooter>
  );
};

export default Footer;
