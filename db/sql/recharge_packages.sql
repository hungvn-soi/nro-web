
//Gói - Nạp
CREATE TABLE IF NOT EXISTS recharge_packages (
    id INT NOT NULL AUTO_INCREMENT,
    price INT NOT NULL,
    gem INT NOT NULL,
    status TINYINT NOT NULL DEFAULT 1,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    INDEX idx_recharge_packages_status_sort (status, sort_order)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;


  //Gói - Mẫu
  INSERT INTO recharge_packages
    (price, gem, status, sort_order)
VALUES
    (10000, 100, 1, 1),
    (20000, 220, 1, 2),
    (50000, 560, 1, 3),
    (100000, 1200, 1, 4),
    (200000, 2500, 1, 5),
    (500000, 6000, 1, 6),
    (1000000, 14000, 1, 7);