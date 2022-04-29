import './App.css';
import { Riwayat } from './feature/riwayat/Riwayat';
import Add from './feature/tambahDataPenyakit/Add'
import { FindPenyakitPage } from './FindPenyakitPage';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

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
          <Route path='/cari-riwayat' component={Riwayat}/>
        </Switch>
      </Router>
      
      
    </div>
  );
}

export default App;