import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFooter = styled("div")`
  background-color: ${(props) => props.theme.palette.secondary.main};

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    padding: 50px 50px;
    margin-top: 80px;
  }

  .btn {
    width: 250px;
    border-radius: 0;
  }

  .footer-title {
    font-weight: 600;
    color: ${(props) => props.theme.palette.background.default};
  }

  .text-field {
    .css-1j9ldlq-MuiInputBase-root-MuiInput-root:before {
      border-bottom: 1.5px solid #fff;
    }

    .css-164rakx-MuiFormLabel-root-MuiInputLabel-root {
      color: #fff;
    }
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <Box className="footer-content">
        <Typography className="footer-title" variant="h5">
          Let the posts come to you.
        </Typography>
        <TextField
          className="text-field"
          sx={{ input: { color: "#fff" } }}
          type="email"
          label="Email"
          variant="standard"
          autoComplete="off"
        />
        <Button className="btn" variant="contained" size="large">
          Subscribe
        </Button>
      </Box>
    </StyledFooter>
  );
};

export default Footer;
