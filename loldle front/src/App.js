import classes from './App.module.css';
import { Fragment } from 'react';
import { Route, Routes } from "react-router-dom";
import ClassicMode from './pages/classicMode/ClassicMode';
import MainPage from './pages/mainPage/MainPage';

function App() {

  return (
    <Fragment>
      <div className={classes.header}>
        <h1> LoLdle</h1>
      </div>
      <Routes>
        <Route exact path="/" element={<MainPage />} />
        <Route exact path="/classic" element={<ClassicMode />} />
      </Routes>
    </Fragment>

  );
}

export default App;
