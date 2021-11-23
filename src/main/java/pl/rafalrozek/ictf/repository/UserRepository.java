package pl.rafalrozek.ictf.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.rafalrozek.ictf.model.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
    User findUserById(Long id);
    Optional<User> findByEmail(String email);
    Optional<User> findByName(String name);

}
