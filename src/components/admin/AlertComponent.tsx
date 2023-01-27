import { Alert, Box, Collapse, IconButton, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

interface IPropsAlertComponent {
  alertTitle: string;
}

const AlertComponent = ({alertTitle}: IPropsAlertComponent) => {
    const [alertOpen, setAlertOpen] = useState(true);
    
  return (
    <div>
          <Box sx={{ width: "100%", marginTop: "20px" }}>
          <Collapse in={alertOpen}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              {alertTitle}
            </Alert>
          </Collapse>
        </Box>
    </div>
  )
}

export default AlertComponent;