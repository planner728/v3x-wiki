import React from 'react';
import Link from '@docusaurus/Link';

export default function NotFoundContent() {
  return (
    <main
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <h1
        style={{
          fontFamily: 'var(--ifm-font-family-monospace)',
          fontSize: 'clamp(3rem, 8vw, 5rem)',
          fontWeight: 700,
          color: 'var(--v3x-accent-bg)',
          margin: 0,
        }}
      >
        404
      </h1>
      <p
        style={{
          fontSize: '1.1rem',
          color: 'var(--ifm-font-color-secondary, #8b8d93)',
          margin: '0.5rem 0 2rem',
        }}
      >
        Cette page n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--ifm-font-family-monospace)',
          fontWeight: 500,
          fontSize: '0.95rem',
          padding: '0.7rem 1.5rem',
          background: 'var(--v3x-accent-bg)',
          color: '#121316',
          borderRadius: '4px',
          textDecoration: 'none',
        }}
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}