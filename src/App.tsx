import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Authentification from '../src/Components/Authentification';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<Authentification />} />
        <Route path="/signUp" element={<Authentification />} />
        <Route path="*" element={<h1 className="text-center mt-10 text-2xl">Welcome to HINA</h1>} />
      </Routes>
    </Router>
  );
}
