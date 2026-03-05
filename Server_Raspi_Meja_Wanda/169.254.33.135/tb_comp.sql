CREATE TABLE tb_kub_comp_19 (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NULL DEFAULT NULL,
    wh BIGINT(20) NULL DEFAULT NULL,
    av BIGINT(20) NULL DEFAULT NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;

CREATE TABLE tb_kub_comp_21 (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NULL DEFAULT NULL,
    wh BIGINT(20) NULL DEFAULT NULL,
    av BIGINT(20) NULL DEFAULT NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;


CREATE TABLE tb_kub_comp_24 (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NULL DEFAULT NULL,
    wh BIGINT(20) NULL DEFAULT NULL,
    av BIGINT(20) NULL DEFAULT NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
















CREATE TABLE tb_kub_panel_16_ap (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NOT NULL,
    data_wh BIGINT UNSIGNED NULL,

    INDEX idx_panel_datetime (panel, date_time)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE tb_kub_panel_16_wh (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NULL DEFAULT NULL,
    wh VARCHAR(20) NULL DEFAULT NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;




CREATE TABLE tb_kub_panel_17_ap (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NOT NULL,
    data_wh BIGINT UNSIGNED NULL,

    INDEX idx_panel_datetime (panel, date_time)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE tb_kub_panel_17_wh (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NULL DEFAULT NULL,
    wh VARCHAR(20) NULL DEFAULT NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;





CREATE TABLE tb_kub_panel_20_ap (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NOT NULL,
    data_wh BIGINT UNSIGNED NULL,

    INDEX idx_panel_datetime (panel, date_time)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;



CREATE TABLE tb_kub_panel_20_wh (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
    panel VARCHAR(20) NULL DEFAULT NULL,
    wh VARCHAR(20) NULL DEFAULT NULL,

    INDEX idx_datetime (date_time),
    INDEX idx_panel (panel)
) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;






