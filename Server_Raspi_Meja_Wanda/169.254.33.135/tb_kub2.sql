CREATE TABLE tb_kub2_63_active_power (
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT 'panel_kubikal1',
    active_power_total DECIMAL(12,3) NULL COMMENT 'Daya Aktif Total (kW)',
    active_power_a DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa A (kW)',
    active_power_b DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa B (kW)',
    active_power_c DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa C (kW)',

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_63_apparent_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    apparent_power_total DECIMAL(10,3) NULL,
    apparent_power_a DECIMAL(10,3) NULL,
    apparent_power_b DECIMAL(10,3) NULL,
    apparent_power_c DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE tb_kub2_63_current (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    current_avg DECIMAL(10,3) NULL,
    current_a DECIMAL(10,3) NULL,
    current_b DECIMAL(10,3) NULL,
    current_c DECIMAL(10,3) NULL,
    current_n DECIMAL(10,3) NULL,
    metadata_1 VARCHAR(255) NULL,
    metadata_2 VARCHAR(255) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_63_frequency (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    data_freq DECIMAL(10,3) NULL,
    metadata_1 VARCHAR(255) NULL,
    metadata_2 VARCHAR(255) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_63_power_factor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    power_factor_total DECIMAL(5,3) NULL,
    power_factor_a DECIMAL(5,3) NULL,
    power_factor_b DECIMAL(5,3) NULL,
    power_factor_c DECIMAL(5,3) NULL,
    metadata_1 VARCHAR(255) NULL,
    metadata_2 VARCHAR(255) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_63_reactive_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    reactive_power_total DECIMAL(10,3) NULL,
    reactive_power_a DECIMAL(10,3) NULL,
    reactive_power_b DECIMAL(10,3) NULL,
    reactive_power_c DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_63_voltage_ll (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    voltage_ll_avg DECIMAL(10,3) NULL,
    voltage_ab DECIMAL(10,3) NULL,
    voltage_bc DECIMAL(10,3) NULL,
    voltage_ca DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_63_voltage_ln (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    voltage_ln_avg DECIMAL(10,3) NULL,
    voltage_an DECIMAL(10,3) NULL,
    voltage_bn DECIMAL(10,3) NULL,
    voltage_cn DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;





CREATE TABLE tb_kub2_64_active_power (
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT 'panel_kubikal1',
    active_power_total DECIMAL(12,3) NULL COMMENT 'Daya Aktif Total (kW)',
    active_power_a DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa A (kW)',
    active_power_b DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa B (kW)',
    active_power_c DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa C (kW)',

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_64_apparent_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    apparent_power_total DECIMAL(10,3) NULL,
    apparent_power_a DECIMAL(10,3) NULL,
    apparent_power_b DECIMAL(10,3) NULL,
    apparent_power_c DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE tb_kub2_64_current (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    current_avg DECIMAL(10,3) NULL,
    current_a DECIMAL(10,3) NULL,
    current_b DECIMAL(10,3) NULL,
    current_c DECIMAL(10,3) NULL,
    current_n DECIMAL(10,3) NULL,
    metadata_1 VARCHAR(255) NULL,
    metadata_2 VARCHAR(255) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_64_frequency (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    data_freq DECIMAL(10,3) NULL,
    metadata_1 VARCHAR(255) NULL,
    metadata_2 VARCHAR(255) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_64_power_factor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    power_factor_total DECIMAL(5,3) NULL,
    power_factor_a DECIMAL(5,3) NULL,
    power_factor_b DECIMAL(5,3) NULL,
    power_factor_c DECIMAL(5,3) NULL,
    metadata_1 VARCHAR(255) NULL,
    metadata_2 VARCHAR(255) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_64_reactive_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    reactive_power_total DECIMAL(10,3) NULL,
    reactive_power_a DECIMAL(10,3) NULL,
    reactive_power_b DECIMAL(10,3) NULL,
    reactive_power_c DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_64_voltage_ll (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    voltage_ll_avg DECIMAL(10,3) NULL,
    voltage_ab DECIMAL(10,3) NULL,
    voltage_bc DECIMAL(10,3) NULL,
    voltage_ca DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub2_64_voltage_ln (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    voltage_ln_avg DECIMAL(10,3) NULL,
    voltage_an DECIMAL(10,3) NULL,
    voltage_bn DECIMAL(10,3) NULL,
    voltage_cn DECIMAL(10,3) NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;








