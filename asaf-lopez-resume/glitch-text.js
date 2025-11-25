import React from 'react';
import styles from './glitch-text.module.css';

const GlitchText = ({ text }) => {
  return (
    <div className={styles.glitch} data-text={text}>
      {text}
    </div>
  );
};

export default GlitchText;