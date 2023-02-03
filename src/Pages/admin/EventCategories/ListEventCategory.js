import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import makeStyle from "@mui/styles/makeStyles";
import { Link } from 'react-router-dom';
import { Button, Stack } from '@mui/material';
import { Delete, DeleteOutline, Edit, RemoveRedEyeSharp, Send } from '@mui/icons-material';

const renderDeleteButton = (cellValues) => {
  return (
    <Stack direction="row" spacing={2}>
    <Button
      variant="contained"
      color="error"
      onClick={(event) => {
        handleDelete(event, cellValues);
      }}
    >
     <Delete/> Supprimer
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={(event) => {
        handleEdit(event, cellValues);
      }}
    >
     <Edit/> Editer
    </Button>
    </Stack>
  );
}

const handleDelete = (event, cellValues) => {
  console.log(cellValues.row.id);
};

const handleEdit = (event, cellValues) => {
  console.log(cellValues.row.id);
};

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'designation', headerName: 'DESIGNATION', width: 170 },
  { field: 'dateCreation', headerName: 'DATE CREATION', width: 300 },
  { field: 'operation', headerName: 'OPERATION', width: 300,
  renderCell: (cellValues) => {return renderDeleteButton(cellValues)}
},
];

  const useStyles = makeStyle((theme) => ({
    container: {},
    content: {
      marginTop: theme.spacing(6),
    },
    smCard: {
      padding: theme.spacing(2),
    },
  }));


const ListEventCategory = () => {

  // const [tableData, setTableData] = useState([])
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get('api/admin/type_event/list').then(res=> {
      console.log(res.data.categories);
        if (res.status === 200) {
            setCategoryList(res.data.categories)
        }
        setLoading(false);
    });
  }, [])

  var rows = [];

  if(loading){
    return <h4 className={classes.content}>Chargement des catégories d'evènement..</h4>;
  }else{
    // rows = [{id: "item.id" , designation: "item.libelle", dateCreation: "item.created_at" , operation: "item.id"}]
    rows = 
      categoryList.map((item) =>{
      return {id: item.id , designation: item.libelle, dateCreation: item.created_at}
  });
}


  return (
    <div className={classes.content}>
        <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row.id}
          rowsPerPageOptions={[10]}
          checkboxSelection
          components={{ Toolbar: GridToolbar }}
        />
      </div>
    </div>
  )
}

export default ListEventCategory