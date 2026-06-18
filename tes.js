[
    {
        "id": "a719a57e8d794031",
        "type": "serial in",
        "z": "a919e9f08f84e1f3",
        "name": "",
        "serial": "7329d93bbd4eea14",
        "x": 120,
        "y": 310,
        "wires": [
            [
                "c4cb2e2ac08d6937",
                "e2e3e632f9398d42"
            ]
        ]
    },
    {
        "id": "c4cb2e2ac08d6937",
        "type": "debug",
        "z": "a919e9f08f84e1f3",
        "name": "RAW COM14",
        "active": true,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 375,
        "y": 270,
        "wires": []
    },
    {
        "id": "e2e3e632f9398d42",
        "type": "function",
        "z": "a919e9f08f84e1f3",
        "name": "Parse COM14 * sampai #",
        "func": "let data = msg.payload.toString().trim();\n\nif (data.length === 0) {\n    return null;\n}\n\nlet startIndex = data.indexOf('*');\n\nif (startIndex === -1) {\n    node.warn('Data dibuang, tidak ada tanda awal * : ' + data);\n    return null;\n}\n\ndata = data.substring(startIndex);\n\nif (!data.endsWith('#')) {\n    data = data + '#';\n}\n\nif (!data.startsWith('*') || !data.endsWith('#')) {\n    node.warn('Format tidak valid: ' + data);\n    return null;\n}\n\nlet isi = data.substring(1, data.length - 1);\nlet bagian = isi.split(',');\n\nlet namaData = bagian[0];\nlet nilai = bagian.slice(1).filter(x => x !== '').map(x => {\n    let angka = Number(x);\n    return isNaN(angka) ? x : angka;\n});\n\nmsg.topic = namaData;\nmsg.payload = {\n    nama: namaData,\n    nilai: nilai,\n    raw: data\n};\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 405,
        "y": 330,
        "wires": [
            [
                "549611ea10f310d4"
            ]
        ]
    },
    {
        "id": "549611ea10f310d4",
        "type": "debug",
        "z": "a919e9f08f84e1f3",
        "name": "Parsed COM14",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 660,
        "y": 330,
        "wires": []
    },
    {
        "id": "d9c585629787caf9",
        "type": "inject",
        "z": "a919e9f08f84e1f3",
        "name": "Kirim dari COM4",
        "props": [
            {
                "p": "payload"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "*kub_vll,19895.959,19897.971,19923.523,19866.385,,#",
        "payloadType": "str",
        "x": 180,
        "y": 370,
        "wires": [
            [
                "99937bc0ac2cd2fe"
            ]
        ]
    },
    {
        "id": "a35849d9552d4fa5",
        "type": "serial out",
        "z": "a919e9f08f84e1f3",
        "name": "",
        "serial": "7329d93bbd4eea14",
        "x": 510,
        "y": 370,
        "wires": []
    },
    {
        "id": "99937bc0ac2cd2fe",
        "type": "function",
        "z": "a919e9f08f84e1f3",
        "name": "function 3",
        "func": "msg.payload = msg.payload + \"\\n\";\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 355,
        "y": 370,
        "wires": [
            [
                "a35849d9552d4fa5"
            ]
        ]
    },
    {
        "id": "7329d93bbd4eea14",
        "type": "serial-port",
        "name": "",
        "serialport": "COM4",
        "serialbaud": "1200",
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
    }
]
