import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../redux/features/apiSlice";

const StyledRegister = styled("div")`
  .register-btn {
    border-radius: 0;
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
    border-radius: 0;
  }
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const [registerUser, response] = useRegisterUserMutation();
  const { data: registerResponse, isLoading, isSuccess } = response;

  const handleRegister = () => {
    const user = {
      name: username,
      email: email,
      password: password,
    };

    registerUser({ data: user });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
      handleClose();
    }
  }, [isSuccess]);

  return (
    <StyledRegister className="Register">
      <Button className="register-btn" variant="contained" onClick={handleClickOpen}>
        Register
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <StyledDialog>
            <Typography variant="h6">Register</Typography>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              label="Username"
              variant="outlined"
              type="text"
              fullWidth
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            />
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              inputProps={{
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
            />

            <Button onClick={handleRegister} className="btn" variant="contained" size="large">
              Register
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
    </StyledRegister>
  );
};

export default Register;
