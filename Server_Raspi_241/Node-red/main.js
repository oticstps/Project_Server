[
    {
        "id": "8bbd78bb8b016c5f",
        "type": "serial in",
        "z": "1995db45c7f2d56a",
        "name": "",
        "serial": "77330290bb27b358",
        "x": 120,
        "y": 140,
        "wires": [
            [
                "2feee6f510f34e1d",
                "9960f09a4e15c246"
            ]
        ]
    },
    {
        "id": "2cac505edb330bd4",
        "type": "serial in",
        "z": "1995db45c7f2d56a",
        "name": "",
        "serial": "38d6bceef9358906",
        "x": 120,
        "y": 185,
        "wires": [
            [
                "2feee6f510f34e1d",
                "01677636cce2db10",
                "6569b21fbf80f843"
            ]
        ]
    },
    {
        "id": "eced6761c24e39cc",
        "type": "serial in",
        "z": "1995db45c7f2d56a",
        "name": "",
        "serial": "c5a6181957635e71",
        "x": 120,
        "y": 230,
        "wires": [
            [
                "2feee6f510f34e1d",
                "c95aa0a8a5925a20"
            ]
        ]
    },
    {
        "id": "ad5b1672138c65ca",
        "type": "serial in",
        "z": "1995db45c7f2d56a",
        "name": "",
        "serial": "104afa5468283e40",
        "x": 120,
        "y": 275,
        "wires": [
            [
                "2feee6f510f34e1d",
                "8708398c1d2029de",
                "ca6dc323c8c396a4"
            ]
        ]
    },
    {
        "id": "2d15e054e550cc05",
        "type": "debug",
        "z": "1995db45c7f2d56a",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 320,
        "y": 360,
        "wires": []
    },
    {
        "id": "7e97c488d30d809a",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 460,
        "y": 435,
        "wires": [
            [
                "4837fbbe503ecae3"
            ]
        ]
    },
    {
        "id": "0cbc1ec7e757788e",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.1\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 470,
        "y": 400,
        "wires": [
            [
                "4837fbbe503ecae3"
            ]
        ]
    },
    {
        "id": "d4752cb7a2709536",
        "type": "inject",
        "z": "1995db45c7f2d56a",
        "name": "07:10",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 135,
        "y": 530,
        "wires": [
            [
                "284892a3fb3d458d",
                "c39c9bee005f6731",
                "a00874daa4125f80",
                "70a61e102a0d196a",
                "06da177fcb820ec2",
                "cc8891d12823f460",
                "9175301c12fd9cb5",
                "cfef6882e9d97385",
                "2e630fb5e1cb55d0",
                "b49fab9a061e3416",
                "d71cc070e331567f",
                "131de08a84d79dd9"
            ]
        ]
    },
    {
        "id": "4d6c27d444a7358c",
        "type": "inject",
        "z": "1995db45c7f2d56a",
        "name": "19:50",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "50 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 590,
        "wires": [
            [
                "284892a3fb3d458d",
                "131de08a84d79dd9",
                "d71cc070e331567f",
                "b49fab9a061e3416",
                "2e630fb5e1cb55d0",
                "cfef6882e9d97385",
                "9175301c12fd9cb5",
                "cc8891d12823f460",
                "06da177fcb820ec2",
                "70a61e102a0d196a",
                "a00874daa4125f80",
                "c39c9bee005f6731"
            ]
        ]
    },
    {
        "id": "8bda3175350a1306",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_12 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_12\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 915,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "284892a3fb3d458d",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_12",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_12\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 355,
        "y": 915,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "c39c9bee005f6731",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_11",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_11\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 355,
        "y": 880,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "a00874daa4125f80",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_10",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_10\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 355,
        "y": 845,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "70a61e102a0d196a",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_9",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_9\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 810,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "06da177fcb820ec2",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_8",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_8\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 775,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "cc8891d12823f460",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_7",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_7\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 740,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "9175301c12fd9cb5",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_6",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_6\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 705,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "cfef6882e9d97385",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_5",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_5\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 670,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "2e630fb5e1cb55d0",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_4",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_4\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 635,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "b49fab9a061e3416",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_3",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_3\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 600,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "d71cc070e331567f",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_2",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_2\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 565,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "131de08a84d79dd9",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_1",
        "func": "msg.topic = `\nSELECT *\nFROM common_rail_1\nORDER BY idPrimary DESC\nLIMIT 1;\n`;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 530,
        "wires": [
            [
                "3cc1be8793e37ca9"
            ]
        ]
    },
    {
        "id": "41de2cb0a7f05fb6",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_11 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_11\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 880,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "1718d5886fe73b0f",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_10 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_10\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 905,
        "y": 845,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "8f91c5f1705862b8",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_9 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_9\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 810,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "d0ef984bba451b42",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_8 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_8\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 775,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "0216841b91f1f70e",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_7 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_7\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 740,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "eb95305530566a81",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_6 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_6\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 705,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "ed22e7bc749a1ffb",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_5 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_5\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 670,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "49ac3c3a403028ad",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_4 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_4\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 635,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "c18706af128a640b",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_3 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_3\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 600,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "54b8618a0249b4f1",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_2 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_2\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 565,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "1ec1b45c9c2e4328",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "HG common_rail_1 P2",
        "func": "const lastData = msg.payload[0];   // hasil SELECT\nconst status = lastData.status;\n\nif (status === 'STOP') {\n    // sudah STOP → tidak update\n    return null;\n} else {\n    // belum STOP → jalankan UPDATE\n    msg.topic = `\n        UPDATE common_rail_1\n        SET status = 'STOP'\n        WHERE idPrimary = ${lastData.idPrimary}\n        AND status <> 'STOP'\n    `;\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 895,
        "y": 530,
        "wires": [
            [
                "a9730f4b14822fb7"
            ]
        ]
    },
    {
        "id": "9b0cacad56669624",
        "type": "inject",
        "z": "1995db45c7f2d56a",
        "name": "19.50",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "50 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 145,
        "y": 920,
        "wires": [
            [
                "284892a3fb3d458d"
            ]
        ]
    },
    {
        "id": "e870a6267255cba0",
        "type": "debug",
        "z": "1995db45c7f2d56a",
        "name": "debug 10",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 1570,
        "y": 510,
        "wires": []
    },
    {
        "id": "0e60ff1f212f021f",
        "type": "mqtt in",
        "z": "1995db45c7f2d56a",
        "name": "",
        "topic": "data_plts",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "97cd10082bb07235",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 1415,
        "y": 535,
        "wires": [
            [
                "03e9bce5ce5d0173",
                "c71b0b64b44ad932",
                "ee48873c371ad795",
                "77f4857dac54e94a",
                "e870a6267255cba0"
            ]
        ]
    },
    {
        "id": "03e9bce5ce5d0173",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "PLANT 1 POWER",
        "func": "let data = msg.payload.Area5;\n\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\nif (isNaN(value)) {\n    node.warn(\"Nilai power Area5 tidak valid\");\n    return null;\n}\n\n// Data sudah dalam kW, jadi tidak perlu dibagi 1000\nmsg.metric = \"power\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1655,
        "y": 570,
        "wires": [
            [
                "1ad8e26fd198e2e6"
            ]
        ]
    },
    {
        "id": "c71b0b64b44ad932",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "PLANT 1 KWH",
        "func": "let data = msg.payload.Area7;\n\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\nif (isNaN(value)) {\n    node.warn(\"Nilai kWh Area3 tidak valid\");\n    return null;\n}\n\nmsg.metric = \"kwh\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1645,
        "y": 605,
        "wires": [
            [
                "1ad8e26fd198e2e6"
            ]
        ]
    },
    {
        "id": "1ad8e26fd198e2e6",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "GABUNG INSERT PLANT 1 REALTIME",
        "func": "let cache = flow.get(\"plant1_realtime_cache\") || {};\n\nif (msg.metric === \"power\") {\n    cache.power = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\nif (msg.metric === \"kwh\") {\n    cache.kwh = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\nflow.set(\"plant1_realtime_cache\", cache);\n\nif (!cache.power || !cache.kwh) {\n    return null;\n}\n\nlet selisih = Math.abs(cache.power.time - cache.kwh.time);\nlet batasSelisih = 10000;\n\nif (selisih > batasSelisih) {\n    node.warn(\"Data power dan kWh tidak sinkron, menunggu data terbaru\");\n\n    if (cache.power.time > cache.kwh.time) {\n        flow.set(\"plant1_realtime_cache\", {\n            power: cache.power\n        });\n    } else {\n        flow.set(\"plant1_realtime_cache\", {\n            kwh: cache.kwh\n        });\n    }\n\n    return null;\n}\n\nfunction formatDateTime(date) {\n    const pad = (n) => n.toString().padStart(2, \"0\");\n\n    return date.getFullYear() + \"-\" +\n        pad(date.getMonth() + 1) + \"-\" +\n        pad(date.getDate()) + \" \" +\n        pad(date.getHours()) + \":\" +\n        pad(date.getMinutes()) + \":\" +\n        pad(date.getSeconds());\n}\n\nlet dateTime = formatDateTime(new Date());\nlet power = cache.power.value;\nlet kwh = cache.kwh.value;\n\nmsg.topic = `\nINSERT INTO tb_plts_plant_1_realtime \n(date_time, power, kwh) \nVALUES (?, ?, ?)\n`;\n\nmsg.payload = [\n    dateTime,\n    power,\n    kwh\n];\n\nflow.set(\"plant1_realtime_cache\", {});\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1945,
        "y": 570,
        "wires": [
            []
        ]
    },
    {
        "id": "77f4857dac54e94a",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "PLANT 2 KWH",
        "func": "let data = msg.payload.Area1;\n\n// Ambil nilai kWh\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\n// Validasi nilai\nif (isNaN(value)) {\n    node.warn(\"Nilai kWh Area1 tidak valid\");\n    return null;\n}\n\nmsg.metric = \"kwh\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1645,
        "y": 675,
        "wires": [
            [
                "1956e867fea01f44"
            ]
        ]
    },
    {
        "id": "ee48873c371ad795",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "PLANT 2 POWER",
        "func": "let data = msg.payload.Area4;\n\n// Ambil nilai power\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\n// Validasi nilai\nif (isNaN(value)) {\n    node.warn(\"Nilai power Area4 tidak valid\");\n    return null;\n}\n\n// Jangan dibagi 1000, karena ingin menyimpan dalam satuan Watt\nmsg.metric = \"power\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1660,
        "y": 640,
        "wires": [
            [
                "1956e867fea01f44"
            ]
        ]
    },
    {
        "id": "1956e867fea01f44",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "GABUNG INSERT PLANT 2 REALTIME",
        "func": "let cache = flow.get(\"plant2_realtime_cache\") || {};\n\n// Simpan data power ke cache\nif (msg.metric === \"power\") {\n    cache.power = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\n// Simpan data kWh ke cache\nif (msg.metric === \"kwh\") {\n    cache.kwh = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\n// Simpan cache terbaru\nflow.set(\"plant2_realtime_cache\", cache);\n\n// Jika salah satu data belum ada, tunggu data berikutnya\nif (!cache.power || !cache.kwh) {\n    return null;\n}\n\n// Cek apakah waktu data power dan kWh masih sinkron\nlet selisih = Math.abs(cache.power.time - cache.kwh.time);\nlet batasSelisih = 10000; // 10 detik\n\nif (selisih > batasSelisih) {\n    node.warn(\"Data power dan kWh tidak sinkron, menunggu data terbaru\");\n\n    // Simpan data yang paling baru saja\n    if (cache.power.time > cache.kwh.time) {\n        flow.set(\"plant2_realtime_cache\", {\n            power: cache.power\n        });\n    } else {\n        flow.set(\"plant2_realtime_cache\", {\n            kwh: cache.kwh\n        });\n    }\n\n    return null;\n}\n\n// Fungsi format waktu MySQL\nfunction formatDateTime(date) {\n    const pad = (n) => n.toString().padStart(2, \"0\");\n\n    return date.getFullYear() + \"-\" +\n        pad(date.getMonth() + 1) + \"-\" +\n        pad(date.getDate()) + \" \" +\n        pad(date.getHours()) + \":\" +\n        pad(date.getMinutes()) + \":\" +\n        pad(date.getSeconds());\n}\n\nlet dateTime = formatDateTime(new Date());\n\n// Ambil nilai akhir\nlet power = cache.power.value;\nlet kwh = cache.kwh.value;\n\n// Validasi akhir sebelum insert\nif (isNaN(power) || isNaN(kwh)) {\n    node.warn(\"Data power atau kWh tidak valid sebelum insert\");\n    flow.set(\"plant2_realtime_cache\", {});\n    return null;\n}\n\n// Query insert ke MySQL\nmsg.topic = `\nINSERT INTO tb_plts_plant_2_realtime \n(date_time, power, kwh) \nVALUES (?, ?, ?)\n`;\n\nmsg.payload = [\n    dateTime,\n    power,\n    kwh\n];\n\n// Kosongkan cache setelah berhasil disiapkan untuk insert\nflow.set(\"plant2_realtime_cache\", {});\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1945,
        "y": 605,
        "wires": [
            []
        ]
    },
    {
        "id": "d1b21fd2c73a8dde",
        "type": "string",
        "z": "1995db45c7f2d56a",
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
        "x": 310,
        "y": 435,
        "wires": [
            [
                "7e97c488d30d809a"
            ]
        ]
    },
    {
        "id": "07e19edba38baf0f",
        "type": "string",
        "z": "1995db45c7f2d56a",
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
        "x": 310,
        "y": 400,
        "wires": [
            [
                "0cbc1ec7e757788e"
            ]
        ]
    },
    {
        "id": "e111e87629627ef7",
        "type": "string",
        "z": "1995db45c7f2d56a",
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
        "x": 310,
        "y": 470,
        "wires": [
            []
        ]
    },
    {
        "id": "2feee6f510f34e1d",
        "type": "function",
        "z": "1995db45c7f2d56a",
        "name": "door",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 145,
        "y": 360,
        "wires": [
            [
                "07e19edba38baf0f",
                "d1b21fd2c73a8dde",
                "2d15e054e550cc05",
                "e111e87629627ef7"
            ]
        ]
    },
    {
        "id": "9960f09a4e15c246",
        "type": "debug",
        "z": "1995db45c7f2d56a",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 405,
        "y": 140,
        "wires": []
    },
    {
        "id": "01677636cce2db10",
        "type": "debug",
        "z": "1995db45c7f2d56a",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 405,
        "y": 185,
        "wires": []
    },
    {
        "id": "c95aa0a8a5925a20",
        "type": "debug",
        "z": "1995db45c7f2d56a",
        "name": "debug 8",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 405,
        "y": 230,
        "wires": []
    },
    {
        "id": "8708398c1d2029de",
        "type": "debug",
        "z": "1995db45c7f2d56a",
        "name": "debug 9",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 405,
        "y": 275,
        "wires": []
    },
    {
        "id": "6569b21fbf80f843",
        "type": "link out",
        "z": "1995db45c7f2d56a",
        "name": "link_energy_listrik",
        "mode": "link",
        "links": [
            "0944b425d8ce6fc4",
            "551165082d2f503a"
        ],
        "x": 340,
        "y": 65,
        "wires": []
    },
    {
        "id": "ca6dc323c8c396a4",
        "type": "link out",
        "z": "1995db45c7f2d56a",
        "name": "link_kubikal",
        "mode": "link",
        "links": [
            "df36f5f75996b5cc"
        ],
        "x": 360,
        "y": 310,
        "wires": []
    },
    {
        "id": "4837fbbe503ecae3",
        "type": "mysql",
        "z": "1995db45c7f2d56a",
        "mydb": "9aa8ed0ca7611e98",
        "name": "",
        "x": 695,
        "y": 400,
        "wires": [
            []
        ]
    },
    {
        "id": "3cc1be8793e37ca9",
        "type": "mysql",
        "z": "1995db45c7f2d56a",
        "mydb": "9aa8ed0ca7611e98",
        "name": "database_tps_produksi",
        "x": 610,
        "y": 530,
        "wires": [
            [
                "1ec1b45c9c2e4328",
                "54b8618a0249b4f1",
                "c18706af128a640b",
                "49ac3c3a403028ad",
                "ed22e7bc749a1ffb",
                "eb95305530566a81",
                "0216841b91f1f70e",
                "d0ef984bba451b42",
                "8f91c5f1705862b8",
                "1718d5886fe73b0f",
                "41de2cb0a7f05fb6",
                "8bda3175350a1306"
            ]
        ]
    },
    {
        "id": "a9730f4b14822fb7",
        "type": "mysql",
        "z": "1995db45c7f2d56a",
        "mydb": "9aa8ed0ca7611e98",
        "name": "database_tps_produksi",
        "x": 1190,
        "y": 530,
        "wires": [
            []
        ]
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
        "id": "38d6bceef9358906",
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
        "id": "c5a6181957635e71",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB2",
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
        "id": "104afa5468283e40",
        "type": "serial-port",
        "name": "",
        "serialport": "/dev/ttyUSB3",
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
        "id": "97cd10082bb07235",
        "type": "mqtt-broker",
        "name": "",
        "broker": "172.27.63.180",
        "port": 1883,
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": 4,
        "keepalive": 60,
        "cleansession": true,
        "autoUnsubscribe": true,
        "birthTopic": "",
        "birthQos": "0",
        "birthRetain": "false",
        "birthPayload": "",
        "birthMsg": {},
        "closeTopic": "",
        "closeQos": "0",
        "closeRetain": "false",
        "closePayload": "",
        "closeMsg": {},
        "willTopic": "",
        "willQos": "0",
        "willRetain": "false",
        "willPayload": "",
        "willMsg": {},
        "userProps": "",
        "sessionExpiry": ""
    },
    {
        "id": "9aa8ed0ca7611e98",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_produksi",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "33ba928ea27d8378",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-contrib-string": "1.0.0",
            "node-red-node-mysql": "3.0.0"
        }
    }
]
