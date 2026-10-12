package com.padosi.api.repository;

import com.padosi.api.model.Reply;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReplyRepository extends JpaRepository<Reply, Long> {
    List<Reply> findByRequestIdOrderByCreatedAtAsc(Long requestId);
}
