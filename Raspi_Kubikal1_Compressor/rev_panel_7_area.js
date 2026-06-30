[
    {
        "id": "7bc0522501877604",
        "type": "serial out",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1230,
        "y": 780,
        "wires": []
    },
    {
        "id": "e1ad1f69473629be",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 840,
        "y": 810,
        "wires": [
            [
                "2c5c31bd2667ea55",
                "e65d82175c966f78"
            ]
        ]
    },
    {
        "id": "2c5c31bd2667ea55",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1050,
        "y": 870,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "e65d82175c966f78",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_20\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1040,
        "y": 840,
        "wires": [
            []
        ]
    },
    {
        "id": "0f3ba8c82fe0ccbd",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 780,
        "wires": [
            [
                "cb3c4eed71056a3c",
                "ef0e155fd2f1896b"
            ]
        ]
    },
    {
        "id": "cb3c4eed71056a3c",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_20_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1050,
        "y": 810,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "ef0e155fd2f1896b",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_20\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1040,
        "y": 780,
        "wires": [
            [
                "7bc0522501877604",
                "c6dd998a924514fd"
            ]
        ]
    },
    {
        "id": "a2a2ebef80ad8852",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 20",
        "info": "",
        "x": 660,
        "y": 740,
        "wires": []
    },
    {
        "id": "f174dd422dcc6405",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 850,
        "y": 840,
        "wires": [
            [
                "2618d3b729e29879"
            ]
        ]
    },
    {
        "id": "2618d3b729e29879",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_20_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1050,
        "y": 900,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "fd03f4c6f5aeb272",
        "type": "mysql",
        "z": "7ffb3dc69bbdbb40",
        "mydb": "53be5aa8ed2973e2",
        "name": "",
        "x": 1360,
        "y": 100,
        "wires": [
            []
        ]
    },
    {
        "id": "726bf666a26cbae1",
        "type": "delay",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 780,
        "wires": [
            [
                "57a0b7461861e9b7",
                "0edb420611c560e7",
                "172a18251bbff200"
            ]
        ]
    },
    {
        "id": "e0c90f3c0d203c26",
        "type": "inject",
        "z": "7ffb3dc69bbdbb40",
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
        "repeat": "25",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 150,
        "y": 100,
        "wires": [
            [
                "7f7f72e1542cb3cb"
            ]
        ]
    },
    {
        "id": "7f7f72e1542cb3cb",
        "type": "delay",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 100,
        "wires": [
            [
                "60e8d99fa9485895",
                "1cd0f22d4a1acad2",
                "8dd8e4b85092fb8f",
                "b4532229ed9805ff"
            ]
        ]
    },
    {
        "id": "60e8d99fa9485895",
        "type": "delay",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 180,
        "wires": [
            [
                "f5cf312e540c7b12",
                "7c7c983e86a8ed55",
                "3526b7ebb067c262"
            ]
        ]
    },
    {
        "id": "57a0b7461861e9b7",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "3203",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 670,
        "y": 780,
        "wires": [
            [
                "0f3ba8c82fe0ccbd"
            ],
            []
        ]
    },
    {
        "id": "0edb420611c560e7",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "2999",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 670,
        "y": 820,
        "wires": [
            [
                "e1ad1f69473629be"
            ],
            []
        ]
    },
    {
        "id": "172a18251bbff200",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "1836",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "1",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 670,
        "y": 860,
        "wires": [
            [
                "f174dd422dcc6405"
            ],
            []
        ]
    },
    {
        "id": "899075ccd134fc82",
        "type": "serial out",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1110,
        "y": 100,
        "wires": []
    },
    {
        "id": "fd51d20855fc85e9",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 130,
        "wires": [
            [
                "7a0d1d53c2e126f2",
                "bf7cf3f64f5975d9"
            ]
        ]
    },
    {
        "id": "7a0d1d53c2e126f2",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 190,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "bf7cf3f64f5975d9",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_16\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "cc54154c0fd5a7bc",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 100,
        "wires": [
            [
                "c8dfa7d254c8e3f4",
                "fa4a70386f7b0203"
            ]
        ]
    },
    {
        "id": "c8dfa7d254c8e3f4",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_16_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 130,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "fa4a70386f7b0203",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_16\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 100,
        "wires": [
            [
                "899075ccd134fc82",
                "b11ecf0e17ac181b"
            ]
        ]
    },
    {
        "id": "d886817a54f8554e",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 160,
        "wires": [
            [
                "04ba55fb2ba4d2dd"
            ]
        ]
    },
    {
        "id": "04ba55fb2ba4d2dd",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_16_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 220,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "1cd0f22d4a1acad2",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "3203",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "2",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 570,
        "y": 100,
        "wires": [
            [
                "cc54154c0fd5a7bc"
            ],
            []
        ]
    },
    {
        "id": "8dd8e4b85092fb8f",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "2999",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "2",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 570,
        "y": 140,
        "wires": [
            [
                "fd51d20855fc85e9"
            ],
            []
        ]
    },
    {
        "id": "b4532229ed9805ff",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "1836",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "2",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 570,
        "y": 180,
        "wires": [
            [
                "d886817a54f8554e"
            ],
            []
        ]
    },
    {
        "id": "1fecb011c1be9bc4",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 16",
        "info": "",
        "x": 560,
        "y": 60,
        "wires": []
    },
    {
        "id": "f056f76d0a53d19c",
        "type": "serial out",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1110,
        "y": 220,
        "wires": []
    },
    {
        "id": "e867b3063fef63f6",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toFloat32",
        "func": "// Daftar alamat dan nama sesuai FLOAT32_REGISTERS (31 item)\nconst items = [\n    [2999, \"current_a\"], [3001, \"current_b\"], [3003, \"current_c\"],\n    [3005, \"current_n\"], [3007, \"current_g\"], [3009, \"current_avg\"],\n    [3019, \"voltage_ab\"], [3021, \"voltage_bc\"], [3023, \"voltage_ca\"],\n    [3025, \"voltage_ll_avg\"], [3027, \"voltage_an\"], [3029, \"voltage_bn\"],\n    [3031, \"voltage_cn\"], [3035, \"voltage_ln_avg\"],\n    [3053, \"active_power_a\"], [3055, \"active_power_b\"], [3057, \"active_power_c\"],\n    [3059, \"active_power_total\"], [3061, \"reactive_power_a\"], [3063, \"reactive_power_b\"],\n    [3065, \"reactive_power_c\"], [3067, \"reactive_power_total\"],\n    [3069, \"apparent_power_a\"], [3071, \"apparent_power_b\"], [3073, \"apparent_power_c\"],\n    [3075, \"apparent_power_total\"], [3077, \"power_factor_a\"], [3079, \"power_factor_b\"],\n    [3081, \"power_factor_c\"], [3083, \"power_factor_total\"], [3109, \"frequency\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (big-endian)\nfunction toFloat32(high, low) {\n    // Pastikan high dan low adalah number\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, false); // false = big-endian\n    let val = view.getFloat32(0, false);\n    // Jika hasil NaN, kembalikan null\n    return isNaN(val) ? null : val;\n}\n\n// Ambil data register dari msg.payload (harus array)\nlet registers = msg.payload;\nlet baseAddr = 2999;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop manual tanpa destructuring\nfor (let i = 0; i < items.length; i++) {\n    let addr = items[i][0];      // alamat register\n    let name = items[i][1];      // nama properti\n\n    // Konversi addr ke number (aman)\n    let registerAddr = Number(addr);\n    if (isNaN(registerAddr)) {\n        node.warn(`Alamat tidak valid: ${addr}`);\n        continue;\n    }\n\n    let idx = registerAddr - baseAddr; // indeks dalam array register\n\n    // Pastikan dua register berurutan tersedia\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 290,
        "wires": [
            [
                "438b1bc4270d4bfc",
                "0e7128aa29c16c01"
            ]
        ]
    },
    {
        "id": "438b1bc4270d4bfc",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (31 kolom)\nconst columnNames = [\n    \"current_a\", \"current_b\", \"current_c\", \"current_n\", \"current_g\", \"current_avg\",\n    \"voltage_ab\", \"voltage_bc\", \"voltage_ca\", \"voltage_ll_avg\",\n    \"voltage_an\", \"voltage_bn\", \"voltage_cn\", \"voltage_ln_avg\",\n    \"active_power_a\", \"active_power_b\", \"active_power_c\", \"active_power_total\",\n    \"reactive_power_a\", \"reactive_power_b\", \"reactive_power_c\", \"reactive_power_total\",\n    \"apparent_power_a\", \"apparent_power_b\", \"apparent_power_c\", \"apparent_power_total\",\n    \"power_factor_a\", \"power_factor_b\", \"power_factor_c\", \"power_factor_total\",\n    \"frequency\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Jika val adalah null, undefined, NaN, atau Infinity, ubah ke null\n    if (val === null || val === undefined || (typeof val === 'number' && (isNaN(val) || !isFinite(val)))) {\n        return null;\n    }\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_float32_registers (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 350,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "0e7128aa29c16c01",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_power_total;\n\nlet data_panel = \"panel_17\";\nlet data_pm = \"DA_30\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 320,
        "wires": [
            []
        ]
    },
    {
        "id": "9e6e988077393210",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama energi (12 item, masing-masing 4 register)\nconst energyItems = [\n    [3203, \"active_energy_delivered\"],\n    [3207, \"active_energy_received\"],\n    [3211, \"active_energy_delivered_received\"],\n    [3215, \"active_energy_delivered_minus_received\"],\n    [3219, \"reactive_energy_delivered\"],\n    [3223, \"reactive_energy_received\"],\n    [3227, \"reactive_energy_delivered_received\"],\n    [3231, \"reactive_energy_delivered_minus_received\"],\n    [3235, \"apparent_energy_delivered\"],\n    [3239, \"apparent_energy_received\"],\n    [3243, \"apparent_energy_delivered_received\"],\n    [3247, \"apparent_energy_delivered_minus_received\"]\n];\n\n// Fungsi konversi 4 register ke BigInt64 signed (big-endian)\nfunction toBigInt64(registers) {\n    // Konversi ke number untuk menghindari error tipe\n    let r0 = Number(registers[0]);\n    let r1 = Number(registers[1]);\n    let r2 = Number(registers[2]);\n    let r3 = Number(registers[3]);\n    let buffer = new ArrayBuffer(8);\n    let view = new DataView(buffer);\n    view.setUint16(0, r0, false); // byte 0-1\n    view.setUint16(2, r1, false); // byte 2-3\n    view.setUint16(4, r2, false); // byte 4-5\n    view.setUint16(6, r3, false); // byte 6-7\n    return view.getBigInt64(0, false); // signed, big-endian\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3203;\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < energyItems.length; i++) {\n    // Konversi addr ke number agar operasi aritmatika aman\n    let addr = Number(energyItems[i][0]);\n    let name = energyItems[i][1];\n    let idx = addr - baseAddr; // sekarang pasti number\n\n    // Pastikan 4 register tersedia\n    if (idx >= 0 && idx + 3 < registers.length) {\n        let regs = [\n            registers[idx],\n            registers[idx + 1],\n            registers[idx + 2],\n            registers[idx + 3]\n        ];\n        // Periksa apakah ada nilai undefined/null\n        if (regs.some(r => r === undefined || r === null)) {\n            result[name] = null;\n            node.warn(`Register ${addr} mengandung nilai tidak valid`);\n        } else {\n            try {\n                let bigVal = toBigInt64(regs);\n                result[name] = bigVal.toString(); // simpan sebagai string\n            } catch (e) {\n                result[name] = null;\n                node.warn(`Gagal konversi register ${addr}: ${e.message}`);\n            }\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak lengkap (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 260,
        "wires": [
            [
                "f051b4c5419827a3",
                "76f25262a4edd0a3"
            ]
        ]
    },
    {
        "id": "f051b4c5419827a3",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (12 kolom)\nconst columnNames = [\n    \"active_energy_delivered\",\n    \"active_energy_received\",\n    \"active_energy_delivered_received\",\n    \"active_energy_delivered_minus_received\",\n    \"reactive_energy_delivered\",\n    \"reactive_energy_received\",\n    \"reactive_energy_delivered_received\",\n    \"reactive_energy_delivered_minus_received\",\n    \"apparent_energy_delivered\",\n    \"apparent_energy_received\",\n    \"apparent_energy_delivered_received\",\n    \"apparent_energy_delivered_minus_received\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani berbagai kemungkinan nilai tidak valid\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    if (typeof val === 'string') {\n        let trimmed = val.trim();\n        if (trimmed === '' || trimmed.toLowerCase() === 'null' || trimmed.toLowerCase() === 'nan') {\n            return null;\n        }\n    }\n    return val; // nilai string yang valid\n});\n\nlet query = `INSERT INTO tb_panel_17_power_register (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 290,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "76f25262a4edd0a3",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nmsg.payload = msg.payload.active_energy_delivered;\n\nlet data_panel = \"panel_17\";\nlet data_pm = \"DA_01\";\nlet data_wh = msg.payload;\n\nmsg.payload = \"*\" +  data_panel + \",\" + data_pm + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 920,
        "y": 260,
        "wires": [
            [
                "f056f76d0a53d19c",
                "9d3a451debf10701"
            ]
        ]
    },
    {
        "id": "4eeb0a9dfe7acb99",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "Integer 64-bit",
        "func": "// Daftar alamat dan nama datetime (7 register)\nconst datetimeItems = [\n    [1836, \"year\"],\n    [1837, \"month\"],\n    [1838, \"day\"],\n    [1839, \"hour\"],\n    [1840, \"minute\"],\n    [1841, \"second\"],\n    [1842, \"millisecond\"]\n];\n\nlet registers = msg.payload;\nlet baseAddr = 1836;\nlet result = {};\n\n// Validasi input\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\n// Loop untuk setiap item\nfor (let i = 0; i < datetimeItems.length; i++) {\n    // Konversi alamat ke number agar operasi aritmatika aman\n    let addr = Number(datetimeItems[i][0]);\n    let name = datetimeItems[i][1];\n    let idx = addr - baseAddr; // indeks dalam array register\n\n    // Pastikan register tersedia\n    if (idx >= 0 && idx < registers.length) {\n        let val = Number(registers[idx]);\n        // Periksa apakah nilai valid\n        if (!isNaN(val) && val !== null && val !== undefined) {\n            result[name] = val;\n        } else {\n            result[name] = null;\n            node.warn(`Register ${addr} tidak valid (nilai: ${registers[idx]})`);\n        }\n    } else {\n        result[name] = null;\n        node.warn(`Register ${addr} tidak tersedia (idx: ${idx})`);\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 320,
        "wires": [
            [
                "01db554acac019b5"
            ]
        ]
    },
    {
        "id": "01db554acac019b5",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "query_insert",
        "func": "// Urutan kolom harus sama dengan tabel MySQL (7 kolom)\nconst columnNames = [\n    \"year\", \"month\", \"day\", \"hour\", \"minute\", \"second\", \"millisecond\"\n];\n\nlet data = msg.payload; // objek dari function sebelumnya\nlet values = columnNames.map(name => {\n    let val = data[name];\n    // Tangani nilai tidak valid (null, undefined, NaN)\n    if (val === null || val === undefined) return null;\n    if (typeof val === 'number' && isNaN(val)) return null;\n    return val;\n});\n\nlet query = `INSERT INTO tb_panel_17_datetime_readings (${columnNames.join(', ')}) VALUES (${columnNames.map(() => '?').join(', ')})`;\n\nmsg.topic = query;\nmsg.payload = values;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 930,
        "y": 380,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "f5cf312e540c7b12",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "3203",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "3",
        "dataType": "HoldingRegister",
        "adr": "3203",
        "quantity": "48",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 570,
        "y": 260,
        "wires": [
            [
                "9e6e988077393210"
            ],
            []
        ]
    },
    {
        "id": "7c7c983e86a8ed55",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "2999",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "3",
        "dataType": "HoldingRegister",
        "adr": "2999",
        "quantity": "120",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 570,
        "y": 300,
        "wires": [
            [
                "e867b3063fef63f6"
            ],
            []
        ]
    },
    {
        "id": "3526b7ebb067c262",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "1836",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "3",
        "dataType": "HoldingRegister",
        "adr": "1836",
        "quantity": "10",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 570,
        "y": 340,
        "wires": [
            [
                "4eeb0a9dfe7acb99"
            ],
            []
        ]
    },
    {
        "id": "37b521ac88bead30",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 17",
        "info": "",
        "x": 560,
        "y": 220,
        "wires": []
    },
    {
        "id": "0cec976247b4f11a",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 20",
        "info": "",
        "x": 360,
        "y": 740,
        "wires": []
    },
    {
        "id": "6ea87808cff777ec",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 16",
        "info": "",
        "x": 360,
        "y": 60,
        "wires": []
    },
    {
        "id": "63e107c47d874c4e",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 17",
        "info": "",
        "x": 360,
        "y": 140,
        "wires": []
    },
    {
        "id": "cd9c83d770d088f7",
        "type": "serial out",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1330,
        "y": 480,
        "wires": []
    },
    {
        "id": "a0e5cc6cd05b3db6",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_24\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1040,
        "y": 640,
        "wires": [
            [
                "cd9c83d770d088f7",
                "5d9eea053c583318",
                "0953a5e4bc0a73e5"
            ]
        ]
    },
    {
        "id": "f3d0728dfd25d7da",
        "type": "serial out",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1330,
        "y": 440,
        "wires": []
    },
    {
        "id": "cf1cfce1eab727f6",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_21\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1040,
        "y": 540,
        "wires": [
            [
                "f3d0728dfd25d7da",
                "5d9eea053c583318",
                "134beb9ba8d3198a"
            ]
        ]
    },
    {
        "id": "cec557f67e9718af",
        "type": "serial out",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "serial": "d576516d42c16d98",
        "x": 1330,
        "y": 400,
        "wires": []
    },
    {
        "id": "bb17b36361d035e6",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "kirim_wh",
        "func": "\nlet data_wh = msg.payload.fwdWh_ext;\nlet data_panel = \"panel_19\";\n\nmsg.payload = \"*\" + data_panel + \",\" + data_wh + \",#\\n\"; \nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1050,
        "y": 440,
        "wires": [
            [
                "cec557f67e9718af",
                "5d9eea053c583318",
                "1ac3dd2d4925f9c9"
            ]
        ]
    },
    {
        "id": "4c671f4aeb181afd",
        "type": "delay",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 680,
        "wires": [
            [
                "6696db1afaa18ea8",
                "726bf666a26cbae1"
            ]
        ]
    },
    {
        "id": "202a5f51a248ef57",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 19",
        "info": "",
        "x": 360,
        "y": 440,
        "wires": []
    },
    {
        "id": "77d8c0982ad3a96c",
        "type": "delay",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 580,
        "wires": [
            [
                "4c671f4aeb181afd",
                "bc2908c3c46189bb"
            ]
        ]
    },
    {
        "id": "e68fb70c7b31e307",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 21",
        "info": "",
        "x": 360,
        "y": 540,
        "wires": []
    },
    {
        "id": "5421eabfaaeefe7e",
        "type": "delay",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "pauseType": "delay",
        "timeout": "5",
        "timeoutUnits": "seconds",
        "rate": "1",
        "nbRateUnits": "1",
        "rateUnits": "second",
        "randomFirst": "1",
        "randomLast": "5",
        "randomUnits": "seconds",
        "drop": false,
        "allowrate": false,
        "outputs": 1,
        "x": 360,
        "y": 480,
        "wires": [
            [
                "77d8c0982ad3a96c",
                "42367ae574b22aeb"
            ]
        ]
    },
    {
        "id": "0531311bf93e0191",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 24",
        "info": "",
        "x": 360,
        "y": 640,
        "wires": []
    },
    {
        "id": "5d9eea053c583318",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "node_insert",
        "func": "let raw = msg.payload.toString().trim();\n\n// Bersihkan format\nraw = raw.replace('*', '').replace(',#', '');\n\nlet parts = raw.split(',');\n\nif (parts.length !== 2) {\n    node.error(\"Format data tidak valid\", msg);\n    return null;\n}\n\nmsg.payload = {\n    panel_name: parts[0],\n    wh: Number(parts[1]),\n};\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1250,
        "y": 560,
        "wires": [
            [
                "5632801d2e9fbfba"
            ]
        ]
    },
    {
        "id": "5632801d2e9fbfba",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "insert_sql",
        "func": "let panel = msg.payload.panel_name;\nlet table = \"\";\n\n// Tentukan tabel berdasarkan panel\nswitch (panel) {\n    case \"panel_19\":\n        table = \"tb_panel_19_energy_vah_wh\";\n        break;\n    case \"panel_21\":\n        table = \"tb_panel_21_energy_vah_wh\";\n        break;\n    case \"panel_24\":\n        table = \"tb_panel_24_energy_vah_wh\";\n        break;\n    default:\n        node.warn(\"Panel tidak dikenal: \" + panel);\n        return null;\n}\n\n// Query MySQL\nmsg.topic = `\nINSERT INTO ${table}\n(panel_name, wh)\nVALUES (?, ?)\n`;\n\nmsg.payload = [\n    panel,\n    msg.payload.wh,\n];\n\nreturn msg;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1420,
        "y": 560,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "6696db1afaa18ea8",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "6",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 700,
        "y": 680,
        "wires": [
            [
                "00bbefb6ef212cbe"
            ],
            []
        ]
    },
    {
        "id": "6113ee1687a3b67c",
        "type": "inject",
        "z": "7ffb3dc69bbdbb40",
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
        "payload": "true",
        "payloadType": "bool",
        "x": 530,
        "y": 660,
        "wires": [
            [
                "6696db1afaa18ea8"
            ]
        ]
    },
    {
        "id": "00bbefb6ef212cbe",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 680,
        "wires": [
            [
                "f8ce3aa6e8ac43b2",
                "a0e5cc6cd05b3db6"
            ]
        ]
    },
    {
        "id": "f8ce3aa6e8ac43b2",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toDatabase_tb_com24",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_24 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 680,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "4003d76c499babfd",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 24",
        "info": "",
        "x": 700,
        "y": 640,
        "wires": []
    },
    {
        "id": "bc2908c3c46189bb",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "4",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 700,
        "y": 580,
        "wires": [
            [
                "97cd28b80ba5a8fa"
            ],
            []
        ]
    },
    {
        "id": "1efe51a898058d47",
        "type": "inject",
        "z": "7ffb3dc69bbdbb40",
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
        "payload": "true",
        "payloadType": "bool",
        "x": 530,
        "y": 560,
        "wires": [
            [
                "bc2908c3c46189bb"
            ]
        ]
    },
    {
        "id": "97cd28b80ba5a8fa",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 580,
        "wires": [
            [
                "4cd5db3cf2fb4e5f",
                "cf1cfce1eab727f6"
            ]
        ]
    },
    {
        "id": "4cd5db3cf2fb4e5f",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toDatabase_tb_com21",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_21 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 580,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "2071877e86e00278",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 21",
        "info": "",
        "x": 700,
        "y": 540,
        "wires": []
    },
    {
        "id": "42367ae574b22aeb",
        "type": "modbus-getter",
        "z": "7ffb3dc69bbdbb40",
        "name": "",
        "showStatusActivities": false,
        "showErrors": false,
        "showWarnings": true,
        "logIOActivities": false,
        "unitid": "5",
        "dataType": "HoldingRegister",
        "adr": "3912",
        "quantity": "66",
        "server": "45a7f54cff252cb4",
        "useIOFile": false,
        "ioFile": "",
        "useIOForPayload": false,
        "emptyMsgOnFail": false,
        "keepMsgProperties": false,
        "delayOnStart": false,
        "enableDeformedMessages": false,
        "startDelayTime": "",
        "x": 700,
        "y": 480,
        "wires": [
            [
                "19e631cfca860eb4"
            ],
            []
        ]
    },
    {
        "id": "316dfe036f42388f",
        "type": "inject",
        "z": "7ffb3dc69bbdbb40",
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
        "payload": "true",
        "payloadType": "bool",
        "x": 530,
        "y": 460,
        "wires": [
            [
                "42367ae574b22aeb"
            ]
        ]
    },
    {
        "id": "19e631cfca860eb4",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toFloat32",
        "func": "// Daftar parameter extended (alamat 3913–3977)\nconst items = [\n    [3913, \"current_avg_ext\"],\n    [3915, \"frequency_ext\"],\n    [3917, \"apparent_power_a_ext\"],\n    [3919, \"active_power_a_ext\"],\n    [3921, \"reactive_power_a_ext\"],\n    [3923, \"power_factor_a_ext\"],\n    [3925, \"voltage_ab_ext\"],\n    [3927, \"voltage_an_ext\"],\n    [3929, \"current_a_ext\"],\n    [3931, \"apparent_power_b_ext\"],\n    [3933, \"active_power_b_ext\"],\n    [3935, \"reactive_power_b_ext\"],\n    [3937, \"power_factor_b_ext\"],\n    [3939, \"voltage_bc_ext\"],\n    [3941, \"voltage_bn_ext\"],\n    [3943, \"current_b_ext\"],\n    [3945, \"apparent_power_c_ext\"],\n    [3947, \"active_power_c_ext\"],\n    [3949, \"reactive_power_c_ext\"],\n    [3951, \"power_factor_c_ext\"],\n    [3953, \"voltage_ca_ext\"],\n    [3955, \"voltage_cn_ext\"],\n    [3957, \"current_c_ext\"],\n    [3959, \"fwdVAh_ext\"],\n    [3961, \"fwdWh_ext\"],\n    [3963, \"fwdVARh_ind_ext\"],\n    [3965, \"fwdVARh_cap_ext\"],\n    [3967, \"revVAh_ext\"],\n    [3969, \"revWh_ext\"],\n    [3971, \"revVARh_ind_ext\"],\n    [3973, \"revVARh_cap_ext\"],\n    [3975, \"present_demand_ext\"],\n    [3977, \"rising_demand_ext\"]\n];\n\n// Fungsi konversi dua register (16-bit) ke float32 (little-endian)\nfunction toFloat32(high, low) {\n    high = Number(high);\n    low = Number(low);\n    let combined = (high << 16) | (low & 0xFFFF);\n    let buffer = new ArrayBuffer(4);\n    let view = new DataView(buffer);\n    view.setInt32(0, combined, true); // true = little-endian\n    let val = view.getFloat32(0, true);\n    return isNaN(val) ? null : val;\n}\n\nlet registers = msg.payload;\nlet baseAddr = 3912; // alamat awal pembacaan di modbus-getter\nlet result = {};\n\nif (!Array.isArray(registers)) {\n    node.error(\"msg.payload bukan array!\");\n    return null;\n}\n\nfor (let i = 0; i < items.length; i++) {\n    let addr = Number(items[i][0]);\n    let name = items[i][1];\n    let idx = addr - baseAddr;\n    if (idx >= 0 && idx + 1 < registers.length) {\n        result[name] = toFloat32(registers[idx], registers[idx + 1]);\n    } else {\n        result[name] = null;\n    }\n}\n\nmsg.payload = result;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 880,
        "y": 480,
        "wires": [
            [
                "9726a9fc25bcbe2e",
                "bb17b36361d035e6"
            ]
        ]
    },
    {
        "id": "9726a9fc25bcbe2e",
        "type": "function",
        "z": "7ffb3dc69bbdbb40",
        "name": "toDatabase_tb_com19",
        "func": "// Ambil data dari msg.payload (hasil konversi)\nlet data = msg.payload;\n\n// Buat timestamp dalam format MySQL (YYYY-MM-DD HH:MM:SS)\nlet now = new Date();\nlet timestamp = now.toISOString().slice(0, 19).replace('T', ' ');\n\n// Daftar kolom sesuai urutan dalam tabel (pastikan sama persis)\nlet columns = [\n    'timestamp',\n    'current_avg_ext',\n    'frequency_ext',\n    'apparent_power_a_ext',\n    'active_power_a_ext',\n    'reactive_power_a_ext',\n    'power_factor_a_ext',\n    'voltage_ab_ext',\n    'voltage_an_ext',\n    'current_a_ext',\n    'apparent_power_b_ext',\n    'active_power_b_ext',\n    'reactive_power_b_ext',\n    'power_factor_b_ext',\n    'voltage_bc_ext',\n    'voltage_bn_ext',\n    'current_b_ext',\n    'apparent_power_c_ext',\n    'active_power_c_ext',\n    'reactive_power_c_ext',\n    'power_factor_c_ext',\n    'voltage_ca_ext',\n    'voltage_cn_ext',\n    'current_c_ext',\n    'fwdVAh_ext',\n    'fwdWh_ext',\n    'fwdVARh_ind_ext',\n    'fwdVARh_cap_ext',\n    'revVAh_ext',\n    'revWh_ext',\n    'revVARh_ind_ext',\n    'revVARh_cap_ext',\n    'present_demand_ext',\n    'rising_demand_ext'\n];\n\n// Siapkan array nilai dengan timestamp sebagai elemen pertama\nlet values = [timestamp];\n\n// Loop setiap kolom (kecuali timestamp sudah diisi)\nfor (let i = 1; i < columns.length; i++) {\n    let col = columns[i];\n    let val = data[col];\n    // Jika properti tidak ada, kirim NULL\n    values.push(val !== undefined ? val : null);\n}\n\n// Buat placeholder (?) untuk setiap kolom\nlet placeholders = columns.map(() => '?').join(',');\n\n// Susun query INSERT\nlet query = `INSERT INTO tb_com_19 (${columns.join(',')}) VALUES (${placeholders})`;\n\n// Simpan query di msg.topic dan parameter di msg.payload\nmsg.topic = query;\nmsg.payload = values;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1060,
        "y": 480,
        "wires": [
            [
                "fd03f4c6f5aeb272"
            ]
        ]
    },
    {
        "id": "66c46bc6d35ee640",
        "type": "comment",
        "z": "7ffb3dc69bbdbb40",
        "name": "panel 19",
        "info": "",
        "x": 710,
        "y": 440,
        "wires": []
    },
    {
        "id": "ba604e8bf22cd4e2",
        "type": "inject",
        "z": "7ffb3dc69bbdbb40",
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
        "repeat": "15",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 150,
        "y": 480,
        "wires": [
            [
                "5421eabfaaeefe7e"
            ]
        ]
    },
    {
        "id": "b11ecf0e17ac181b",
        "type": "debug",
        "z": "7ffb3dc69bbdbb40",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1100,
        "y": 60,
        "wires": []
    },
    {
        "id": "9d3a451debf10701",
        "type": "debug",
        "z": "7ffb3dc69bbdbb40",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1100,
        "y": 260,
        "wires": []
    },
    {
        "id": "1ac3dd2d4925f9c9",
        "type": "debug",
        "z": "7ffb3dc69bbdbb40",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1540,
        "y": 220,
        "wires": []
    },
    {
        "id": "134beb9ba8d3198a",
        "type": "debug",
        "z": "7ffb3dc69bbdbb40",
        "name": "debug 4",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1540,
        "y": 260,
        "wires": []
    },
    {
        "id": "0953a5e4bc0a73e5",
        "type": "debug",
        "z": "7ffb3dc69bbdbb40",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1540,
        "y": 300,
        "wires": []
    },
    {
        "id": "c6dd998a924514fd",
        "type": "debug",
        "z": "7ffb3dc69bbdbb40",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 1280,
        "y": 720,
        "wires": []
    },
    {
        "id": "d576516d42c16d98",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB1",
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
        "id": "53be5aa8ed2973e2",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_kub_master",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "45a7f54cff252cb4",
        "type": "modbus-client",
        "name": "",
        "clienttype": "serial",
        "bufferCommands": true,
        "stateLogEnabled": false,
        "queueLogEnabled": false,
        "failureLogEnabled": true,
        "tcpHost": "127.0.0.1",
        "tcpPort": 502,
        "tcpType": "DEFAULT",
        "serialPort": "/dev/ttyUSB0",
        "serialType": "RTU-BUFFERD",
        "serialBaudrate": "19200",
        "serialDatabits": 8,
        "serialStopbits": 1,
        "serialParity": "even",
        "serialConnectionDelay": 100,
        "serialAsciiResponseStartDelimiter": "0x3A",
        "unit_id": 1,
        "commandDelay": 1,
        "clientTimeout": 1000,
        "reconnectOnTimeout": true,
        "reconnectTimeout": 2000,
        "parallelUnitIdsAllowed": true,
        "showErrors": false,
        "showWarnings": true,
        "showLogs": true
    },
    {
        "id": "09be1e2830e59276",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-node-mysql": "3.0.0",
            "node-red-contrib-modbus": "5.45.2"
        }
    }
]
