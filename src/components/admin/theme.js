import { createTheme } from "@mui/material";
import { blue, color, green } from "@mui/material/colors";

export const theme = createTheme({
    typography: {
        
        },
    palette:{
        primary : {
            main : blue[500],
        }
    },//en palette
    saveBtn :{
        backGroundColor : "green",
        color : "white",
        brderRadius: 50
    },
    cancelBtn :{
        backGroundColor : "red",
        color : "white",
        brderRadius: 50
    },
    editBtn :{
        backGroundColor : "blue",
        color : "white",
        brderRadius: 50
    },
});