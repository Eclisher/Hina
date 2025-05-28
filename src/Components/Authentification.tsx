import { useState } from 'react';
import styles from './Auth.module.css';

export default function Authentification() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className={styles.body_container}>
      <div className={`${styles.container} ${isSignUp ? styles.active : ''}`}>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form>
            <h1 className={styles.h1}>Sign In</h1>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form>
            <h1 className={styles.h1}>Create Account</h1>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
              <h1>Welcome to HINA</h1>
              <p className={styles.p}>Here to Sign in!</p>
              <button type="button" onClick={toggleForm}>
                Sign In
              </button>
            </div>
            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
              <h1>Welcome Back!</h1>
              <p className={styles.p}>This is a website for HEI - Tech</p>
              <button type="button" onClick={toggleForm}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
