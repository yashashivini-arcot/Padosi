import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageCircle, Send } from 'lucide-react';
import { apiService } from '../services/apiService';

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = apiService.getCurrentUser();
  
  const [request, setRequest] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyMessage, setReplyMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const reqData = await apiService.getRequest(id);
        setRequest(reqData);
        const repData = await apiService.getReplies(id);
        setReplies(repData);
      } catch (err) {
        console.error('Failed to fetch details', err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;
    setLoading(true);

    try {
      const newReply = await apiService.addReply(id, replyMessage, user.id);
      setReplies([...replies, newReply]);
      setReplyMessage('');
    } catch (err) {
      console.error('Failed to post reply', err);
      alert('Could not post reply. Backend running?');
    } finally {
      setLoading(false);
    }
  };

  if (!request) return <div className="p-8 text-center" style={{ color: 'var(--sage-green)' }}>Loading...</div>;

  return (
    <div className="container" style={{ maxWidth: '700px', margin: '0 auto', paddingBottom: '4rem' }}>
      <button onClick={() => navigate(-1)} className="btn btn-text flex items-center gap-2 mb-6" style={{ paddingLeft: 0 }}>
        <ArrowLeft size={18} /> Back to Noticeboard
      </button>

      <div className="notice-entry mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="badge badge-green">{request.category}</span>
              <span className="badge" style={{ backgroundColor: 'transparent', color: 'var(--sage-green)', border: '1px solid rgba(145, 165, 130, 0.3)' }}>
                {new Date(request.createdAt).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <h1 className="heading-lg" style={{ lineHeight: 1.2 }}>{request.title}</h1>
          </div>
        </div>
        
        <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', whiteSpace: 'pre-line', color: 'var(--coffee-brown)' }}>
          {request.description}
        </p>
        
        <div className="flex items-center gap-4 p-4" style={{ backgroundColor: 'rgba(247, 240, 227, 0.6)', borderRadius: 'var(--radius-md)', border: '1px dashed rgba(145, 165, 130, 0.4)' }}>
          <div style={{ 
            width: '48px', height: '48px', 
            borderRadius: '50%', backgroundColor: 'var(--neem-green)', color: 'white', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            fontSize: '1.25rem', fontWeight: 'bold' 
          }}>
            {(request.requester?.name || request.requesterName || '?').charAt(0)}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>{request.requester?.name || request.requesterName}</div>
            <div style={{ color: 'var(--sage-green)', fontSize: '0.9rem' }}>Flat {request.requester?.flatNumber || request.requesterFlat}</div>
          </div>
        </div>
      </div>

      <div className="editorial-separator"></div>

      <h2 className="heading-md mb-6 flex items-center gap-2" style={{ color: 'var(--coffee-brown)' }}>
        <MessageCircle size={22} color="var(--sage-green)" /> Replies ({replies.length || 0})
      </h2>

      <div className="flex flex-col gap-4 mb-8">
        {replies.length > 0 ? (
          replies.map(reply => (
            <div key={reply.id} className="notice-entry" style={{ padding: '1.25rem', backgroundColor: 'var(--white)', boxShadow: 'none' }}>
              <div className="flex justify-between items-baseline mb-3">
                <div className="flex items-center gap-2">
                  <div style={{ fontWeight: 700, color: 'var(--coffee-brown)' }}>{reply.sender?.name || reply.senderName}</div>
                  <div className="badge" style={{ backgroundColor: 'rgba(145, 165, 130, 0.1)', color: 'var(--sage-green)', fontSize: '0.7rem', border: 'none' }}>
                    Flat {reply.sender?.flatNumber || reply.senderFlat}
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--sage-green)' }}>
                  {new Date(reply.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              <p style={{ color: 'var(--coffee-brown)', fontSize: '1.05rem', lineHeight: 1.5 }}>{reply.message}</p>
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--sage-green)', fontStyle: 'italic', backgroundColor: 'rgba(247, 240, 227, 0.4)', borderRadius: 'var(--radius-md)' }}>
            No replies yet. Be the first to offer a helping hand!
          </div>
        )}
      </div>

      <form onSubmit={handleReply} className="notice-entry" style={{ padding: '1.5rem', backgroundColor: 'rgba(233, 170, 79, 0.05)', borderColor: 'rgba(233, 170, 79, 0.3)' }}>
        <h3 className="heading-sm mb-3" style={{ color: 'var(--coffee-brown)' }}>Offer your help</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px' }}>
            <textarea 
              className="form-textarea w-full" 
              rows="3" 
              placeholder="e.g. I have one available, let me know when you want to pick it up!"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              required
              style={{ backgroundColor: 'var(--white)', border: '1px solid rgba(145, 165, 130, 0.4)' }}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary flex items-center gap-2" style={{ padding: '0.75rem 1.5rem' }}>
            <Send size={18} /> Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestDetails;
