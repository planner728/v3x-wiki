import React, {useEffect, useState} from 'react';

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight =
        (document.documentElement.scrollHeight || document.body.scrollHeight) -
        document.documentElement.clientHeight;
      const value = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(value);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, {passive: true});
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: `${progress}%`,
        background: 'var(--v3x-accent-bg)',
        zIndex: 2000,
        transition: 'width 0.1s ease-out',
      }}
    />
  );
}

export default function Root({children}) {
  return (
    <>
      <ScrollProgressBar />
      {children}
    </>
  );
}