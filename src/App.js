import Docs from'./component/docs'
import './App.css';
import{app, database} from './firebaseConfig'
import EditDocs from './component/EditDocs';
import {Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Routes >
      <Route path="/" element={<Docs database={database} />} />
      <Route path="/EditDocs/:id" element={<EditDocs database={database}/>} />
    </Routes>
  );
}

export default App;
