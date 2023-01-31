import { createTheme } from "@mui/material/styles";

const blogTheme = createTheme({
    palette: {
        background: {
            default: "#fff",
            paper: "#fff"
        },
        text :{
            primary: "#000000",
            
        },
        primary: {
            main: "#BB5A3A",
        },
        secondary: {
            main: "#58524d"
        }
    },
    typography : {
        fontFamily: "Poppins",
    }
});

//#a9927d

export default blogTheme;