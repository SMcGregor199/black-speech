"use client";
import { useRef, useState } from 'react';
import styles from './page.module.css';
import channels from './channels';

export default function Home() {
  const speechRef = useRef(null);
  const ambientRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChannelIndex, setCurrentChannelIndex] = useState(0);

  const currentChannel = channels[currentChannelIndex];

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

  const nextChannel = () => {
    stopBoth();
    setCurrentChannelIndex((prev) => (prev + 1) % channels.length);
  };

  const prevChannel = () => {
    stopBoth();
    setCurrentChannelIndex((prev) => (prev === 0 ? channels.length - 1 : prev - 1));
  };

  return (
    <>
      <div className={`${styles.bg} ${isPlaying ? styles.active : ''}`} style={{ backgroundImage: `url(${currentChannel.image})` }} />

      <main className={styles.container} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h1 className={styles.title}>Black Speech</h1>

        <div className={styles.channelControls}>
          <button className={styles.button} onClick={prevChannel}>◀︎</button>
          <span className={styles.channelTitle}>{currentChannel.title}</span>
          <button className={styles.button} onClick={nextChannel}>▶︎</button>
        </div>

        <button className={styles.button} onClick={playBoth} style={{ margin: '1rem' }}>Play</button>
        <button className={styles.button} onClick={stopBoth} style={{ margin: '1rem' }}>Stop</button>

        <div className={styles.pulse} />

        <audio ref={speechRef} src={currentChannel.speech} />
        <audio ref={ambientRef} src={currentChannel.ambient} loop volume={0.3} />
      </main>
    </>
  );
}
