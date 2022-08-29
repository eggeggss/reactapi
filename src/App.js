import logo from './logo.svg';
import './App.css';
import "./css/all.css";
//import "./css/fontawsome.css";
import { HashRouter, Route, Routes } from 'react-router-dom';
import Layout from './component/layout';
import Page from './component/pages';

function App() {
  const { Main, Login, Signup }=Page;
  return (
    <>
      <Routes>
          <Route path="/" element={<Layout />}>
             <Route path="/" element={<Main />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
