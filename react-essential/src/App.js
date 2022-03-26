import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import {
  About,
  CompanyHistory,
  Contact,
  Events,
  Home,
  Location,
  Services,
  Whoops404,
} from './pages';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="services" element={<Services />} />
          <Route path="history" element={<CompanyHistory />} />
          <Route path="location" element={<Location />} />
        </Route>
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Whoops404 />} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
