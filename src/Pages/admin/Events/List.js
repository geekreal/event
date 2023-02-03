import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Paper,
  Table,
  Typography,
} from "@mui/material";
import makeStyle from "@mui/styles/makeStyles";
import { theme } from "../../../components/admin/theme";
import {
  Add,
  HdrPlus,
  ListAlt,
  ListAltOutlined,
  PlusOne,
  PlusOneOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const useStyles = makeStyle((theme) => ({
  container: {},
  content: {
    marginTop: theme.spacing(6),
  },
  smCard: {
    padding: theme.spacing(2),
  },
}));

const List = () => {
  const classes = useStyles();
  // function handleClick(event) {
  //   event.preventDefault();
  //   // console.info("You clicked a breadcrumb.");
  // }
  return (
    <div className={classes.content}>
      <div
        role="presentation"
        className={classes.breadcrumbs}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" to="/admin/home">
            Accueil
          </Link>
          <Link
            underline="hover"
            color="inherit"
            to="/admin/events/list"
            >
            Catégories
          </Link>

          <Link
            underline="hover"
            color="text.primary"
            to="/admin/events/list"
            aria-current="page"
          >
            Catégorie-évenement
          </Link>
        </Breadcrumbs>
      </div>
      <Grid
        container
        // direction="row"
        // justifyContent="space-between"
        // alignItems="flex-start"
      >
        <Grid item className={classes.smCard}>
          <Link to="/admin/category-event/create">
            <Button
              size="medium"
              className={classes.AddEvent}
              color="warning"
              variant="contained"
            >
              <Add />
              Créer
            </Button>
          </Link>

        </Grid>
        <Grid item className={classes.smCard}>
        <Link to="/admin/category-event/list">
          <Button
            size="medium"
            className={classes.AddEvent}
            color="info"
            variant="contained"
          >
            <ListAltOutlined />
            Catégories d'évènements liste
          </Button>
          </Link>
        </Grid>

        <Grid item className={classes.smCard}>
          <Link to="/admin/events/invites/list">
            <Button
              size="medium"
              className={classes.AddEvent}
              color="warning"
              variant="contained"
            >
              <Add />
              Gestion des invités
            </Button>
          </Link>
      </Grid>
      </Grid>

      <Container className={classes.TableTitle}>
        <Typography>Liste des évènements</Typography>
      </Container>
      <Paper elevation={8}>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Designation</th>
              <th>Date</th>
              <th>Client</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>..</td>
              <td>..</td>
              <td>..</td>
              <td>..</td>
              <td>..</td>
            </tr>
          </tbody>
        </Table>
      </Paper>
    </div>
  );
};

export default List;
