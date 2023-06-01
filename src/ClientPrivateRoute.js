import axios from 'axios';
import React, { useEffect , useState} from 'react'
import {Route, Redirect} from 'react-router-dom';
import swal from 'sweetalert';
import MasterHome from './components/admin/MasterHome';
import UserHome from './Pages/client/home/Home';
var auth_name;
function ClientPrivateRoute ({...rest}) {
    // console.log(localStorage.getItem('auth_token'));

    const [Authenticated, setAuthenticated] = useState(false);

    useEffect(() =>{
      // effect
      // axios.get(`/api/checkingAuthenticated`).then(res => {
      //   if (res.status === 200) {
      //    setAuthenticated(true) 
      //   }else{
      //     swal("Désolé !", res.message, "warning");
      //   }
      // })
      // return() => {
        setAuthenticated(true)
      // }
    }, [])

  return (
    <Route {...rest}
     render = {({props, location }) => 
         localStorage.getItem('redis_user_auth_token') ? 
        (<UserHome {...props} />) : 
        (<Redirect to={{pathname: '/event/user/login' , state : {from: location}}}/>)
    }
    />
  )
}

export default ClientPrivateRoute