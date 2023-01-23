import { Container, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledAdminNav = styled("div")`
  padding: 20px;
`;

const AdminNav = () => {
  return (
    <StyledAdminNav>
      <Container>
        <Typography variant="h6">Keep The Pot Boiling</Typography>
        
      </Container>
    </StyledAdminNav>
  );
};

export default AdminNav;
