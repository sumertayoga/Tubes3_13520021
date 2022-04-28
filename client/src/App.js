import { useEffect, useState } from 'react';
import Axios from "axios";
import './App.css';
import Add from './feature/Add'
import axios from 'axios';
import moment from 'moment';

function App() {
  
  const [riwayatList, setRiwayatList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/riwayat")
    .then((response) => {
      setRiwayatList(response.data);
    })
  }, [])
  
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput.length > 0) {
      const filteredData = riwayatList.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(riwayatList)
    }
  }


  return (
    <div className="App">
      <header>
        <Add />
      </header>
      <h1>Pencarian Riwayat</h1>
      <input type="text" placeholder='Search...'
          onChange={(e) => searchItems(e.target.value)}
          />
      {searchInput.length > 2 ? (
        filteredResults.map((item) => {
          return (
            <div className='riwayat'>
              <div className='box' key={item.id}>
                {/* no tanggal nama penyakit hasil */}
                <p className='item'>{item.id_riwayat}</p>
                <p className='item'>{moment.utc(item.tanggal).format('DD/MM/YY')}</p>
                <p className='item'>{item.pengguna}</p>
                <p className='item'>{item.nama}</p>
                <p className='item'>{item.hasil}</p>
              </div>
            </div>
          )
        })
      ) : (
          <p>Hasil akan di sini</p>
        )}
      
    </div>
  );
}

export default App;