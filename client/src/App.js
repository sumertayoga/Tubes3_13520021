import './App.css';
import Add from './feature/Add'
import { Riwayat } from './feature/riwayat/Riwayat';
import { FindPenyakitPage } from './FindPenyakitPage';
import Nav from './Nav';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {

  return (
    <div className="App">
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