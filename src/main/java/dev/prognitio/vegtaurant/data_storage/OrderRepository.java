package dev.prognitio.vegtaurant.data_storage;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<PlacedOrder, Integer> {
}
