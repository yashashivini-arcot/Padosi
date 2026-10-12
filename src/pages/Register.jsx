import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { Eye, EyeOff } from 'lucide-react';

const flats = [];
for (let i = 1; i <= 12; i++) flats.push(`G-${i.toString().padStart(2, '0')}`);
for (let f = 1; f <= 5; f++) {
  for (let i = 1; i <= 12; i++) flats.push(`${f}-${i.toString().padStart(2, '0')}`);
}

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    flatNumber: flats[0]
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await apiService.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        flatNumber: formData.flatNumber
      });
      // Automatically logs in upon successful registration in apiService
      navigate('/');
    } catch (err) {
      console.error('Registration error', err);
      const errorMsg = err.response?.data?.message || err.response?.data || err.message || 'Unknown error';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex justify-center items-center h-full" style={{ minHeight: '100vh', padding: '2rem 1rem' }}>
      <div className="notice-entry" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 className="heading-xl brand-logo brand-logo-light-bg" style={{ margin: 0 }}>Padosi</h1>
          <p style={{ color: 'var(--sage-green)', fontWeight: 600, fontSize: '1.1rem' }}>Apne padosi, apni community.</p>
        </div>

        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email"
              className="form-input" 
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Flat Number</label>
            <select
              name="flatNumber"
              className="form-input"
              value={formData.flatNumber}
              onChange={handleChange}
              required
            >
              {flats.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                className="form-input" 
                style={{ width: '100%', paddingRight: '2.5rem' }}
                value={formData.password}
                onChange={handleChange}
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

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="confirmPassword"
              className="form-input" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && <div className="form-error mb-4">{error}</div>}

          <div className="flex flex-col gap-3 mt-6">
            <button type="submit" className="btn btn-primary w-full" style={{ padding: '0.75rem' }} disabled={loading}>
              {loading ? 'Registering...' : 'Create Account'}
            </button>
            <div className="text-center mt-2">
              <span style={{ color: 'var(--sage-green)', fontSize: '0.9rem' }}>
                Already have an account? <Link to="/login" style={{ color: 'var(--neem-green)', fontWeight: 'bold' }}>Login</Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
