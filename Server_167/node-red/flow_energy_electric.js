[
    {
        "id": "7a71fcf272671a22",
        "type": "debug",
        "z": "01b1fc536102f9f3",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 510,
        "y": 95,
        "wires": []
    },
    {
        "id": "463e58afc8b7128f",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 650,
        "y": 170,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "74f949e9d63f123e",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.1\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 660,
        "y": 135,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "baa8ca618ea3c85f",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1090,
        "y": 2435,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "340d14d313bbb1fd",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "w eng all pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 2195,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "90fe7f0503ded3d8",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 2435,
        "wires": [
            [
                "16e1c2ac4ce6daea"
            ]
        ]
    },
    {
        "id": "007a34ebbd40581a",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2275,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "e81cafa94cc314b7",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2315,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "80e3c7c08edea15a",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2235,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "c7c17b94e8abed71",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2395,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "f89f0c3ec4b8587d",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 2355,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "6ceaf2a7beb932b5",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 2155,
        "wires": [
            []
        ]
    },
    {
        "id": "a7be3a0b7f2e7e19",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Hitung shift (logika tetap sama)\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung variabel waktu lainnya\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Simpan semua data waktu di msg.timeData\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 795,
        "y": 2720,
        "wires": [
            [
                "3ed5bd0ee5411331",
                "6cfa31afcc11946c"
            ]
        ]
    },
    {
        "id": "9f17048043d2fd39",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "Kub2 wh total panel 64",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_64\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel64 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 2575,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "a1ee957ad37e9e36",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "Kub2 wh total panel 63",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_63\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel63 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 2615,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "3ed5bd0ee5411331",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO tb_pm220_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1095,
        "y": 2720,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "6cfa31afcc11946c",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO tb_pm200_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1095,
        "y": 2760,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "ef81193ff9f96c55",
        "type": "debug",
        "z": "01b1fc536102f9f3",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 780,
        "y": 2115,
        "wires": []
    },
    {
        "id": "3bb68085df308087",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD_rep\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 790,
        "y": 2660,
        "wires": [
            [
                "092dfe0dbe391fd5",
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "092dfe0dbe391fd5",
        "type": "debug",
        "z": "01b1fc536102f9f3",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 995,
        "y": 2660,
        "wires": []
    },
    {
        "id": "b8c0c6025d391832",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "parse_lora_prefix_suffix",
        "func": "\n\n\n// ============================================\n// STRICT LORA PARSER\n// Format yang diterima:\n// prefix,value,suffix\n//\n// Contoh valid:\n// &e%,12345.67,v*p\n// 908,54321.00,$17\n// @yf,136703120.00,~ku\n//\n// Output:\n// msg.payload = [panel, power_meter, value]\n// ============================================\n\n// Ambil data masuk\nvar raw = msg.payload;\n\n// Pastikan string\nif (typeof raw !== \"string\") {\n    raw = String(raw);\n}\n\n// Bersihkan newline, carriage return, spasi pinggir\nraw = raw.replace(/\\r/g, \"\").replace(/\\n/g, \"\").trim();\n\n// 1) Buang jika kosong\nif (!raw || raw.length < 5) {\n    return null;\n}\n\n// 2) Buang semua paket lama yang diawali *\n// contoh: *BS_1..., *kub..., *cr7...\nif (raw.startsWith(\"*\")) {\n    return null;\n}\n\n// 3) Harus tepat 3 bagian: prefix,value,suffix\nvar parts = raw.split(\",\");\nif (parts.length !== 3) {\n    return null;\n}\n\nvar prefix = parts[0].trim();\nvar valueStr = parts[1].trim();\nvar suffix = parts[2].trim();\n\n// 4) Validasi prefix/suffix\nvar panel = \"\";\nvar power_meter = \"\";\n\n// ============================================\n// CHSAA / CHSAB\n// ============================================\n\n\n\n\n// CHSAA\nif (prefix === \"&e%\" && suffix === \"v*p\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"908\" && suffix === \"$17\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_200\";\n}\n// CHSAB\nelse if (prefix === \"w%c\" && suffix === \"8lv\") {\n    panel = \"chsab\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"u57\" && suffix === \"7%u\") {\n    panel = \"chsab\";\n    power_meter = \"pm_220\";\n}\n// CHAB\nelse if (prefix === \"n2z\" && suffix === \"7~i\") {\n    panel = \"chab\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@&d\" && suffix === \"go%\") {\n    panel = \"chab\";\n    power_meter = \"pm_200\";\n}\n// CHCD\nelse if (prefix === \"adj\" && suffix === \"d18\") {\n    panel = \"chcd\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"zgb\" && suffix === \"ehr\") {\n    panel = \"chcd\";\n    power_meter = \"pm_220\";\n}\n// BS1\nelse if (prefix === \"560\" && suffix === \"818\") {\n    panel = \"bs1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s%3\" && suffix === \"gmo\") {\n    panel = \"bs1\";\n    power_meter = \"pm_200\";\n}\n// BS2\nelse if (prefix === \"ulc\" && suffix === \"uca\") {\n    panel = \"bs2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"x61\" && suffix === \"&sn\") {\n    panel = \"bs2\";\n    power_meter = \"pm_200\";\n}\n\n\n\n\n// CHEF\nelse if (prefix === \"duy\" && suffix === \"ogg\") {\n    panel = \"chef\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"^&a\" && suffix === \"32v\") {\n    panel = \"chef\";\n    power_meter = \"pm_200\";\n}\n\n// CC1\nelse if (prefix === \"n97\" && suffix === \"c1x\") {\n    panel = \"cc1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"574\" && suffix === \"yra\") {\n    panel = \"cc1\";\n    power_meter = \"pm_200\";\n}\n\n// CONN\n\nelse if (prefix === \"5&d\" && suffix === \"t1s\") {\n    panel = \"conn\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// RET\nelse if (prefix === \"mgq\" && suffix === \"dp1\") {\n    panel = \"ret\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"p1@\" && suffix === \"!3p\") {\n    panel = \"ret\";\n    power_meter = \"pm_200\";\n}\n\n// RA\nelse if (prefix === \"~g6\" && suffix === \"%?j\") {\n    panel = \"ra\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"ieq\" && suffix === \"nyy\") {\n    panel = \"ra\";\n    power_meter = \"pm_200\";\n}\n// HLA\nelse if (prefix === \"?l@\" && suffix === \"q&j\") {\n    panel = \"hla\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// CHSAC\nelse if (prefix === \"qix\" && suffix === \"n7~\") {\n    panel = \"chsac\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"u%u\" && suffix === \"7~*\") {\n    panel = \"chsac\"; power_meter = \"pm_200\";\n}\n// CC234\nelse if (prefix === \"1t!\" && suffix === \"q%4\") {\n    panel = \"cc234\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"q9m\" && suffix === \"?@&\") {\n    panel = \"cc234\"; power_meter = \"pm_200\";\n}\n\n\n\n\n\n\n\n// ============================================\n// CR1\n// ============================================\nelse if (prefix === \"0i8\" && suffix === \"9gg\") {\n    panel = \"cr1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"hqm\" && suffix === \"40%\") {\n    panel = \"cr1\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR2\n// ============================================\nelse if (prefix === \"0l0\" && suffix === \"caj\") {\n    panel = \"cr2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s@w\" && suffix === \"9$9\") {\n    panel = \"cr2\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR3\n// ============================================\nelse if (prefix === \"@yf\" && suffix === \"~ku\") {\n    panel = \"cr3\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"$@y\" && suffix === \"o?f\") {\n    panel = \"cr3\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR4\n// ============================================\nelse if (prefix === \"w&7\" && suffix === \"zm2\") {\n    panel = \"cr4\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@2h\" && suffix === \"y6h\") {\n    panel = \"cr4\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR5\n// ============================================\nelse if (prefix === \"0*y\" && suffix === \"pru\") {\n    panel = \"cr5\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"8m7\" && suffix === \"cuf\") {\n    panel = \"cr5\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR6\n// ============================================\nelse if (prefix === \"j4c\" && suffix === \"&32\") {\n    panel = \"cr6\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@3x\" && suffix === \"dk?\") {\n    panel = \"cr6\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR7\n// ============================================\nelse if (prefix === \"kgn\" && suffix === \"yyx\") {\n    panel = \"cr7\";\n    power_meter = \"pm_220\";\n}\n// CR7 PM200 masih nonaktif\nelse if (prefix === \"m!4\" && suffix === \"3uq\") {\n    panel = \"cr7\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR8\n// ============================================\nelse if (prefix === \"xs@\" && suffix === \"@dq\") {\n    panel = \"cr8\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"t%~\" && suffix === \"0qx\") {\n    panel = \"cr8\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR9\n// ============================================\nelse if (prefix === \"s*y\" && suffix === \"joe\") {\n    panel = \"cr9\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"i93\" && suffix === \"!jp\") {\n    panel = \"cr9\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR10\n// ============================================\nelse if (prefix === \"%@j\" && suffix === \"0p6\") {\n    panel = \"cr10\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"lwl\" && suffix === \"0&&\") {\n    panel = \"cr10\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR11\n// ============================================\nelse if (prefix === \"bsv\" && suffix === \"x0f\") {\n    panel = \"cr11\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"&*g\" && suffix === \"qm$\") {\n    panel = \"cr11\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR12\n// ============================================\nelse if (prefix === \"w!9\" && suffix === \"z~x\") {\n    panel = \"cr12\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"g8x\" && suffix === \"hv3\") {\n    panel = \"cr12\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// BUKAN DATA YANG TERDAFTAR\n// ============================================\nelse {\n    return null;\n}\n\n// 5) Validasi angka\nvar value = parseFloat(valueStr);\nif (isNaN(value)) {\n    return null;\n}\n\n// 6) Optional: tolak nilai tidak masuk akal\nif (value < 0) {\n    return null;\n}\n\n// 7) Bentuk output\nmsg.raw_payload = raw;\nmsg.payload = [panel, power_meter, value];\n\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 375,
        "wires": [
            [
                "2fac5ae3cc002180",
                "979af1cc3073549b"
            ]
        ]
    },
    {
        "id": "2fac5ae3cc002180",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = 'shift_1';\n} else {\n    shift = 'shift_2';\n}\n\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 520,
        "y": 415,
        "wires": [
            [
                "0cc3525b08462f7e",
                "46d8747651a507eb",
                "ac7202812bd3a17e",
                "49f3c76e2d71866e",
                "db97e5dd0c68dedd",
                "83aece66ce0258fa",
                "c6888f034aa9eada",
                "b6aecdfa459183db",
                "d9c5e2a56b96dac5",
                "4ae4566f3dcec471",
                "a41ba6a6be6cfbd0",
                "48901ae5adbcc97b",
                "409e1729d4578a3f",
                "a86b15010503f7ae",
                "dd99125a3ccc8125",
                "d6ca75e991a15d63",
                "ada74dda53d7ad9d",
                "7000c6fd7e13eafc",
                "05b476580505ca39",
                "9d233dcf3b1b0836",
                "36f3ebd64eb6c486",
                "354892f6b069ae11",
                "01dd9a4c0c3d628d",
                "b6e97ae232461699",
                "0136fb4db60bd543",
                "97f617e21bb0956b",
                "24075770308ccea1",
                "0bfc15ce3c7023d2",
                "c63154056989adc6",
                "d47ed1d380b900db",
                "f0e9c3a997866bb7",
                "67f7cbb0fa216219",
                "e5c733d8cfe9853d",
                "6a3a05c4d82e0b06",
                "c874ec42420e3b54",
                "a1ddf27540e8227c",
                "c1497df8c3ca4511",
                "fcd66b41ccf933b3",
                "7af80721f47580e4",
                "72c74e8bb2bb0c29",
                "37a7ca9cadc1cb6b",
                "f0828229210fb1ef",
                "96ca40103215901e",
                "b8f82f26d9a8f18a",
                "9a91d3a439bded1a",
                "64e852d9da2149c0",
                "f574cdc2fc3a76e6",
                "33ae4bbe33e6d281",
                "59ad1a8976973347",
                "05ed3c91a322f87f"
            ]
        ]
    },
    {
        "id": "0cc3525b08462f7e",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = Number(msg.payload[2]);\nvar timeData = msg.timeData;\n\n// jika value <= 2617236, hentikan proses\nif (isNaN(value) || value <= 2618836) {\n    return null;\n}\n\nif (panel === 'cr1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 415,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "46d8747651a507eb",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 137635408) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 455,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "ac7202812bd3a17e",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1431999) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 495,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "49f3c76e2d71866e",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 180995968) {\n    return null;\n}\n\n\nif (panel === 'cr2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 535,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "db97e5dd0c68dedd",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 4932691) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 575,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "83aece66ce0258fa",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 119948320) {\n    return null;\n}\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 615,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "c6888f034aa9eada",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1866267) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 655,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "b6aecdfa459183db",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 187249536) {\n    return null;\n}\n\n\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 695,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "d9c5e2a56b96dac5",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 215125) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 735,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "4ae4566f3dcec471",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 24521756) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 775,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "a41ba6a6be6cfbd0",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1413539) {\n    return null;\n}\n\n\n\nif (panel === 'cr6' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 815,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "48901ae5adbcc97b",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 168393680) {\n    return null;\n}\n\n\nif (panel === 'cr6' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 855,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "409e1729d4578a3f",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 0) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 895,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "a86b15010503f7ae",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 48821776) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 935,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "dd99125a3ccc8125",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1480644) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 975,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "d6ca75e991a15d63",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 218985312) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1015,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "ada74dda53d7ad9d",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 8960692) {\n    return null;\n}\n\n\nif (panel === 'cr9' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1055,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "7000c6fd7e13eafc",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 238400704) {\n    return null;\n}\n\n\n\nif (panel === 'cr9' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1095,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "05b476580505ca39",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1108002) {\n    return null;\n}\n\n\n\nif (panel === 'cr10' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1135,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "9d233dcf3b1b0836",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204896096) {\n    return null;\n}\n\n\nif (panel === 'cr10' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1175,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "36f3ebd64eb6c486",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1775581) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1215,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "354892f6b069ae11",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204330432) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1255,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "01dd9a4c0c3d628d",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 2201929) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1295,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "b6e97ae232461699",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 214202624) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1335,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "97f617e21bb0956b",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 662234688) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1415,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "0136fb4db60bd543",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 15705259) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1375,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "0bfc15ce3c7023d2",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 641965696) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1495,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "24075770308ccea1",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 32978992) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1455,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "f0e9c3a997866bb7",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575934464) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1575,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "67f7cbb0fa216219",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 16987040) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1535,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "c63154056989adc6",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575647040) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1655,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "d47ed1d380b900db",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 7028043) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1615,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "e5c733d8cfe9853d",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 693976) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 375,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "6a3a05c4d82e0b06",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 574627200) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 415,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "c874ec42420e3b54",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 25257830) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 455,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "a1ddf27540e8227c",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 269224832) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 495,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "c1497df8c3ca4511",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_hla",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 762710208) {\n    return null;\n}\n\n\nif (panel === 'hla' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_hla (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 335,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "fcd66b41ccf933b3",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 19994708) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 535,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "7af80721f47580e4",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 186939856) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 575,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "72c74e8bb2bb0c29",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_conn",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 372023) {\n    return null;\n}\n\n\nif (panel === 'conn' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_conn (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1230,
        "y": 295,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "37a7ca9cadc1cb6b",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 4221932) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1220,
        "y": 615,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "f0828229210fb1ef",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1118355) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1220,
        "y": 655,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "64e852d9da2149c0",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 55759820) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1815,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "9a91d3a439bded1a",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 145193) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1775,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "33ae4bbe33e6d281",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 12854937) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1895,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "f574cdc2fc3a76e6",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 3290683) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1855,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "05ed3c91a322f87f",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 37681616) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1975,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "59ad1a8976973347",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1149384) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 820,
        "y": 1935,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "96ca40103215901e",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm220_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 17033846) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1695,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "b8f82f26d9a8f18a",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_pm200_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 234197856) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 810,
        "y": 1735,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "296dd297cc1fca42",
        "type": "comment",
        "z": "01b1fc536102f9f3",
        "name": "chcd id nya tida umum, id pm220 : 4, pm200 : 3",
        "info": "pass tidak sesuai default",
        "x": 510,
        "y": 1615,
        "wires": []
    },
    {
        "id": "979af1cc3073549b",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "update_layout_otics_1",
        "func": "// ============================================\n// FUNCTION NODE: build dynamic update query\n// input  : msg.payload = [panel, power_meter, value]\n// contoh : [\"cr1\", \"pm_200\", 12345.67]\n// output : msg.topic, msg.payload -> ke mysql node\n// ============================================\n\nconst TABLE_NAME = \"tb_layout_otics_1\";\n\n// whitelist panel yang memang ada di parser / DB\nconst ALLOWED_PANELS = new Set([\n    \"bs1\", \"bs2\",\n    \"cc1\", \"cc234\",\n    \"chab\", \"chcd\", \"chef\",\n    \"chsaa\", \"chsab\", \"chsac\",\n    \"conn\",\n    \"cr1\", \"cr2\", \"cr3\", \"cr4\", \"cr5\", \"cr6\",\n    \"cr7\", \"cr8\", \"cr9\", \"cr10\", \"cr11\", \"cr12\",\n    \"ct\", \"hla\", \"ra\", \"ret\"\n]);\n\n// whitelist power meter\nconst ALLOWED_METERS = {\n    \"pm_200\": \"pm200\",\n    \"pm_220\": \"pm220\"\n};\n\n// validasi payload\nif (!Array.isArray(msg.payload) || msg.payload.length < 3) {\n    node.warn(\"Payload tidak sesuai format [panel, power_meter, value]\");\n    return null;\n}\n\nlet panel = String(msg.payload[0] || \"\").trim().toLowerCase();\nlet power_meter = String(msg.payload[1] || \"\").trim().toLowerCase();\nlet value = Number(msg.payload[2]);\n\nif (!ALLOWED_PANELS.has(panel)) {\n    node.warn(\"Panel tidak dikenal: \" + panel);\n    return null;\n}\n\nif (!ALLOWED_METERS[power_meter]) {\n    node.warn(\"Power meter tidak dikenal: \" + power_meter);\n    return null;\n}\n\nif (!isFinite(value)) {\n    node.warn(\"Value bukan angka valid: \" + msg.payload[2]);\n    return null;\n}\n\n// bentuk nama kolom otomatis\n// contoh:\n// panel = cr1, power_meter = pm_200 -> tb_pm200_cr1_value\n// panel = cr1, power_meter = pm_220 -> tb_pm220_cr1_value\nconst meterKey = ALLOWED_METERS[power_meter];\nconst columnName = `tb_${meterKey}_${panel}_value`;\n\n// query update baris terakhir\nmsg.topic = `\n    UPDATE ${TABLE_NAME}\n    SET ${columnName} = ?\n    ORDER BY id DESC\n    LIMIT 1\n`;\n\nmsg.payload = [value];\n\n// info tambahan untuk debug\nmsg.columnName = columnName;\nmsg.panel = panel;\nmsg.power_meter = power_meter;\nmsg.value = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 830,
        "y": 315,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "7bc10dab6627c48e",
        "type": "string",
        "z": "01b1fc536102f9f3",
        "name": "hikitori",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": "^"
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 500,
        "y": 170,
        "wires": [
            [
                "463e58afc8b7128f"
            ]
        ]
    },
    {
        "id": "97d358d5c9e1bc80",
        "type": "string",
        "z": "01b1fc536102f9f3",
        "name": "montiv",
        "methods": [
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 500,
        "y": 135,
        "wires": [
            [
                "74f949e9d63f123e"
            ]
        ]
    },
    {
        "id": "65e184097f045159",
        "type": "string",
        "z": "01b1fc536102f9f3",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 540,
        "y": 2155,
        "wires": [
            [
                "baa8ca618ea3c85f",
                "340d14d313bbb1fd",
                "90fe7f0503ded3d8",
                "80e3c7c08edea15a",
                "007a34ebbd40581a",
                "e81cafa94cc314b7",
                "f89f0c3ec4b8587d",
                "c7c17b94e8abed71",
                "6ceaf2a7beb932b5",
                "9f17048043d2fd39",
                "a1ee957ad37e9e36",
                "ef81193ff9f96c55",
                "3bb68085df308087",
                "a7be3a0b7f2e7e19"
            ]
        ]
    },
    {
        "id": "16e1c2ac4ce6daea",
        "type": "string",
        "z": "01b1fc536102f9f3",
        "name": "energy",
        "methods": [
            {
                "name": "strip",
                "params": [
                    {
                        "type": "str",
                        "value": "\\n"
                    }
                ]
            },
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "50"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 950,
        "y": 2435,
        "wires": [
            [
                "baa8ca618ea3c85f"
            ]
        ]
    },
    {
        "id": "2747fb6fc760194e",
        "type": "mysql",
        "z": "01b1fc536102f9f3",
        "mydb": "73e0a03b3db84d64",
        "name": "",
        "x": 1590,
        "y": 920,
        "wires": [
            []
        ]
    },
    {
        "id": "f36fbb09ef869d0f",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 875,
        "y": 255,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "885c61e21b3ff06b",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 885,
        "y": 215,
        "wires": [
            [
                "2747fb6fc760194e"
            ]
        ]
    },
    {
        "id": "23a8b5b51f21e1d5",
        "type": "string",
        "z": "01b1fc536102f9f3",
        "name": "",
        "methods": [
            {
                "name": "between",
                "params": [
                    {
                        "type": "str",
                        "value": "*"
                    },
                    {
                        "type": "str",
                        "value": "#"
                    }
                ]
            },
            {
                "name": "split",
                "params": [
                    {
                        "type": "str",
                        "value": ","
                    },
                    {
                        "type": "num",
                        "value": "10"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 675,
        "y": 215,
        "wires": [
            [
                "885c61e21b3ff06b",
                "f36fbb09ef869d0f"
            ]
        ]
    },
    {
        "id": "3a871ff04f0e1998",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "parsing_kub",
        "func": "let data = msg.payload;\n\n// Pastikan string\nif (typeof data !== \"string\") {\n    return null;\n}\n\n// Pisahkan berdasarkan '#'\nlet parts = data.split('#');\n\n// Regex format yang diizinkan\nlet pattern = /^\\*kub,DA_\\d+,[\\d.]+,$/;\n\nlet validData = parts\n    .map(p => p.trim())\n    .filter(p => pattern.test(p))\n    .map(p => p + \"#\");\n\n// Jika tidak ada data valid → stop\nif (validData.length === 0) {\n    return null;\n}\n\n// Gabungkan kembali dengan newline\nmsg.payload = validData.join(\"\\n\");\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 520,
        "y": 215,
        "wires": [
            [
                "23a8b5b51f21e1d5"
            ]
        ]
    },
    {
        "id": "eb684071292c567e",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "door",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 115,
        "wires": [
            [
                "97d358d5c9e1bc80",
                "7bc10dab6627c48e",
                "b8c0c6025d391832",
                "7a71fcf272671a22",
                "65e184097f045159",
                "3a871ff04f0e1998"
            ]
        ]
    },
    {
        "id": "bb042913acf12b58",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "penambahan prefix ext_tps,~",
        "func": "let data = msg.payload;\n\n// Jika data Buffer, ubah ke string\nif (Buffer.isBuffer(data)) {\n    data = data.toString(\"utf8\");\n}\n\n// Pastikan data tidak kosong\nif (data === null || data === undefined) {\n    return null;\n}\n\n// Ubah ke string dan rapikan\ndata = String(data).trim();\n\n// Jika kosong, stop\nif (data === \"\") {\n    return null;\n}\n\n// Tambahkan prefix, suffix, dan newline\nmsg.payload = \"ext_tps\" + data + \"~\\n\";\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 35,
        "wires": [
            [
                "840a1e4139a0efed"
            ]
        ]
    },
    {
        "id": "840a1e4139a0efed",
        "type": "serial out",
        "z": "01b1fc536102f9f3",
        "name": "",
        "serial": "77330290bb27b358",
        "x": 1045,
        "y": 40,
        "wires": []
    },
    {
        "id": "55c276cf53326c29",
        "type": "function",
        "z": "01b1fc536102f9f3",
        "name": "node_kubikal",
        "func": "let buf = context.get('buf') || '';\nlet incoming = (msg.payload ?? '').toString().replace(/\\r?\\n/g, '').trim();\n\nif (!incoming) return null;\n\n// gabungkan buffer lama + data baru\nbuf += incoming;\n\nlet sent = [];\n\n// proses terus selama masih ada data yang bisa dibaca\nwhile (true) {\n    // cari awalan record pertama\n    let start = buf.search(/\\*(?:kub|panel)/);\n    if (start === -1) {\n        buf = '';\n        break;\n    }\n\n    // buang noise sebelum awalan\n    if (start > 0) {\n        buf = buf.slice(start);\n    }\n\n    // cari awalan berikutnya\n    let nextPrefixRel = buf.slice(1).search(/\\*(?:kub|panel)/);\n    let nextPrefix = nextPrefixRel === -1 ? -1 : nextPrefixRel + 1;\n\n    // cari tanda akhir record\n    let hashPos = buf.indexOf('#');\n\n    // kalau ada '#' dan dia muncul sebelum awalan berikutnya, ambil record lengkap\n    if (hashPos !== -1 && (nextPrefix === -1 || hashPos < nextPrefix)) {\n        let record = buf.slice(0, hashPos + 1);\n        sent.push({ ...msg, payload: record });\n        buf = buf.slice(hashPos + 1);\n        continue;\n    }\n\n    // kalau awalan baru muncul sebelum '#', anggap record lama selesai di situ\n    if (nextPrefix !== -1) {\n        let record = buf.slice(0, nextPrefix) + '#';\n        sent.push({ ...msg, payload: record });\n        buf = buf.slice(nextPrefix);\n        continue;\n    }\n\n    // kalau belum lengkap, simpan dulu sisanya\n    break;\n}\n\ncontext.set('buf', buf);\n\n// kirim semua record yang sudah jadi\nfor (let i = 0; i < sent.length; i++) {\n    node.send(sent[i]);\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 45,
        "wires": [
            [
                "12e778097c8af845",
                "bb042913acf12b58"
            ]
        ]
    },
    {
        "id": "12e778097c8af845",
        "type": "debug",
        "z": "01b1fc536102f9f3",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 755,
        "y": 70,
        "wires": []
    },
    {
        "id": "0b0b22a124785e6f",
        "type": "debug",
        "z": "01b1fc536102f9f3",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 310,
        "y": 35,
        "wires": []
    },
    {
        "id": "635fd4eaf808c75a",
        "type": "debug",
        "z": "01b1fc536102f9f3",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 305,
        "y": 215,
        "wires": []
    },
    {
        "id": "50c17979a64e058a",
        "type": "serial in",
        "z": "01b1fc536102f9f3",
        "name": "SERIAL IN COM3",
        "serial": "a4ecea2a81893b51",
        "x": 145,
        "y": 115,
        "wires": [
            [
                "eb684071292c567e",
                "55c276cf53326c29",
                "0b0b22a124785e6f"
            ]
        ]
    },
    {
        "id": "2a7985609055471b",
        "type": "serial in",
        "z": "01b1fc536102f9f3",
        "name": "SERIAL IN COM9",
        "serial": "2e997caa1e3410c9",
        "x": 145,
        "y": 150,
        "wires": [
            [
                "eb684071292c567e",
                "55c276cf53326c29",
                "635fd4eaf808c75a"
            ]
        ]
    },
    {
        "id": "73e0a03b3db84d64",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy_listrik",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "77330290bb27b358",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB0",
        "serialbaud": "9600",
        "databits": 8,
        "parity": "none",
        "stopbits": 1,
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": 10000
    },
    {
        "id": "a4ecea2a81893b51",
        "type": "serial-port",
        "name": "",
        "serialport": "COM3",
        "serialbaud": "9600",
        "databits": 8,
        "parity": "none",
        "stopbits": 1,
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": 10000
    },
    {
        "id": "2e997caa1e3410c9",
        "type": "serial-port",
        "name": "",
        "serialport": "COM9",
        "serialbaud": "9600",
        "databits": "8",
        "parity": "none",
        "stopbits": "1",
        "waitfor": "",
        "dtr": "none",
        "rts": "none",
        "cts": "none",
        "dsr": "none",
        "newline": "\\n",
        "bin": "false",
        "out": "char",
        "addchar": "",
        "responsetimeout": "10000"
    },
    {
        "id": "3a1e4fee3ddd4a15",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-node-mysql": "3.0.0",
            "node-red-node-serialport": "2.0.3"
        }
    }
]
