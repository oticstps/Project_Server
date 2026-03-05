


CREATE TABLE tb_kub_active_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT 'panel_kubikal1',
    active_power_total DECIMAL(12,3) NULL COMMENT 'Daya Aktif Total (kW)',
    active_power_a DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa A (kW)',
    active_power_b DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa B (kW)',
    active_power_c DECIMAL(12,3) NULL COMMENT 'Daya Aktif Fasa C (kW)',

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)a
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_apparent_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    apparent_power_total DECIMAL(10,3) NULL DEFAULT NULL,
    apparent_power_a DECIMAL(10,3) NULL DEFAULT NULL,
    apparent_power_b DECIMAL(10,3) NULL DEFAULT NULL,
    apparent_power_c DECIMAL(10,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_current (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    current_avg DECIMAL(10,3) NULL DEFAULT NULL,
    current_a DECIMAL(10,3) NULL DEFAULT NULL,
    current_b DECIMAL(10,3) NULL DEFAULT NULL,
    current_c DECIMAL(10,3) NULL DEFAULT NULL,
    current_n DECIMAL(10,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_frequency (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    data_freq DECIMAL(10,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_power_factor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    power_factor_total DECIMAL(5,3) NULL DEFAULT NULL,
    power_factor_a DECIMAL(5,3) NULL DEFAULT NULL,
    power_factor_b DECIMAL(5,3) NULL DEFAULT NULL,
    power_factor_c DECIMAL(5,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_reactive_power (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    reactive_power_total DECIMAL(10,3) NULL DEFAULT NULL,
    reactive_power_a DECIMAL(10,3) NULL DEFAULT NULL,
    reactive_power_b DECIMAL(10,3) NULL DEFAULT NULL,
    reactive_power_c DECIMAL(10,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_voltage_ll (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    voltage_ll_avg DECIMAL(10,3) NULL DEFAULT NULL,
    voltage_ab DECIMAL(10,3) NULL DEFAULT NULL,
    voltage_bc DECIMAL(10,3) NULL DEFAULT NULL,
    voltage_ca DECIMAL(10,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;

CREATE TABLE tb_kub_voltage_ln (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(50) NULL DEFAULT NULL,
    voltage_ln_avg DECIMAL(10,3) NULL DEFAULT NULL,
    voltage_an DECIMAL(10,3) NULL DEFAULT NULL,
    voltage_bn DECIMAL(10,3) NULL DEFAULT NULL,
    voltage_cn DECIMAL(10,3) NULL DEFAULT NULL,
    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
