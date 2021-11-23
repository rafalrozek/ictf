package pl.rafalrozek.ictf.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.rafalrozek.ictf.model.Notification;

import java.util.List;

@Repository
public interface NotificationRepository extends CrudRepository<Notification, Integer> {

    List<Notification> findAll();
    List<Notification> findAllByUsername(String username);
    void deleteById(Long id);
    void removeById(Long id);
}