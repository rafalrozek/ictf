package pl.rafalrozek.ictf.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.rafalrozek.ictf.model.Scoreboard;

import java.util.List;

@Repository
public interface ScoreboardRepository extends CrudRepository<Scoreboard, Integer> {
    List<Scoreboard> findAll();
}