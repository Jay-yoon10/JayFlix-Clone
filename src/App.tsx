import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Routes/Home';
import Tv from './Routes/Tv';
import Search from './Routes/Search';
import Header from './Components/Header';
function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home/:type/:Id' element={<Home />} />
        <Route path='/tv' element={<Tv />} />
        <Route path='/tvHome/:type/:Id' element={<Tv />} />
        <Route path='/search' element={<Search />} />
        <Route path='/searchHome/:type/:Id' element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
