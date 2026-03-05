CREATE TABLE common_rail_1_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE common_rail_2_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_3_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_4_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_5_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_6_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_7_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_8_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_9_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_10_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_11_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE common_rail_12_transit_manhour (
    id_uuid CHAR(36) NULL DEFAULT (UUID()),
    line_id VARCHAR(10) NULL DEFAULT NULL,
    pg VARCHAR(10) NULL DEFAULT NULL,
    line_name VARCHAR(50) NULL DEFAULT NULL,
    name_product VARCHAR(100) NULL DEFAULT NULL,
    target VARCHAR(50) NULL DEFAULT NULL,
    actual VARCHAR(50) NULL DEFAULT NULL,
    loading_time VARCHAR(50) NULL DEFAULT NULL,
    efficiency VARCHAR(50) NULL DEFAULT NULL,
    delay VARCHAR(50) NULL DEFAULT NULL,
    cycle_time VARCHAR(50) NULL DEFAULT NULL,
    status VARCHAR(50) NULL DEFAULT NULL,
    time_trouble VARCHAR(50) NULL DEFAULT NULL,
    time_trouble_quality VARCHAR(50) NULL DEFAULT NULL,
    andon VARCHAR(50) NULL DEFAULT NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_uuid (id_uuid),
    INDEX idx_line_id (line_id),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
