import './App.css';
import { useState } from "react";
import HamMenu from './Components/HamMenu';
import Dashboard from './Components/Page/Dashboard';
import AddInfo from './Components/Page/AddInfo';
import EditInfo from './Components/Page/EditInfo';
import Gen from './Components/Page/Gen';


function App() {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  }
  return (
    <div className="App">
      <div className="Head">
        <img src={require('./Components/logo.jpeg')} />
        <span className="heading1">TGenerator</span>
      </div>
      <div className="Main">
        <HamMenu toggleState={toggleState} toggleTab={toggleTab} />
        <div className={toggleState === 1 ? "active-cnt" : "not-cnt"}><Dashboard /></div>
        <div className={toggleState === 2 ? "active-cnt" : "not-cnt"}><AddInfo /></div>
        <div className={toggleState === 3 ? "active-cnt" : "not-cnt"}><EditInfo /></div>
        <div className={toggleState === 4 ? "active-cnt" : "not-cnt"}><Gen /></div>
      </div>
    </div>
  );
}

export default App;
