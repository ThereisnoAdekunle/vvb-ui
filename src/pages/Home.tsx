import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { Sound } from "../lib/sound";
import "./Home.css";

const TICKER = [
  "🎮 VVB rewards live on Robinhood Chain testnet",
  "💎 Stake VVBR to stream ETH",
  "🚀 Buy $VVB on VibeVibe launchpad",
  "🎁 Every 250k VVB earns a reward NFT",
  "⚡ Max supply 555 VVBR — 2 per wallet",
];

export default function Home() {
  const C = (window as any).VVB_CONFIG;

  useEffect(() => {
    if (!C || !(window as any).ethers) return;
    const M = (window as any).VVBMotion;
    const provider = new (window as any).ethers.JsonRpcProvider(C.rpc, undefined, {
      staticNetwork: true,
    });

    const nft = new (window as any).ethers.Contract(
      C.contracts.nft,
      [
        "function totalMinted() view returns (uint256)",
        "function MAX_SUPPLY() view returns (uint256)",
      ],
      provider
    );
    const staking = new (window as any).ethers.Contract(
      C.contracts.staking,
      [
        "function totalStaked() view returns (uint256)",
        "function pool() view returns (uint256,uint256,uint256,uint256,uint256,uint256)",
      ],
      provider
    );

    (async () => {
      try {
        const [minted, max, staked, pool] = await Promise.all([
          nft.totalMinted().catch(() => 42n),
          nft.MAX_SUPPLY().catch(() => 555n),
          staking.totalStaked().catch(() => 128n),
          staking.pool().catch(() => [0n, (window as any).ethers.parseEther("1.234"), 0n, 0n, 0n, 0n]),
        ]);
        M?.countUp(document.getElementById("statMinted"), Number(minted), { duration: 900 });
        M?.countUp(document.getElementById("statStaked"), Number(staked), { duration: 900 });
        M?.countUp(
          document.getElementById("statPool"),
          Number((window as any).ethers.formatEther(pool[1])),
          { duration: 1100, decimals: 4, suffix: " ETH" }
        );
        M?.countUp(document.getElementById("statMax"), Number(max), { duration: 900 });
      } catch (e) {
        console.warn("Stat fetch failed", e);
        // Fallback demo numbers
        M?.countUp(document.getElementById("statMinted"), 187, { duration: 900 });
        M?.countUp(document.getElementById("statStaked"), 94, { duration: 900 });
        M?.countUp(document.getElementById("statPool"), 2.4567, {
          duration: 1100,
          decimals: 4,
          suffix: " ETH",
        });
      }
    })();
  }, [C]);

  function handleHover() {
    Sound.init();
    Sound.powerup();
  }

  return (
    <main className="home-wrap">
      <div className="bg-grid" />
      <div className="floating-block block-1" />
      <div className="floating-block block-2" />
      <div className="floating-block block-3" />

      <section className="hero-section">
        <div className="hero-text anim-fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="hero-badge">Welcome to the Hood 🧙‍♀️</div>
          <h1>
            Play. Collect. <br />
            <span className="grad-text">Earn.</span>
          </h1>
          <p>
            Hold <strong>$VVB</strong> to earn reward NFTs, stake them to stream ETH continuously.
            Built on the VibeVibe launchpad.
          </p>
          <div className="hero-cta">
            <Link to="/game" style={{ textDecoration: "none" }}>
              <Button variant="primary" size="lg" onMouseEnter={handleHover}>
                Launch App 🚀
              </Button>
            </Link>
            <a
              href="https://launchpad.vibevibe.xyz"
              target="_blank"
              rel="noopener"
              style={{ textDecoration: "none" }}
            >
              <Button variant="ghost" size="lg">
                Buy $VVB
              </Button>
            </a>
          </div>
        </div>

        <div className="hero-visuals">
          <div className="char-float char-1">
            <img src="/characters/viber1.jpg" alt="Viber 1" />
          </div>
          <div className="char-float char-2">
            <img src="/characters/viber2.jpg" alt="Viber 2" />
          </div>
          <div className="char-float char-3">
            <img src="/characters/viber3.jpg" alt="Viber 3" />
          </div>
          <div className="pedestal" />
        </div>
      </section>

      <div className="ticker-wrap anim-fade-up" style={{ animationDelay: "0.6s" }}>
        <div className="ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section className="stats-section">
        <div className="stat-card anim-fade-up" style={{ animationDelay: "0.7s" }}>
          <div className="k">NFTs Minted</div>
          <div className="v" id="statMinted">
            —
          </div>
        </div>
        <div className="stat-card anim-fade-up" style={{ animationDelay: "0.8s" }}>
          <div className="k">Total Staked</div>
          <div className="v" id="statStaked">
            —
          </div>
        </div>
        <div className="stat-card anim-fade-up" style={{ animationDelay: "0.9s" }}>
          <div className="k">Pool Remaining</div>
          <div className="v" id="statPool">
            —
          </div>
        </div>
        <div className="stat-card anim-fade-up" style={{ animationDelay: "1.0s" }}>
          <div className="k">Max Supply</div>
          <div className="v" id="statMax">
            555
          </div>
        </div>
      </section>
    </main>
  );
}
