import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { Flame, Star, Award, Heart, MessageSquare, Calendar, Gift } from 'lucide-react';

const Activity = () => {
  const user = apiService.getCurrentUser();
  const [stats, setStats] = useState({
    currentStreak: 0,
    longestStreak: 0,
    helpingInteractionsCount: 0,
    requestsPosted: 0,
    repliesGiven: 0
  });

  useEffect(() => {
    const fetchParticipation = async () => {
      try {
        const data = await apiService.getParticipation(user.id);
        if (data) {
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchParticipation();
  }, [user]);

  const achievements = [
    { id: 'a1', title: 'First Helping Hand', description: 'Complete one helping interaction.', unlocked: true, icon: Heart, color: 'var(--terracotta)' },
    { id: 'a2', title: 'Constant Supporter', description: 'Complete five helping interactions.', unlocked: true, icon: Star, color: 'var(--haldi-yellow)' },
    { id: 'a3', title: 'Neighbourhood Hero', description: 'Complete ten helping interactions.', unlocked: true, icon: Award, color: 'var(--neem-green)' },
    { id: 'a4', title: 'Consistency Champion', description: 'Achieve a 30-day participation streak.', unlocked: false, icon: Flame, color: 'var(--sage-green)' }
  ];

  return (
    <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
      
      <div className="editorial-header mb-8" style={{ width: '100%' }}>
        <h1 className="heading-xl">My Activity</h1>
        <p style={{ color: 'var(--sage-green)', fontSize: '1.1rem' }}>Track your community participation and achievements.</p>
      </div>

      <div className="flex" style={{ gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        
        {/* Streak Strip */}
        <div style={{ flex: '1 1 400px' }}>
          <h2 className="heading-md mb-4 flex items-center gap-2">
            <Flame color="var(--haldi-yellow)" size={24} /> 
            Streak
          </h2>
          <div className="notice-entry mb-4" style={{ backgroundColor: 'rgba(233, 170, 79, 0.05)', borderColor: 'rgba(233, 170, 79, 0.3)' }}>
            <div className="flex justify-between items-end mb-4">
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--coffee-brown)', lineHeight: 1 }}>{stats.currentStreak}</div>
                <div style={{ color: 'var(--sage-green)', fontWeight: 600 }}>Day Participation Streak</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: 'var(--sage-green)', fontSize: '0.875rem' }}>Longest</div>
                <div style={{ fontWeight: 700, color: 'var(--coffee-brown)' }}>{stats.longestStreak} days</div>
              </div>
            </div>

            {/* Weekly Activity Strip */}
            <div className="flex justify-between items-center mt-6 pt-4" style={{ borderTop: '1px dashed rgba(233, 170, 79, 0.3)' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => {
                const isActive = idx < 4; // Mocking current 4 days active
                const isToday = idx === 3;
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <span style={{ fontSize: '0.75rem', color: 'var(--sage-green)', fontWeight: isToday ? 700 : 400 }}>{day}</span>
                    <div style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      backgroundColor: isActive ? 'var(--haldi-yellow)' : 'transparent',
                      border: isActive ? 'none' : '2px solid rgba(145, 165, 130, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {isActive && <Flame size={14} color="var(--white)" />}
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs mt-4" style={{ color: 'var(--sage-green)', fontStyle: 'italic' }}>
              Note: Streaks increase when you post or reply, not just by opening the app.
            </p>
          </div>
        </div>

        {/* Stats Summary */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 className="heading-md mb-4 flex items-center gap-2">
            <Heart color="var(--terracotta)" size={24} /> 
            Impact
          </h2>
          <div className="notice-entry">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(145, 165, 130, 0.2)' }}>
                <span style={{ color: 'var(--coffee-brown)', fontWeight: 600 }}>Total Helping Interactions</span>
                <span className="heading-sm" style={{ color: 'var(--terracotta)' }}>{stats.helpingInteractionsCount}</span>
              </div>
              <div className="flex justify-between items-center pb-3" style={{ borderBottom: '1px solid rgba(145, 165, 130, 0.2)' }}>
                <span style={{ color: 'var(--sage-green)' }}>Requests Posted</span>
                <span style={{ fontWeight: 600 }}>{stats.requestsPosted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--sage-green)' }}>Replies Given</span>
                <span style={{ fontWeight: 600 }}>{stats.repliesGiven}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="editorial-separator"></div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="heading-lg">Achievements</h2>
          <p style={{ color: 'var(--sage-green)' }}>Badges earned through community participation.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {achievements.map(achievement => {
          const Icon = achievement.icon;
          return (
            <div 
              key={achievement.id} 
              className="notice-entry flex items-start gap-4"
              style={{ 
                opacity: achievement.unlocked ? 1 : 0.6,
                backgroundColor: achievement.unlocked ? 'var(--white)' : 'rgba(247, 240, 227, 0.5)',
                borderColor: achievement.unlocked ? 'rgba(145, 165, 130, 0.3)' : 'transparent',
                boxShadow: 'none'
              }}
            >
              <div style={{ 
                padding: '0.75rem', 
                backgroundColor: achievement.unlocked ? 'rgba(247, 240, 227, 0.8)' : '#e0e0e0', 
                borderRadius: '50%',
                border: achievement.unlocked ? `1px solid ${achievement.color}` : 'none'
              }}>
                <Icon size={28} color={achievement.unlocked ? achievement.color : '#888'} />
              </div>
              <div>
                <h4 style={{ fontWeight: 700, color: 'var(--coffee-brown)', marginBottom: '0.25rem', fontFamily: 'var(--font-heading)' }}>
                  {achievement.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--sage-green)' }}>{achievement.description}</p>
                {!achievement.unlocked && (
                  <div className="badge" style={{ marginTop: '0.75rem', backgroundColor: '#e0e0e0', color: '#666', border: 'none' }}>Locked</div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="notice-entry mb-8 flex gap-6 items-center" style={{ backgroundColor: 'rgba(33, 78, 61, 0.05)', borderColor: 'rgba(33, 78, 61, 0.2)' }}>
        <div style={{ 
          width: '64px', height: '64px', minWidth: '64px',
          backgroundColor: 'var(--neem-green)', 
          borderRadius: 'var(--radius-full)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center' 
        }}>
          <Gift size={32} color="var(--white)" />
        </div>
        <div>
          <h3 className="heading-sm" style={{ color: 'var(--neem-green)', marginBottom: '0.25rem' }}>Top Helper Reward Eligible</h3>
          <p style={{ color: 'var(--coffee-brown)' }}>
            Thank you for being a wonderful neighbour! You are eligible for this month's community gift. 
            <br/><span style={{ fontSize: '0.875rem', color: 'var(--sage-green)' }}>Collect your indoor plant from the Secretary's office.</span>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Activity;
