import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService, CATEGORIES } from '../services/apiService';

const PostRequest = () => {
  const navigate = useNavigate();
  const user = apiService.getCurrentUser();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: CATEGORIES[0],
    neededUntil: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await apiService.saveRequest({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        neededUntil: formData.neededUntil
      }, user.id);
      navigate('/');
    } catch (err) {
      console.error('Failed to post request', err);
      const errorMsg = err.response?.data?.message || err.response?.data || err.message || 'Unknown error';
      alert(`Could not post request. Error: ${errorMsg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="editorial-header mb-8" style={{ width: '100%' }}>
        <h1 className="heading-lg mb-2">Ask a Favour</h1>
        <p style={{ color: 'var(--sage-green)', fontSize: '1.1rem' }}>Ask your neighbours for an item to borrow or a little help.</p>
      </div>

      <form className="notice-entry" onSubmit={handleSubmit} style={{ padding: '2rem' }}>
        <div className="form-group">
          <label className="form-label">What do you need?</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. Need a ladder for an hour" 
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select 
            className="form-select"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Details</label>
          <textarea 
            className="form-textarea" 
            rows="4"
            placeholder="Add some details. When do you need it? When will you return it?"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label className="form-label">Needed Until (Optional)</label>
          <input 
            type="datetime-local" 
            className="form-input"
            value={formData.neededUntil}
            onChange={(e) => setFormData({...formData, neededUntil: e.target.value})}
          />
        </div>

        <div className="flex gap-4 mt-8">
          <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '0.75rem' }}>Post to Noticeboard</button>
          <button type="button" onClick={() => navigate('/')} className="btn btn-text" style={{ flex: 1 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PostRequest;
