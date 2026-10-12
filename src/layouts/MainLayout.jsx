import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate, useLocation, Link } from 'react-router-dom';
import { Home, PlusCircle, LogOut, Flame, Bell } from 'lucide-react';
import { apiService } from '../services/apiService';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = apiService.getCurrentUser();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifs = async () => {
      if (user) {
        try {
          const notifs = await apiService.getNotifications(user.id);
          setUnreadCount(notifs.filter(n => !n.readStatus).length);
        } catch (e) {
          console.error('Backend not running', e);
        }
      }
    };
    fetchNotifs();
  }, [user, location.pathname]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  const handleLogout = () => {
    apiService.logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', label: 'Noticeboard', icon: Home },
    { path: '/post', label: 'Ask a Favour', icon: PlusCircle },
  ];

  const getPageTitle = () => {
    if (location.pathname === '/') return 'Community Noticeboard';
    if (location.pathname === '/post') return 'Ask for Help';
    if (location.pathname === '/notifications') return 'Notifications';
    if (location.pathname === '/activity') return 'My Activity';
    if (location.pathname.startsWith('/request/')) return 'Request Details';
    return 'Padosi';
  };

  return (
    <div className="app-layout">
      {/* Desktop Sidebar */}
      <aside className="sidebar">
        <div>
          <Link to="/" style={{ display: 'block', marginBottom: '2.5rem', textDecoration: 'none' }}>
            <h1 className="heading-lg brand-logo brand-logo-dark-bg" style={{ margin: 0 }}>Padosi</h1>
            <p style={{ color: 'rgba(247, 240, 227, 0.7)', fontSize: '0.875rem', marginTop: '-0.25rem' }}>Apni community</p>
          </Link>
          
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                end={item.path === '/'}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="sidebar-nav" style={{ marginTop: 'auto' }}>
          <button onClick={handleLogout} className="nav-item" style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', cursor: 'pointer' }}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="main-wrapper">
        <header className="top-header">
          <div className="header-title flex items-center gap-4">
            <span className="brand-logo brand-logo-light-bg heading-md mobile-only-logo" style={{ display: 'none', margin: 0 }}>Padosi</span>
            <h2 className="heading-md page-title" style={{ color: 'var(--neem-green)', margin: 0 }}>{getPageTitle()}</h2>
          </div>
          <div className="header-controls">
            <Link to="/activity" className="header-icon-btn streak-btn" title="3-day participation streak">
              <Flame size={20} color="var(--haldi-yellow)" />
              <span className="streak-count">3</span>
            </Link>
            <Link to="/notifications" className="header-icon-btn notif-btn" title="Notifications">
              <Bell size={20} color="var(--neem-green)" />
              {unreadCount > 0 && <span className="notif-badge">{unreadCount}</span>}
            </Link>
            <div className="profile-menu">
              <div className="profile-avatar" title={`${user.name} (Flat ${user.flat})`}>
                {user.name.charAt(0)}
              </div>
            </div>
          </div>
        </header>
        
        <main className="main-content">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="bottom-nav">
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            className={({ isActive }) => `mobile-nav-item ${isActive ? 'active' : ''}`}
            end={item.path === '/'}
          >
            <item.icon size={24} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default MainLayout;
