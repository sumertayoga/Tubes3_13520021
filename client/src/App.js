import { useEffect, useState } from 'react';
import './App.css';
import Add from './feature/tambahDataPenyakit/Add'
import axios from 'axios';
import moment from 'moment';
import { FindPenyakitPage } from './FindPenyakitPage';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  const [riwayatList, setRiwayatList] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:3001/riwayat")
    .then((response) => {
      for(let i = 0; i < response.data.length; i++) {
        response.data[i].tanggal = moment.utc(response.data[i].tanggal).format('DD MMMM YYYY');
      }
      setRiwayatList(response.data);
    })
  }, [])
  
  const checkRegex = (dataItem, strInput) => {
    var pattern = strInput.split("").map((x)=>{
        return `(?=.*${x})`
    }).join("");
    var regex = new RegExp(`${pattern}`, "g")
    return dataItem.match(regex);
}

  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const searchItems = (searchValue) => {
    setSearchInput(searchValue)
    if (searchInput.length > 0) {
      const filteredData = riwayatList.filter((item) => {
        return checkRegex([Object.values(item)[1], Object.values(item)[3]].join(' ').toLowerCase(), searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
    } else {
      setFilteredResults(riwayatList)
    }
  }

  return (
    <div className="App">
      <div>
        <h1> Tugas Besar III IF2211 Strategi Algoritma </h1>
        <h2> Kelompok Nyari Penyakit </h2>
      </div>
      <Router>
        <Nav/>
        <Switch>
          <Route path='/add'  component={Add} />
          <Route path='/tesdna'  component={FindPenyakitPage} />
          <Route path='/riwayat'  component={
            <div>
              <h1>Pencarian Riwayat</h1>
              <input className='search' type="text" placeholder='Search...'
                  onKeyUp={(e) => searchItems(e.target.value)}
                  />
              {searchInput.length > 2 ? (
                filteredResults.map((item) => {
                  return (
                    <div className='riwayat'>
                      <div className='box' key={item.id}>
                        {/* no tanggal nama penyakit hasil */}
                        <p className='item_id'>{item.id_riwayat}</p>
                        <p className='item_tanggal'>{item.tanggal}</p>
                        <p className='item_pengguna'>{item.pengguna}</p>
                        <p className='item_penyakit'>{item.nama}</p>
                        <p className='item_hasil'>{item.hasil}</p>
                      </div>
                    </div>
                  )
                })
              ) : (
                  <p>Hasil pencarian akan terlihat di sini</p>
                )}
            </div>
            } />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;