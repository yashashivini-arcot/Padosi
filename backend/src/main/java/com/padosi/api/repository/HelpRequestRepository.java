package com.padosi.api.repository;

import com.padosi.api.model.HelpRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface HelpRequestRepository extends JpaRepository<HelpRequest, Long> {
    List<HelpRequest> findAllByOrderByCreatedAtDesc();
}
