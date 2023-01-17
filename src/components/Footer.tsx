import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledFooter = styled("div")`
  background-color: #463f3a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  padding: 50px 50px;
  margin-top: 80px;

  .btn {
    width: 250px;
    border-radius: 0;
  }

  .footer-title {
    font-weight: 600;
    color: ${(props) => props.theme.palette.background.default};
  }

`;

const Footer = () => {
  return (
    <StyledFooter>
      <Typography className="footer-title" variant="h5">Let the posts come to you.</Typography>
      <TextField className="text-field" type="email" label="Email" variant="standard" autoComplete="off"/>
      <Button className="btn" variant="contained" size="large">Subscribe</Button>
    </StyledFooter>
  );
};

export default Footer;

