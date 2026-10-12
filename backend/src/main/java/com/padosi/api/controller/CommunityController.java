package com.padosi.api.controller;

import com.padosi.api.model.HelpRequest;
import com.padosi.api.model.Reply;
import com.padosi.api.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @PostMapping("/requests")
    public ResponseEntity<?> createRequest(@RequestBody HelpRequest request, @RequestParam Long userId) {
        return ResponseEntity.ok(communityService.createRequest(request, userId));
    }

    @GetMapping("/requests")
    public ResponseEntity<?> getRequests() {
        return ResponseEntity.ok(communityService.getAllRequests());
    }

    @GetMapping("/requests/{id}")
    public ResponseEntity<?> getRequest(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getRequest(id));
    }

    @PutMapping("/requests/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body, @RequestParam Long userId) {
        return ResponseEntity.ok(communityService.updateStatus(id, body.get("status"), userId));
    }

    @PostMapping("/requests/{id}/replies")
    public ResponseEntity<?> addReply(@PathVariable Long id, @RequestBody Map<String, String> body, @RequestParam Long userId) {
        return ResponseEntity.ok(communityService.addReply(id, body.get("message"), userId));
    }

    @GetMapping("/requests/{id}/replies")
    public ResponseEntity<?> getReplies(@PathVariable Long id) {
        return ResponseEntity.ok(communityService.getReplies(id));
    }

    @GetMapping("/notifications")
    public ResponseEntity<?> getNotifications(@RequestParam Long userId) {
        return ResponseEntity.ok(communityService.getNotifications(userId));
    }

    @PutMapping("/notifications/{id}/read")
    public ResponseEntity<?> markNotificationRead(@PathVariable Long id, @RequestParam Long userId) {
        communityService.markNotificationRead(id, userId);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/notifications/read-all")
    public ResponseEntity<?> markAllNotificationsRead(@RequestParam Long userId) {
        communityService.markAllNotificationsRead(userId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/participation")
    public ResponseEntity<?> getParticipation(@RequestParam Long userId) {
        return ResponseEntity.ok(communityService.getParticipation(userId));
    }
}
