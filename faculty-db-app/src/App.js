import './App.css';
import Students from './components/Students/Students';
import Faculties from './components/Faculties/Faculties';
import Teachers from './components/Teachers/Teachers';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import ScrollToTop from './components/pageInit/ScrollToTop';

function App() {
  return (
    <div className="App">
        <Router>
        <Navbar/>
          <ScrollToTop />
            <Routes>
              <Route exact path="/" element={<Home />}/>
              <Route path="faculties" element={<Faculties />}/>
              <Route path="students/*" element={<Students />} />
              <Route path="teachers/*" element={<Teachers />} />
            </Routes>
        </Router>
    </div>
  );
}


export default App;
