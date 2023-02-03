import { Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles"
import React from "react";
import { theme } from "../../components/admin/theme";

const useStyles = makeStyles((theme) =>{

});

const ErrorPage = () => {
    const classes = useStyles();
    return (
        <div>
            <Typography variant="h1" component="strong">
                Erreur! Page Non Trouvée!
            </Typography>
        </div>
    )
}

export default ErrorPage;