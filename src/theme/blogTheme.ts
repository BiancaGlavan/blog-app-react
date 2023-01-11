import { createTheme } from "@mui/material/styles";

const blogTheme = createTheme({
    palette: {
        background: {
            default: "#fff",
            paper: "#FAE7D5"
        },
        text :{
            primary: "#000000",
            
        },
        primary: {
            main: "#BB5A3A",
        },
        secondary: {
            main: "#BB5A3A"
        }
    },
    typography : {
        fontFamily: "Poppins",
    }
});

export default blogTheme;