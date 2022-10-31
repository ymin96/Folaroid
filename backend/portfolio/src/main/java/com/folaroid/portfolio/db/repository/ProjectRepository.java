package com.folaroid.portfolio.db.repository;

import com.folaroid.portfolio.db.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}