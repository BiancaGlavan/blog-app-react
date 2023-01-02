import { Box, Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/features/apiSlice";
import { login } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const StyledLogin = styled("div")``;

const StyledDialog = styled("div")`
  .input {
    margin-top: 30px;
  }

  .btn {
    margin-top: 30px;
    width: 100%;
  }

  .menu-link {
    &:hover {
      color: ${(props) => props.theme.palette.secondary.main};
    }
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
    console.log("login: ", loginResponse);

    if (isSuccess) {
      dispatch(login(loginResponse.access_token));
      navigate("/");
    }
  }, [isSuccess, loginResponse]);

  useEffect(() => {
    if (authState.isAuth) {
      navigate("/");
    }
  }, [authState]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledLogin className="Login">
      <Button className="menu-link" onClick={handleClickOpen}>
        Login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <StyledDialog className="form-login">
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
          </StyledDialog>
        </DialogContent>
      </Dialog>
    </StyledLogin>
  );
};

export default Login;
