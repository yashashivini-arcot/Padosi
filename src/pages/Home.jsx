import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { apiService, CATEGORIES } from '../services/apiService';

const Home = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const user = apiService.getCurrentUser();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await apiService.getRequests();
        setRequests(data);
      } catch (err) {
        console.error('Failed to load requests. Backend may not be running.', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesSearch = req.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          req.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? req.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / 3600000);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <div>
      <section className="mb-8" style={{ borderBottom: '2px solid var(--neem-green)', paddingBottom: '1.5rem' }}>
        <h1 className="heading-xl mb-1">Namaste, {user?.name.split(' ')[0]}.</h1>
        <p className="text-md mb-6" style={{ color: 'var(--coffee-brown)', fontWeight: 500, fontSize: '1.25rem' }}>
          Need something? Your neighbours might have it.
        </p>
        <Link to="/post" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
          Post a Request
        </Link>
      </section>

      <div className="flex justify-between items-center mb-6" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: '1 1 300px', maxWidth: '400px' }}>
          <Search size={20} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sage-green)' }} />
          <input 
            type="text" 
            className="form-input w-full" 
            placeholder="Search requests..."
            style={{ paddingLeft: '2.5rem', backgroundColor: 'var(--white)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative', width: '200px' }}>
          <Filter size={20} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--sage-green)' }} />
          <select 
            className="form-select w-full"
            style={{ paddingLeft: '2.5rem', backgroundColor: 'var(--white)' }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(req => (
            <div key={req.id} className="notice-entry">
              <div className="flex justify-between items-start mb-2" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 className="heading-md" style={{ color: 'var(--neem-green)', lineHeight: 1.3 }}>{req.title}</h3>
                {req.status === 'fulfilled' ? (
                  <span className="badge badge-green flex items-center gap-1"><CheckCircle size={14} /> Fulfilled</span>
                ) : (
                  <span className="badge badge-yellow">Open</span>
                )}
              </div>
              
              <p className="mb-4" style={{ color: 'var(--coffee-brown)', fontSize: '1.05rem' }}>
                {req.description.length > 120 ? req.description.substring(0, 120) + '...' : req.description}
              </p>
              
              <div className="flex items-center gap-3 mb-4 text-sm" style={{ color: 'var(--sage-green)' }}>
                <span className="badge badge-green" style={{ border: 'none', backgroundColor: 'rgba(33, 78, 61, 0.08)' }}>{req.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock size={14} /> {formatDate(req.createdAt)}</span>
              </div>
              
              <div className="flex justify-between items-center" style={{ paddingTop: '1rem', borderTop: '1px dashed rgba(145, 165, 130, 0.4)' }}>
                <div className="flex items-center gap-2">
                  <div style={{ fontWeight: 600, color: 'var(--coffee-brown)' }}>{req.requester?.name || req.requesterName}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--sage-green)' }}>Flat {req.requester?.flatNumber || req.requesterFlat}</div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-sm font-semibold" style={{ color: req.replies?.length > 0 ? 'var(--neem-green)' : 'var(--sage-green)' }}>
                    <MessageCircle size={16} /> {req.replies?.length || 0}
                  </div>
                  <Link to={`/request/${req.id}`} className="btn btn-outline" style={{ padding: '0.25rem 1rem', fontSize: '0.875rem' }}>
                    View Request
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="illustration" style={{ maxWidth: '150px' }}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 80 L90 80" stroke="var(--sage-green)" strokeWidth="4" strokeLinecap="round" />
                <rect x="30" y="40" width="40" height="40" fill="var(--mitti-cream)" stroke="var(--sage-green)" strokeWidth="4" rx="4" />
                <path d="M20 40 L50 15 L80 40" fill="none" stroke="var(--sage-green)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="50" cy="60" r="4" fill="var(--sage-green)" />
              </svg>
            </div>
            <h3 className="heading-md mb-2">It's quiet here</h3>
            <p style={{ color: 'var(--sage-green)' }}>No requests found. Be the first to ask your neighbours for help!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
