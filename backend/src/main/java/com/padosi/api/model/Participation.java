package com.padosi.api.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "participations")
public class Participation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    private int helpingInteractionsCount = 0;
    
    private int requestsPosted = 0;
    
    private int repliesGiven = 0;
    
    private int currentStreak = 0;
    
    private int longestStreak = 0;

    private LocalDate lastActivityDate;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public int getHelpingInteractionsCount() { return helpingInteractionsCount; }
    public void setHelpingInteractionsCount(int helpingInteractionsCount) { this.helpingInteractionsCount = helpingInteractionsCount; }
    public int getRequestsPosted() { return requestsPosted; }
    public void setRequestsPosted(int requestsPosted) { this.requestsPosted = requestsPosted; }
    public int getRepliesGiven() { return repliesGiven; }
    public void setRepliesGiven(int repliesGiven) { this.repliesGiven = repliesGiven; }
    public int getCurrentStreak() { return currentStreak; }
    public void setCurrentStreak(int currentStreak) { this.currentStreak = currentStreak; }
    public int getLongestStreak() { return longestStreak; }
    public void setLongestStreak(int longestStreak) { this.longestStreak = longestStreak; }
    public LocalDate getLastActivityDate() { return lastActivityDate; }
    public void setLastActivityDate(LocalDate lastActivityDate) { this.lastActivityDate = lastActivityDate; }
}
