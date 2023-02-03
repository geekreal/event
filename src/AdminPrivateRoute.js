import axios from 'axios';
import React, { useEffect , useState} from 'react'
import {Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import MasterHome from './components/admin/MasterHome';
var auth_name;
function AdminPrivateRoute ({...rest}) {
    // console.log(localStorage.getItem('auth_token'));

    const [Authenticated, setAuthenticated] = useState(false);

    useEffect(() =>{
      // effect
      axios.get(`/api/checkingAuthenticated`).then(res => {
        if (res.status === 200) {
         setAuthenticated(true) 
        }else{
          swal("Désolé !", res.message, "warning");
        }
      })
      return() => {
        setAuthenticated(false)
      }
    }, [])

  return (
    <Route {...rest}
     render = {({props, location }) => 
         localStorage.getItem('auth_token') ? 
        (<MasterHome {...props} />) : 
        (<Redirect to={{pathname: '/admin-login/' , state : {from: location}}}/>)
    }
    />
  )
}

export default AdminPrivateRoute