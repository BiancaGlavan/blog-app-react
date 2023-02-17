import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const StyledNavigateBack = styled('div')`
    padding: 20px 0;
`;

export const NavigateBack = () => {
    const navigate = useNavigate();

  return (
    <StyledNavigateBack className="NavigateBack">
        <Button onClick={() => navigate(-1)} startIcon={<KeyboardBackspaceIcon />}>
            Back
        </Button>
    </StyledNavigateBack>
  )
}

export default NavigateBack;