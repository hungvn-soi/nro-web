CREATE TABLE IF NOT EXISTS `payments_v2` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `user_id` INT NOT NULL,
    `order_code` VARCHAR(20) NOT NULL,
    `sepay_transaction_id` VARCHAR(100) DEFAULT NULL,
    `payment_method` ENUM('bank', 'card') NOT NULL DEFAULT 'bank',
    `amount` INT NOT NULL,
    `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `expired_at` TIMESTAMP NOT NULL,
    `status` ENUM('pending', 'complete', 'expired', 'error') NOT NULL DEFAULT 'pending',

    PRIMARY KEY (`id`),

    UNIQUE KEY `uk_payments_v2_order_code` (`order_code`),

    KEY `idx_payments_v2_user_id` (`user_id`),
    KEY `idx_payments_v2_status` (`status`),
    KEY `idx_payments_v2_created_at` (`created_at`),
    KEY `idx_payments_v2_expired_at` (`expired_at`),

    CONSTRAINT `fk_payments_v2_user`
        FOREIGN KEY (`user_id`)
        REFERENCES `account` (`id`)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;