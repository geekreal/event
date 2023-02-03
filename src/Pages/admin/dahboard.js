import { Logout } from "@mui/icons-material";
import { Button, Card, CardContent, Container, Grid, Typography } from "@mui/material";
import makeStyle from "@mui/styles/makeStyles";
import { theme } from "../../components/admin/theme";

const useStyles = makeStyle((theme) => ({
    container: {},
    content: {
        marginTop: theme.spacing(6),
    },
    smCard: {
        padding: theme.spacing(2),
    }
}));

const Dashboard = () => {
    const classes = useStyles();
    return (
    <div>
        {/* <div className={classes.header}>
            <Button variant="contained" color="error">
                <Logout />
                <Typography>Se deconecter</Typography>
            </Button>
        </div> */}
        <Grid
            container
            // direction="row"
            // justifyContent="space-between"
            // alignItems="flex-start"
            className={classes.content}>
            <Grid item className={classes.smCard} sm={6} xs={6}>
                <Card >
                    <CardContent>
                        <Typography>EVENEMENTS jdkejkj</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item className={classes.smCard}sm={6} xs={6}>
                <Card>
                    <CardContent>
                        <Typography>EVENEMENTS</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item className={classes.smCard} sm={6} xs={6}>
                <Card>
                    <CardContent>
                        <Typography>EVENEMENTS</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item className={classes.smCard} sm={6} xs={6}>
                <Card>
                    <CardContent>
                        <Typography>EVENEMENTS</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        <>
            <Typography>
                Chart
            </Typography>
            <Card>
                <CardContent>
                    <Typography>EVENEMENTS</Typography>
                </CardContent>
            </Card>
        </>
    </div>);
};

export default Dashboard;
