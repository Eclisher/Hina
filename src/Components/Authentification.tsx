import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import googleLogo from '../../assets/google.png';
import { auth } from '../firebase/firebase';
import styles from './Auth.module.css';

export default function Authentification() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [messageSignIn, setMessageSignIn] = useState('');
  const [messageSignUp, setMessageSignUp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setMessageSignIn('');
    setMessageSignUp('');
  };

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessageSignIn('');
    if (!email || !password) {
      setMessageSignIn('Please fill in all fields.');
      return;
    }
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setMessageSignIn('Successfully signed in!');
      setEmail('');
      setPassword('');
      navigate('/hello');
    } catch (error: any) {
      console.error(error);
      setMessageSignIn('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessageSignUp('');
    if (!email || !password) {
      setMessageSignUp('Please fill in all fields.');
      return;
    }
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setMessageSignUp('Account created successfully!');
      setEmail('');
      setPassword('');
    } catch (error: any) {
      console.error(error);
      setMessageSignUp('Account creation failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setMessageSignIn('Connexion avec Google réussie !');
      navigate('/hello');
    } catch (error: any) {
      console.error('Erreur de connexion avec Google :', error.message);
      setMessageSignIn('Google sign-in error: ' + error.message);
    }
  };

  const GoogleButton = ({ text }: { text: string }) => (
    <a
      type="button"
      onClick={handleGoogleSignIn}
      className="google-btn flex items-center justify-center gap-2 text-sm text-gray-700 font-medium px-4 py-2 mt-4 rounded shadow-sm hover:shadow transition bg-transparent"
    >
      <img src={googleLogo} alt="Google logo" style={{ height: '30px', width: 'auto' }} />
      {text}
    </a>
  );

  return (
    <div className={styles.body_container}>
      <div className={`${styles.container} ${isSignUp ? styles.active : ''}`}>
        <div className={`${styles['form-container']} ${styles['sign-in']}`}>
          <form onSubmit={handleSignIn} className="flex flex-col items-center justify-center px-10 h-full bg-white">
            <h1 className="text-[5vh] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Sign In
            </h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#000ed1] text-white text-xs font-semibold uppercase tracking-wider py-2 px-12 rounded mt-2"
            >
              {loading ? 'Connexion...' : 'Sign In'}
            </button>
            {messageSignIn && (
              <p
                className={`text-xs mt-2 ${
                  messageSignIn.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {messageSignIn}
              </p>
            )}
            <GoogleButton text="Sign in with Google" />
          </form>
        </div>
        <div className={`${styles['form-container']} ${styles['sign-up']}`}>
          <form onSubmit={handleSignUp} className="flex flex-col items-center justify-center px-10 h-full bg-white">
            <h1 className="text-[5vh] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Create Account
            </h1>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="bg-[#e4e6d6] my-2 px-4 py-2 text-sm rounded w-full outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#000ed1] text-white text-xs font-semibold uppercase tracking-wider py-2 px-12 rounded mt-2"
            >
              {loading ? 'Création...' : 'Sign Up'}
            </button>
            {messageSignUp && (
              <p
                className={`text-xs mt-2 ${
                  messageSignUp.toLowerCase().includes('success') ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {messageSignUp}
              </p>
            )}
            <GoogleButton text="Sign up with Google" />
          </form>
        </div>
        <div className={styles['toggle-container']}>
          <div className={styles.toggle}>
            <div className={`${styles['toggle-panel']} ${styles['toggle-left']}`}>
              <h1 className="text-[5vh] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Welcome to HINA
              </h1>
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
              <h1 className="text-[5vh] font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Welcome Back!
              </h1>
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
