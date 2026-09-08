import React, {useEffect, useState} from 'react';
import styles from './styles.module.css';

function useGitHubAvatar(login) {
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (!login) return;
    let cancelled = false;
    fetch(`https://api.github.com/users/${login}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!cancelled && data && data.avatar_url) setAvatar(data.avatar_url);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [login]);

  return avatar;
}

export default function LastUpdated({lastUpdatedAt, lastUpdatedBy}) {
  const avatar = useGitHubAvatar(lastUpdatedBy);

  if (!lastUpdatedAt && !lastUpdatedBy) {
    return null;
  }

  const dateStr = lastUpdatedAt
      ? new Date(lastUpdatedAt).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const content = (
    <>
      {avatar && <img src={avatar} alt="" className={styles.avatar} />}
      <div>
        <div className={styles.label}>Dernière mise à jour</div>
        <div className={styles.meta}>
          {dateStr && <span className={styles.date}>{dateStr}</span>}
          {lastUpdatedBy && (
            <>
              {' '}
              par <span className={styles.login}>{lastUpdatedBy}</span>
            </>
          )}
        </div>
      </div>
    </>
  );

  if (lastUpdatedBy) {
    return (
      <a className={styles.card} href={`https://github.com/${lastUpdatedBy}`} target="_blank" rel="noreferrer">{content}</a>
    );
  }

  return <div className={styles.card}>{content}</div>;
}