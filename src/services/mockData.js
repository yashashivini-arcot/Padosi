export const MOCK_USERS = [
  { id: 'u1', name: 'Rahul Sharma', email: 'demo@padosi.in', password: 'demo', flat: 'G-04', joinedAt: '2023-01-15' },
  { id: 'u2', name: 'Aarti Desai', email: 'aarti@padosi.in', password: 'demo', flat: '1-02', joinedAt: '2023-02-10' },
  { id: 'u3', name: 'Vikram Singh', email: 'vikram@padosi.in', password: 'demo', flat: '3-12', joinedAt: '2023-03-05' },
];

export const CATEGORIES = ['Household Items', 'Tools', 'Kitchen Items', 'Personal Assistance', 'Other'];

const INITIAL_REQUESTS = [
  {
    id: 'r1',
    title: 'Does anyone have a screwdriver I can borrow for an hour?',
    description: 'Trying to fix a loose cabinet hinge. Will return it promptly!',
    category: 'Tools',
    requesterId: 'u2',
    requesterName: 'Aarti Desai',
    requesterFlat: '1-02',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    status: 'open',
    replies: [
      {
        id: 'rep1',
        senderId: 'u3',
        senderName: 'Vikram Singh',
        senderFlat: '3-12',
        message: 'I have a star-head screwdriver. Is that what you need?',
        createdAt: new Date(Date.now() - 1800000).toISOString(),
      }
    ]
  },
  {
    id: 'r2',
    title: 'Looking for a spare umbrella until tomorrow.',
    description: 'Mine just broke and I have to step out in the evening.',
    category: 'Household Items',
    requesterId: 'u3',
    requesterName: 'Vikram Singh',
    requesterFlat: '3-12',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    status: 'fulfilled',
    replies: []
  },
  {
    id: 'r3',
    title: 'Need a pressure cooker for a small family gathering.',
    description: 'Making biryani tonight and need an extra 5L cooker. Will return it cleaned tomorrow.',
    category: 'Kitchen Items',
    requesterId: 'u1',
    requesterName: 'Rahul Sharma',
    requesterFlat: 'G-04',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    status: 'open',
    replies: []
  }
];

// Simple LocalStorage Service
export const storageService = {
  getRequests: () => {
    const data = localStorage.getItem('padosi_requests');
    if (!data) {
      localStorage.setItem('padosi_requests', JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(data);
  },
  
  saveRequest: (request) => {
    const requests = storageService.getRequests();
    requests.unshift(request); // Add to top
    localStorage.setItem('padosi_requests', JSON.stringify(requests));
    return request;
  },
  
  addReply: (requestId, reply) => {
    const requests = storageService.getRequests();
    const index = requests.findIndex(r => r.id === requestId);
    if (index !== -1) {
      if (!requests[index].replies) requests[index].replies = [];
      requests[index].replies.push(reply);
      localStorage.setItem('padosi_requests', JSON.stringify(requests));
    }
  },

  getCurrentUser: () => {
    const data = localStorage.getItem('padosi_current_user');
    return data ? JSON.parse(data) : null;
  },

  login: (email, password) => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('padosi_current_user', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },

  logout: () => {
    localStorage.removeItem('padosi_current_user');
  },

  getNotifications: (userId) => {
    const data = localStorage.getItem(`padosi_notifications_${userId}`);
    return data ? JSON.parse(data) : [
      { id: 'n1', type: 'new_request', title: 'New Request', message: 'Aarti Desai posted a new request in your community.', read: false, createdAt: new Date().toISOString() },
      { id: 'n2', type: 'achievement', title: 'Streak unlocked!', message: 'You reached a 3-day participation streak.', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() }
    ];
  }
};
