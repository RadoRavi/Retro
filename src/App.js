import logo from './logo.svg';
import './App.css';
import { Join } from './components/Join';
import {Router,Routes,Route} from "react-dom"

const App=()=>{
  return (
    <div className="App">
      <header className="App-header">
        <Join></Join>
      </header>

    </div>
  );
}

export default App;
