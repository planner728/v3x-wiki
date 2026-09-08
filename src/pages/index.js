import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const GITHUB_REPO = 'planner728/v3x-wiki';

const NODES = [
  {id: 'n1', x: 80, y: 80},
  {id: 'n2', x: 220, y: 50},
  {id: 'n3', x: 380, y: 90},
  {id: 'n4', x: 520, y: 60},
  {id: 'n5', x: 120, y: 220},
  {id: 'n6', x: 300, y: 200},
  {id: 'n7', x: 460, y: 230},
  {id: 'n8', x: 200, y: 340},
  {id: 'n9', x: 400, y: 350},
];

const NODE_MAP = Object.fromEntries(NODES.map((n) => [n.id, n]));

const EDGES = [
  ['n1', 'n2'], ['n2', 'n3'], ['n3', 'n4'],
  ['n1', 'n5'], ['n2', 'n5'], ['n2', 'n6'],
  ['n3', 'n6'], ['n3', 'n7'], ['n4', 'n7'],
  ['n5', 'n6'], ['n6', 'n7'], ['n5', 'n8'],
  ['n6', 'n8'], ['n6', 'n9'], ['n7', 'n9'],
  ['n8', 'n9'],
];

function SwarmNetwork() {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAnimate(!mq.matches);
  }, []);

  return (
    <svg
      className={styles.network}
      viewBox="0 0 600 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {EDGES.map(([a, b]) => {
        const from = NODE_MAP[a];
        const to = NODE_MAP[b];
        return (
          <line
            key={`line-${a}-${b}`}
            className={styles.networkLine}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
          />
        );
      })}
      {NODES.map((n) => (
        <circle
          key={n.id}
          className={styles.networkNode}
          cx={n.x}
          cy={n.y}
          r={4}
        />
      ))}
      {animate &&
        EDGES.map(([a, b], i) => {
          const from = NODE_MAP[a];
          const to = NODE_MAP[b];
          const dur = 2 + (i % 4) * 0.6;
          const begin = (i * 0.35) % 3;
          return (
            <circle key={`packet-${a}-${b}`} className={styles.packet} r={2.5}>
              <animateMotion
                path={`M${from.x},${from.y} L${to.x},${to.y}`}
                dur={`${dur}s`}
                begin={`${begin}s`}
                repeatCount="indefinite"
              />
            </circle>
          );
        })}
    </svg>
  );
}

function useContributors(repo) {
  const [state, setState] = useState({status: 'loading', data: []});

  useEffect(() => {
    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}/contributors`)
      .then((res) => {
        if (!res.ok) throw new Error('request failed');
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setState({status: 'ready', data});
      })
      .catch(() => {
        if (!cancelled) setState({status: 'error', data: []});
      });
    return () => {
      cancelled = true;
    };
  }, [repo]);

  return state;
}

function useLockBodyScroll() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
}

export default function Home() {
  const {status, data: contributors} = useContributors(GITHUB_REPO);
  useLockBodyScroll();

  return (
    <Layout title="Wiki" description="Wiki V3X">
      <div className={styles.page}>
        <header className={styles.hero}>
          <SwarmNetwork />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>V3<h className="v3x-title">X</h></h1>
            <p className={styles.tagline}>
              Le wiki se construit pièce par pièce, contribution après
              contribution.
            </p>
            <Link className={styles.ctaButton} to="/docs/demarrer/bienvenue">
              Parcourir le wiki
              <span className={styles.ctaButtonArrow}>→</span>
            </Link>
          </div>
        </header>

        <section className={styles.contributors}>
          <h2 className={styles.contributorsTitle}>Contributeurs</h2>

          {status === 'loading' && (
            <p className={styles.contributorsMessage}>Chargement…</p>
          )}

          {status === 'error' && (
            <p className={styles.contributorsMessage}>
              Impossible de récupérer les contributeurs pour le moment.
            </p>
          )}

          {status === 'ready' && (
            <div className={styles.contributorsGrid}>
              {contributors.map((c) => (
              <a key={c.login} className={styles.contributorCard} href={c.html_url} target="_blank" rel="noreferrer">
                  <img
                    className={styles.contributorAvatar}
                    src={c.avatar_url}
                    alt=""
                  />
                  <div>
                    <div className={styles.contributorLogin}>{c.login}</div>
                    <div className={styles.contributorCount}>
                      {c.contributions} contribution
                      {c.contributions > 1 ? 's' : ''}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
}