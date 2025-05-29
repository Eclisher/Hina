import { useState } from 'react';
import googleLogo from '../../assets/google.png';
import styles from './Auth.module.css';

export default function Authentification() {
  const [isSignUp, setIsSignUp] = useState(false);
  const toggleForm = () => setIsSignUp(!isSignUp);

  const GoogleButton = ({ text, href }: { text: string; href: string }) => (
    <a
      href={href}
      className="google-btn flex items-center justify-center gap-2  text-sm text-gray-700 font-medium px-4 py-2 mt-4 rounded shadow-sm hover:shadow transition bg-transparent"
    >
      <img src={googleLogo} alt="Google logo" style={{ height: '30px', width: 'auto' }} />
      {text}
    </a>
  );
  return (
    <div className={styles.body_container}>
      <div className={`${styles.container} ${isSignUp ? styles.active : ''}`}>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form className="flex flex-col items-center justify-center px-10 h-full bg-white">
            <h1 className="text-[5vh] font-bold">Sign In</h1>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <button
              type="submit"
              className="bg-[#000ed1] text-white text-xs font-semibold uppercase tracking-wider py-2 px-12 rounded mt-2"
            >
              Sign In
            </button>
            <GoogleButton text="Sign in with Google" />
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form className="flex flex-col items-center justify-center px-10 h-full bg-white">
            <h1 className="text-[5vh] font-bold">Create Account</h1>
            <input
              type="email"
              placeholder="Email"
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <button
              type="submit"
              className="bg-[#000ed1] text-white text-xs font-semibold uppercase tracking-wider py-2 px-12 rounded mt-2"
            >
              Sign Up
            </button>
            <GoogleButton text="Sign up with Google" />
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
              <h1 className="text-[5vh] font-bold">Welcome to HINA</h1>
              <p className="text-white font-[Poppins]">Here to Sign in!</p>
              <button
                type="button"
                onClick={toggleForm}
                className="bg-[#000ed1] text-white text-xs font-semibold uppercase tracking-wider py-2 px-12 rounded mt-2"
              >
                Sign In
              </button>
            </div>
            <div className={`${styles['toggle-panel']} ${styles['toggle-right']}`}>
              <h1 className="text-[5vh] font-bold">Welcome Back!</h1>
              <p className="text-white font-[Poppins]">This is a website for HEI - Tech</p>
              <button
                type="button"
                onClick={toggleForm}
                className="bg-[#000ed1] text-white text-xs font-semibold uppercase tracking-wider py-2 px-12 rounded mt-2"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
