"use client";
import { useRef, useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const speechRef = useRef(null);
  const ambientRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playBoth = () => {
    speechRef.current?.play();
    ambientRef.current?.play();
    setIsPlaying(true);
  };
  const stopBoth = () => {
    speechRef.current?.pause();
    ambientRef.current?.pause();
    speechRef.current.currentTime = 0;
    ambientRef.current.currentTime = 0;
    setIsPlaying(false);
  };

  return (
    <>
  <div className={`${styles.bg} ${isPlaying ? styles.active : ''}`} />
    <main className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1 className={styles.title}>Black Speech</h1>
      <button className={styles.button} onClick={playBoth} style={{ margin: '1rem' }}>Play</button>
      <button className={styles.button} onClick={stopBoth} style={{ margin: '1rem' }}>Stop</button>
      <div className={styles.pulse} />
      <audio ref={speechRef} src="/audio/speech.mp3" />
      <audio ref={ambientRef} src="/audio/ambient.wav" loop volume={0.3} />
      <button className={styles.button} disabled style={{ marginTop: '2rem' }}>Channel Surf (Coming Soon)</button>
    </main>
    </>
  );
}
