import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Bell, Check, MessageCircle, Star, Flame } from 'lucide-react';

const Notifications = () => {
  const user = apiService.getCurrentUser();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifs = async () => {
      if (user) {
        try {
          const data = await apiService.getNotifications(user.id);
          setNotifications(data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchNotifs();
  }, [user]);

  const markAsRead = async (id) => {
    try {
      await apiService.markNotificationRead(id, user.id);
      setNotifications(notifications.map(n => n.id === id ? { ...n, readStatus: true } : n));
    } catch (err) {}
  };

  const markAllAsRead = async () => {
    try {
      await apiService.markAllNotificationsRead(user.id);
      setNotifications(notifications.map(n => ({ ...n, readStatus: true })));
    } catch (err) {}
  };

  const getIcon = (type) => {
    switch(type) {
      case 'new_request': return <Bell size={18} color="var(--terracotta)" />;
      case 'reply': return <MessageCircle size={18} color="var(--neem-green)" />;
      case 'achievement': return <Star size={18} color="var(--haldi-yellow)" />;
      case 'streak': return <Flame size={18} color="var(--haldi-yellow)" />;
      default: return <Bell size={18} color="var(--sage-green)" />;
    }
  };

  const hasUnread = notifications.some(n => !n.readStatus);

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="editorial-header mb-6" style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '2px solid var(--sage-green)' }}>
        <div>
          <h1 className="heading-lg">Notifications</h1>
        </div>
        {hasUnread && (
          <button onClick={markAllAsRead} className="btn btn-text" style={{ fontSize: '0.875rem', paddingBottom: '0.5rem' }}>
            Mark all as read
          </button>
        )}
      </div>

      <div className="flex flex-col gap-4">
        {notifications.length > 0 ? (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notice-entry flex items-start gap-4`}
              style={{ 
                padding: '1.25rem', 
                backgroundColor: notification.readStatus ? 'var(--white)' : 'rgba(233, 170, 79, 0.05)',
                borderColor: !notification.readStatus ? 'rgba(233, 170, 79, 0.4)' : 'rgba(145, 165, 130, 0.3)',
                boxShadow: !notification.readStatus ? 'var(--shadow-sm)' : 'none',
                cursor: !notification.readStatus ? 'pointer' : 'default'
              }}
              onClick={() => !notification.readStatus && markAsRead(notification.id)}
            >
              <div style={{ 
                padding: '0.5rem', 
                backgroundColor: 'rgba(247, 240, 227, 0.8)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {getIcon(notification.type)}
              </div>
              
              <div style={{ flex: 1 }}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 style={{ fontWeight: 700, color: 'var(--coffee-brown)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                    {notification.title}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--sage-green)' }}>
                    {new Date(notification.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <p style={{ fontSize: '0.95rem', color: 'var(--coffee-brown)', lineHeight: 1.4 }}>
                  {notification.message}
                </p>
              </div>
              
              {!notification.readStatus && (
                <div style={{ alignSelf: 'center', marginLeft: '0.5rem' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--terracotta)' }}></div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="illustration" style={{ maxWidth: '120px', marginBottom: '1.5rem', opacity: 0.7 }}>
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 20 L50 70 M30 70 L70 70" stroke="var(--sage-green)" strokeWidth="4" strokeLinecap="round" />
                <path d="M40 30 Q 50 10 60 30 Q 70 70 70 70 L30 70 Q 30 70 40 30 Z" fill="none" stroke="var(--sage-green)" strokeWidth="4" />
                <circle cx="50" cy="80" r="5" fill="var(--sage-green)" />
              </svg>
            </div>
            <h3 className="heading-sm mb-2" style={{ color: 'var(--coffee-brown)' }}>All caught up</h3>
            <p style={{ color: 'var(--sage-green)' }}>You have no new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
