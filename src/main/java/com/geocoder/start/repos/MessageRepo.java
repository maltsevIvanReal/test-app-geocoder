package com.geocoder.start.repos;

import com.geocoder.start.entity.Note;
import org.springframework.data.repository.CrudRepository;

public interface MessageRepo extends CrudRepository<Note, Long> {
}
