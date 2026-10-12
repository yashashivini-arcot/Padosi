package com.padosi.api.repository;

import com.padosi.api.model.Participation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ParticipationRepository extends JpaRepository<Participation, Long> {
    Optional<Participation> findByUserId(Long userId);
}
