import './styles/global.css';

import {Habito} from "./components/Habito";

function App() {
  
  return (
   <div>
    <Habito completed= {4}/>
    <Habito completed= {8}/>
    <Habito completed= {12}/>
   </div>
  )
}

export default App
