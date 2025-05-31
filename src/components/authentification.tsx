import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import googleLogo from '../../assets/google.png';
import { auth } from '../firebase/firebase';

type FormValues = {
  email: string;
  password: string;
};

export default function Authentification() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { email, password } = formValues;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage('');
    if (!email || !password) return setMessage('Please fill in all fields.');

    try {
      setLoading(true);
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage('Account created successfully!');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setMessage('Successfully signed in!');
        navigate('/hello');
      }
      setFormValues({ email: '', password: '' });
    } catch (error) {
      setMessage(isSignUp ? "Sign up failed." : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/hello');
    } catch (error) {
      setMessage("Google sign-in failed.");
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row rounded-[40px] overflow-hidden shadow-xl">
        <div className="w-full md:w-1/2 bg-white p-10 rounded-l-[40px]">
          <Card className="border-0 shadow-none">
            <CardHeader className="text-center space-y-1">
              <CardTitle className="text-3xl font-bold text-gray-900">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 mt-4">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="email">Email</label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                    className="bg-[#e6e8d9] border-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                    className="bg-[#e6e8d9] border-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
                  disabled={loading}
                >
                  {loading
                    ? (isSignUp ? 'Creating...' : 'Signing in...')
                    : (isSignUp ? 'SIGN UP' : 'SIGN IN')}
                </Button>

                {message && (
                  <p className={`text-sm text-center ${
                    message.toLowerCase().includes('success') 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {message}
                  </p>
                )}
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">or</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                onClick={handleGoogleSignIn} 
                className="w-full flex gap-2 border-gray-300 text-gray-700"
              >
                <img src={googleLogo} alt="Google" className="h-5 w-5" />
                With Google
              </Button>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-700 text-white p-10 rounded-r-[40px] flex flex-col items-center justify-center text-center">
          <div className="max-w-xs">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-blue-100 mb-8">This is a website for HEI - Tech</p>
            <Button
              variant="outline"
              className="bg-transparent border-white text-white hover:bg-blue-800 hover:text-white"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
