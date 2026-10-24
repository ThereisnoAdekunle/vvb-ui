import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <header className="nav">
        <Link to="/" className="logo">
          VVB<span>hood</span>
        </Link>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/game">Game</Link>
          <Link to="/boxes">Mystery Boxes</Link>
          <Link to="/missions">Missions</Link>
        </nav>
        <button className="connect-btn">Connect Wallet</button>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/boxes" element={<Boxes />} />
        <Route path="/missions" element={<Missions />} />
      </Routes>
    </BrowserRouter>
  );
}

function Boxes() {
  return (
    <div className="page">
      <h2>Mystery Boxes</h2>
      <p>Open boxes to earn $VVB, ETH, and rare NFTs. Tiers: Common → Legendary.</p>
      <div className="box-grid">
        {["Common", "Uncommon", "Rare", "Legendary"].map((t) => (
          <div key={t} className="box-card">
            <div className={`box-visual ${t.toLowerCase()}`} />
            <h3>{t}</h3>
            <button className="btn btn-primary">Open Box</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Missions() {
  const missions = [
    { title: "First Kill", progress: 1, target: 1, type: "kills" },
    { title: "Wave Survivor", progress: 3, target: 5, type: "wave" },
    { title: "Box Hunter", progress: 2, target: 10, type: "boxes" },
  ];
  return (
    <div className="page">
      <h2>Missions</h2>
      {missions.map((m) => (
        <div key={m.title} className="mission-card">
          <div>
            <strong>{m.title}</strong>
            <div className="progress">
              <div style={{ width: `${(m.progress / m.target) * 100}%` }} />
            </div>
            <small>
              {m.progress} / {m.target}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
}
