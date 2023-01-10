import { createTheme } from "@mui/material/styles";

const blogTheme = createTheme({
    palette: {
        background: {
            default: "#fcfcfc"
        },
        text :{
            primary: "#503629",
            
        },
        primary: {
            main: "#503629",
        },
        secondary: {
            main: "#ce9d4c"
        }
    },
    typography : {
        fontFamily: "Poppins",
    }
});

export default blogTheme;