[
    {
        "id": "f4af58fb7f1554a4",
        "type": "inject",
        "z": "94e0063aead55f6e",
        "name": "Trigger (Setiap 5 Menit)",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            }
        ],
        "repeat": "300",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 170,
        "y": 80,
        "wires": [
            [
                "367875f7b7b3d0b3"
            ]
        ]
    },
    {
        "id": "367875f7b7b3d0b3",
        "type": "file in",
        "z": "94e0063aead55f6e",
        "name": "Baca File JSON",
        "filename": "/home/tpsoticsraspi/on/d-surya/media/manifest.json",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 140,
        "y": 120,
        "wires": [
            [
                "5eb0b9a3bc631da6"
            ]
        ]
    },
    {
        "id": "5eb0b9a3bc631da6",
        "type": "json",
        "z": "94e0063aead55f6e",
        "name": "Parse JSON",
        "property": "payload",
        "action": "",
        "pretty": false,
        "x": 130,
        "y": 160,
        "wires": [
            [
                "0d8b4a45b654a2eb"
            ]
        ]
    },
    {
        "id": "0d8b4a45b654a2eb",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "Ambil Data OCR",
        "func": "var areas = msg.payload.areas || [];\nvar allData = {};\n\nareas.forEach(function (area) {\n    if (area.ocr) {\n        // Simpan semua data ke dalam satu objek berdasarkan nama Area\n        allData[area.name] = {\n            value: area.ocr.value,\n            label: area.ocr.label,\n            unit: area.ocr.unit,\n            status: area.ocr.ok\n        };\n    }\n});\n\n// Kembalikan sebagai 1 pesan saja berisi objek lengkap\nmsg.payload = allData;\nreturn msg;",
        "outputs": 1,
        "timeout": "",
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 140,
        "y": 200,
        "wires": [
            [
                "1a198a99cba08e6a",
                "0ce923d8b7b5b9bb",
                "d5310a94e47a1a5f",
                "6710dc094a1a7018"
            ]
        ]
    },
    {
        "id": "1a198a99cba08e6a",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "Lihat Hasil (Clean)",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 465,
        "y": 85,
        "wires": []
    },
    {
        "id": "0ce923d8b7b5b9bb",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "Lihat Detail (Full)",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "statusVal": "",
        "statusType": "auto",
        "x": 465,
        "y": 125,
        "wires": []
    },
    {
        "id": "fd2ffbb405fb6935",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 980,
        "wires": []
    },
    {
        "id": "d5310a94e47a1a5f",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 2 POWER ",
        "func": "\nmsg.payload = msg.payload.Area1;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 385,
        "y": 865,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "4a51d66a1609d4b4",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Phase-1",
        "func": "\nmsg.payload = msg.payload.Area2;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 390,
        "y": 940,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "6602631d2efc502e"
            ]
        ]
    },
    {
        "id": "1e6b59726ff05710",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 PV ENERGY",
        "func": "\nmsg.payload = msg.payload.Area3;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 970,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "31f01f87bdd300b0"
            ]
        ]
    },
    {
        "id": "217f31125b5cebe2",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Irradiation",
        "func": "\nmsg.payload = msg.payload.Area4;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 390,
        "y": 1000,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "a04ae4df47c34985"
            ]
        ]
    },
    {
        "id": "93a6e9334c4290af",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 PR",
        "func": "\nmsg.payload = msg.payload.Area5;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 370,
        "y": 1030,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "2bfffc1c8fbefc4b"
            ]
        ]
    },
    {
        "id": "232040ad7dc9594c",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 WEATHER FOR CIKARAN",
        "func": "\nmsg.payload = msg.payload.Area6;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 450,
        "y": 1060,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "85bcc25b0448b89f"
            ]
        ]
    },
    {
        "id": "91ba73a9c114a68b",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 CO2 REDUCED",
        "func": "\nmsg.payload = msg.payload.Area7;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 410,
        "y": 1090,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "c5d2c2acf42b4a73"
            ]
        ]
    },
    {
        "id": "fa3ca67ced05cbf6",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 STATUS",
        "func": "\nmsg.payload = msg.payload.Area8;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 390,
        "y": 1120,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "d7012ef253f29152"
            ]
        ]
    },
    {
        "id": "fd1465834ce49381",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Last",
        "func": "\nmsg.payload = msg.payload.Area9;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 380,
        "y": 1150,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "8b8a7e54b677cf45"
            ]
        ]
    },
    {
        "id": "ad5da65f8291b807",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Yield today",
        "func": "\nmsg.payload = msg.payload.Area10;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 400,
        "y": 1180,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "8eedea5515677282"
            ]
        ]
    },
    {
        "id": "4b01ae2e741e7da2",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Supply from grid today",
        "func": "\nmsg.payload = msg.payload.Area11;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 430,
        "y": 1210,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "88e7ba49fcb8d9d9"
            ]
        ]
    },
    {
        "id": "6ab05c60fa99a0e1",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 Total yield",
        "func": "\nmsg.payload = msg.payload.Area12;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 390,
        "y": 1240,
        "wires": [
            [
                "fd2ffbb405fb6935",
                "38aa86c4b0b74f24"
            ]
        ]
    },
    {
        "id": "6710dc094a1a7018",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 2 Inverter rated power (kWh)",
        "func": "\nmsg.payload = msg.payload.Area4;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 445,
        "y": 900,
        "wires": [
            [
                "fd2ffbb405fb6935"
            ]
        ]
    },
    {
        "id": "24f0d44f61f46d48",
        "type": "mysql",
        "z": "94e0063aead55f6e",
        "mydb": "d424f9339e4dc662",
        "name": "",
        "x": 1130,
        "y": 160,
        "wires": [
            []
        ]
    },
    {
        "id": "400879055811261a",
        "type": "mqtt in",
        "z": "94e0063aead55f6e",
        "name": "",
        "topic": "data_plts",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "6449a2e2269443a4",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 375,
        "y": 345,
        "wires": [
            [
                "0249309d6c1a5989",
                "0a66990d28e3d5f2",
                "ca62d5d088016843",
                "d952e5938f0f62a8"
            ]
        ]
    },
    {
        "id": "6602631d2efc502e",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 20",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1020,
        "wires": []
    },
    {
        "id": "31f01f87bdd300b0",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 21",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1060,
        "wires": []
    },
    {
        "id": "a04ae4df47c34985",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 22",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1100,
        "wires": []
    },
    {
        "id": "2bfffc1c8fbefc4b",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 23",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1140,
        "wires": []
    },
    {
        "id": "85bcc25b0448b89f",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 24",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1180,
        "wires": []
    },
    {
        "id": "c5d2c2acf42b4a73",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 25",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1220,
        "wires": []
    },
    {
        "id": "d7012ef253f29152",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 26",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1260,
        "wires": []
    },
    {
        "id": "8b8a7e54b677cf45",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 27",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1300,
        "wires": []
    },
    {
        "id": "8eedea5515677282",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 28",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1340,
        "wires": []
    },
    {
        "id": "88e7ba49fcb8d9d9",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 29",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1380,
        "wires": []
    },
    {
        "id": "38aa86c4b0b74f24",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "debug 30",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 840,
        "y": 1420,
        "wires": []
    },
    {
        "id": "0249309d6c1a5989",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 POWER",
        "func": "let data = msg.payload.Area5;\n\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\nif (isNaN(value)) {\n    node.warn(\"Nilai power Area5 tidak valid\");\n    return null;\n}\n\n// Data sudah dalam kW, jadi tidak perlu dibagi 1000\nmsg.metric = \"power\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 580,
        "y": 410,
        "wires": [
            [
                "4e01def3e37d15d7"
            ]
        ]
    },
    {
        "id": "0a66990d28e3d5f2",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 1 KWH",
        "func": "let data = msg.payload.Area7;\n\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\nif (isNaN(value)) {\n    node.warn(\"Nilai kWh Area3 tidak valid\");\n    return null;\n}\n\nmsg.metric = \"kwh\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 445,
        "wires": [
            [
                "4e01def3e37d15d7"
            ]
        ]
    },
    {
        "id": "4e01def3e37d15d7",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "GABUNG INSERT PLANT 1 REALTIME",
        "func": "let cache = flow.get(\"plant1_realtime_cache\") || {};\n\nif (msg.metric === \"power\") {\n    cache.power = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\nif (msg.metric === \"kwh\") {\n    cache.kwh = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\nflow.set(\"plant1_realtime_cache\", cache);\n\nif (!cache.power || !cache.kwh) {\n    return null;\n}\n\nlet selisih = Math.abs(cache.power.time - cache.kwh.time);\nlet batasSelisih = 10000;\n\nif (selisih > batasSelisih) {\n    node.warn(\"Data power dan kWh tidak sinkron, menunggu data terbaru\");\n\n    if (cache.power.time > cache.kwh.time) {\n        flow.set(\"plant1_realtime_cache\", {\n            power: cache.power\n        });\n    } else {\n        flow.set(\"plant1_realtime_cache\", {\n            kwh: cache.kwh\n        });\n    }\n\n    return null;\n}\n\nfunction formatDateTime(date) {\n    const pad = (n) => n.toString().padStart(2, \"0\");\n\n    return date.getFullYear() + \"-\" +\n        pad(date.getMonth() + 1) + \"-\" +\n        pad(date.getDate()) + \" \" +\n        pad(date.getHours()) + \":\" +\n        pad(date.getMinutes()) + \":\" +\n        pad(date.getSeconds());\n}\n\nlet dateTime = formatDateTime(new Date());\nlet power = cache.power.value;\nlet kwh = cache.kwh.value;\n\nmsg.topic = `\nINSERT INTO tb_plts_plant_1_realtime \n(date_time, power, kwh) \nVALUES (?, ?, ?)\n`;\n\nmsg.payload = [\n    dateTime,\n    power,\n    kwh\n];\n\nflow.set(\"plant1_realtime_cache\", {});\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 410,
        "wires": [
            [
                "c1b20d1aa3e1e1b6",
                "24f0d44f61f46d48"
            ]
        ]
    },
    {
        "id": "c1b20d1aa3e1e1b6",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "DEBUG QUERY INSERT",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "x": 1200,
        "y": 410,
        "wires": []
    },
    {
        "id": "c6624c508c6631e6",
        "type": "debug",
        "z": "94e0063aead55f6e",
        "name": "DEBUG INSERT PLANT 2 REALTIME",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "true",
        "targetType": "full",
        "x": 1240,
        "y": 445,
        "wires": []
    },
    {
        "id": "d952e5938f0f62a8",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 2 KWH",
        "func": "let data = msg.payload.Area1;\n\n// Ambil nilai kWh\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\n// Validasi nilai\nif (isNaN(value)) {\n    node.warn(\"Nilai kWh Area1 tidak valid\");\n    return null;\n}\n\nmsg.metric = \"kwh\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 570,
        "y": 515,
        "wires": [
            [
                "96c13e6a3c49584a"
            ]
        ]
    },
    {
        "id": "ca62d5d088016843",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "PLANT 2 POWER",
        "func": "let data = msg.payload.Area4;\n\n// Ambil nilai power\nlet value = typeof data === \"object\" ? Number(data.value) : Number(data);\n\n// Validasi nilai\nif (isNaN(value)) {\n    node.warn(\"Nilai power Area4 tidak valid\");\n    return null;\n}\n\n// Jangan dibagi 1000, karena ingin menyimpan dalam satuan Watt\nmsg.metric = \"power\";\nmsg.payload = value;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 585,
        "y": 480,
        "wires": [
            [
                "96c13e6a3c49584a"
            ]
        ]
    },
    {
        "id": "96c13e6a3c49584a",
        "type": "function",
        "z": "94e0063aead55f6e",
        "name": "GABUNG INSERT PLANT 2 REALTIME",
        "func": "let cache = flow.get(\"plant2_realtime_cache\") || {};\n\n// Simpan data power ke cache\nif (msg.metric === \"power\") {\n    cache.power = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\n// Simpan data kWh ke cache\nif (msg.metric === \"kwh\") {\n    cache.kwh = {\n        value: Number(msg.payload),\n        time: Date.now()\n    };\n}\n\n// Simpan cache terbaru\nflow.set(\"plant2_realtime_cache\", cache);\n\n// Jika salah satu data belum ada, tunggu data berikutnya\nif (!cache.power || !cache.kwh) {\n    return null;\n}\n\n// Cek apakah waktu data power dan kWh masih sinkron\nlet selisih = Math.abs(cache.power.time - cache.kwh.time);\nlet batasSelisih = 10000; // 10 detik\n\nif (selisih > batasSelisih) {\n    node.warn(\"Data power dan kWh tidak sinkron, menunggu data terbaru\");\n\n    // Simpan data yang paling baru saja\n    if (cache.power.time > cache.kwh.time) {\n        flow.set(\"plant2_realtime_cache\", {\n            power: cache.power\n        });\n    } else {\n        flow.set(\"plant2_realtime_cache\", {\n            kwh: cache.kwh\n        });\n    }\n\n    return null;\n}\n\n// Fungsi format waktu MySQL\nfunction formatDateTime(date) {\n    const pad = (n) => n.toString().padStart(2, \"0\");\n\n    return date.getFullYear() + \"-\" +\n        pad(date.getMonth() + 1) + \"-\" +\n        pad(date.getDate()) + \" \" +\n        pad(date.getHours()) + \":\" +\n        pad(date.getMinutes()) + \":\" +\n        pad(date.getSeconds());\n}\n\nlet dateTime = formatDateTime(new Date());\n\n// Ambil nilai akhir\nlet power = cache.power.value;\nlet kwh = cache.kwh.value;\n\n// Validasi akhir sebelum insert\nif (isNaN(power) || isNaN(kwh)) {\n    node.warn(\"Data power atau kWh tidak valid sebelum insert\");\n    flow.set(\"plant2_realtime_cache\", {});\n    return null;\n}\n\n// Query insert ke MySQL\nmsg.topic = `\nINSERT INTO tb_plts_plant_2_realtime \n(date_time, power, kwh) \nVALUES (?, ?, ?)\n`;\n\nmsg.payload = [\n    dateTime,\n    power,\n    kwh\n];\n\n// Kosongkan cache setelah berhasil disiapkan untuk insert\nflow.set(\"plant2_realtime_cache\", {});\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 870,
        "y": 445,
        "wires": [
            [
                "24f0d44f61f46d48",
                "c6624c508c6631e6"
            ]
        ]
    },
    {
        "id": "d424f9339e4dc662",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_master",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6449a2e2269443a4",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.137.131",
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
        "id": "27923f97223b1a3b",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-mysql": "3.0.0"
        }
    }
]
