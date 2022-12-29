import { Button, Dialog, DialogContent, DialogTitle, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledRegister = styled("div")`
  
`;

const StyledDialog = styled('div')`
  .input {
      margin-top: 30px;
  }

  .btn {
      margin-top: 30px;
      width: 100%;
  }
`;

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [open, setOpen] = useState(false);

  const handleRegister = () => {};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledRegister className="Register">
      <Button className="menu-link" variant="outlined" onClick={handleClickOpen}>Register</Button>
      <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <StyledDialog>
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
        </StyledDialog>
        </DialogContent>
      </Dialog>
    </StyledRegister>
  );
};

export default Register;
