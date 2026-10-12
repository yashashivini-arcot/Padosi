package com.padosi.api.service;

import com.padosi.api.model.HelpRequest;
import com.padosi.api.model.Notification;
import com.padosi.api.model.Participation;
import com.padosi.api.model.Reply;
import com.padosi.api.model.User;
import com.padosi.api.repository.HelpRequestRepository;
import com.padosi.api.repository.NotificationRepository;
import com.padosi.api.repository.ParticipationRepository;
import com.padosi.api.repository.ReplyRepository;
import com.padosi.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class CommunityService {

    @Autowired private HelpRequestRepository requestRepository;
    @Autowired private ReplyRepository replyRepository;
    @Autowired private NotificationRepository notificationRepository;
    @Autowired private ParticipationRepository participationRepository;
    @Autowired private UserRepository userRepository;

    public HelpRequest createRequest(HelpRequest request, Long userId) {
        User user = userRepository.findById(userId).orElseThrow();
        request.setRequester(user);
        HelpRequest saved = requestRepository.save(request);
        
        updateParticipation(userId, "post");
        
        // Notify others (simplified: in a real app, notify all other flat owners or followers)
        // For MVP, we can skip notifying everyone to save DB rows, or create a broadcast notification.
        return saved;
    }

    public List<HelpRequest> getAllRequests() {
        return requestRepository.findAllByOrderByCreatedAtDesc();
    }

    public HelpRequest getRequest(Long id) {
        return requestRepository.findById(id).orElseThrow();
    }

    public HelpRequest updateStatus(Long id, String status, Long userId) {
        HelpRequest req = getRequest(id);
        if (!req.getRequester().getId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        req.setStatus(status);
        return requestRepository.save(req);
    }

    public Reply addReply(Long requestId, String message, Long userId) {
        HelpRequest req = getRequest(requestId);
        User sender = userRepository.findById(userId).orElseThrow();
        
        Reply reply = new Reply();
        reply.setRequest(req);
        reply.setSender(sender);
        reply.setMessage(message);
        Reply saved = replyRepository.save(reply);
        
        updateParticipation(userId, "reply");
        
        if (!req.getRequester().getId().equals(userId)) {
            Notification notif = new Notification();
            notif.setRecipient(req.getRequester());
            notif.setType("reply");
            notif.setTitle("New Reply");
            notif.setMessage(sender.getName() + " replied to your request: " + req.getTitle());
            notif.setRelatedRequestId(requestId);
            notificationRepository.save(notif);
        }
        
        return saved;
    }

    public List<Reply> getReplies(Long requestId) {
        return replyRepository.findByRequestIdOrderByCreatedAtAsc(requestId);
    }

    public List<Notification> getNotifications(Long userId) {
        return notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId);
    }

    public void markNotificationRead(Long id, Long userId) {
        Notification n = notificationRepository.findById(id).orElseThrow();
        if (n.getRecipient().getId().equals(userId)) {
            n.setReadStatus(true);
            notificationRepository.save(n);
        }
    }
    
    public void markAllNotificationsRead(Long userId) {
        List<Notification> notifs = notificationRepository.findByRecipientIdOrderByCreatedAtDesc(userId);
        for(Notification n : notifs) {
            n.setReadStatus(true);
        }
        notificationRepository.saveAll(notifs);
    }

    public Participation getParticipation(Long userId) {
        return participationRepository.findByUserId(userId).orElseThrow();
    }

    private void updateParticipation(Long userId, String action) {
        Participation p = participationRepository.findByUserId(userId).orElseThrow();
        
        LocalDate today = LocalDate.now();
        if (p.getLastActivityDate() == null || p.getLastActivityDate().isBefore(today.minusDays(1))) {
            p.setCurrentStreak(1); // Reset streak if missed a day
        } else if (p.getLastActivityDate().isEqual(today.minusDays(1))) {
            p.setCurrentStreak(p.getCurrentStreak() + 1);
            if (p.getCurrentStreak() > p.getLongestStreak()) {
                p.setLongestStreak(p.getCurrentStreak());
            }
        }
        
        p.setLastActivityDate(today);
        
        if (action.equals("post")) {
            p.setRequestsPosted(p.getRequestsPosted() + 1);
        } else if (action.equals("reply")) {
            p.setRepliesGiven(p.getRepliesGiven() + 1);
            p.setHelpingInteractionsCount(p.getHelpingInteractionsCount() + 1);
        }
        
        participationRepository.save(p);
    }
}
