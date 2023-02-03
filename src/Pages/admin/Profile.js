import { Logout } from "@mui/icons-material";
import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import makeStyle from "@mui/styles/makeStyles";
import { theme } from "../../components/admin/theme";

const useStyles = makeStyle((theme) => ({
    container: {},
    content: {},
    smCard: {
        padding: theme.spacing(2),
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    return (<div className={classes.container}>
            <Typography>
                Chart
            </Typography>
            <Card>
                <CardContent>
                    <Typography>EVENEMENTS</Typography>
                </CardContent>
            </Card>
            </div>
        );
};

export default Dashboard;
