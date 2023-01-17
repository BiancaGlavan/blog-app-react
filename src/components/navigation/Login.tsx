import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/apiSlice";
import { login } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const StyledLogin = styled("div")`
  .login-btn {
    color: ${(props) => props.theme.palette.text.primary};

    &:hover {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

const StyledDialog = styled("div")`
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 30px;
  }

  .input {
    margin-top: 30px;
  }

  .btn {
    margin-top: 30px;
    width: 100%;
  }
`;

const Login = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const authState = useAppSelector((state) => state.auth);
  const [loginUser, response] = useLoginUserMutation();
  const { data: loginResponse, isSuccess, isLoading } = response;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    const currentUser = {
      name: name,
      password: password,
    };

    loginUser({ data: currentUser });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(login(loginResponse.access_token));
      navigate("/");
    }
  }, [isSuccess, loginResponse]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledLogin className="Login">
      <Button className="login-btn" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="dialog-content">
          <StyledDialog>
            <Typography variant="h6">Login</Typography>
            <TextField
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input first"
              label="Username"
              variant="outlined"
              type="text"
              fullWidth
              autoComplete="off"
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              autoComplete="off"
            />
            <Button onClick={handleLogin} className="btn" variant="contained" size="large">
              Login
            </Button>
            {isLoading && (
              <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            )}
          </StyledDialog>
        </DialogContent>
      </Dialog>
    </StyledLogin>
  );
};

export default Login;
