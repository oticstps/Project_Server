[
    {
        "id": "38de9926be5596c0",
        "type": "string",
        "z": "42d2db018b6a233c",
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
        "x": 505,
        "y": 1750,
        "wires": [
            [
                "1d15f1f36df5cbb3",
                "3039afe37eb3c699",
                "a75f46da125a1479"
            ]
        ]
    },
    {
        "id": "d167b20b9640fe49",
        "type": "debug",
        "z": "42d2db018b6a233c",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 595,
        "y": 130,
        "wires": []
    },
    {
        "id": "dc3739d8eac036c6",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 1910,
        "wires": [
            []
        ]
    },
    {
        "id": "b293effedae539a5",
        "type": "string",
        "z": "42d2db018b6a233c",
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
        "x": 525,
        "y": 870,
        "wires": [
            [
                "dc3739d8eac036c6",
                "430aa0da8a802bd0",
                "4b836a414b78b3ec",
                "71cb2a430f441fa9",
                "1dae1c7760e8bc1d",
                "0564e3e4c98203e3",
                "f32f96f5a94cf773",
                "a77e21b620b4b410",
                "8b2d6cf53919386c",
                "411e7ebc82acf4c4",
                "84cca36684be2bdb",
                "2778050cc8b23acc",
                "a5f96a0ee1004b54",
                "32744be688b003b4",
                "3467ba70559eab8c",
                "055db7b90042a8c4",
                "1390ecb78b58412c",
                "e7b28afddf91e6f4",
                "f92b3827e5dedbc0",
                "7f4e76aaddd06835",
                "1db0a8640c7a2d86",
                "a68f82801cf3d9ec",
                "c53aef9933642200",
                "898098c223c7c3e9",
                "f19e5be2e468d71d",
                "988469071012c01f",
                "68838cb1cf341f6b",
                "228585a96c19db8d",
                "53f10839cc9fd860",
                "feb64cafc939f378",
                "19d103899b830d46",
                "f4a704e08cdb5267",
                "2c061c4a2fb490f9",
                "45088fe4a0474c40",
                "5763499b5fde3f1a",
                "eeb8c407bf55742f",
                "835463f401b3457b",
                "d171b14b59cab4e5",
                "2905083a9eaaf20b"
            ]
        ]
    },
    {
        "id": "91a849f6ef395f30",
        "type": "string",
        "z": "42d2db018b6a233c",
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
        "x": 1005,
        "y": 1945,
        "wires": [
            [
                "dc3739d8eac036c6"
            ]
        ]
    },
    {
        "id": "1d15f1f36df5cbb3",
        "type": "debug",
        "z": "42d2db018b6a233c",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 775,
        "y": 130,
        "wires": []
    },
    {
        "id": "430aa0da8a802bd0",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "W Eng ALL PM 200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 825,
        "y": 1870,
        "wires": [
            []
        ]
    },
    {
        "id": "3039afe37eb3c699",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 835,
        "y": 1750,
        "wires": [
            [
                "4ae77606f79f7ded"
            ]
        ]
    },
    {
        "id": "a75f46da125a1479",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 825,
        "y": 1780,
        "wires": [
            []
        ]
    },
    {
        "id": "4b836a414b78b3ec",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 1900,
        "wires": [
            [
                "91a849f6ef395f30"
            ]
        ]
    },
    {
        "id": "1dae1c7760e8bc1d",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1960,
        "wires": [
            []
        ]
    },
    {
        "id": "0564e3e4c98203e3",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1990,
        "wires": [
            []
        ]
    },
    {
        "id": "71cb2a430f441fa9",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1930,
        "wires": [
            []
        ]
    },
    {
        "id": "a77e21b620b4b410",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 2050,
        "wires": [
            []
        ]
    },
    {
        "id": "f32f96f5a94cf773",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 2020,
        "wires": [
            []
        ]
    },
    {
        "id": "8b2d6cf53919386c",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_bs1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1055,
        "y": 390,
        "wires": [
            [
                "7d572552fc656edd"
            ]
        ]
    },
    {
        "id": "411e7ebc82acf4c4",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_bs2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1055,
        "y": 420,
        "wires": [
            [
                "57ed636474e22fea"
            ]
        ]
    },
    {
        "id": "988469071012c01f",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_chab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH' && pm === 'PM-200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 1150,
        "wires": [
            [
                "4ce118c1e56e1f91"
            ]
        ]
    },
    {
        "id": "68838cb1cf341f6b",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_chcd",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH-CD' && pm === 'PM-3F') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 1180,
        "wires": [
            [
                "04200ae8da385242"
            ]
        ]
    },
    {
        "id": "228585a96c19db8d",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_chef",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_EF' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 1210,
        "wires": [
            [
                "82b222c8c30d17a3"
            ]
        ]
    },
    {
        "id": "53f10839cc9fd860",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_chsaa",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAA' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 825,
        "y": 1240,
        "wires": [
            [
                "2d11aeefe7593cba"
            ]
        ]
    },
    {
        "id": "feb64cafc939f378",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_chsab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAB' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 825,
        "y": 1270,
        "wires": [
            [
                "0d30b544357d39e1"
            ]
        ]
    },
    {
        "id": "19d103899b830d46",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_chsac",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_SAC' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 825,
        "y": 1300,
        "wires": [
            [
                "8d3496b098988a6f"
            ]
        ]
    },
    {
        "id": "32744be688b003b4",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_cr1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_1' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 690,
        "wires": [
            [
                "3f9edf8cb5b25f89"
            ]
        ]
    },
    {
        "id": "3467ba70559eab8c",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_cr2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 720,
        "wires": [
            [
                "f7374a9c93d98899"
            ]
        ]
    },
    {
        "id": "055db7b90042a8c4",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr3",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_3' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 750,
        "wires": [
            [
                "b7682bdf8d3c020c"
            ]
        ]
    },
    {
        "id": "1390ecb78b58412c",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr4",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_4' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 780,
        "wires": [
            [
                "17587f19366d6f37"
            ]
        ]
    },
    {
        "id": "e7b28afddf91e6f4",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr5",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_5' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 810,
        "wires": [
            [
                "b1a50bdb01ba918c"
            ]
        ]
    },
    {
        "id": "f92b3827e5dedbc0",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr6",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_6' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 840,
        "wires": [
            [
                "e316e64722787c84"
            ]
        ]
    },
    {
        "id": "7f4e76aaddd06835",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr7",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_7' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 870,
        "wires": [
            [
                "11396728f5cc6940"
            ]
        ]
    },
    {
        "id": "1db0a8640c7a2d86",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr8",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_8' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 900,
        "wires": [
            [
                "f20f2e376bfb078d"
            ]
        ]
    },
    {
        "id": "a68f82801cf3d9ec",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr9",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_9' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 930,
        "wires": [
            [
                "40ed3ce422ef94a3"
            ]
        ]
    },
    {
        "id": "c53aef9933642200",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr10",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_10' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 960,
        "wires": [
            [
                "3c513e726bf3d53a"
            ]
        ]
    },
    {
        "id": "898098c223c7c3e9",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr11",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_11' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 990,
        "wires": [
            [
                "1d04ad6de539a068"
            ]
        ]
    },
    {
        "id": "f19e5be2e468d71d",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr12",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_12' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1075,
        "y": 1020,
        "wires": [
            [
                "1c9046df43c8aac5"
            ]
        ]
    },
    {
        "id": "84cca36684be2bdb",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_hla",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'HLA' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1055,
        "y": 450,
        "wires": [
            [
                "b990a5b909f5554e"
            ]
        ]
    },
    {
        "id": "2778050cc8b23acc",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_ra",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'roller_arm' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1045,
        "y": 480,
        "wires": [
            [
                "8ce5794a4e05d9e5"
            ]
        ]
    },
    {
        "id": "a5f96a0ee1004b54",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_ret",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'RET' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1055,
        "y": 510,
        "wires": [
            [
                "93a8fddb19de04cf"
            ]
        ]
    },
    {
        "id": "f4a704e08cdb5267",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cc1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 1330,
        "wires": [
            [
                "86e7804046a03442"
            ]
        ]
    },
    {
        "id": "2c061c4a2fb490f9",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cc234",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC234' && pm === 'PM_200V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 825,
        "y": 1360,
        "wires": [
            [
                "52a6e8dc2ffae6bf"
            ]
        ]
    },
    {
        "id": "45088fe4a0474c40",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 1810,
        "wires": [
            []
        ]
    },
    {
        "id": "5763499b5fde3f1a",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 1840,
        "wires": [
            []
        ]
    },
    {
        "id": "ab8470544e456fe0",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_bs1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 390,
        "wires": [
            [
                "977edb79c9ad38f7"
            ]
        ]
    },
    {
        "id": "c26f915b40eb1402",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_bs2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'BS_2' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 420,
        "wires": [
            [
                "32a203cd2edcd971"
            ]
        ]
    },
    {
        "id": "d6bb8b4845c8d1a9",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_chab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH' && pm === 'PM-220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1295,
        "y": 1150,
        "wires": [
            [
                "832b7787f1ab94ae"
            ]
        ]
    },
    {
        "id": "a533f237f4c7cb0c",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_chcd",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'DPCH-CD' && pm === 'PM-1F') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1295,
        "y": 1180,
        "wires": [
            [
                "061a589c11b8a075"
            ]
        ]
    },
    {
        "id": "3688ae854103112d",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_chef",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_EF' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1295,
        "y": 1210,
        "wires": [
            [
                "7679e68359745805"
            ]
        ]
    },
    {
        "id": "a5ca37d70ab47747",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_chsaa",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAA' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1305,
        "y": 1240,
        "wires": [
            [
                "d773815f488b82cf"
            ]
        ]
    },
    {
        "id": "e68d74cab183eb64",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_chsab",
        "func": "\nlet panel = msg.payload[1];\nlet pm = msg.payload[2];\nlet wh = msg.payload[3];\n\nif (panel === 'CH_SAB' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1305,
        "y": 1270,
        "wires": [
            [
                "9ecfee391e80164c"
            ]
        ]
    },
    {
        "id": "3d6bb521c51e60f7",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_chsac",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CH_SAC' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1305,
        "y": 1300,
        "wires": [
            [
                "c94efb9d7e9e1293"
            ]
        ]
    },
    {
        "id": "9f27eeafb11d357f",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_1' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 690,
        "wires": [
            [
                "22d2c9a9fa09beae"
            ]
        ]
    },
    {
        "id": "3854b231f5144a0c",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr2",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_2' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 720,
        "wires": [
            [
                "d017a9b0ce8b39c8"
            ]
        ]
    },
    {
        "id": "086697090a4fda3c",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr3",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_3' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 750,
        "wires": [
            [
                "b5dcc18fb4f691df"
            ]
        ]
    },
    {
        "id": "89094fda267170b2",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr4",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_4' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 780,
        "wires": [
            [
                "bf26f20b1d0a5c1b"
            ]
        ]
    },
    {
        "id": "058d53d6a2e83388",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr5",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_5' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 810,
        "wires": [
            [
                "03182644943ed024"
            ]
        ]
    },
    {
        "id": "ac63db8d26a2d525",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr6",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_6' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 840,
        "wires": [
            [
                "8e0db640788fc146"
            ]
        ]
    },
    {
        "id": "af21d0dfee71895a",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr7",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'cr7' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 870,
        "wires": [
            [
                "3da7d72bf7b8cb83"
            ]
        ]
    },
    {
        "id": "a270a8ef6e875ece",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr8",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_8' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 900,
        "wires": [
            [
                "a7ed015d54e2bfe6"
            ]
        ]
    },
    {
        "id": "90312e6e6c484e64",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr9",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_9' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 930,
        "wires": [
            [
                "d81547b61699e1da"
            ]
        ]
    },
    {
        "id": "4ece06f291af562f",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr10",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_10' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 960,
        "wires": [
            [
                "74d4be600ea6b52b"
            ]
        ]
    },
    {
        "id": "47ab36a2a8cc6dde",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr11",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_11' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 990,
        "wires": [
            [
                "1b8d18ce8c4d6fba"
            ]
        ]
    },
    {
        "id": "18712e3f5df98fed",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_cr12",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CR_12' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1555,
        "y": 1020,
        "wires": [
            [
                "0ff71c583833c58b"
            ]
        ]
    },
    {
        "id": "5ee384ed31dfa8ae",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_ra",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'roller_arm' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1305,
        "y": 480,
        "wires": [
            [
                "65fda03e582c8afc"
            ]
        ]
    },
    {
        "id": "11261c8de6a70f5d",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_ret",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'RET' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 510,
        "wires": [
            [
                "1b6c0ad60b392362"
            ]
        ]
    },
    {
        "id": "777fd35946ee595f",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_cc1",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC1' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1295,
        "y": 1330,
        "wires": [
            [
                "c86d0c7ca7eb98c2"
            ]
        ]
    },
    {
        "id": "141d8bc3bef01bec",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_cc234",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CC234' && pm === 'PM_220V') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1305,
        "y": 1360,
        "wires": [
            [
                "caba2833c420be26"
            ]
        ]
    },
    {
        "id": "835463f401b3457b",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_ct",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 805,
        "y": 2080,
        "wires": [
            []
        ]
    },
    {
        "id": "eeb8c407bf55742f",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_lpf3",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 2110,
        "wires": [
            []
        ]
    },
    {
        "id": "2a34bf79f3632b9e",
        "type": "string",
        "z": "42d2db018b6a233c",
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
        "x": 525,
        "y": 250,
        "wires": [
            [
                "ab8470544e456fe0",
                "c26f915b40eb1402",
                "5ee384ed31dfa8ae",
                "11261c8de6a70f5d",
                "9f27eeafb11d357f",
                "3854b231f5144a0c",
                "086697090a4fda3c",
                "89094fda267170b2",
                "058d53d6a2e83388",
                "ac63db8d26a2d525",
                "af21d0dfee71895a",
                "a270a8ef6e875ece",
                "90312e6e6c484e64",
                "4ece06f291af562f",
                "47ab36a2a8cc6dde",
                "18712e3f5df98fed",
                "d6bb8b4845c8d1a9",
                "a533f237f4c7cb0c",
                "3688ae854103112d",
                "a5ca37d70ab47747",
                "e68d74cab183eb64",
                "3d6bb521c51e60f7",
                "777fd35946ee595f",
                "141d8bc3bef01bec"
            ]
        ]
    },
    {
        "id": "4ae77606f79f7ded",
        "type": "debug",
        "z": "42d2db018b6a233c",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1035,
        "y": 1750,
        "wires": []
    },
    {
        "id": "3f9edf8cb5b25f89",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "4af9321e3ade111b",
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
        "x": 1255,
        "y": 630,
        "wires": [
            []
        ]
    },
    {
        "id": "22d2c9a9fa09beae",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "4af9321e3ade111b",
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
        "x": 1725,
        "y": 635,
        "wires": [
            []
        ]
    },
    {
        "id": "f7374a9c93d98899",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "1cfc47961784accc",
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
        "x": 1255,
        "y": 670,
        "wires": [
            []
        ]
    },
    {
        "id": "d017a9b0ce8b39c8",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "1cfc47961784accc",
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
        "x": 1725,
        "y": 675,
        "wires": [
            []
        ]
    },
    {
        "id": "b5dcc18fb4f691df",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "01af6d6519920725",
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
        "x": 1725,
        "y": 715,
        "wires": [
            []
        ]
    },
    {
        "id": "bf26f20b1d0a5c1b",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "cb3e6c1f356f4c40",
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
        "x": 1725,
        "y": 755,
        "wires": [
            []
        ]
    },
    {
        "id": "03182644943ed024",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "37bd8f1ea26da68a",
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
        "x": 1725,
        "y": 795,
        "wires": [
            []
        ]
    },
    {
        "id": "8e0db640788fc146",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "c6d44745f0cdf3a4",
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
        "x": 1725,
        "y": 835,
        "wires": [
            []
        ]
    },
    {
        "id": "3da7d72bf7b8cb83",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "d7442e27936d1fd5",
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
        "x": 1725,
        "y": 875,
        "wires": [
            []
        ]
    },
    {
        "id": "a7ed015d54e2bfe6",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "5792e416bf98caf2",
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
        "x": 1725,
        "y": 915,
        "wires": [
            []
        ]
    },
    {
        "id": "d81547b61699e1da",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "cddc76b40154c524",
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
        "x": 1725,
        "y": 955,
        "wires": [
            []
        ]
    },
    {
        "id": "74d4be600ea6b52b",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "9c7acbf8ae7bbfdf",
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
        "x": 1725,
        "y": 995,
        "wires": [
            []
        ]
    },
    {
        "id": "1b8d18ce8c4d6fba",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "3c17029fe6139c89",
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
        "x": 1725,
        "y": 1035,
        "wires": [
            []
        ]
    },
    {
        "id": "0ff71c583833c58b",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "5227a158b35eb96b",
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
        "x": 1725,
        "y": 1075,
        "wires": [
            []
        ]
    },
    {
        "id": "b7682bdf8d3c020c",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "01af6d6519920725",
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
        "x": 1255,
        "y": 710,
        "wires": [
            []
        ]
    },
    {
        "id": "17587f19366d6f37",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "cb3e6c1f356f4c40",
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
        "x": 1255,
        "y": 750,
        "wires": [
            []
        ]
    },
    {
        "id": "b1a50bdb01ba918c",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "37bd8f1ea26da68a",
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
        "x": 1255,
        "y": 790,
        "wires": [
            []
        ]
    },
    {
        "id": "e316e64722787c84",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "c6d44745f0cdf3a4",
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
        "x": 1255,
        "y": 830,
        "wires": [
            []
        ]
    },
    {
        "id": "11396728f5cc6940",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "d7442e27936d1fd5",
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
        "x": 1255,
        "y": 870,
        "wires": [
            []
        ]
    },
    {
        "id": "f20f2e376bfb078d",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "5792e416bf98caf2",
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
        "x": 1255,
        "y": 910,
        "wires": [
            []
        ]
    },
    {
        "id": "40ed3ce422ef94a3",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "cddc76b40154c524",
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
        "x": 1255,
        "y": 950,
        "wires": [
            []
        ]
    },
    {
        "id": "3c513e726bf3d53a",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "9c7acbf8ae7bbfdf",
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
        "x": 1255,
        "y": 990,
        "wires": [
            []
        ]
    },
    {
        "id": "1d04ad6de539a068",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "3c17029fe6139c89",
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
        "x": 1255,
        "y": 1030,
        "wires": [
            []
        ]
    },
    {
        "id": "1c9046df43c8aac5",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "5227a158b35eb96b",
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
        "x": 1255,
        "y": 1070,
        "wires": [
            []
        ]
    },
    {
        "id": "d171b14b59cab4e5",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm200_conn",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CONN' && pm === 'PM 200') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1055,
        "y": 550,
        "wires": [
            [
                "054d1c92ebccca2c"
            ]
        ]
    },
    {
        "id": "2905083a9eaaf20b",
        "type": "function",
        "z": "42d2db018b6a233c",
        "name": "tb_pm220_conn",
        "func": "\nlet panel = msg.payload[0];\nlet pm = msg.payload[1];\nlet wh = msg.payload[2];\n\nif (panel === 'CONN' && pm === 'PM 220') {\n    msg.payload = wh;\n    msg.powerMeter = pm;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1315,
        "y": 550,
        "wires": [
            []
        ]
    },
    {
        "id": "7d572552fc656edd",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "3a908c62f868440c",
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
        "x": 1295,
        "y": 150,
        "wires": [
            []
        ]
    },
    {
        "id": "57ed636474e22fea",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "0f7afa53ab66cb06",
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
        "x": 1295,
        "y": 190,
        "wires": [
            []
        ]
    },
    {
        "id": "b990a5b909f5554e",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "249658a4a069f2b7",
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
        "x": 1295,
        "y": 230,
        "wires": [
            []
        ]
    },
    {
        "id": "8ce5794a4e05d9e5",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "da60a025b5ac4c1a",
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
        "x": 1295,
        "y": 270,
        "wires": [
            []
        ]
    },
    {
        "id": "93a8fddb19de04cf",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "e54720ebbda2dca2",
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
        "x": 1295,
        "y": 310,
        "wires": [
            []
        ]
    },
    {
        "id": "054d1c92ebccca2c",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "595578c378291a3e",
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
        "x": 1295,
        "y": 350,
        "wires": [
            []
        ]
    },
    {
        "id": "977edb79c9ad38f7",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "3a908c62f868440c",
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
        "x": 1515,
        "y": 350,
        "wires": [
            []
        ]
    },
    {
        "id": "32a203cd2edcd971",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "0f7afa53ab66cb06",
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
        "x": 1515,
        "y": 410,
        "wires": [
            []
        ]
    },
    {
        "id": "65fda03e582c8afc",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "da60a025b5ac4c1a",
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
        "x": 1515,
        "y": 450,
        "wires": [
            []
        ]
    },
    {
        "id": "1b6c0ad60b392362",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "e54720ebbda2dca2",
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
        "x": 1515,
        "y": 510,
        "wires": [
            []
        ]
    },
    {
        "id": "4ce118c1e56e1f91",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "60bba1d1e4626b5f",
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
        "x": 1375,
        "y": 1450,
        "wires": [
            []
        ]
    },
    {
        "id": "04200ae8da385242",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "6dd25643698beb36",
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
        "x": 1375,
        "y": 1490,
        "wires": [
            []
        ]
    },
    {
        "id": "82b222c8c30d17a3",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "a6ca4ded655ed5cc",
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
        "x": 1375,
        "y": 1530,
        "wires": [
            []
        ]
    },
    {
        "id": "2d11aeefe7593cba",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "e280f9525742f33a",
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
        "x": 1375,
        "y": 1570,
        "wires": [
            []
        ]
    },
    {
        "id": "0d30b544357d39e1",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "2559c2aeefb9f512",
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
        "x": 1375,
        "y": 1610,
        "wires": [
            []
        ]
    },
    {
        "id": "8d3496b098988a6f",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "a53ec80a3a501519",
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
        "x": 1375,
        "y": 1650,
        "wires": [
            []
        ]
    },
    {
        "id": "86e7804046a03442",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "dfd109b84c211806",
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
        "x": 1375,
        "y": 1690,
        "wires": [
            []
        ]
    },
    {
        "id": "52a6e8dc2ffae6bf",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "50b11a0408a87105",
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
        "x": 1375,
        "y": 1730,
        "wires": [
            []
        ]
    },
    {
        "id": "832b7787f1ab94ae",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "60bba1d1e4626b5f",
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
        "x": 1535,
        "y": 1150,
        "wires": [
            []
        ]
    },
    {
        "id": "061a589c11b8a075",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "6dd25643698beb36",
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
        "x": 1535,
        "y": 1190,
        "wires": [
            []
        ]
    },
    {
        "id": "7679e68359745805",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "a6ca4ded655ed5cc",
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
        "x": 1535,
        "y": 1230,
        "wires": [
            []
        ]
    },
    {
        "id": "d773815f488b82cf",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "e280f9525742f33a",
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
        "x": 1535,
        "y": 1270,
        "wires": [
            []
        ]
    },
    {
        "id": "9ecfee391e80164c",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "2559c2aeefb9f512",
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
        "x": 1535,
        "y": 1310,
        "wires": [
            []
        ]
    },
    {
        "id": "c94efb9d7e9e1293",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "a53ec80a3a501519",
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
        "x": 1535,
        "y": 1350,
        "wires": [
            []
        ]
    },
    {
        "id": "c86d0c7ca7eb98c2",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "dfd109b84c211806",
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
        "x": 1535,
        "y": 1390,
        "wires": [
            []
        ]
    },
    {
        "id": "caba2833c420be26",
        "type": "ui_template",
        "z": "42d2db018b6a233c",
        "group": "50b11a0408a87105",
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
        "x": 1535,
        "y": 1430,
        "wires": [
            []
        ]
    },
    {
        "id": "6cc334eee7853c1a",
        "type": "ui_button",
        "z": "42d2db018b6a233c",
        "name": "",
        "group": "add9e19d5fffef5d",
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
        "x": 935,
        "y": 1450,
        "wires": [
            [
                "7d572552fc656edd",
                "57ed636474e22fea",
                "b990a5b909f5554e",
                "8ce5794a4e05d9e5",
                "93a8fddb19de04cf",
                "054d1c92ebccca2c",
                "977edb79c9ad38f7",
                "32a203cd2edcd971",
                "65fda03e582c8afc",
                "1b6c0ad60b392362",
                "3f9edf8cb5b25f89",
                "f7374a9c93d98899",
                "b7682bdf8d3c020c",
                "17587f19366d6f37",
                "b1a50bdb01ba918c",
                "e316e64722787c84",
                "11396728f5cc6940",
                "f20f2e376bfb078d",
                "40ed3ce422ef94a3",
                "3c513e726bf3d53a",
                "1d04ad6de539a068",
                "1c9046df43c8aac5",
                "22d2c9a9fa09beae",
                "d017a9b0ce8b39c8",
                "b5dcc18fb4f691df",
                "bf26f20b1d0a5c1b",
                "03182644943ed024",
                "8e0db640788fc146",
                "3da7d72bf7b8cb83",
                "a7ed015d54e2bfe6",
                "d81547b61699e1da",
                "74d4be600ea6b52b",
                "1b8d18ce8c4d6fba",
                "0ff71c583833c58b",
                "832b7787f1ab94ae",
                "061a589c11b8a075",
                "7679e68359745805",
                "d773815f488b82cf",
                "9ecfee391e80164c",
                "c94efb9d7e9e1293",
                "c86d0c7ca7eb98c2",
                "caba2833c420be26",
                "4ce118c1e56e1f91",
                "04200ae8da385242",
                "82b222c8c30d17a3",
                "2d11aeefe7593cba",
                "0d30b544357d39e1",
                "8d3496b098988a6f",
                "86e7804046a03442",
                "52a6e8dc2ffae6bf"
            ]
        ]
    },
    {
        "id": "4d163af00060ee9d",
        "type": "link in",
        "z": "42d2db018b6a233c",
        "name": "link in 2",
        "links": [
            "1fafbcbba0019bc9"
        ],
        "x": 260,
        "y": 210,
        "wires": [
            [
                "38de9926be5596c0",
                "d167b20b9640fe49",
                "b293effedae539a5",
                "2a34bf79f3632b9e"
            ]
        ]
    },
    {
        "id": "4af9321e3ade111b",
        "type": "ui_group",
        "name": "CR1",
        "tab": "2675590d0b180447",
        "order": 2,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "1cfc47961784accc",
        "type": "ui_group",
        "name": "CR2",
        "tab": "2675590d0b180447",
        "order": 3,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "01af6d6519920725",
        "type": "ui_group",
        "name": "CR3",
        "tab": "2675590d0b180447",
        "order": 4,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "cb3e6c1f356f4c40",
        "type": "ui_group",
        "name": "CR4",
        "tab": "2675590d0b180447",
        "order": 5,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "37bd8f1ea26da68a",
        "type": "ui_group",
        "name": "CR5",
        "tab": "2675590d0b180447",
        "order": 6,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "c6d44745f0cdf3a4",
        "type": "ui_group",
        "name": "CR6",
        "tab": "2675590d0b180447",
        "order": 7,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "d7442e27936d1fd5",
        "type": "ui_group",
        "name": "CR7",
        "tab": "2675590d0b180447",
        "order": 8,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "5792e416bf98caf2",
        "type": "ui_group",
        "name": "CR8",
        "tab": "2675590d0b180447",
        "order": 9,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "cddc76b40154c524",
        "type": "ui_group",
        "name": "CR9",
        "tab": "2675590d0b180447",
        "order": 10,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "9c7acbf8ae7bbfdf",
        "type": "ui_group",
        "name": "CR10",
        "tab": "2675590d0b180447",
        "order": 11,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "3c17029fe6139c89",
        "type": "ui_group",
        "name": "CR11",
        "tab": "2675590d0b180447",
        "order": 12,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "5227a158b35eb96b",
        "type": "ui_group",
        "name": "CR12",
        "tab": "2675590d0b180447",
        "order": 13,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "3a908c62f868440c",
        "type": "ui_group",
        "name": "BS1",
        "tab": "2675590d0b180447",
        "order": 14,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "0f7afa53ab66cb06",
        "type": "ui_group",
        "name": "BS2",
        "tab": "2675590d0b180447",
        "order": 15,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "249658a4a069f2b7",
        "type": "ui_group",
        "name": "HLA",
        "tab": "2675590d0b180447",
        "order": 19,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "da60a025b5ac4c1a",
        "type": "ui_group",
        "name": "ROLLER ARM",
        "tab": "2675590d0b180447",
        "order": 18,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "e54720ebbda2dca2",
        "type": "ui_group",
        "name": "RET",
        "tab": "2675590d0b180447",
        "order": 16,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "595578c378291a3e",
        "type": "ui_group",
        "name": "CONN",
        "tab": "2675590d0b180447",
        "order": 17,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "60bba1d1e4626b5f",
        "type": "ui_group",
        "name": "CHAB",
        "tab": "2675590d0b180447",
        "order": 20,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "6dd25643698beb36",
        "type": "ui_group",
        "name": "CHCD",
        "tab": "2675590d0b180447",
        "order": 21,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "a6ca4ded655ed5cc",
        "type": "ui_group",
        "name": "CHEF",
        "tab": "2675590d0b180447",
        "order": 22,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "e280f9525742f33a",
        "type": "ui_group",
        "name": "CHSAA",
        "tab": "2675590d0b180447",
        "order": 23,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "2559c2aeefb9f512",
        "type": "ui_group",
        "name": "CHSAB",
        "tab": "2675590d0b180447",
        "order": 24,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "a53ec80a3a501519",
        "type": "ui_group",
        "name": "CHSAC",
        "tab": "2675590d0b180447",
        "order": 25,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "dfd109b84c211806",
        "type": "ui_group",
        "name": "CC1",
        "tab": "2675590d0b180447",
        "order": 26,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "50b11a0408a87105",
        "type": "ui_group",
        "name": "CC234",
        "tab": "2675590d0b180447",
        "order": 27,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "add9e19d5fffef5d",
        "type": "ui_group",
        "name": "Kalibrasi",
        "tab": "2675590d0b180447",
        "order": 1,
        "disp": true,
        "width": 2,
        "collapse": false,
        "className": ""
    },
    {
        "id": "2675590d0b180447",
        "type": "ui_tab",
        "name": "Otics Monitoring Energy Listrik",
        "icon": "dashboard",
        "order": 1,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "2c15c33b97c17146",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-dashboard": "3.6.6"
        }
    }
]
