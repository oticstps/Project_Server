[
    {
        "id": "3d6b84aa586beb78",
        "type": "debug",
        "z": "dc321937d34e0275",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 375,
        "y": 70,
        "wires": []
    },
    {
        "id": "ffa4286d810cc2c6",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2465,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1cf253e947c13e8d",
        "type": "string",
        "z": "dc321937d34e0275",
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
        "x": 405,
        "y": 315,
        "wires": [
            [
                "ffa4286d810cc2c6",
                "b9a5e69cd71d8574",
                "b81c2ad99ee11b1b",
                "2096dc283a441568",
                "6c1a241dc5593e4d",
                "d3dc3ebdeb49ce6a",
                "8eb2882304c0e02b",
                "abff8ae846e4d23e",
                "3ffb5edb79c9d004",
                "31ad3209acd5eb07",
                "84cf737d8852e977"
            ]
        ]
    },
    {
        "id": "9d94fa7af864af09",
        "type": "string",
        "z": "dc321937d34e0275",
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
        "x": 690,
        "y": 2505,
        "wires": [
            [
                "ffa4286d810cc2c6"
            ]
        ]
    },
    {
        "id": "91f72ba431538f51",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1185,
        "y": 470,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "0b16bf5e4c9dfb37",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1175,
        "y": 510,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b9a5e69cd71d8574",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2545,
        "wires": [
            [
                "9d94fa7af864af09"
            ]
        ]
    },
    {
        "id": "2096dc283a441568",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1950,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6c1a241dc5593e4d",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1990,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b81c2ad99ee11b1b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1910,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "8eb2882304c0e02b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2070,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "d3dc3ebdeb49ce6a",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2030,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1135cf358df4c899",
        "type": "comment",
        "z": "dc321937d34e0275",
        "name": "abnormal signal",
        "info": "0,PROGRES,1348,1422,427,942,0,170,NORMAL,0,0,OFF;\n",
        "x": 160,
        "y": 110,
        "wires": []
    },
    {
        "id": "f4390cada92a5fba",
        "type": "string",
        "z": "dc321937d34e0275",
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
        "x": 405,
        "y": 385,
        "wires": [
            [
                "eeeb3881e392d6ac"
            ]
        ]
    },
    {
        "id": "eeeb3881e392d6ac",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\n// Hitung shift (logika tetap sama)\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\n// Hitung variabel waktu lainnya\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Simpan semua data waktu di msg.timeData\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 420,
        "y": 430,
        "wires": [
            [
                "bf77990e17a28755",
                "9beb05b580b08262"
            ]
        ]
    },
    {
        "id": "0d947e30a2f735b9",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "parsing_kub",
        "func": "let data = msg.payload;\n\n// Pastikan string\nif (typeof data !== \"string\") {\n    return null;\n}\n\n// Pisahkan berdasarkan '#'\nlet parts = data.split('#');\n\n// Regex format yang diizinkan\nlet pattern = /^\\*kub,DA_\\d+,[\\d.]+,$/;\n\nlet validData = parts\n    .map(p => p.trim())\n    .filter(p => pattern.test(p))\n    .map(p => p + \"#\");\n\n// Jika tidak ada data valid → stop\nif (validData.length === 0) {\n    return null;\n}\n\n// Gabungkan kembali dengan newline\nmsg.payload = validData.join(\"\\n\");\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 425,
        "y": 235,
        "wires": [
            [
                "110b4ac847760f36"
            ]
        ]
    },
    {
        "id": "110b4ac847760f36",
        "type": "string",
        "z": "dc321937d34e0275",
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
        "x": 405,
        "y": 280,
        "wires": [
            [
                "91f72ba431538f51",
                "0b16bf5e4c9dfb37"
            ]
        ]
    },
    {
        "id": "abff8ae846e4d23e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "Kub2 wh total panel 64",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_64\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel64 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 1790,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "3ffb5edb79c9d004",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "Kub2 wh total panel 63",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"panel_63\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub2_panel63 (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 1830,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "bf77990e17a28755",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_220V\") {\n    msg.topic = \"INSERT INTO tb_pm220_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2150,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "9beb05b580b08262",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_ct",
        "func": "// === QUERY BUILDER NODE ===\nvar panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\nif (panel === \"CT_rep\" && power_meter === \"PM_200V\") {\n    msg.topic = \"INSERT INTO tb_pm200_ct (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + timeData.shift + \"', '\" + timeData.day +\n        \"', '\" + timeData.week + \"', '\" + timeData.month + \"', '\" + timeData.year + \"');\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2185,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "31ad3209acd5eb07",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD_rep\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2110,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "623ee14148ec34a8",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "parse_lora_prefix_suffix",
        "func": "\n\n\n// ============================================\n// STRICT LORA PARSER\n// Format yang diterima:\n// prefix,value,suffix\n//\n// Contoh valid:\n// &e%,12345.67,v*p\n// 908,54321.00,$17\n// @yf,136703120.00,~ku\n//\n// Output:\n// msg.payload = [panel, power_meter, value]\n// ============================================\n\n// Ambil data masuk\nvar raw = msg.payload;\n\n// Pastikan string\nif (typeof raw !== \"string\") {\n    raw = String(raw);\n}\n\n// Bersihkan newline, carriage return, spasi pinggir\nraw = raw.replace(/\\r/g, \"\").replace(/\\n/g, \"\").trim();\n\n// 1) Buang jika kosong\nif (!raw || raw.length < 5) {\n    return null;\n}\n\n// 2) Buang semua paket lama yang diawali *\n// contoh: *BS_1..., *kub..., *cr7...\nif (raw.startsWith(\"*\")) {\n    return null;\n}\n\n// 3) Harus tepat 3 bagian: prefix,value,suffix\nvar parts = raw.split(\",\");\nif (parts.length !== 3) {\n    return null;\n}\n\nvar prefix = parts[0].trim();\nvar valueStr = parts[1].trim();\nvar suffix = parts[2].trim();\n\n// 4) Validasi prefix/suffix\nvar panel = \"\";\nvar power_meter = \"\";\n\n// ============================================\n// CHSAA / CHSAB\n// ============================================\n\n\n\n\n// CHSAA\nif (prefix === \"&e%\" && suffix === \"v*p\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"908\" && suffix === \"$17\") {\n    panel = \"chsaa\";\n    power_meter = \"pm_200\";\n}\n// CHSAB\nelse if (prefix === \"w%c\" && suffix === \"8lv\") {\n    panel = \"chsab\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"u57\" && suffix === \"7%u\") {\n    panel = \"chsab\";\n    power_meter = \"pm_220\";\n}\n// CHAB\nelse if (prefix === \"n2z\" && suffix === \"7~i\") {\n    panel = \"chab\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@&d\" && suffix === \"go%\") {\n    panel = \"chab\";\n    power_meter = \"pm_200\";\n}\n// CHCD\nelse if (prefix === \"adj\" && suffix === \"d18\") {\n    panel = \"chcd\";\n    power_meter = \"pm_200\";\n}\nelse if (prefix === \"zgb\" && suffix === \"ehr\") {\n    panel = \"chcd\";\n    power_meter = \"pm_220\";\n}\n// BS1\nelse if (prefix === \"560\" && suffix === \"818\") {\n    panel = \"bs1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s%3\" && suffix === \"gmo\") {\n    panel = \"bs1\";\n    power_meter = \"pm_200\";\n}\n// BS2\nelse if (prefix === \"ulc\" && suffix === \"uca\") {\n    panel = \"bs2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"x61\" && suffix === \"&sn\") {\n    panel = \"bs2\";\n    power_meter = \"pm_200\";\n}\n\n\n\n\n// CHEF\nelse if (prefix === \"duy\" && suffix === \"ogg\") {\n    panel = \"chef\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"^&a\" && suffix === \"32v\") {\n    panel = \"chef\";\n    power_meter = \"pm_200\";\n}\n\n// CC1\nelse if (prefix === \"n97\" && suffix === \"c1x\") {\n    panel = \"cc1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"574\" && suffix === \"yra\") {\n    panel = \"cc1\";\n    power_meter = \"pm_200\";\n}\n\n// CONN\n\nelse if (prefix === \"5&d\" && suffix === \"t1s\") {\n    panel = \"conn\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// RET\nelse if (prefix === \"mgq\" && suffix === \"dp1\") {\n    panel = \"ret\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"p1@\" && suffix === \"!3p\") {\n    panel = \"ret\";\n    power_meter = \"pm_200\";\n}\n\n// RA\nelse if (prefix === \"~g6\" && suffix === \"%?j\") {\n    panel = \"ra\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"ieq\" && suffix === \"nyy\") {\n    panel = \"ra\";\n    power_meter = \"pm_200\";\n}\n// HLA\nelse if (prefix === \"?l@\" && suffix === \"q&j\") {\n    panel = \"hla\";\n    power_meter = \"pm_200\";\n}\n\n\n\n// CHSAC\nelse if (prefix === \"qix\" && suffix === \"n7~\") {\n    panel = \"chsac\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"u%u\" && suffix === \"7~*\") {\n    panel = \"chsac\"; power_meter = \"pm_200\";\n}\n// CC234\nelse if (prefix === \"1t!\" && suffix === \"q%4\") {\n    panel = \"cc234\"; power_meter = \"pm_220\";\n}\nelse if (prefix === \"q9m\" && suffix === \"?@&\") {\n    panel = \"cc234\"; power_meter = \"pm_200\";\n}\n\n\n\n\n\n\n\n// ============================================\n// CR1\n// ============================================\nelse if (prefix === \"0i8\" && suffix === \"9gg\") {\n    panel = \"cr1\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"hqm\" && suffix === \"40%\") {\n    panel = \"cr1\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR2\n// ============================================\nelse if (prefix === \"0l0\" && suffix === \"caj\") {\n    panel = \"cr2\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"s@w\" && suffix === \"9$9\") {\n    panel = \"cr2\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR3\n// ============================================\nelse if (prefix === \"@yf\" && suffix === \"~ku\") {\n    panel = \"cr3\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"$@y\" && suffix === \"o?f\") {\n    panel = \"cr3\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR4\n// ============================================\nelse if (prefix === \"w&7\" && suffix === \"zm2\") {\n    panel = \"cr4\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@2h\" && suffix === \"y6h\") {\n    panel = \"cr4\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR5\n// ============================================\nelse if (prefix === \"0*y\" && suffix === \"pru\") {\n    panel = \"cr5\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"8m7\" && suffix === \"cuf\") {\n    panel = \"cr5\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR6\n// ============================================\nelse if (prefix === \"j4c\" && suffix === \"&32\") {\n    panel = \"cr6\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"@3x\" && suffix === \"dk?\") {\n    panel = \"cr6\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR7\n// ============================================\nelse if (prefix === \"kgn\" && suffix === \"yyx\") {\n    panel = \"cr7\";\n    power_meter = \"pm_220\";\n}\n// CR7 PM200 masih nonaktif\nelse if (prefix === \"m!4\" && suffix === \"3uq\") {\n    panel = \"cr7\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR8\n// ============================================\nelse if (prefix === \"xs@\" && suffix === \"@dq\") {\n    panel = \"cr8\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"t%~\" && suffix === \"0qx\") {\n    panel = \"cr8\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR9\n// ============================================\nelse if (prefix === \"s*y\" && suffix === \"joe\") {\n    panel = \"cr9\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"i93\" && suffix === \"!jp\") {\n    panel = \"cr9\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR10\n// ============================================\nelse if (prefix === \"%@j\" && suffix === \"0p6\") {\n    panel = \"cr10\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"lwl\" && suffix === \"0&&\") {\n    panel = \"cr10\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR11\n// ============================================\nelse if (prefix === \"bsv\" && suffix === \"x0f\") {\n    panel = \"cr11\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"&*g\" && suffix === \"qm$\") {\n    panel = \"cr11\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// CR12\n// ============================================\nelse if (prefix === \"w!9\" && suffix === \"z~x\") {\n    panel = \"cr12\";\n    power_meter = \"pm_220\";\n}\nelse if (prefix === \"g8x\" && suffix === \"hv3\") {\n    panel = \"cr12\";\n    power_meter = \"pm_200\";\n}\n\n// ============================================\n// BUKAN DATA YANG TERDAFTAR\n// ============================================\nelse {\n    return null;\n}\n\n// 5) Validasi angka\nvar value = parseFloat(valueStr);\nif (isNaN(value)) {\n    return null;\n}\n\n// 6) Optional: tolak nilai tidak masuk akal\nif (value < 0) {\n    return null;\n}\n\n// 7) Bentuk output\nmsg.raw_payload = raw;\nmsg.payload = [panel, power_meter, value];\n\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 150,
        "wires": [
            [
                "e364a094df830a41",
                "dcbd021a286767aa"
            ]
        ]
    },
    {
        "id": "e364a094df830a41",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "setting_time",
        "func": "// === TIME SETUP NODE ===\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\n\nvar shift;\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = 'shift_1';\n} else {\n    shift = 'shift_2';\n}\n\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((currentDay - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\nmsg.timeData = {\n    shift: shift,\n    day: currentDay,\n    week: currentWeek,\n    month: currentMonth,\n    year: currentYear\n};\n\nreturn msg;",
        "outputs": 1,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 430,
        "y": 190,
        "wires": [
            [
                "44ec5149abbb5bbb",
                "8741cf14b1f08291",
                "b116b81b0d2cd2f4",
                "648ae07989762b3b",
                "891bc7ff2c1f88ac",
                "ae10515df44f4f7a",
                "132228fc827bc59a",
                "74f8708ee2cb218f",
                "c94088247ed9fcdc",
                "55c759de03b49665",
                "018b3832964b796b",
                "255a12200a4c8ef7",
                "4b06b9845b87791f",
                "313fa9a8a4f7c77e",
                "8fcaec105bcc2df9",
                "4ba5ee844d492ed5",
                "70ece5991490cb48",
                "32ecedbe9961193b",
                "5710333fc27f3334",
                "924fad5afea1c741",
                "a2f089ecc7eb7de6",
                "9ccff4d96552a21b",
                "ca39ee691a942c4a",
                "7a6dddba49a68eec",
                "fe48fe8145b8f105",
                "6af8abe6b61daf7f",
                "1cf9f00c11f50e6d",
                "6310b8144fbc260b",
                "dc7429841c05f726",
                "d87e32336fc4656e",
                "a83678e8f7893b40",
                "b49feedd0ac8dfd8",
                "222cfdd5e3cc22ac",
                "f02e422975596f9f",
                "82ccf4546cb967bf",
                "7541ccf66a5ed6b5",
                "a8a301b6e76a3bed",
                "7038c48d7b3b846e",
                "fc47e655ab79d0a4",
                "6ad696d22e1abb54",
                "0ac63918501da4d9",
                "7387e90b043e1738",
                "217f011dd3097760",
                "d9bab0fcea9cbcd1",
                "2deec041ecbce802",
                "d46014e657d5ab4e",
                "79cdfb3592d839cd",
                "62e994282bf04443",
                "2e0e213ffed376f3",
                "3fa8863007820bf4"
            ]
        ]
    },
    {
        "id": "44ec5149abbb5bbb",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = Number(msg.payload[2]);\nvar timeData = msg.timeData;\n\n// jika value <= 2617236, hentikan proses\nif (isNaN(value) || value <= 2618836) {\n    return null;\n}\n\nif (panel === 'cr1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 190,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "8741cf14b1f08291",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 137635408) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 230,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b116b81b0d2cd2f4",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1431999) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 270,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "648ae07989762b3b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 180995968) {\n    return null;\n}\n\n\nif (panel === 'cr2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 310,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "891bc7ff2c1f88ac",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 4932691) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 350,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "ae10515df44f4f7a",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr3",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 119948320) {\n    return null;\n}\n\n\n\nif (panel === 'cr3' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr3 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 390,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "132228fc827bc59a",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1866267) {\n    return null;\n}\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 430,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "74f8708ee2cb218f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr4",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 187249536) {\n    return null;\n}\n\n\n\n\n\n\nif (panel === 'cr4' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr4 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 470,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "c94088247ed9fcdc",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 215125) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 510,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "55c759de03b49665",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr5",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 24521756) {\n    return null;\n}\n\n\n\nif (panel === 'cr5' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr5 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 550,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "018b3832964b796b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1413539) {\n    return null;\n}\n\n\n\nif (panel === 'cr6' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 590,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "255a12200a4c8ef7",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr6",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 168393680) {\n    return null;\n}\n\n\nif (panel === 'cr6' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr6 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 630,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "4b06b9845b87791f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 0) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 670,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "313fa9a8a4f7c77e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr7",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 48821776) {\n    return null;\n}\n\n\n\nif (panel === 'cr7' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr7 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 710,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "8fcaec105bcc2df9",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 1480644) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 750,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "4ba5ee844d492ed5",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr8",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\n\nif (isNaN(value) || value <= 218985312) {\n    return null;\n}\n\n\n\nif (panel === 'cr8' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr8 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 790,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "70ece5991490cb48",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 8960692) {\n    return null;\n}\n\n\nif (panel === 'cr9' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 830,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "32ecedbe9961193b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr9",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\n\nif (isNaN(value) || value <= 238400704) {\n    return null;\n}\n\n\n\nif (panel === 'cr9' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr9 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 870,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "5710333fc27f3334",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1108002) {\n    return null;\n}\n\n\n\nif (panel === 'cr10' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 910,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "924fad5afea1c741",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr10",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204896096) {\n    return null;\n}\n\n\nif (panel === 'cr10' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr10 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 950,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a2f089ecc7eb7de6",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1775581) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 990,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "9ccff4d96552a21b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr11",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 204330432) {\n    return null;\n}\n\n\nif (panel === 'cr11' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr11 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1030,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "ca39ee691a942c4a",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 2201929) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1070,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "7a6dddba49a68eec",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cr12",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 214202624) {\n    return null;\n}\n\n\nif (panel === 'cr12' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cr12 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1110,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6af8abe6b61daf7f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 662234688) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1190,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "fe48fe8145b8f105",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_chsaa",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 15705259) {\n    return null;\n}\n\n\nif (panel === 'chsaa' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsaa (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1150,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6310b8144fbc260b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 641965696) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1270,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1cf9f00c11f50e6d",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_chsab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 32978992) {\n    return null;\n}\n\n\nif (panel === 'chsab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1230,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a83678e8f7893b40",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575934464) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1350,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b49feedd0ac8dfd8",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_chab",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 16987040) {\n    return null;\n}\n\n\nif (panel === 'chab' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chab (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1310,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "dc7429841c05f726",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 575647040) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1430,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "d87e32336fc4656e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_chcd",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 7028043) {\n    return null;\n}\n\n\nif (panel === 'chcd' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chcd (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1390,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "222cfdd5e3cc22ac",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 693976) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 150,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "f02e422975596f9f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_bs1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 574627200) {\n    return null;\n}\n\n\nif (panel === 'bs1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 190,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "82ccf4546cb967bf",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 25257830) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 230,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "7541ccf66a5ed6b5",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_bs2",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 269224832) {\n    return null;\n}\n\n\nif (panel === 'bs2' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_bs2 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 270,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a8a301b6e76a3bed",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_hla",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 762710208) {\n    return null;\n}\n\n\nif (panel === 'hla' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_hla (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 110,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "7038c48d7b3b846e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 19994708) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 310,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "fc47e655ab79d0a4",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_ret",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 186939856) {\n    return null;\n}\n\n\nif (panel === 'ret' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ret (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 350,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6ad696d22e1abb54",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_conn",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 372023) {\n    return null;\n}\n\n\nif (panel === 'conn' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_conn (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1165,
        "y": 70,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "0ac63918501da4d9",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 4221932) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1155,
        "y": 390,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "7387e90b043e1738",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_ra",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1118355) {\n    return null;\n}\n\n\nif (panel === 'ra' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_ra (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1155,
        "y": 430,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "d46014e657d5ab4e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 55759820) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1590,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "2deec041ecbce802",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cc1",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 145193) {\n    return null;\n}\n\n\nif (panel === 'cc1' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc1 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1550,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "62e994282bf04443",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 12854937) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1670,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "79cdfb3592d839cd",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_cc234",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 3290683) {\n    return null;\n}\n\n\nif (panel === 'cc234' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_cc234 (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1630,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "3fa8863007820bf4",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 37681616) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1750,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "2e0e213ffed376f3",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_chsac",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 1149384) {\n    return null;\n}\n\n\nif (panel === 'chsac' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chsac (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1710,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "217f011dd3097760",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm220_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 17033846) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_220') {\n    msg.topic = \"INSERT INTO tb_pm220_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1470,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "d9bab0fcea9cbcd1",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_pm200_chef",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar timeData = msg.timeData;\n\n\nif (isNaN(value) || value <= 234197856) {\n    return null;\n}\n\n\nif (panel === 'chef' && power_meter === 'pm_200') {\n    msg.topic = \"INSERT INTO tb_pm200_chef (power_meter, value, shift, day, week, month, year) VALUES (?, ?, ?, ?, ?, ?, ?)\";\n    msg.payload = [\n        power_meter,\n        value,\n        timeData.shift,\n        timeData.day,\n        timeData.week,\n        timeData.month,\n        timeData.year\n    ];\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1510,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1a480d170ec1f710",
        "type": "comment",
        "z": "dc321937d34e0275",
        "name": "chcd id nya tida umum, id pm220 : 4, pm200 : 3",
        "info": "pass tidak sesuai default",
        "x": 185,
        "y": 25,
        "wires": []
    },
    {
        "id": "dcbd021a286767aa",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "update_layout_otics_1",
        "func": "// ============================================\n// FUNCTION NODE: build dynamic update query\n// input  : msg.payload = [panel, power_meter, value]\n// contoh : [\"cr1\", \"pm_200\", 12345.67]\n// output : msg.topic, msg.payload -> ke mysql node\n// ============================================\n\nconst TABLE_NAME = \"tb_layout_otics_1\";\n\n// whitelist panel yang memang ada di parser / DB\nconst ALLOWED_PANELS = new Set([\n    \"bs1\", \"bs2\",\n    \"cc1\", \"cc234\",\n    \"chab\", \"chcd\", \"chef\",\n    \"chsaa\", \"chsab\", \"chsac\",\n    \"conn\",\n    \"cr1\", \"cr2\", \"cr3\", \"cr4\", \"cr5\", \"cr6\",\n    \"cr7\", \"cr8\", \"cr9\", \"cr10\", \"cr11\", \"cr12\",\n    \"ct\", \"hla\", \"ra\", \"ret\"\n]);\n\n// whitelist power meter\nconst ALLOWED_METERS = {\n    \"pm_200\": \"pm200\",\n    \"pm_220\": \"pm220\"\n};\n\n// validasi payload\nif (!Array.isArray(msg.payload) || msg.payload.length < 3) {\n    node.warn(\"Payload tidak sesuai format [panel, power_meter, value]\");\n    return null;\n}\n\nlet panel = String(msg.payload[0] || \"\").trim().toLowerCase();\nlet power_meter = String(msg.payload[1] || \"\").trim().toLowerCase();\nlet value = Number(msg.payload[2]);\n\nif (!ALLOWED_PANELS.has(panel)) {\n    node.warn(\"Panel tidak dikenal: \" + panel);\n    return null;\n}\n\nif (!ALLOWED_METERS[power_meter]) {\n    node.warn(\"Power meter tidak dikenal: \" + power_meter);\n    return null;\n}\n\nif (!isFinite(value)) {\n    node.warn(\"Value bukan angka valid: \" + msg.payload[2]);\n    return null;\n}\n\n// bentuk nama kolom otomatis\n// contoh:\n// panel = cr1, power_meter = pm_200 -> tb_pm200_cr1_value\n// panel = cr1, power_meter = pm_220 -> tb_pm220_cr1_value\nconst meterKey = ALLOWED_METERS[power_meter];\nconst columnName = `tb_${meterKey}_${panel}_value`;\n\n// query update baris terakhir\nmsg.topic = `\n    UPDATE ${TABLE_NAME}\n    SET ${columnName} = ?\n    ORDER BY id DESC\n    LIMIT 1\n`;\n\nmsg.payload = [value];\n\n// info tambahan untuk debug\nmsg.columnName = columnName;\nmsg.panel = panel;\nmsg.power_meter = power_meter;\nmsg.value = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 740,
        "y": 130,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "3ab2b62be1623377",
        "type": "mysql",
        "z": "dc321937d34e0275",
        "mydb": "f872d3b77a2adc06",
        "name": "",
        "x": 1200,
        "y": 695,
        "wires": [
            []
        ]
    },
    {
        "id": "0944b425d8ce6fc4",
        "type": "link in",
        "z": "dc321937d34e0275",
        "name": "link in 2",
        "links": [
            "6569b21fbf80f843"
        ],
        "x": 140,
        "y": 260,
        "wires": [
            [
                "1119287054f372da"
            ]
        ]
    },
    {
        "id": "df36f5f75996b5cc",
        "type": "link in",
        "z": "dc321937d34e0275",
        "name": "link in 3",
        "links": [
            "ca6dc323c8c396a4"
        ],
        "x": 140,
        "y": 300,
        "wires": [
            [
                "1119287054f372da",
                "ab1b01659a037b92",
                "e0b5ddb6b1c1818b"
            ]
        ]
    },
    {
        "id": "1119287054f372da",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "door",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 245,
        "y": 280,
        "wires": [
            [
                "3d6b84aa586beb78",
                "1cf253e947c13e8d",
                "f4390cada92a5fba",
                "0d947e30a2f735b9",
                "623ee14148ec34a8"
            ]
        ]
    },
    {
        "id": "11f4e1d7f968b72f",
        "type": "inject",
        "z": "dc321937d34e0275",
        "name": "",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 150,
        "y": 450,
        "wires": [
            []
        ]
    },
    {
        "id": "b3b13b7d1d66044f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_comp_20",
        "func": "let data = msg.payload;\nif (!data || data.length < 3) {\n    return null;\n}\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\nif (panel === \"panel_20\" && pm === \"DA_01\") {\n    msg.payload = [panel, data_utama];\n    msg.topic = \"INSERT INTO tb_comp_20 (panel, wh) VALUES (?, ?)\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2265,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "3df29542d3c55689",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_comp_24",
        "func": "let data = msg.payload;\nif (!data || data.length < 3) {\n    return null;\n}\nlet panel = data[0];\nlet wh = data[1];\nif (panel === \"panel_24\") {\n    msg.payload = [panel, wh];\n    msg.topic = \"INSERT INTO tb_comp_24 (panel, wh) VALUES (?, ?)\";\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2345,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "492f5d23918dcf3a",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_comp_19",
        "func": "let data = msg.payload;\nif (!data || data.length < 3) {\n    return null;\n}\nlet panel = data[0];\nlet wh = data[1];\nif (panel === \"panel_19\") {\n    msg.payload = [panel, wh];\n    msg.topic = \"INSERT INTO tb_comp_19 (panel, wh) VALUES (?, ?)\";\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2225,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "0fe3fafb3d0dfb2a",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_comp_21",
        "func": "let data = msg.payload;\nif (!data || data.length < 3) {\n    return null;\n}\nlet panel = data[0];\nlet wh = data[1];\nif (panel === \"panel_21\") {\n    msg.payload = [panel, wh];\n    msg.topic = \"INSERT INTO tb_comp_21 (panel, wh) VALUES (?, ?)\";\n    return msg;\n}\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2305,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "ab1b01659a037b92",
        "type": "string",
        "z": "dc321937d34e0275",
        "name": "energy",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 405,
        "y": 350,
        "wires": [
            [
                "b3b13b7d1d66044f",
                "3df29542d3c55689",
                "0fe3fafb3d0dfb2a",
                "492f5d23918dcf3a",
                "2baf5da39daca3fc",
                "32d5b2dbce8b1225"
            ]
        ]
    },
    {
        "id": "84cf737d8852e977",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "w eng all pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1870,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "46e2f69f6335b8a6",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 2630,
        "wires": [
            [
                "c0ea3b29266518b1",
                "d57ae4ba8e21334c"
            ]
        ]
    },
    {
        "id": "5c1049b84b0b432b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_ap",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_ap\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 2750,
        "wires": [
            [
                "bbc36e1d084a7def",
                "2bc610fac4a7c4a3"
            ]
        ]
    },
    {
        "id": "92e0a37b96b29da5",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_apr",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 2790,
        "wires": [
            [
                "6c073a6e4d68548f",
                "f7be5f4c15ec28ae"
            ]
        ]
    },
    {
        "id": "c67814b43e1dfd83",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_pk",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_pk\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 2830,
        "wires": [
            [
                "bb05006adaa3b2d4",
                "e21e54bb6d781788"
            ]
        ]
    },
    {
        "id": "bbf1938572e1dba3",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_freq",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 2870,
        "wires": [
            [
                "be2fc825151b4c79",
                "61f1dd3183e282b9"
            ]
        ]
    },
    {
        "id": "bbc36e1d084a7def",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian: panel, total, a, b, c)\nif (parts.length < 5) {\n    node.warn(\"Data tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'panel_kubikal1';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\n// 6. Buat Query SQL (tanpa reserved)\nvar tableName = \"tb_kub_active_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, active_power_total, active_power_a, active_power_b, active_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    total,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1015,
        "y": 2790,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "be2fc825151b4c79",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 frequency",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 2 bagian: panel, freq)\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_frequency\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, data_freq) \";\nsql += \"VALUES (?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    dataFreq\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 2910,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6c073a6e4d68548f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalApparent = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_apparent_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalApparent,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 2830,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "bb05006adaa3b2d4",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_power_factor\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, power_factor_total, power_factor_a, power_factor_b, power_factor_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    pfTotal,\n    pfA,\n    pfB,\n    pfC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1015,
        "y": 2870,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1f42aa3d3344c95f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 2910,
        "wires": [
            [
                "9044d1a6c7215726",
                "01ec3a6dd72c9fa2"
            ]
        ]
    },
    {
        "id": "9044d1a6c7215726",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalReactive = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_reactive_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalReactive,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 2950,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6b15ca3918be1e35",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ll",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AB, 3=BC, 4=CA\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_voltage_ll\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAB,\n    voltageBC,\n    voltageCA\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 2710,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "c0ea3b29266518b1",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 current",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 6 bagian)\n// Index: 0=Panel, 1=Avg, 2=A, 3=B, 4=C, 5=N\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA   = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB   = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC   = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN   = parts[5] ? parseFloat(parts[5]) : 0.000;\n\n// 6. Buat Query SQL\n// Tabel: tb_kub_current\n// Kolom: panel, current_avg, current_a, current_b, current_c, current_n\nvar tableName = \"tb_kub_current\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, current_avg, current_a, current_b, current_c, current_n) \";\nsql += \"VALUES (?, ?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (Prepared Statement)\nmsg.payload = [\n    panelName,\n    currentAvg,\n    currentA,\n    currentB,\n    currentC,\n    currentN\n];\n\n// 8. Simpan query\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 995,
        "y": 2670,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b6f6d0a4d1957e45",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 2670,
        "wires": [
            [
                "6b15ca3918be1e35",
                "ede232440e053ae1"
            ]
        ]
    },
    {
        "id": "0dfe4921c1fa7c25",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 2710,
        "wires": [
            [
                "a3a0d86d5a2318d8",
                "a3b0e10fcc19fa57"
            ]
        ]
    },
    {
        "id": "a3a0d86d5a2318d8",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AN, 3=BN, 4=CN\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub_voltage_ln\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAN,\n    voltageBN,\n    voltageCN\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 2750,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1c8f268f64cdeacd",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub64_breakdown_current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 3030,
        "wires": [
            [
                "58d514159419ac08",
                "757ea2eb105d3261"
            ]
        ]
    },
    {
        "id": "23fc50add4ed30de",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_ap",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_ap\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3150,
        "wires": [
            [
                "346c179bcf9a4b88",
                "79cede49af0f51cb"
            ]
        ]
    },
    {
        "id": "abb537bb27023685",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_apr",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3190,
        "wires": [
            [
                "2b044ce178800937",
                "b3d9a410971d5a70"
            ]
        ]
    },
    {
        "id": "edd3b9776659c4a4",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_pk",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_pk\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3230,
        "wires": [
            [
                "efdbf51b97a57aae",
                "25beec04e5a8f819"
            ]
        ]
    },
    {
        "id": "2a2671a89e841fba",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_freq",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3270,
        "wires": [
            [
                "28b8dc3fad3a125f",
                "32f0d573f2e03fe6"
            ]
        ]
    },
    {
        "id": "b1f66b6d2a7b429e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub64_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 3310,
        "wires": [
            [
                "6460a00db3fe9c12",
                "b06bf52a4f1df1c7"
            ]
        ]
    },
    {
        "id": "e693460bce9d34fd",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub64_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 3070,
        "wires": [
            [
                "cf783caf144b7251",
                "95070b28b1522a5b"
            ]
        ]
    },
    {
        "id": "22363ae5c907dad9",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub64_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 3110,
        "wires": [
            [
                "f39ec71f354bbae4",
                "7ae295a93f524bb2"
            ]
        ]
    },
    {
        "id": "66a1a415c046068e",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_current",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_c\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 3410,
        "wires": [
            [
                "bd13309f12aa1803",
                "981b549417e8e41f"
            ]
        ]
    },
    {
        "id": "47827e5e39e458a6",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_ap",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_ap\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3530,
        "wires": [
            [
                "4f1625ebc75759a7",
                "a83b0cbaf12b12cb"
            ]
        ]
    },
    {
        "id": "5a3142f53ba05847",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_apr",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_apr\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3570,
        "wires": [
            [
                "0e0968bcd4563e7f",
                "8592fc7333e71cb0"
            ]
        ]
    },
    {
        "id": "135823aab702353f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_pk",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_pk\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 725,
        "y": 3610,
        "wires": [
            [
                "7c52c2628845b89c",
                "1434c54bcdb852eb"
            ]
        ]
    },
    {
        "id": "fdff82b5061dfe33",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_freq",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_freq\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 735,
        "y": 3650,
        "wires": [
            [
                "a18ac06e674f82f6",
                "30999bbc9b53eeba"
            ]
        ]
    },
    {
        "id": "45703772a483c422",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_reactive",
        "func": "let data_code = msg.payload[0];\n\n\nif(data_code === \"kub63_rp\"){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 745,
        "y": 3690,
        "wires": [
            [
                "567f6229d01c4f99",
                "d797f59131f8e715"
            ]
        ]
    },
    {
        "id": "34e7ec40c07dbc48",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_voltage_ll",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub63_vll\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 3450,
        "wires": [
            [
                "a5c4e8d22bb0a1d2",
                "317fb5d0f4c32f87"
            ]
        ]
    },
    {
        "id": "2b23eb28ffa605d7",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kub_breakdown_voltage_ln",
        "func": "let data_code = msg.payload[0];\n\n\nif (data_code === \"kub63_vln\") {\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 3490,
        "wires": [
            [
                "bbde29bca2f3b62b",
                "bea79d685ac92ccc"
            ]
        ]
    },
    {
        "id": "58d514159419ac08",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 current",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 6 bagian)\n// Index: 0=Panel, 1=Avg, 2=A, 3=B, 4=C, 5=N\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_current\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, current_avg, current_a, current_b, current_c, current_n) \";\nsql += \"VALUES (?, ?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    currentAvg,\n    currentA,\n    currentB,\n    currentC,\n    currentN\n];\n\n// 8. Simpan query di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 995,
        "y": 3050,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "346c179bcf9a4b88",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 active power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian: panel, total, a, b, c)\nif (parts.length < 5) {\n    node.warn(\"Data tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'panel_kubikal1';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\n// 6. Buat Query SQL (tanpa reserved)\nvar tableName = \"tb_kub2_64_active_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, active_power_total, active_power_a, active_power_b, active_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    total,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1015,
        "y": 3170,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "28b8dc3fad3a125f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 frequency",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 2 bagian: panel, freq)\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_frequency\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, data_freq) \";\nsql += \"VALUES (?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    dataFreq\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 3290,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "2b044ce178800937",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 apperant power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalApparent = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_apparent_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalApparent,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 3210,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "efdbf51b97a57aae",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 power factor",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_power_factor\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, power_factor_total, power_factor_a, power_factor_b, power_factor_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    pfTotal,\n    pfA,\n    pfB,\n    pfC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1015,
        "y": 3250,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "6460a00db3fe9c12",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 reactive power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalReactive = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_reactive_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalReactive,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 3330,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "cf783caf144b7251",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 voltage ll",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AB, 3=BC, 4=CA\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_voltage_ll\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAB,\n    voltageBC,\n    voltageCA\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 3090,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "f39ec71f354bbae4",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 voltage ln",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AN, 3=BN, 4=CN\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_64_voltage_ln\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAN,\n    voltageBN,\n    voltageCN\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 3130,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "bd13309f12aa1803",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 current",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 6 bagian)\n// Index: 0=Panel, 1=Avg, 2=A, 3=B, 4=C, 5=N\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_current\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, current_avg, current_a, current_b, current_c, current_n) \";\nsql += \"VALUES (?, ?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    currentAvg,\n    currentA,\n    currentB,\n    currentC,\n    currentN\n];\n\n// 8. Simpan query di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 995,
        "y": 3430,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "4f1625ebc75759a7",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 active power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian: panel, total, a, b, c)\nif (parts.length < 5) {\n    node.warn(\"Data tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'panel_kubikal1';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\n// 6. Buat Query SQL (tanpa reserved)\nvar tableName = \"tb_kub2_63_active_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, active_power_total, active_power_a, active_power_b, active_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    total,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1015,
        "y": 3550,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a18ac06e674f82f6",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 frequency",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 2 bagian: panel, freq)\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_frequency\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, data_freq) \";\nsql += \"VALUES (?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    dataFreq\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 3670,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "0e0968bcd4563e7f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 apperant power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalApparent = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_apparent_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalApparent,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 3590,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "7c52c2628845b89c",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 power factor",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_power_factor\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, power_factor_total, power_factor_a, power_factor_b, power_factor_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    pfTotal,\n    pfA,\n    pfB,\n    pfC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1015,
        "y": 3630,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "567f6229d01c4f99",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 reactive power",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Total, 2=A, 3=B, 4=C\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar totalReactive = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_reactive_power\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL\nmsg.payload = [\n    panelName,\n    totalReactive,\n    phaseA,\n    phaseB,\n    phaseC\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1025,
        "y": 3710,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a5c4e8d22bb0a1d2",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 voltage ll",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AB, 3=BC, 4=CA\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_voltage_ll\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAB,\n    voltageBC,\n    voltageCA\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 3470,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "bbde29bca2f3b62b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 2 voltage ln",
        "func": "var raw = msg.payload;\n\n// 1. Konversi Buffer atau Object menjadi String\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// 2. Bersihkan karakter khusus (*) dan (#) serta spasi berlebih\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\n\n// 3. Pecah string berdasarkan koma\nvar parts = cleanData.split(',');\n\n// 4. Validasi data (Minimal harus ada 5 bagian)\n// Index: 0=Panel, 1=Avg, 2=AN, 3=BN, 4=CN\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\n// 5. Mapping variabel\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\n\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\n// 6. Buat Query SQL (tanpa metadata)\nvar tableName = \"tb_kub2_63_voltage_ln\";\n\nvar sql = \"INSERT INTO \" + tableName + \" \";\nsql += \"(panel, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn) \";\nsql += \"VALUES (?, ?, ?, ?, ?)\";\n\n// 7. Payload untuk MySQL (harus urut sesuai tanda ?)\nmsg.payload = [\n    panelName,\n    voltageAvg,\n    voltageAN,\n    voltageBN,\n    voltageCN\n];\n\n// 8. Simpan query SQL di msg.topic\nmsg.topic = sql;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1005,
        "y": 3510,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "d57ae4ba8e21334c",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 current update",
        "func": "var raw = msg.payload;\n\n// Konversi ke string\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// Bersihkan karakter khusus\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\n// INSERT ... ON DUPLICATE KEY UPDATE\nvar sql = `\nINSERT INTO ${tableName} \n(id, panel, date_time, current_avg, current_a, current_b, current_c, current_n)\nVALUES (1, ?, NOW(), ?, ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    current_avg = VALUES(current_avg),\n    current_a = VALUES(current_a),\n    current_b = VALUES(current_b),\n    current_c = VALUES(current_c),\n    current_n = VALUES(current_n)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, currentAvg, currentA, currentB, currentC, currentN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 2670,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1ae925acea775aa5",
        "type": "comment",
        "z": "dc321937d34e0275",
        "name": "kubikal 1",
        "info": "",
        "x": 695,
        "y": 2590,
        "wires": []
    },
    {
        "id": "81533a8682958113",
        "type": "comment",
        "z": "dc321937d34e0275",
        "name": "panel 64",
        "info": "",
        "x": 695,
        "y": 2990,
        "wires": []
    },
    {
        "id": "d8569fb1a3fdf377",
        "type": "comment",
        "z": "dc321937d34e0275",
        "name": "panel 63",
        "info": "",
        "x": 695,
        "y": 3370,
        "wires": []
    },
    {
        "id": "ede232440e053ae1",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ll update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ll_avg = VALUES(voltage_ll_avg),\n    voltage_ab = VALUES(voltage_ab),\n    voltage_bc = VALUES(voltage_bc),\n    voltage_ca = VALUES(voltage_ca)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAB, voltageBC, voltageCA];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 2710,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "01ec3a6dd72c9fa2",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    reactive_power_total = VALUES(reactive_power_total),\n    reactive_power_a = VALUES(reactive_power_a),\n    reactive_power_b = VALUES(reactive_power_b),\n    reactive_power_c = VALUES(reactive_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 2950,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "61f1dd3183e282b9",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 frequency update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, data_freq)\nVALUES (1, ?, NOW(), ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    data_freq = VALUES(data_freq)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, dataFreq];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1395,
        "y": 2910,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "e21e54bb6d781788",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, power_factor_total, power_factor_a, power_factor_b, power_factor_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    power_factor_total = VALUES(power_factor_total),\n    power_factor_a = VALUES(power_factor_a),\n    power_factor_b = VALUES(power_factor_b),\n    power_factor_c = VALUES(power_factor_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, pfTotal, pfA, pfB, pfC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 2870,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "f7be5f4c15ec28ae",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    apparent_power_total = VALUES(apparent_power_total),\n    apparent_power_a = VALUES(apparent_power_a),\n    apparent_power_b = VALUES(apparent_power_b),\n    apparent_power_c = VALUES(apparent_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 2830,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "2bc610fac4a7c4a3",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data active power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, active_power_total, active_power_a, active_power_b, active_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    active_power_total = VALUES(active_power_total),\n    active_power_a = VALUES(active_power_a),\n    active_power_b = VALUES(active_power_b),\n    active_power_c = VALUES(active_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 2790,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a3b0e10fcc19fa57",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ln_avg = VALUES(voltage_ln_avg),\n    voltage_an = VALUES(voltage_an),\n    voltage_bn = VALUES(voltage_bn),\n    voltage_cn = VALUES(voltage_cn)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAN, voltageBN, voltageCN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1365,
        "y": 2750,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "757ea2eb105d3261",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 current update",
        "func": "var raw = msg.payload;\n\n// Konversi ke string\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// Bersihkan karakter khusus\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\n// INSERT ... ON DUPLICATE KEY UPDATE\nvar sql = `\nINSERT INTO ${tableName} \n(id, panel, date_time, current_avg, current_a, current_b, current_c, current_n)\nVALUES (1, ?, NOW(), ?, ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    current_avg = VALUES(current_avg),\n    current_a = VALUES(current_a),\n    current_b = VALUES(current_b),\n    current_c = VALUES(current_c),\n    current_n = VALUES(current_n)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, currentAvg, currentA, currentB, currentC, currentN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3030,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "95070b28b1522a5b",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ll update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ll_avg = VALUES(voltage_ll_avg),\n    voltage_ab = VALUES(voltage_ab),\n    voltage_bc = VALUES(voltage_bc),\n    voltage_ca = VALUES(voltage_ca)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAB, voltageBC, voltageCA];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3070,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b06bf52a4f1df1c7",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    reactive_power_total = VALUES(reactive_power_total),\n    reactive_power_a = VALUES(reactive_power_a),\n    reactive_power_b = VALUES(reactive_power_b),\n    reactive_power_c = VALUES(reactive_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3310,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "32f0d573f2e03fe6",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 frequency update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, data_freq)\nVALUES (1, ?, NOW(), ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    data_freq = VALUES(data_freq)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, dataFreq];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1395,
        "y": 3270,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "25beec04e5a8f819",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, power_factor_total, power_factor_a, power_factor_b, power_factor_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    power_factor_total = VALUES(power_factor_total),\n    power_factor_a = VALUES(power_factor_a),\n    power_factor_b = VALUES(power_factor_b),\n    power_factor_c = VALUES(power_factor_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, pfTotal, pfA, pfB, pfC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 3230,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "b3d9a410971d5a70",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    apparent_power_total = VALUES(apparent_power_total),\n    apparent_power_a = VALUES(apparent_power_a),\n    apparent_power_b = VALUES(apparent_power_b),\n    apparent_power_c = VALUES(apparent_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3190,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "79cede49af0f51cb",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data active power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, active_power_total, active_power_a, active_power_b, active_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    active_power_total = VALUES(active_power_total),\n    active_power_a = VALUES(active_power_a),\n    active_power_b = VALUES(active_power_b),\n    active_power_c = VALUES(active_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 3150,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "7ae295a93f524bb2",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p64\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ln_avg = VALUES(voltage_ln_avg),\n    voltage_an = VALUES(voltage_an),\n    voltage_bn = VALUES(voltage_bn),\n    voltage_cn = VALUES(voltage_cn)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAN, voltageBN, voltageCN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1365,
        "y": 3110,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "981b549417e8e41f",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 current update",
        "func": "var raw = msg.payload;\n\n// Konversi ke string\nif (Buffer.isBuffer(raw)) {\n    raw = raw.toString('utf8');\n} else if (typeof raw !== 'string') {\n    raw = String(raw);\n}\n\n// Bersihkan karakter khusus\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 6) {\n    node.warn(\"Data current tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar currentAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar currentA = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar currentB = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar currentC = parts[4] ? parseFloat(parts[4]) : 0.000;\nvar currentN = parts[5] ? parseFloat(parts[5]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\n// INSERT ... ON DUPLICATE KEY UPDATE\nvar sql = `\nINSERT INTO ${tableName} \n(id, panel, date_time, current_avg, current_a, current_b, current_c, current_n)\nVALUES (1, ?, NOW(), ?, ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    current_avg = VALUES(current_avg),\n    current_a = VALUES(current_a),\n    current_b = VALUES(current_b),\n    current_c = VALUES(current_c),\n    current_n = VALUES(current_n)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, currentAvg, currentA, currentB, currentC, currentN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3410,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "317fb5d0f4c32f87",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ll update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LL tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAB = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBC = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCA = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ll_avg, voltage_ab, voltage_bc, voltage_ca)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ll_avg = VALUES(voltage_ll_avg),\n    voltage_ab = VALUES(voltage_ab),\n    voltage_bc = VALUES(voltage_bc),\n    voltage_ca = VALUES(voltage_ca)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAB, voltageBC, voltageCA];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3450,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "d797f59131f8e715",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 reactive power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data reactive power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, reactive_power_total, reactive_power_a, reactive_power_b, reactive_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    reactive_power_total = VALUES(reactive_power_total),\n    reactive_power_a = VALUES(reactive_power_a),\n    reactive_power_b = VALUES(reactive_power_b),\n    reactive_power_c = VALUES(reactive_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3690,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "30999bbc9b53eeba",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 frequency update",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 2) {\n    node.warn(\"Data frequency tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar dataFreq = parts[1] ? parseFloat(parts[1]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, data_freq)\nVALUES (1, ?, NOW(), ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    data_freq = VALUES(data_freq)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, dataFreq];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1395,
        "y": 3650,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "1434c54bcdb852eb",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 power factor",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data power factor tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar pfTotal = parts[1] ? parseFloat(parts[1]) : 0;\nvar pfA = parts[2] ? parseFloat(parts[2]) : 0;\nvar pfB = parts[3] ? parseFloat(parts[3]) : 0;\nvar pfC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, power_factor_total, power_factor_a, power_factor_b, power_factor_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    power_factor_total = VALUES(power_factor_total),\n    power_factor_a = VALUES(power_factor_a),\n    power_factor_b = VALUES(power_factor_b),\n    power_factor_c = VALUES(power_factor_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, pfTotal, pfA, pfB, pfC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 3610,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "8592fc7333e71cb0",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 apperant power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data apparent power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, apparent_power_total, apparent_power_a, apparent_power_b, apparent_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    apparent_power_total = VALUES(apparent_power_total),\n    apparent_power_a = VALUES(apparent_power_a),\n    apparent_power_b = VALUES(apparent_power_b),\n    apparent_power_c = VALUES(apparent_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1385,
        "y": 3570,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "a83b0cbaf12b12cb",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 active power",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data active power tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar total = parts[1] ? parseFloat(parts[1]) : 0;\nvar phaseA = parts[2] ? parseFloat(parts[2]) : 0;\nvar phaseB = parts[3] ? parseFloat(parts[3]) : 0;\nvar phaseC = parts[4] ? parseFloat(parts[4]) : 0;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, active_power_total, active_power_a, active_power_b, active_power_c)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    active_power_total = VALUES(active_power_total),\n    active_power_a = VALUES(active_power_a),\n    active_power_b = VALUES(active_power_b),\n    active_power_c = VALUES(active_power_c)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, total, phaseA, phaseB, phaseC];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1375,
        "y": 3530,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "bea79d685ac92ccc",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "kubikal 1 voltage ln",
        "func": "var raw = msg.payload;\nif (Buffer.isBuffer(raw)) raw = raw.toString('utf8');\nelse if (typeof raw !== 'string') raw = String(raw);\n\nvar cleanData = raw.replace(/\\*/g, '').replace(/#/g, '').trim();\nvar parts = cleanData.split(',');\n\nif (parts.length < 5) {\n    node.warn(\"Data voltage LN tidak lengkap: \" + raw);\n    return null;\n}\n\nvar panelName = parts[0] ? parts[0].trim() : 'unknown_panel';\nvar voltageAvg = parts[1] ? parseFloat(parts[1]) : 0.000;\nvar voltageAN = parts[2] ? parseFloat(parts[2]) : 0.000;\nvar voltageBN = parts[3] ? parseFloat(parts[3]) : 0.000;\nvar voltageCN = parts[4] ? parseFloat(parts[4]) : 0.000;\n\nvar tableName = \"tb_realtime_kubikal_p63\";\n\nvar sql = `\nINSERT INTO ${tableName}\n(id, panel, date_time, voltage_ln_avg, voltage_an, voltage_bn, voltage_cn)\nVALUES (1, ?, NOW(), ?, ?, ?, ?)\nON DUPLICATE KEY UPDATE\n    date_time = NOW(),\n    panel = VALUES(panel),\n    voltage_ln_avg = VALUES(voltage_ln_avg),\n    voltage_an = VALUES(voltage_an),\n    voltage_bn = VALUES(voltage_bn),\n    voltage_cn = VALUES(voltage_cn)\n`;\n\nmsg.topic = sql;\nmsg.payload = [panelName, voltageAvg, voltageAN, voltageBN, voltageCN];\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1365,
        "y": 3490,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "e0b5ddb6b1c1818b",
        "type": "string",
        "z": "dc321937d34e0275",
        "name": "energy",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 400,
        "y": 470,
        "wires": [
            [
                "46e2f69f6335b8a6",
                "5c1049b84b0b432b",
                "92e0a37b96b29da5",
                "c67814b43e1dfd83",
                "bbf1938572e1dba3",
                "1f42aa3d3344c95f",
                "b6f6d0a4d1957e45",
                "0dfe4921c1fa7c25",
                "1c8f268f64cdeacd",
                "e693460bce9d34fd",
                "22363ae5c907dad9",
                "23fc50add4ed30de",
                "abb537bb27023685",
                "edd3b9776659c4a4",
                "2a2671a89e841fba",
                "b1f66b6d2a7b429e",
                "66a1a415c046068e",
                "34e7ec40c07dbc48",
                "2b23eb28ffa605d7",
                "47827e5e39e458a6",
                "5a3142f53ba05847",
                "135823aab702353f",
                "fdff82b5061dfe33",
                "45703772a483c422"
            ]
        ]
    },
    {
        "id": "2baf5da39daca3fc",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_kub_17",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_17\" && pm === \"DA_01\") {\n    msg.payload = [panel, data_utama];\n    msg.topic = \"INSERT INTO tb_kub_panel_17_wh (panel, wh) VALUES (?, ?)\";\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2385,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "32d5b2dbce8b1225",
        "type": "function",
        "z": "dc321937d34e0275",
        "name": "tb_kub_16",
        "func": "let data = msg.payload;\n\nif (!data || data.length < 3) {\n    return null;\n}\n\nlet panel = data[0];\nlet pm = data[1];\nlet data_utama = data[2];\n\nif (panel === \"panel_16\" && pm === \"DA_01\") {\n\n    msg.payload = [panel, data_utama];\n\n    msg.topic = \"INSERT INTO tb_kub_panel_16_wh (panel, wh) VALUES (?, ?)\";\n\n    return msg;\n}\n\nreturn null;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2425,
        "wires": [
            [
                "3ab2b62be1623377"
            ]
        ]
    },
    {
        "id": "f872d3b77a2adc06",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy_listrik",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "fe5c8000af4768f0",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-contrib-string": "1.0.0",
            "node-red-node-mysql": "3.0.0"
        }
    }
]
