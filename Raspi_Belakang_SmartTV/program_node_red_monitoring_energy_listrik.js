[
    {
        "id": "e42735596f862d9a",
        "type": "string",
        "z": "1b4e1941106a31e1",
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
        "x": 370,
        "y": 1680,
        "wires": [
            [
                "677a7bab739e4db8",
                "eb052ee682167e26",
                "720bf3d756eff672"
            ]
        ]
    },
    {
        "id": "3fc4e291d177259a",
        "type": "debug",
        "z": "1b4e1941106a31e1",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 460,
        "y": 60,
        "wires": []
    },
    {
        "id": "7686bc5b7a2de6f7",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1030,
        "y": 1840,
        "wires": [
            []
        ]
    },
    {
        "id": "121dfa5c4ae2ff4a",
        "type": "string",
        "z": "1b4e1941106a31e1",
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
        "x": 390,
        "y": 800,
        "wires": [
            [
                "7686bc5b7a2de6f7",
                "da9338fe98102304",
                "4800b2dde584eaf9",
                "ace755683757a5ae",
                "a57abcf0fbccbdd8",
                "128f03c14e43f029",
                "b77e609a03d58a4e",
                "e09add4b2a2cdb17",
                "b45197a9d3b7966e",
                "74d451c3a444f7d7",
                "34d3f24c32996969",
                "8e721a9435b4544e",
                "71469a229251591f",
                "b8f5835e7db7abeb",
                "962ba029d0e5a8ff",
                "8545172dc4be089c",
                "871fad4bd0b88ccf",
                "bf561a3b351d1b91",
                "927556b97d86e50b",
                "de09c78e3f8e96d0",
                "55a3152ed9b3e01d",
                "dafd741592f767f4",
                "d79c0e3fb7b9424d",
                "dc366ce82e073c79",
                "762ca4664c84879c",
                "1fc4bbf55a76ed4a",
                "df02cbcaf0a2b2ff",
                "88e6273a0cf17a05",
                "80ae48ee79289fbc",
                "f7637a9b525fbbf3",
                "12230cc45bfe52a1",
                "5757acda18a85955",
                "eee1528970ff3a72",
                "d7766239759db57c",
                "e973459909ab9441",
                "48ed3d19461232b4",
                "0b6ac27844a7d386",
                "797eb0a71fe673a1",
                "d900a86d9e065962"
            ]
        ]
    },
    {
        "id": "94a523b4d4113fbc",
        "type": "string",
        "z": "1b4e1941106a31e1",
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
        "x": 870,
        "y": 1875,
        "wires": [
            [
                "7686bc5b7a2de6f7"
            ]
        ]
    },
    {
        "id": "677a7bab739e4db8",
        "type": "debug",
        "z": "1b4e1941106a31e1",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 640,
        "y": 60,
        "wires": []
    },
    {
        "id": "da9338fe98102304",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1800,
        "wires": [
            []
        ]
    },
    {
        "id": "eb052ee682167e26",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 700,
        "y": 1680,
        "wires": [
            [
                "9fc75b41447e8b0f"
            ]
        ]
    },
    {
        "id": "720bf3d756eff672",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1710,
        "wires": [
            []
        ]
    },
    {
        "id": "4800b2dde584eaf9",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1830,
        "wires": [
            [
                "94a523b4d4113fbc"
            ]
        ]
    },
    {
        "id": "a57abcf0fbccbdd8",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1890,
        "wires": [
            []
        ]
    },
    {
        "id": "128f03c14e43f029",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1920,
        "wires": [
            []
        ]
    },
    {
        "id": "ace755683757a5ae",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1860,
        "wires": [
            []
        ]
    },
    {
        "id": "e09add4b2a2cdb17",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1980,
        "wires": [
            []
        ]
    },
    {
        "id": "b77e609a03d58a4e",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1950,
        "wires": [
            []
        ]
    },
    {
        "id": "b45197a9d3b7966e",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_bs1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 320,
        "wires": [
            [
                "d0b4ce365ba53467"
            ]
        ]
    },
    {
        "id": "74d451c3a444f7d7",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_bs2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 350,
        "wires": [
            [
                "b85efedcc0a3cf9f"
            ]
        ]
    },
    {
        "id": "1fc4bbf55a76ed4a",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_chab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH' && pm === 'PM-200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1080,
        "wires": [
            [
                "6a0a836417f16bf1"
            ]
        ]
    },
    {
        "id": "df02cbcaf0a2b2ff",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_chcd",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH-CD' && pm === 'PM-3F') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1110,
        "wires": [
            [
                "d8595fa1a960e977"
            ]
        ]
    },
    {
        "id": "88e6273a0cf17a05",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_chef",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_EF' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1140,
        "wires": [
            [
                "cbd2f70d5a5808a9"
            ]
        ]
    },
    {
        "id": "80ae48ee79289fbc",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_chsaa",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAA' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1170,
        "wires": [
            [
                "f8c17fb1e8e94680"
            ]
        ]
    },
    {
        "id": "f7637a9b525fbbf3",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_chsab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAB' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1200,
        "wires": [
            [
                "13220498a62cf61d"
            ]
        ]
    },
    {
        "id": "12230cc45bfe52a1",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_chsac",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_SAC' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1230,
        "wires": [
            [
                "7dfa7d96edd136ab"
            ]
        ]
    },
    {
        "id": "b8f5835e7db7abeb",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_cr1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_1' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 620,
        "wires": [
            [
                "9368475f6c21ff22"
            ]
        ]
    },
    {
        "id": "962ba029d0e5a8ff",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_cr2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 650,
        "wires": [
            [
                "b162d8fe4c47eaed"
            ]
        ]
    },
    {
        "id": "8545172dc4be089c",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr3",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_3' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 680,
        "wires": [
            [
                "d28eb9cb2f15ac56"
            ]
        ]
    },
    {
        "id": "871fad4bd0b88ccf",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr4",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_4' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 710,
        "wires": [
            [
                "9bc0612b6a8e34e2"
            ]
        ]
    },
    {
        "id": "bf561a3b351d1b91",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr5",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_5' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 740,
        "wires": [
            [
                "abeb37bfc7fb5fee"
            ]
        ]
    },
    {
        "id": "927556b97d86e50b",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr6",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_6' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 770,
        "wires": [
            [
                "96b4a7cfa38683b7"
            ]
        ]
    },
    {
        "id": "de09c78e3f8e96d0",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr7",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_7' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 800,
        "wires": [
            [
                "ce5518f063ea8c9c"
            ]
        ]
    },
    {
        "id": "55a3152ed9b3e01d",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr8",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_8' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 830,
        "wires": [
            [
                "e812c2f8172e05c1"
            ]
        ]
    },
    {
        "id": "dafd741592f767f4",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr9",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_9' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 860,
        "wires": [
            [
                "a3b617147497e93b"
            ]
        ]
    },
    {
        "id": "d79c0e3fb7b9424d",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr10",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_10' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 890,
        "wires": [
            [
                "9760e930f6c64eef"
            ]
        ]
    },
    {
        "id": "dc366ce82e073c79",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr11",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_11' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 920,
        "wires": [
            [
                "997ae02fc0cf350b"
            ]
        ]
    },
    {
        "id": "762ca4664c84879c",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr12",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_12' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 940,
        "y": 950,
        "wires": [
            [
                "6ea685dca7f5559b"
            ]
        ]
    },
    {
        "id": "34d3f24c32996969",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_hla",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'HLA' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 380,
        "wires": [
            [
                "2875b2305d591153"
            ]
        ]
    },
    {
        "id": "8e721a9435b4544e",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_ra",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'roller_arm' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 910,
        "y": 410,
        "wires": [
            [
                "e6ef65030e8143ad"
            ]
        ]
    },
    {
        "id": "71469a229251591f",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_ret",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'RET' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 440,
        "wires": [
            [
                "e71389013b6fcb29"
            ]
        ]
    },
    {
        "id": "5757acda18a85955",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cc1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1260,
        "wires": [
            [
                "d758f56c030bb5bd"
            ]
        ]
    },
    {
        "id": "eee1528970ff3a72",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cc234",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC234' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1290,
        "wires": [
            [
                "aef7ccc787d651b8"
            ]
        ]
    },
    {
        "id": "d7766239759db57c",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 1740,
        "wires": [
            []
        ]
    },
    {
        "id": "e973459909ab9441",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 1770,
        "wires": [
            []
        ]
    },
    {
        "id": "4fcc742bd4b70177",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_bs1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 320,
        "wires": [
            [
                "a8f44fda267a49b0"
            ]
        ]
    },
    {
        "id": "90c4ec738cb81b2f",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_bs2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 350,
        "wires": [
            [
                "68aa8f703579b5e6"
            ]
        ]
    },
    {
        "id": "80da2ac28a12c272",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_chab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH' && pm === 'PM-220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1080,
        "wires": [
            [
                "4c6974d6de7db15a"
            ]
        ]
    },
    {
        "id": "829ce5d7beeeadf0",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_chcd",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH-CD' && pm === 'PM-1F') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1110,
        "wires": [
            [
                "ff6b223e94499280"
            ]
        ]
    },
    {
        "id": "f4b73cf068527e96",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_chef",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_EF' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1140,
        "wires": [
            [
                "0251b605797495e4"
            ]
        ]
    },
    {
        "id": "1c4abc11171bbc37",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_chsaa",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAA' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1170,
        "wires": [
            [
                "104fd1300de589a9"
            ]
        ]
    },
    {
        "id": "3f9e583516bf4245",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_chsab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAB' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1200,
        "wires": [
            [
                "4fb15b1c268699d4"
            ]
        ]
    },
    {
        "id": "09d899f19b87b813",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_chsac",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_SAC' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1230,
        "wires": [
            [
                "7aeb322e14a37e05"
            ]
        ]
    },
    {
        "id": "e5cad0b3c3d2cb7e",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 620,
        "wires": [
            [
                "609b3df6e1e01629"
            ]
        ]
    },
    {
        "id": "54492d1afc5472b0",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_2' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 650,
        "wires": [
            [
                "4e438e88c2d02599"
            ]
        ]
    },
    {
        "id": "b9c5ebbbb6ee7f13",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr3",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_3' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 680,
        "wires": [
            [
                "3ebe91ebdc126928"
            ]
        ]
    },
    {
        "id": "c83223ae78874e00",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr4",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_4' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 710,
        "wires": [
            [
                "869f63bf8c99d0f4"
            ]
        ]
    },
    {
        "id": "9c790086d4b86e07",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr5",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_5' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 740,
        "wires": [
            [
                "38c1892a98490de6"
            ]
        ]
    },
    {
        "id": "653ebbe1f51332ef",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr6",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_6' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 770,
        "wires": [
            [
                "c46dc0a69407bcc9"
            ]
        ]
    },
    {
        "id": "b007a86af5ec20c8",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr7",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'cr7' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 800,
        "wires": [
            [
                "22f31e28cf4583c5"
            ]
        ]
    },
    {
        "id": "7e5d40caefa9d651",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr8",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_8' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 830,
        "wires": [
            [
                "2be069fde724a05e"
            ]
        ]
    },
    {
        "id": "a986fc4e0c95b75c",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr9",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_9' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 860,
        "wires": [
            [
                "b73dd7802f143f63"
            ]
        ]
    },
    {
        "id": "931aa934aea9e002",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr10",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_10' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 890,
        "wires": [
            [
                "982e9962354dac0a"
            ]
        ]
    },
    {
        "id": "03442a95c6f1f28f",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr11",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_11' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 920,
        "wires": [
            [
                "bf974673c5c5600e"
            ]
        ]
    },
    {
        "id": "c90c982e2c60525d",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_cr12",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_12' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 950,
        "wires": [
            [
                "80bbd992d1e3dfa6"
            ]
        ]
    },
    {
        "id": "826d0dcf77325af5",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_ra",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'roller_arm' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 410,
        "wires": [
            [
                "3fbe03339e19a1f0"
            ]
        ]
    },
    {
        "id": "f4c564bf628e4f6e",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_ret",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'RET' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 440,
        "wires": [
            [
                "0f614267d06cbc5f"
            ]
        ]
    },
    {
        "id": "252f64143f91d74c",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_cc1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC1' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1160,
        "y": 1260,
        "wires": [
            [
                "c4d969f8a66f8250"
            ]
        ]
    },
    {
        "id": "aae13ea7c79368af",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_cc234",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC234' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1170,
        "y": 1290,
        "wires": [
            [
                "9a9674a9ca294c7a"
            ]
        ]
    },
    {
        "id": "0b6ac27844a7d386",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 670,
        "y": 2010,
        "wires": [
            []
        ]
    },
    {
        "id": "48ed3d19461232b4",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 680,
        "y": 2040,
        "wires": [
            []
        ]
    },
    {
        "id": "fc2ca6e3c5aba7c7",
        "type": "string",
        "z": "1b4e1941106a31e1",
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
        "x": 390,
        "y": 180,
        "wires": [
            [
                "4fcc742bd4b70177",
                "90c4ec738cb81b2f",
                "826d0dcf77325af5",
                "f4c564bf628e4f6e",
                "e5cad0b3c3d2cb7e",
                "54492d1afc5472b0",
                "b9c5ebbbb6ee7f13",
                "c83223ae78874e00",
                "9c790086d4b86e07",
                "653ebbe1f51332ef",
                "b007a86af5ec20c8",
                "7e5d40caefa9d651",
                "a986fc4e0c95b75c",
                "931aa934aea9e002",
                "03442a95c6f1f28f",
                "c90c982e2c60525d",
                "80da2ac28a12c272",
                "829ce5d7beeeadf0",
                "f4b73cf068527e96",
                "1c4abc11171bbc37",
                "3f9e583516bf4245",
                "09d899f19b87b813",
                "252f64143f91d74c",
                "aae13ea7c79368af"
            ]
        ]
    },
    {
        "id": "9fc75b41447e8b0f",
        "type": "debug",
        "z": "1b4e1941106a31e1",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 900,
        "y": 1680,
        "wires": []
    },
    {
        "id": "9368475f6c21ff22",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "d6f8fe8ea9fa19f9",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 560,
        "wires": [
            []
        ]
    },
    {
        "id": "609b3df6e1e01629",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "d6f8fe8ea9fa19f9",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 565,
        "wires": [
            []
        ]
    },
    {
        "id": "b162d8fe4c47eaed",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9d2d53d85475b97a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 600,
        "wires": [
            []
        ]
    },
    {
        "id": "4e438e88c2d02599",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9d2d53d85475b97a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 605,
        "wires": [
            []
        ]
    },
    {
        "id": "3ebe91ebdc126928",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9bd67ebee281b48c",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 645,
        "wires": [
            []
        ]
    },
    {
        "id": "869f63bf8c99d0f4",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "e39daa1d47307b42",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 685,
        "wires": [
            []
        ]
    },
    {
        "id": "38c1892a98490de6",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "0e4201a324868997",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 725,
        "wires": [
            []
        ]
    },
    {
        "id": "c46dc0a69407bcc9",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "a7d3ea371afb76ac",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 765,
        "wires": [
            []
        ]
    },
    {
        "id": "22f31e28cf4583c5",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "6d71e4606e2bc799",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 805,
        "wires": [
            []
        ]
    },
    {
        "id": "2be069fde724a05e",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9658be115d56e62e",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 845,
        "wires": [
            []
        ]
    },
    {
        "id": "b73dd7802f143f63",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "003ba7cb54fcb503",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 885,
        "wires": [
            []
        ]
    },
    {
        "id": "982e9962354dac0a",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "20a1d0c9e0a11606",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 925,
        "wires": [
            []
        ]
    },
    {
        "id": "bf974673c5c5600e",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "13693d4660aaa49b",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 965,
        "wires": [
            []
        ]
    },
    {
        "id": "80bbd992d1e3dfa6",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "de56a2ba425bd8a3",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1590,
        "y": 1005,
        "wires": [
            []
        ]
    },
    {
        "id": "d28eb9cb2f15ac56",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9bd67ebee281b48c",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 640,
        "wires": [
            []
        ]
    },
    {
        "id": "9bc0612b6a8e34e2",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "e39daa1d47307b42",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 680,
        "wires": [
            []
        ]
    },
    {
        "id": "abeb37bfc7fb5fee",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "0e4201a324868997",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 720,
        "wires": [
            []
        ]
    },
    {
        "id": "96b4a7cfa38683b7",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "a7d3ea371afb76ac",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 760,
        "wires": [
            []
        ]
    },
    {
        "id": "ce5518f063ea8c9c",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "6d71e4606e2bc799",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 800,
        "wires": [
            []
        ]
    },
    {
        "id": "e812c2f8172e05c1",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9658be115d56e62e",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 840,
        "wires": [
            []
        ]
    },
    {
        "id": "a3b617147497e93b",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "003ba7cb54fcb503",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 880,
        "wires": [
            []
        ]
    },
    {
        "id": "9760e930f6c64eef",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "20a1d0c9e0a11606",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 920,
        "wires": [
            []
        ]
    },
    {
        "id": "997ae02fc0cf350b",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "13693d4660aaa49b",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 960,
        "wires": [
            []
        ]
    },
    {
        "id": "6ea685dca7f5559b",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "de56a2ba425bd8a3",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1120,
        "y": 1000,
        "wires": [
            []
        ]
    },
    {
        "id": "797eb0a71fe673a1",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm200_conn",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CONN' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 480,
        "wires": [
            [
                "4b0b539c9c063276"
            ]
        ]
    },
    {
        "id": "d900a86d9e065962",
        "type": "function",
        "z": "1b4e1941106a31e1",
        "name": "tb_pm220_conn",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CONN' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1180,
        "y": 480,
        "wires": [
            []
        ]
    },
    {
        "id": "d0b4ce365ba53467",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "b0b5d17e0d47873b",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 80,
        "wires": [
            []
        ]
    },
    {
        "id": "b85efedcc0a3cf9f",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "27143dd078882d5a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 120,
        "wires": [
            []
        ]
    },
    {
        "id": "2875b2305d591153",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "456bf5734e9c307a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "e6ef65030e8143ad",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "5f27e1eb639a79e9",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 200,
        "wires": [
            []
        ]
    },
    {
        "id": "e71389013b6fcb29",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "4ce5f0b7efd70b35",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 240,
        "wires": [
            []
        ]
    },
    {
        "id": "4b0b539c9c063276",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "83f5107d93d40655",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1160,
        "y": 280,
        "wires": [
            []
        ]
    },
    {
        "id": "a8f44fda267a49b0",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "b0b5d17e0d47873b",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 280,
        "wires": [
            []
        ]
    },
    {
        "id": "68aa8f703579b5e6",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "27143dd078882d5a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "3fbe03339e19a1f0",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "5f27e1eb639a79e9",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "0f614267d06cbc5f",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "4ce5f0b7efd70b35",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1380,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "6a0a836417f16bf1",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9308297cd22ba75a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1380,
        "wires": [
            []
        ]
    },
    {
        "id": "d8595fa1a960e977",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9c7572d7514f7c5a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1420,
        "wires": [
            []
        ]
    },
    {
        "id": "cbd2f70d5a5808a9",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "4b5a8b20dd473677",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1460,
        "wires": [
            []
        ]
    },
    {
        "id": "f8c17fb1e8e94680",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "f98afec4c0fd1266",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1500,
        "wires": [
            []
        ]
    },
    {
        "id": "13220498a62cf61d",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "5bbbba41303dd9b7",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1540,
        "wires": [
            []
        ]
    },
    {
        "id": "7dfa7d96edd136ab",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "f34412633c031a7a",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1580,
        "wires": [
            []
        ]
    },
    {
        "id": "d758f56c030bb5bd",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "b93ac39ec7db04a2",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1620,
        "wires": [
            []
        ]
    },
    {
        "id": "aef7ccc787d651b8",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "05c9502530e44a32",
        "name": "LED kWh",
        "order": 1,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1240,
        "y": 1660,
        "wires": [
            []
        ]
    },
    {
        "id": "4c6974d6de7db15a",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9308297cd22ba75a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1080,
        "wires": [
            []
        ]
    },
    {
        "id": "ff6b223e94499280",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "9c7572d7514f7c5a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1120,
        "wires": [
            []
        ]
    },
    {
        "id": "0251b605797495e4",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "4b5a8b20dd473677",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1160,
        "wires": [
            []
        ]
    },
    {
        "id": "104fd1300de589a9",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "f98afec4c0fd1266",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1200,
        "wires": [
            []
        ]
    },
    {
        "id": "4fb15b1c268699d4",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "5bbbba41303dd9b7",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1240,
        "wires": [
            []
        ]
    },
    {
        "id": "7aeb322e14a37e05",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "f34412633c031a7a",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1280,
        "wires": [
            []
        ]
    },
    {
        "id": "c4d969f8a66f8250",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "b93ac39ec7db04a2",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1320,
        "wires": [
            []
        ]
    },
    {
        "id": "9a9674a9ca294c7a",
        "type": "ui_template",
        "z": "1b4e1941106a31e1",
        "group": "05c9502530e44a32",
        "name": "LED kWh",
        "order": 2,
        "width": 1,
        "height": 1,
        "format": "<style>\n    .led-container {\n        text-align: center;\n        padding: 0;\n        margin: 0;\n        font-family: \"Segoe UI\", sans-serif;\n    }\n\n    .led-square {\n        width: 30px;\n        height: 30px;\n        border-radius: 0px;\n        /* kotak */\n        margin: 0 auto;\n        transition: all .25s ease;\n        border: 2px solid #cfcfcf;\n        background: #e5e5e5;\n        box-shadow:\n            0 1px 3px rgba(0, 0, 0, 0.12),\n            inset 0 2px 3px rgba(255, 255, 255, 0.6);\n\n        display: flex;\n        justify-content: center;\n        align-items: center;\n\n        font-size: 11px;\n        font-weight: 600;\n        color: #000000 !important;\n        /* <-- TEKS SELALU HITAM */\n    }\n\n    .led-on {\n        background: linear-gradient(to bottom, #4cd964, #32b84c);\n        border-color: #32b84c;\n        box-shadow:\n            0 3px 6px rgba(0, 0, 0, 0.2),\n            inset 0 2px 4px rgba(255, 255, 255, 0.55);\n    }\n</style>\n\n<div class=\"led-container\">\n    <div class=\"led-square\" ng-class=\"{'led-on': msg.payload > 0}\">\n        {{ msg.powerMeter || '' }}\n    </div>\n</div>",
        "storeOutMessages": true,
        "fwdInMessages": true,
        "resendOnRefresh": true,
        "templateScope": "local",
        "className": "",
        "x": 1400,
        "y": 1360,
        "wires": [
            []
        ]
    },
    {
        "id": "c7c23cbdaf670945",
        "type": "ui_button",
        "z": "1b4e1941106a31e1",
        "name": "",
        "group": "a2c47cee39a75d66",
        "order": 1,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Kalibrasi",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "-1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 800,
        "y": 1380,
        "wires": [
            [
                "d0b4ce365ba53467",
                "b85efedcc0a3cf9f",
                "2875b2305d591153",
                "e6ef65030e8143ad",
                "e71389013b6fcb29",
                "4b0b539c9c063276",
                "a8f44fda267a49b0",
                "68aa8f703579b5e6",
                "3fbe03339e19a1f0",
                "0f614267d06cbc5f",
                "9368475f6c21ff22",
                "b162d8fe4c47eaed",
                "d28eb9cb2f15ac56",
                "9bc0612b6a8e34e2",
                "abeb37bfc7fb5fee",
                "96b4a7cfa38683b7",
                "ce5518f063ea8c9c",
                "e812c2f8172e05c1",
                "a3b617147497e93b",
                "9760e930f6c64eef",
                "997ae02fc0cf350b",
                "6ea685dca7f5559b",
                "609b3df6e1e01629",
                "4e438e88c2d02599",
                "3ebe91ebdc126928",
                "869f63bf8c99d0f4",
                "38c1892a98490de6",
                "c46dc0a69407bcc9",
                "22f31e28cf4583c5",
                "2be069fde724a05e",
                "b73dd7802f143f63",
                "982e9962354dac0a",
                "bf974673c5c5600e",
                "80bbd992d1e3dfa6",
                "4c6974d6de7db15a",
                "ff6b223e94499280",
                "0251b605797495e4",
                "104fd1300de589a9",
                "4fb15b1c268699d4",
                "7aeb322e14a37e05",
                "c4d969f8a66f8250",
                "9a9674a9ca294c7a",
                "6a0a836417f16bf1",
                "d8595fa1a960e977",
                "cbd2f70d5a5808a9",
                "f8c17fb1e8e94680",
                "13220498a62cf61d",
                "7dfa7d96edd136ab",
                "d758f56c030bb5bd",
                "aef7ccc787d651b8"
            ]
        ]
    },
    {
        "id": "345bc0ae1a4fe23a",
        "type": "link in",
        "z": "1b4e1941106a31e1",
        "name": "link in 2",
        "links": [
            "d7225d433af33d4b"
        ],
        "x": 125,
        "y": 140,
        "wires": [
            [
                "e42735596f862d9a",
                "3fc4e291d177259a",
                "121dfa5c4ae2ff4a",
                "fc2ca6e3c5aba7c7"
            ]
        ]
    },
    {
        "id": "d6f8fe8ea9fa19f9",
        "type": "ui_group",
        "name": "CR1",
        "tab": "9fa1b21cd480bf39",
        "order": 2,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9d2d53d85475b97a",
        "type": "ui_group",
        "name": "CR2",
        "tab": "9fa1b21cd480bf39",
        "order": 3,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9bd67ebee281b48c",
        "type": "ui_group",
        "name": "CR3",
        "tab": "9fa1b21cd480bf39",
        "order": 4,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "e39daa1d47307b42",
        "type": "ui_group",
        "name": "CR4",
        "tab": "9fa1b21cd480bf39",
        "order": 5,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "0e4201a324868997",
        "type": "ui_group",
        "name": "CR5",
        "tab": "9fa1b21cd480bf39",
        "order": 6,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "a7d3ea371afb76ac",
        "type": "ui_group",
        "name": "CR6",
        "tab": "9fa1b21cd480bf39",
        "order": 7,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "6d71e4606e2bc799",
        "type": "ui_group",
        "name": "CR7",
        "tab": "9fa1b21cd480bf39",
        "order": 8,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9658be115d56e62e",
        "type": "ui_group",
        "name": "CR8",
        "tab": "9fa1b21cd480bf39",
        "order": 9,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "003ba7cb54fcb503",
        "type": "ui_group",
        "name": "CR9",
        "tab": "9fa1b21cd480bf39",
        "order": 10,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "20a1d0c9e0a11606",
        "type": "ui_group",
        "name": "CR10",
        "tab": "9fa1b21cd480bf39",
        "order": 11,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "13693d4660aaa49b",
        "type": "ui_group",
        "name": "CR11",
        "tab": "9fa1b21cd480bf39",
        "order": 12,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "de56a2ba425bd8a3",
        "type": "ui_group",
        "name": "CR12",
        "tab": "9fa1b21cd480bf39",
        "order": 13,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "b0b5d17e0d47873b",
        "type": "ui_group",
        "name": "BS1",
        "tab": "9fa1b21cd480bf39",
        "order": 14,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "27143dd078882d5a",
        "type": "ui_group",
        "name": "BS2",
        "tab": "9fa1b21cd480bf39",
        "order": 15,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "456bf5734e9c307a",
        "type": "ui_group",
        "name": "HLA",
        "tab": "9fa1b21cd480bf39",
        "order": 19,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "5f27e1eb639a79e9",
        "type": "ui_group",
        "name": "ROLLER ARM",
        "tab": "9fa1b21cd480bf39",
        "order": 18,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "4ce5f0b7efd70b35",
        "type": "ui_group",
        "name": "RET",
        "tab": "9fa1b21cd480bf39",
        "order": 16,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "83f5107d93d40655",
        "type": "ui_group",
        "name": "CONN",
        "tab": "9fa1b21cd480bf39",
        "order": 17,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9308297cd22ba75a",
        "type": "ui_group",
        "name": "CHAB",
        "tab": "9fa1b21cd480bf39",
        "order": 20,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9c7572d7514f7c5a",
        "type": "ui_group",
        "name": "CHCD",
        "tab": "9fa1b21cd480bf39",
        "order": 21,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "4b5a8b20dd473677",
        "type": "ui_group",
        "name": "CHEF",
        "tab": "9fa1b21cd480bf39",
        "order": 22,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "f98afec4c0fd1266",
        "type": "ui_group",
        "name": "CHSAA",
        "tab": "9fa1b21cd480bf39",
        "order": 23,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "5bbbba41303dd9b7",
        "type": "ui_group",
        "name": "CHSAB",
        "tab": "9fa1b21cd480bf39",
        "order": 24,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "f34412633c031a7a",
        "type": "ui_group",
        "name": "CHSAC",
        "tab": "9fa1b21cd480bf39",
        "order": 25,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "b93ac39ec7db04a2",
        "type": "ui_group",
        "name": "CC1",
        "tab": "9fa1b21cd480bf39",
        "order": 26,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "05c9502530e44a32",
        "type": "ui_group",
        "name": "CC234",
        "tab": "9fa1b21cd480bf39",
        "order": 27,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "a2c47cee39a75d66",
        "type": "ui_group",
        "name": "Kalibrasi",
        "tab": "9fa1b21cd480bf39",
        "order": 1,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9fa1b21cd480bf39",
        "type": "ui_tab",
        "name": "Otics Monitoring Energy Listrik",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "0d1545d61fe684ee",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-dashboard": "3.6.6"
        }
    }
]
