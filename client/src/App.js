import { useState } from 'react';
import Axios from "axios";
import './App.css';
import Add from './feature/Add'

function App() {
  const [search, setSearch] = useState('');
  const displaySearch = () => {
    console.log(search);
  }

  const [riwayatList, setRiwayatList] = useState([]);
  const getRiwayat = () => {
    Axios.get("http://localhost:3001/riwayat").then((response) => {
      console.log(response.data);
    });
  };


  return (
    <div className="App">
      <header>
        <Add />
      </header>
      {/* <h1>Pencarian Riwayat</h1>
      <input type="text"  
      onChange={(event) => {
        setSearch(event.target.value);
      }}/>
      <button onClick={getRiwayat} >cari</button> */}
    </div>
  );
}

export default App;