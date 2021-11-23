package pl.rafalrozek.ictf.repository;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.rafalrozek.ictf.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends CrudRepository<Task, Integer> {
    List<Task> getAllByCategory(Integer category);
    Task findById(Long id);
    Task getById(Long id);
    void deleteById(Long id);
    List<Task> findAll();
}
