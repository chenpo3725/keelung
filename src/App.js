import './App.css';
import { Routes, Route } from "react-router-dom";
import About from "./routes/About";
import Careers from "./routes/Careers";
import Home from "./routes/Home";
import Navbar from './Navbar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React GitHub Pages Example</h1>
        <p>A demonstration of deploying React apps to GitHub Pages</p>
        <Navbar />
        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;