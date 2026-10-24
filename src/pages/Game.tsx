import Button from "../components/Button";
import "./Home.css";

export default function Game() {
  return (
    <main className="home-wrap" style={{ paddingTop: "2rem" }}>
      <div className="page" style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "3rem" }}>VVB Game Arena</h1>
        <p style={{ fontSize: "1.2rem", color: "#94a3b8", maxWidth: 600, margin: "0 auto 2rem" }}>
          Play the endless runner, collect boxes, complete missions, and earn VVBR NFTs.
        </p>
        <div style={{ margin: "2rem 0" }}>
          <img
            src="/characters/viber1.jpg"
            alt="Game preview"
            style={{ width: 280, borderRadius: 20, boxShadow: "0 20px 60px rgba(0,240,255,0.3)" }}
          />
        </div>
        <Button variant="primary" size="lg">
          Start Run 🎮
        </Button>
        <div style={{ marginTop: "3rem", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <div className="stat-card" style={{ minWidth: 160 }}>
            <div className="k">High Score</div>
            <div className="v">12,480</div>
          </div>
          <div className="stat-card" style={{ minWidth: 160 }}>
            <div className="k">Boxes Opened</div>
            <div className="v">37</div>
          </div>
          <div className="stat-card" style={{ minWidth: 160 }}>
            <div className="k">VVBR Earned</div>
            <div className="v">2</div>
          </div>
        </div>
      </div>
    </main>
  );
}
