import { createTheme } from "@mui/material/styles";

const blogTheme = createTheme({
    palette: {
        background: {
            default: "#f3f0ec"
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
        fontFamily: "Petrona",
    }
});

export default blogTheme;