import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await apiService.login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password, or backend is not running.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = () => {
    setEmail('demo@padosi.in');
    setPassword('demo');
  };

  return (
    <div className="container flex justify-center items-center h-full" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="notice-entry" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="heading-xl brand-logo brand-logo-light-bg" style={{ margin: 0 }}>Padosi</h1>
          <p style={{ color: 'var(--sage-green)', fontWeight: 600, fontSize: '1.1rem' }}>Apne padosi, apni community.</p>
        </div>

        <div className="illustration">
          <svg viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="40" width="100" height="110" fill="transparent" stroke="var(--sage-green)" strokeWidth="3" rx="4" />
            <rect x="70" y="60" width="20" height="25" fill="transparent" stroke="var(--sage-green)" strokeWidth="2" rx="2" />
            <rect x="110" y="60" width="20" height="25" fill="transparent" stroke="var(--sage-green)" strokeWidth="2" rx="2" />
            <rect x="70" y="100" width="20" height="25" fill="var(--haldi-yellow)" stroke="var(--sage-green)" strokeWidth="2" rx="2" />
            <rect x="110" y="100" width="20" height="25" fill="transparent" stroke="var(--sage-green)" strokeWidth="2" rx="2" />
            
            <path d="M 40 40 L 100 10 L 160 40" fill="none" stroke="var(--terracotta)" strokeWidth="3" strokeLinejoin="round" />
            
            <circle cx="30" cy="90" r="15" fill="var(--neem-green)" opacity="0.8" />
            <rect x="27" y="105" width="6" height="45" fill="var(--coffee-brown)" />
          </svg>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                className="form-input" 
                style={{ width: '100%', paddingRight: '2.5rem' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sage-green)' }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && <div className="form-error mb-4">{error}</div>}

          <div className="flex flex-col gap-3 mt-6">
            <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.75rem' }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <div className="text-center mt-2">
              <span style={{ color: 'var(--sage-green)', fontSize: '0.9rem' }}>
                Don't have an account? <Link to="/register" style={{ color: 'var(--neem-green)', fontWeight: 'bold' }}>Register</Link>
              </span>
            </div>
            {/* Keeping this for easy testing, but hiding it as it looks like fake auth */}
            {/* <button type="button" onClick={fillDemo} className="btn btn-outline w-full" style={{ padding: '0.75rem' }}>Use Demo Credentials</button> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

