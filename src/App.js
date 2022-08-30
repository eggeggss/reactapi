import logo from './logo.svg';
import './App.css';
import "./css/all.css";
//import "./css/fontawsome.css";
import { HashRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './component/layout';
import Page from './component/pages';
import { useAuth,AuthContext } from './context/AuthContext';
import { useState } from 'react';
import { useApp ,AppContext} from './context/AppContext';

function App() {
  const { Main, Login, Signup }=Page;
  const [token, setToken] = useState(null);
  const [isloading,setisLoading]=useState(null);
  
  let authobj={
     token:token,
     setToken:setToken,
  }

  return (
    <>
      <AppContext.Provider value={{isloading, setisLoading}}>
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
