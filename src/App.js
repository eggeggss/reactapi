import logo from './logo.svg';
import './App.css';
import "./css/all.css";
//import "./css/fontawsome.css";
import { HashRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './component/layout';
import Page from './component/pages';
import { useAuth,AuthContext } from './context/AuthContext';
import { useState, useEffect } from 'react';
import { useApp ,AppContext} from './context/AppContext';

function App() {
  const { Main, Login, Signup }=Page;
  const [token, setToken] = useState(null);
  const [isloading,setisLoading]=useState(null);
  const [snackmessage,setSnackmessage]=useState("");
  
  let nickname=localStorage.getItem('nickname');
 
  let authobj={
     token:token,
     setToken:setToken,
  }
  let appobj={
    isloading: isloading,
    setisLoading: setisLoading,
    snackmessage: snackmessage,
    setSnackmessage: setSnackmessage,
    username: nickname,
  }

  
  return (
    <>
      <AppContext.Provider value={appobj}>
        <div id="snackbar" className={(snackmessage==="")? "":"show"}>{snackmessage}</div>
        <div className={` ${isloading ? 'processing' : ''}`} >
            <AuthContext.Provider value={authobj}>
              <Routes>
                <Route path="/" element={<PrivateRoute />}>
                    <Route path="/" element={<Main />} />
                  </Route>
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<Signup />} />
              </Routes>
            </AuthContext.Provider>
        </div>
      </AppContext.Provider>
    </>
  );
}

export default App;
