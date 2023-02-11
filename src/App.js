import logo from './logo.svg';
import './App.css';

import AppRoutes from './routes/AppRoutes';
import Appnav from './components/Appnav';
import axios from 'axios';
import { useState } from 'react';

function App() {

  const[user,setUser] = useState(JSON.parse(localStorage.getItem('user')));

  axios.defaults.headers.common['Authorization'] = "Bearer" + (user ? user.jwt_token : "");


  return (
    <div className="App">
      <Appnav user={user} setUser ={setUser} />
      <AppRoutes user={user} setUser={setUser}/>
     
    </div>
  );
}

export default App;
