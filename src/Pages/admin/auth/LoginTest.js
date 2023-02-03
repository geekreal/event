import React, { useEffect } from 'react';
import axios from 'axios';
function LoginTest() {
  useEffect(() => {
    axios.defaults.baseURL = 'localhost/ivinx-global/api/public/api';
    axios.post('/admin/login', {
      email: "admin@gmail.com",
      password: "sixtus2019"
    })
    .then(({ data }) => {
      if(data.status==="success"){
        console.log(data)
      } else {
        console.log("error")
      }
    });
  });
  return (
    <div className="Login">Auto Login</div>
  );
}
export default LoginTest;