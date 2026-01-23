[
    {
        "id": "34998249668271db",
        "type": "serial in",
        "z": "be2581834d5f6762",
        "name": "",
        "serial": "9bf96bc56d1f048d",
        "x": 150,
        "y": 100,
        "wires": [
            [
                "5bcefe00f3dad7be",
                "4b189d758fd37b08",
                "8811433ba5ab721e",
                "b608b40b6f73ab09",
                "7677b79288bed24f"
            ]
        ]
    },
    {
        "id": "5bcefe00f3dad7be",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "MONTIV",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 460,
        "y": 120,
        "wires": []
    },
    {
        "id": "2fcedbda25fbe23b",
        "type": "serial in",
        "z": "be2581834d5f6762",
        "name": "",
        "serial": "b6ef892c0e14efe4",
        "x": 150,
        "y": 240,
        "wires": [
            [
                "3160d1edf8093282",
                "d7225d433af33d4b",
                "f940a0180864dcd1",
                "2250eb59d60b9a8a"
            ]
        ]
    },
    {
        "id": "3160d1edf8093282",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "ENERGY LISTRIK",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 490,
        "y": 260,
        "wires": []
    },
    {
        "id": "b8e973372b7c8679",
        "type": "serial in",
        "z": "be2581834d5f6762",
        "name": "",
        "serial": "342430595c226ae0",
        "x": 150,
        "y": 380,
        "wires": [
            [
                "5488cadfcc317eeb",
                "294176b02a8842d9",
                "c1072ee02a4bc529",
                "278c3dfd525300c9"
            ]
        ]
    },
    {
        "id": "aae47eb403584603",
        "type": "serial in",
        "z": "be2581834d5f6762",
        "name": "",
        "serial": "740b5b0d37aa7430",
        "x": 150,
        "y": 520,
        "wires": [
            [
                "baf4068aa33492a9",
                "5df198535bd3916f",
                "d608d9b36c9ab4e3"
            ]
        ]
    },
    {
        "id": "5488cadfcc317eeb",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "KUBIKAL 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 470,
        "y": 400,
        "wires": []
    },
    {
        "id": "baf4068aa33492a9",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "HIKITORI",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 460,
        "y": 560,
        "wires": []
    },
    {
        "id": "c25965a144055eeb",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k1,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1000,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "e870934da54131dc",
        "type": "serial out",
        "z": "be2581834d5f6762",
        "name": "",
        "serial": "9bf96bc56d1f048d",
        "x": 1370,
        "y": 1220,
        "wires": []
    },
    {
        "id": "b245816cad97b39a",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR9",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '9'\n) {\n    msg.payload = 'k9,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1320,
        "wires": [
            [
                "e870934da54131dc",
                "ac0b6511f196ed9c"
            ]
        ]
    },
    {
        "id": "4b189d758fd37b08",
        "type": "string",
        "z": "be2581834d5f6762",
        "name": "",
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
                        "value": "30"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 1000,
        "wires": [
            [
                "b245816cad97b39a",
                "9cbeb76caa28af83",
                "138793bda7834c90",
                "dd0cc5419404ba81",
                "7ca0d63b16e77d35",
                "24dd125f47ff9da7",
                "d8eee7a17bf6f981",
                "0a42ddfc6506efee",
                "7da156d86e7c83a2",
                "f40f37e885d68419",
                "9055e2c35c168290",
                "8c2eb4ad90708d67",
                "130339b92b37b602"
            ]
        ]
    },
    {
        "id": "9cbeb76caa28af83",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 7",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 680,
        "y": 940,
        "wires": []
    },
    {
        "id": "53c1fdd37a236147",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "9,tes,nais,wa,s,s,s,s",
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
        "payload": "9,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1320,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "138793bda7834c90",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR10",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '10'\n) {\n    msg.payload = 'k10,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1360,
        "wires": [
            [
                "e870934da54131dc",
                "edd5e17f86f13744"
            ]
        ]
    },
    {
        "id": "dd0cc5419404ba81",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR11",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '11'\n) {\n    msg.payload = 'k11,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1400,
        "wires": [
            [
                "e870934da54131dc",
                "a758ab444c3a1266"
            ]
        ]
    },
    {
        "id": "7ca0d63b16e77d35",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR12",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '12'\n) {\n    msg.payload = 'k12,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1440,
        "wires": [
            [
                "e870934da54131dc",
                "ec48714552cf4c86"
            ]
        ]
    },
    {
        "id": "24dd125f47ff9da7",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR6",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '6'\n) {\n    msg.payload = 'k6,1,end';\n    return msg;\n}\n\nreturn null;\n",
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
                "e870934da54131dc",
                "cd0be29a9491ecba"
            ]
        ]
    },
    {
        "id": "d8eee7a17bf6f981",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR7",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '7'\n) {\n    msg.payload = 'k7,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1240,
        "wires": [
            [
                "e870934da54131dc",
                "04cc41790cdbe858"
            ]
        ]
    },
    {
        "id": "0a42ddfc6506efee",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR8",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '8'\n) {\n    msg.payload = 'k8,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1280,
        "wires": [
            [
                "e870934da54131dc",
                "55c908135a36f99b"
            ]
        ]
    },
    {
        "id": "ac0b6511f196ed9c",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 9",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1320,
        "wires": []
    },
    {
        "id": "130339b92b37b602",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR5",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '5'\n) {\n    msg.payload = 'k5,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1160,
        "wires": [
            [
                "e870934da54131dc",
                "bf87266f9b03d69b"
            ]
        ]
    },
    {
        "id": "8c2eb4ad90708d67",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR4",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '4'\n) {\n    msg.payload = 'k4,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1120,
        "wires": [
            [
                "e870934da54131dc",
                "af0164885ea376b3"
            ]
        ]
    },
    {
        "id": "9055e2c35c168290",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR3",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '3'\n) {\n    msg.payload = 'k3,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1080,
        "wires": [
            [
                "e870934da54131dc",
                "15282fb5529b158c"
            ]
        ]
    },
    {
        "id": "f40f37e885d68419",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR2",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '2'\n) {\n    msg.payload = 'k2,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1040,
        "wires": [
            [
                "e870934da54131dc",
                "7aec01b5cdb75687"
            ]
        ]
    },
    {
        "id": "7da156d86e7c83a2",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "ACK_CR1",
        "func": "let line_id = msg.payload[0];\n\nif (\n    Array.isArray(msg.payload) &&\n    msg.payload.length > 5 &&\n    line_id === '1'\n) {\n    msg.payload = 'k1,1,end';\n    return msg;\n}\n\nreturn null;\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 690,
        "y": 1000,
        "wires": [
            [
                "e870934da54131dc",
                "1dc3fa3e5728b2f4"
            ]
        ]
    },
    {
        "id": "edd5e17f86f13744",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 10",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1360,
        "wires": []
    },
    {
        "id": "a758ab444c3a1266",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 11",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1400,
        "wires": []
    },
    {
        "id": "ec48714552cf4c86",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 12",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1440,
        "wires": []
    },
    {
        "id": "55c908135a36f99b",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 13",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1280,
        "wires": []
    },
    {
        "id": "04cc41790cdbe858",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 14",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1240,
        "wires": []
    },
    {
        "id": "cd0be29a9491ecba",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 15",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1200,
        "wires": []
    },
    {
        "id": "bf87266f9b03d69b",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 16",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1160,
        "wires": []
    },
    {
        "id": "af0164885ea376b3",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 17",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1120,
        "wires": []
    },
    {
        "id": "15282fb5529b158c",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 18",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1080,
        "wires": []
    },
    {
        "id": "7aec01b5cdb75687",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 19",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1040,
        "wires": []
    },
    {
        "id": "1dc3fa3e5728b2f4",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 20",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 920,
        "y": 1000,
        "wires": []
    },
    {
        "id": "b6b67d04608a78db",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "10,tes,nais,wa,s,s,s,s",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "ack",
                "v": "",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 240,
        "y": 1360,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "d044373a9f529153",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "11,tes,nais,wa,s,s,s,s",
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
        "payload": "9,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 240,
        "y": 1400,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "8e28eddbaf9eb795",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "12,tes,nais,wa,s,s,s,s",
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
        "payload": "9,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 240,
        "y": 1440,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "d22bdc5d8c774368",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "8,tes,nais,wa,s,s,s,s",
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
        "payload": "8,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1280,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "756aea9985a34cbd",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "7,tes,nais,wa,s,s,s,s",
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
        "payload": "7,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1240,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "704e01ff7ab75c28",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "6,tes,nais,wa,s,s,s,s",
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
        "payload": "6,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1200,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "d92f81b0a7e6fedb",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "5,tes,nais,wa,s,s,s,s",
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
        "payload": "5,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1160,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "c4db5b210ab75c8f",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "4,tes,nais,wa,s,s,s,s",
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
        "payload": "4,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1120,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "7f8442454849aebc",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "3,tes,nais,wa,s,s,s,s",
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
        "payload": "3,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1080,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "c3c9196b2466b28e",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "2,tes,nais,wa,s,s,s,s",
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
        "payload": "2,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1040,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "33a770a4e8e5687f",
        "type": "inject",
        "z": "be2581834d5f6762",
        "name": "1,tes,nais,wa,s,s,s,s",
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
        "payload": "1,tes,nais,wa,s,s,s,s",
        "payloadType": "str",
        "x": 230,
        "y": 1000,
        "wires": [
            [
                "4b189d758fd37b08"
            ]
        ]
    },
    {
        "id": "8811433ba5ab721e",
        "type": "link out",
        "z": "be2581834d5f6762",
        "name": "montiv",
        "mode": "link",
        "links": [
            "59e741051a4d5c75"
        ],
        "x": 445,
        "y": 40,
        "wires": []
    },
    {
        "id": "1d8980529fd10af6",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k2,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1040,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "6346285fc6028123",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k3,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1080,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "222b1e765146f559",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k4,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1120,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "915bce79332c02b4",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k5,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1160,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "467a6c3427aa0545",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k6,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1200,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "c75839af53eb1a48",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k7,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1240,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "6a1cd4342128b84f",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k8,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1280,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "4a539e6c688b10e9",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k9,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1320,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "a57e7490d807ef9f",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k10,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1360,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "64ff4389d08a4c71",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k11,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1400,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "60b95845cb55cb56",
        "type": "inject",
        "z": "be2581834d5f6762",
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
        "payload": "k12,1,end",
        "payloadType": "str",
        "x": 1140,
        "y": 1440,
        "wires": [
            [
                "e870934da54131dc"
            ]
        ]
    },
    {
        "id": "cc0a804a8320e230",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "kubikal",
        "func": "let kub = msg.payload[0];\nlet data_type = msg.payload[1];\n\nif(data_type === 'DA_30') {\n    msg.payload[0] = 'KUB_30';\n    return msg;\n}if(data_type ==='DA_01') {\n    msg.payload[0] = 'KUB_01';\n    return msg;\n}if(data_type ==='DA_18') {\n    msg.payload[0] = 'KUB_18';\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 680,
        "wires": [
            [
                "51a5304be40ef1c3",
                "85690b1d25e897ba"
            ]
        ]
    },
    {
        "id": "51a5304be40ef1c3",
        "type": "serial out",
        "z": "be2581834d5f6762",
        "name": "",
        "serial": "342430595c226ae0",
        "x": 730,
        "y": 680,
        "wires": []
    },
    {
        "id": "85690b1d25e897ba",
        "type": "debug",
        "z": "be2581834d5f6762",
        "name": "debug 8",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 720,
        "y": 640,
        "wires": []
    },
    {
        "id": "294176b02a8842d9",
        "type": "string",
        "z": "be2581834d5f6762",
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
        "x": 410,
        "y": 680,
        "wires": [
            [
                "cc0a804a8320e230"
            ]
        ]
    },
    {
        "id": "d7225d433af33d4b",
        "type": "link out",
        "z": "be2581834d5f6762",
        "name": "energy_listrik",
        "mode": "link",
        "links": [
            "345bc0ae1a4fe23a"
        ],
        "x": 505,
        "y": 40,
        "wires": []
    },
    {
        "id": "34baf9066bdae959",
        "type": "mysql",
        "z": "be2581834d5f6762",
        "mydb": "73e0a03b3db84d64",
        "name": "",
        "x": 1650,
        "y": 360,
        "wires": [
            []
        ]
    },
    {
        "id": "a3d154b33ba22688",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "nais_produksi",
        "func": "// Fungsi mapping line_id ke line_name dan pg\nfunction getLineInfo(line_id) {\n    const lineMap = {\n        \"1\": { name: \"Common Rail 1\", pg: \"PG2.2\" },\n        \"2\": { name: \"Common Rail 2\", pg: \"PG2.2\" },\n        \"3\": { name: \"Common Rail 3\", pg: \"PG2.2\" },\n        \"4\": { name: \"Common Rail 4\", pg: \"PG2.1\" },\n        \"5\": { name: \"Common Rail 5\", pg: \"PG2.2\" },\n        \"6\": { name: \"Common Rail 6\", pg: \"PG2.1\" },\n        \"7\": { name: \"Common Rail 7\", pg: \"PG2.2\" },\n        \"8\": { name: \"Common Rail 8\", pg: \"PG2.2\" },\n        \"9\": { name: \"Common Rail 9\", pg: \"PG2.1\" },\n        \"10\": { name: \"Common Rail 10\", pg: \"PG2.1\" },\n        \"11\": { name: \"Common Rail 11\", pg: \"PG2.1\" },\n        \"12\": { name: \"Common Rail 12\", pg: \"PG2.1\" },\n        \"13\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"13A\": { name: \"Cam housing A\", pg: \"PG2.3\" },\n        \"13B\": { name: \"Cam housing B\", pg: \"PG2.3\" },\n        \"14\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"14A\": { name: \"Cam housing C\", pg: \"PG2.3\" },\n        \"14B\": { name: \"Cam housing D\", pg: \"PG2.3\" },\n        \"15\": { name: \"Cam housing\", pg: \"PG2.3\" },\n        \"15A\": { name: \"Cam housing E NR\", pg: \"PG2.3\" },\n        \"15B\": { name: \"Cam housing E D05E\", pg: \"PG2.3\" },\n        \"16\": { name: \"Cam housing Assy A\", pg: \"PG2.3\" },\n        \"17\": { name: \"Cam housing Assy B\", pg: \"PG2.3\" },\n        \"18\": { name: \"Cam housing Assy\", pg: \"PG2.3\" },\n        \"18A\": { name: \"Cam housing Assy C NR\", pg: \"PG2.3\" },\n        \"18B\": { name: \"Cam housing Assy C D05E\", pg: \"PG2.3\" },\n        \"19\": { name: \"Cam Cap 1A\", pg: \"PG2.3\" },\n        \"20\": { name: \"Cam Cap 1B\", pg: \"PG2.3\" },\n        \"21\": { name: \"Cam Cap 1\", pg: \"PG2.3\" },\n        \"21A\": { name: \"Cam Cap 1C NR\", pg: \"PG2.3\" },\n        \"21B\": { name: \"Cam Cap 1C D05E\", pg: \"PG2.3\" },\n        \"22\": { name: \"Cam Cap 2\", pg: \"PG2.3\" },\n        \"22A\": { name: \"Cam Cap 2 2MP\", pg: \"PG2.3\" },\n        \"22B\": { name: \"Cam Cap 2 3MP\", pg: \"PG2.3\" },\n        \"22C\": { name: \"Cam Cap 2 4MP\", pg: \"PG2.3\" },\n        \"22D\": { name: \"Cam Cap 2 5MP\", pg: \"PG2.3\" },\n        \"23\": { name: \"Cam Cap 3\", pg: \"PG2.3\" },\n        \"23A\": { name: \"Cam Cap 3 2MP\", pg: \"PG2.3\" },\n        \"23B\": { name: \"Cam Cap 3 3MP\", pg: \"PG2.3\" },\n        \"23C\": { name: \"Cam Cap 3 4MP\", pg: \"PG2.3\" },\n        \"23D\": { name: \"Cam Cap 3 5MP\", pg: \"PG2.3\" },\n        \"24\": { name: \"Cam Cap 4\", pg: \"PG2.3\" },\n        \"24A\": { name: \"Cam Cap 4 2MP\", pg: \"PG2.3\" },\n        \"24B\": { name: \"Cam Cap 4 3MP\", pg: \"PG2.3\" },\n        \"24C\": { name: \"Cam Cap 4 4MP\", pg: \"PG2.3\" },\n        \"24D\": { name: \"Cam Cap 4 5MP\", pg: \"PG2.3\" },\n        \"25\": { name: \"Cam Cap 2 & 3 D05E\", pg: \"PG2.3\" },\n        \"26\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"26A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27\": { name: \"Connector\", pg: \"PG1.1\" },\n        \"27A\": { name: \"Retainer\", pg: \"PG1.1\" },\n        \"27B\": { name: \"Drive Gear\", pg: \"PG1.1\" },\n        \"27C\": { name: \"Spacer Drive Gear\", pg: \"PG1.1\" },\n        \"28\": { name: \"Housing\", pg: \"PG1.1\" },\n        \"28A\": { name: \"Housing Inlet TR\", pg: \"PG1.1\" },\n        \"28B\": { name: \"Housing Inlet D13E\", pg: \"PG1.1\" },\n        \"29\": { name: \"Balance Shaft NO 1\", pg: \"PG1.1\" },\n        \"29A\": { name: \"Balance Shaft NO 2\", pg: \"PG1.1\" },\n        \"30\": { name: \"Roller Arm 1\", pg: \"PG1.1\" },\n        \"30A\": { name: \"Roller Arm 1 A\", pg: \"PG1.1\" },\n        \"30B\": { name: \"Roller Arm 1 B\", pg: \"PG1.1\" },\n        \"30C\": { name: \"Roller Arm 1 C\", pg: \"PG1.1\" },\n        \"30D\": { name: \"Roller Arm 1 D\", pg: \"PG1.1\" },\n        \"30E\": { name: \"Roller Arm 1 E\", pg: \"PG1.1\" },\n        \"31\": { name: \"Roller Arm 2\", pg: \"PG1.1\" },\n        \"31A\": { name: \"Roller Arm 2 A\", pg: \"PG1.1\" },\n        \"31B\": { name: \"Roller Arm 2 B\", pg: \"PG1.1\" },\n        \"31C\": { name: \"Roller Arm 2 C\", pg: \"PG1.1\" },\n        \"31D\": { name: \"Roller Arm 2 D\", pg: \"PG1.1\" },\n        \"31E\": { name: \"Roller Arm 2 E\", pg: \"PG1.1\" },\n        \"32\": { name: \"Hydraulic Lash Adjuster\", pg: \"PG1.1\" },\n        \"32A\": { name: \"Hydraulic Lash Adjuster A\", pg: \"PG1.1\" },\n        \"32B\": { name: \"Hydraulic Lash Adjuster B\", pg: \"PG1.1\" },\n        \"32C\": { name: \"Hydraulic Lash Adjuster C\", pg: \"PG1.1\" },\n        \"32D\": { name: \"Hydraulic Lash Adjuster D\", pg: \"PG1.1\" },\n        \"32E\": { name: \"Hydraulic Lash Adjuster E\", pg: \"PG1.1\" },\n        \"33\": { name: \"Housing Inlet Water\", pg: \"PG1.1\" },\n        \"34\": { name: \"Packing Assy A\", pg: \"PG1.2\" },\n        \"35\": { name: \"Packing Assy B\", pg: \"PG1.2\" },\n        \"36\": { name: \"Packing Assy C\", pg: \"PG1.2\" },\n        \"37\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"38\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"39\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"40\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"41\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"42\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"43\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"44\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"45\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"46\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"47\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"48\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"49\": { name: \"Packing IMV\", pg: \"PG1.2\" },\n        \"50\": { name: \"Packing IMV\", pg: \"PG1.2\" }\n    };\n\n    return lineMap[line_id] || null;\n}\n\n// Fungsi untuk mengubah line_name jadi format tabel\nfunction toTableName(name) {\n    return name\n        .toLowerCase()\n        .replace(/[^a-z0-9 ]/g, '') // Hapus karakter aneh\n        .replace(/\\s+/g, '_');      // Ganti spasi jadi _\n}\n\n// Main logic\nconst payload = msg.payload;\n\nif (payload.length < 12) {\n    return null; // Data tidak lengkap\n}\n\nconst line_id = payload[0];\nconst info = getLineInfo(line_id);\n\nif (!info) {\n    return null; // Tidak ada info untuk line_id ini\n}\n\n// Ekstrak semua field dari payload\nconst [\n    , name_product, target, actual, loading_time, efficiency,\n    delay, cycle_time, status_montiv, time_trouble,\n    time_trouble_quality, andon\n] = payload;\n\n// Buat nama tabel dinamis\nconst tableName = toTableName(info.name); // e.g., \"cam_cap_2_2mp\"\n\n// Bangun query SQL untuk tabel spesifik line\nconst specificLineQuery = `\nINSERT INTO ${tableName} (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Bangun query SQL untuk tabel production_data\nconst productionDataQuery = `\nINSERT INTO production_data (\n    idPrimary, line_id, pg, line_name, name_product, target, actual,\n    loading_time, efficiency, delay, cycle_time, status,\n    time_trouble, time_trouble_quality, andon\n) VALUES (\n    NULL, '${line_id}', '${info.pg}', '${info.name}', '${name_product}',\n    '${target}', '${actual}', '${loading_time}', '${efficiency}',\n    '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}',\n    '${time_trouble_quality}', '${andon}'\n)`.replace(/\\s+/g, ' ').trim();\n\n// Gabungkan kedua query dengan pemisah titik koma\nmsg.topic = `${specificLineQuery}; ${productionDataQuery}`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 540,
        "y": 200,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "2cc5630e2b41e27b",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "nais_hikitori",
        "func": "var name_hikitori = msg.payload[0];\nvar actual_pouling = msg.payload[1];\nvar loading_time = msg.payload[2];\nvar status = msg.payload[3];\nvar cycle_normal = msg.payload[4];\nvar andon = msg.payload[5];\n\nvar validHikitoriIds = [\n    \"HIKITORI A\", \"HIKITORI B\", \"HIKITORI C\", \"HIKITORI D\",\n    \"HIKITORI E\", \"HIKITORI F\", \"HIKITORI G\", \"HIKITORI H\"\n];\n\nif (validHikitoriIds.includes(name_hikitori)) {\n    // Map to table name (HIKITORI F → hikitori_f)\n    var tableSuffix = name_hikitori.toLowerCase().split(' ')[1];\n    var specificTable = `hikitori_${tableSuffix}`;\n\n    // Common table insertion\n    var commonQuery =\n        `INSERT INTO hikitori_data \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Individual table insertion - match your table structure\n    var specificQuery =\n        `INSERT INTO ${specificTable} \n        (name_hikitori, actual_pouling, loading_time, status, cycle_normal, andon)\n        VALUES \n        ('${name_hikitori}', '${actual_pouling}', '${loading_time}', '${status}', '${cycle_normal}', '${andon}');`;\n\n    // Return both queries\n    return [\n        { topic: commonQuery },\n        { topic: specificQuery }\n    ];\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 550,
        "y": 620,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "5df198535bd3916f",
        "type": "string",
        "z": "be2581834d5f6762",
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
        "x": 410,
        "y": 620,
        "wires": [
            [
                "2cc5630e2b41e27b"
            ]
        ]
    },
    {
        "id": "b608b40b6f73ab09",
        "type": "string",
        "z": "be2581834d5f6762",
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
        "x": 390,
        "y": 200,
        "wires": [
            [
                "a3d154b33ba22688"
            ]
        ]
    },
    {
        "id": "5c4c922f17db67a7",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "w eng all pm200",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]); // Pastikan nilai adalah angka terlebih dahulu\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate();\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7);\nvar currentMonth = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\n\n// Nilai minimum\nvar minValue = 0.00;\n\nif (panel === \"W_ENG\" && (power_meter === \"PM_200_1\" || power_meter === \"PM_200_2\")) {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Validasi nilai minimum\n    if (value >= minValue) {\n        // Data valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_pm200_weng (power_meter, value, shift, day, week, month, year) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}');`;\n    } else {\n        // Data tidak valid, ubah value menjadi string sebelum query\n        var valueStr = value.toString();\n        msg.topic = `INSERT INTO tb_abnormal_data (power_meter, value, shift, day, week, month, year, reason) \n                     VALUES ('${power_meter}', '${valueStr}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonth}', '${currentYear}', 'Value below minimum');`;\n    }\n\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 380,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "fc5108c5a87d709c",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "tb_kub1_active_power",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_30\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_active_power (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1000,
        "y": 620,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "29225040b7e279a2",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "tb_kub1_total_kwh",
        "func": "var panel = msg.payload[0];\nvar power_meter = msg.payload[1];\nvar value = msg.payload[2];\nvar shift;\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar currentDay = now.getDate(); // Mendapatkan tanggal (1 - 31)\nvar currentWeek = Math.ceil((now.getDate() - 1 - now.getDay() + 1) / 7); // Menghitung nomor minggu\nvar currentMonth = now.toLocaleString('default', { month: 'long' }); // Nama bulan penuh, e.g., \"January\"\nvar currentYear = now.getFullYear();\n\nif (panel === \"kub\" && power_meter === \"DA_01\") {\n    // Menentukan shift berdasarkan waktu\n    if ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n        (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n        shift = \"shift_1\";\n    } else {\n        shift = \"shift_2\";\n    }\n\n    // Query dengan tambahan kolom `day`\n    msg.topic = \"INSERT INTO tb_kub1_total_kwh (power_meter, value, shift, day, week, month, year) \" +\n        \"VALUES ('\" + power_meter + \"', '\" + value + \"', '\" + shift + \"', '\" + currentDay +\n        \"', '\" + currentWeek + \"', '\" + currentMonth + \"', '\" + currentYear + \"');\";\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 990,
        "y": 650,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "acbe3ef73b1580ef",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "filter_lp_lpf2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPF2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 450,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "2099615fe6e6c2f0",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "filter_lp_qad",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpqad\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPQAD\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 480,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "c24427f081c4d1eb",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "filter_lp_lpf1",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpf1\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel ===\"LPF1\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 420,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "28b117e337eb17f0",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "filter_lp_dmtc",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_lpdmtc\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPDMTC\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 540,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "7ae450287068e5c3",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "filter_lp_acr1cr2",
        "func": "var panel = msg.payload[0];\nvar fasa = msg.payload[1];\nvar power = msg.payload[2];\nvar energy = msg.payload[3];\nvar current = msg.payload[4];\nvar voltage = msg.payload[5];\nvar total_energy = msg.payload[6];\n\nvar tableName = \"tb_area_cr1cr2\";\n\nvar values = [power, energy, current, voltage];\n\n// Cek fasa valid dan semua nilai bukan \"nan\"\nif (panel === \"LPACR1CR2\" && [\"r\", \"s\", \"t\"].includes(fasa) && values.every(v => v !== \"nan\")) {\n    msg.topic = `INSERT INTO ${tableName} (fasa, power, energy, current, voltage, total_energy)\n                 VALUES ('${fasa}', '${power}', '${energy}', '${current}', '${voltage}', '${total_energy}');`;\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 510,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "c1072ee02a4bc529",
        "type": "string",
        "z": "be2581834d5f6762",
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
        "x": 410,
        "y": 480,
        "wires": [
            [
                "fc5108c5a87d709c",
                "29225040b7e279a2"
            ]
        ]
    },
    {
        "id": "f940a0180864dcd1",
        "type": "string",
        "z": "be2581834d5f6762",
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
        "y": 320,
        "wires": [
            [
                "d8c7a3edcf356dc9",
                "5c4c922f17db67a7",
                "b21bce1c9d4f5c9e",
                "c24427f081c4d1eb",
                "acbe3ef73b1580ef",
                "2099615fe6e6c2f0",
                "7ae450287068e5c3",
                "28b117e337eb17f0"
            ]
        ]
    },
    {
        "id": "d8c7a3edcf356dc9",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "nais_energy",
        "func": "\n\n\nvar panel = msg.payload[0];\nvar powerMeter = msg.payload[1];\nvar value = parseFloat(msg.payload[2]);\n\nif (!panel || !powerMeter || !value || isNaN(value)) {\n    // node.warn(\"Input tidak lengkap atau nilai tidak valid\");\n    return null;\n}\n\nconst minValues = {\n    // PM200\n    \"tb_pm200_bs1\": 440626048,\n    \"tb_pm200_bs2\": 209808544,\n    \"tb_pm200_chab\": 466427904,\n    \"tb_pm200_chcd\": 471090464,\n    \"tb_pm200_chef\": 184574192,\n    \"tb_pm200_chsaa\": 507760000,\n    \"tb_pm200_chsab\": 492029536,\n    \"tb_pm200_chsac\": 81012288,\n    \"tb_pm200_cr1\": 2407983,\n    \"tb_pm200_cr2\": 2892411,\n    \"tb_pm200_cr3\": 2155191,\n    \"tb_pm200_cr4\": 5457567,\n    \"tb_pm200_cr5\": 595002,\n    \"tb_pm200_cr6\": 4918049,\n    \"tb_pm200_cr7\": 0,\n    \"tb_pm200_cr8\": 22528716,\n    \"tb_pm200_cr9\": 24032572,\n    \"tb_pm200_cr10\": 15670361,\n    \"tb_pm200_cr11\": 20140948,\n    \"tb_pm200_cr12\": 19938832,\n    \"tb_pm200_hla\": 597777920,\n    \"tb_pm200_ra\": 719735,\n    \"tb_pm200_ret\": 21537284,\n    \"tb_pm200_cc1\": 25080980,\n    \"tb_pm200_cc234\": 6936128,\n    \"tb_pm200_ct\": 0,\n    \"tb_pm220_lpf3\" : 0,\n    \n\n\n    // PM220\n    \"tb_pm220_bs1\": 544430,\n    \"tb_pm220_bs2\": 21029068,\n    \"tb_pm220_chab\": 13945773,\n    \"tb_pm220_chcd\": 6057570,\n    \"tb_pm220_chef\": 14652703,\n    \"tb_pm220_chsaa\": 12724962,\n    \"tb_pm220_chsab\": 25251044,\n    \"tb_pm220_chsac\": 2365030.25,\n    \"tb_pm220_cr1\": 61415,\n    \"tb_pm220_cr2\": 18912,\n    \"tb_pm220_cr3\": 100015,\n    \"tb_pm220_cr4\": 59101,\n    \"tb_pm220_cr5\": 6223,\n    \"tb_pm220_cr6\": 44206,\n    \"tb_pm220_cr7\": 0,\n    \"tb_pm220_cr8\": 136632,\n    \"tb_pm220_cr9\": 888496,\n    \"tb_pm220_cr10\": 98125,\n    \"tb_pm220_cr11\": 199250,\n    \"tb_pm220_cr12\": 235977,\n\n    \"tb_pm220_cc1\": 0,\n    \"tb_pm220_cc234\": 1652487,\n    \"tb_pm220_ra\": 1725531,\n    \"tb_pm220_ret\": 21537284,\n    \"tb_pm220_ct\": 0\n};\n\nvar now = new Date();\nvar currentHour = now.getHours();\nvar currentMinute = now.getMinutes();\nvar shift;\n\nif ((currentHour > 7 || (currentHour === 7 && currentMinute >= 0)) &&\n    (currentHour < 19 || (currentHour === 19 && currentMinute <= 50))) {\n    shift = \"shift_1\";\n} else {\n    shift = \"shift_2\";\n}\n\nfunction getWeekNumber(date) {\n    const year = date.getFullYear();\n    const month = date.getMonth();\n    const firstDayOfMonth = new Date(year, month, 1);\n    const timeDiff = date.getTime() - firstDayOfMonth.getTime();\n    const pastDaysOfYear = Math.floor(timeDiff / (1000 * 60 * 60 * 24));\n    return Math.ceil((pastDaysOfYear + firstDayOfMonth.getDay() + 1) / 7);\n}\n\nvar currentDay = now.getDate();\nvar currentMonthName = now.toLocaleString('default', { month: 'long' });\nvar currentYear = now.getFullYear();\nvar currentWeek = getWeekNumber(now);\n\n\nfunction getTableName(panel, powerMeter) {\n    var pmKey;\n    var panelCode;\n\n    // Khusus untuk DPCH\n    if (panel === \"DPCH\") {\n        if (powerMeter === \"PM-200V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM-220V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n        panelCode = \"chab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n    // Khusus untuk DPCH-CD\n    if (panel === \"DPCH-CD\") {\n        if (powerMeter === \"PM-1F\") {\n            pmKey = \"pm220\";\n        } else if (powerMeter === \"PM-3F\") {\n            pmKey = \"pm200\";\n        } else {\n            return null;\n        }\n        panelCode = \"chcd\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n    if (panel === \"CH_SAB\") {\n        if (powerMeter === \"PM_220V\") {\n            pmKey = \"pm200\";\n        } else if (powerMeter === \"PM_200V\") {\n            pmKey = \"pm220\";\n        } else {\n            return null;\n        }\n\n        panelCode = \"chsab\";\n        return \"tb_\" + pmKey + \"_\" + panelCode;\n    }\n\n\n\n\n    // Normalisasi powerMeter\n    switch (powerMeter) {\n        case \"PM 200\":\n        case \"PM_200\":\n        case \"PM_200V\":\n        case \"PM-200V\":\n            pmKey = \"pm200\";\n            break;\n        case \"PM 220\":\n        case \"PM_220V\":\n        case \"PM-220V\":\n        case \"PM_220\":\n            pmKey = \"pm220\";\n            break;\n        default:\n            return null;\n    }\n\n    // Normalisasi panel code\n    switch (panel) {\n        case \"roller_arm\": panelCode = \"ra\"; break;\n        case \"HLA\": panelCode = \"hla\"; break;\n        case \"BS_1\": panelCode = \"bs1\"; break;\n        case \"BS_2\": panelCode = \"bs2\"; break;\n        case \"CH_SAA\": panelCode = \"chsaa\"; break;\n        case \"CH_SAB\": panelCode = \"chsab\"; break;\n        case \"CH_SAC\": panelCode = \"chsac\"; break;\n        case \"CH_EF\": panelCode = \"chef\"; break;\n        case \"RET\": panelCode = \"ret\"; break;\n        case \"CONN\": panelCode = \"conn\"; break;\n        case \"CR_1\": panelCode = \"cr1\"; break;\n        case \"CR_2\": panelCode = \"cr2\"; break;\n        case \"CR_3\": panelCode = \"cr3\"; break;\n        case \"CR_4\": panelCode = \"cr4\"; break;\n        case \"CR_5\": panelCode = \"cr5\"; break;\n        case \"CR_6\": panelCode = \"cr6\"; break;\n        case \"CR_7\": panelCode = \"cr7\"; break;\n        case \"cr7\": panelCode = \"cr7\"; break;\n        case \"CR_8\": panelCode = \"cr8\"; break;\n        case \"CR_9\": panelCode = \"cr9\"; break;\n        case \"CR_10\": panelCode = \"cr10\"; break;\n        case \"CR_11\": panelCode = \"cr11\"; break;\n        case \"CR_12\": panelCode = \"cr12\"; break;\n        case \"CC1\": panelCode = \"cc1\"; break;\n        case \"CC234\": panelCode = \"cc234\"; break;\n        case \"C_T\": panelCode = \"ct\"; break;\n        case \"lp_f3\": panelCode = \"lpf3\"; break;\n\n\n        case \"W_ENG\": panelCode = \"weng\"; break;\n        default:\n            // node.warn(\"Panel tidak dikenali: \" + panel);\n            return null;\n    }\n\n    return \"tb_\" + pmKey + \"_\" + panelCode;\n}\n\n// Dapatkan nama tabel tujuan\nvar tableName = getTableName(panel, powerMeter);\n\nif (!tableName) {\n    // node.warn(\"Tabel tidak ditemukan untuk panel: \" + panel + \" dan power meter: \" + powerMeter);\n    return null;\n}\n\n// Filter berdasarkan nilai minimal\nif (minValues.hasOwnProperty(tableName)) {\n    const minValue = minValues[tableName];\n    if (value < minValue) {\n        // node.warn(`Nilai ${value} WH di bawah batas minimal (${minValue} WH) untuk ${tableName}`);\n        return null;\n    }\n}\n\n// Buat query SQL\nmsg.topic = `INSERT INTO ${tableName} (power_meter, value, shift, day, week, month, year)\n             VALUES ('${powerMeter}', '${value}', '${shift}', '${currentDay}', '${currentWeek}', '${currentMonthName}', '${currentYear}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1310,
        "y": 580,
        "wires": [
            [
                "34baf9066bdae959"
            ]
        ]
    },
    {
        "id": "06de3f75f773a203",
        "type": "string",
        "z": "be2581834d5f6762",
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
        "x": 1150,
        "y": 580,
        "wires": [
            [
                "d8c7a3edcf356dc9"
            ]
        ]
    },
    {
        "id": "b21bce1c9d4f5c9e",
        "type": "function",
        "z": "be2581834d5f6762",
        "name": "filter_pm1200",
        "func": "var panel = msg.payload[1];\nvar powerMeter = msg.payload[2];\nvar value = msg.payload[3];\n\nvar panel_nais;\nvar powerMeter_nais;\nvar value_nais;\nvar msg_nais;\n\n\nif ([\"HLA\", \"DPCH\", \"DPCH-CD\", \"CH_SAA\", \"CH_SAB\", \"CH_SAC\", \"CH_EF\", \"RET\", \"CAM_CAP_1\", \"CC234\", \"C_T\"].includes(panel)) {\n    panel_nais = panel;\n    powerMeter_nais = powerMeter;\n    value_nais = value;\n\n    msg_nais = \"*\" + panel_nais + \",\" + powerMeter_nais + \",\" + value_nais + \",#\";\n    return { payload: msg_nais }; // Jika di Node-RED, biasanya kirim dalam objek\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 980,
        "y": 580,
        "wires": [
            [
                "06de3f75f773a203"
            ]
        ]
    },
    {
        "id": "7677b79288bed24f",
        "type": "ui_text",
        "z": "be2581834d5f6762",
        "group": "4a4dd18c5b81b3a0",
        "order": 1,
        "width": 14,
        "height": 1,
        "name": "",
        "label": "Montiv",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 830,
        "y": 40,
        "wires": []
    },
    {
        "id": "2250eb59d60b9a8a",
        "type": "ui_text",
        "z": "be2581834d5f6762",
        "group": "4a4dd18c5b81b3a0",
        "order": 2,
        "width": 14,
        "height": 1,
        "name": "",
        "label": "Listrik",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 830,
        "y": 80,
        "wires": []
    },
    {
        "id": "278c3dfd525300c9",
        "type": "ui_text",
        "z": "be2581834d5f6762",
        "group": "4a4dd18c5b81b3a0",
        "order": 3,
        "width": 14,
        "height": 1,
        "name": "",
        "label": "Kubikal 1",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 840,
        "y": 120,
        "wires": []
    },
    {
        "id": "d608d9b36c9ab4e3",
        "type": "ui_text",
        "z": "be2581834d5f6762",
        "group": "4a4dd18c5b81b3a0",
        "order": 4,
        "width": 14,
        "height": 1,
        "name": "",
        "label": "Hikitori",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 830,
        "y": 160,
        "wires": []
    },
    {
        "id": "9bf96bc56d1f048d",
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
        "id": "b6ef892c0e14efe4",
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
        "responsetimeout": "10000"
    },
    {
        "id": "342430595c226ae0",
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
        "id": "740b5b0d37aa7430",
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
        "id": "73e0a03b3db84d64",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_core",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "4a4dd18c5b81b3a0",
        "type": "ui_group",
        "name": "------------------------- getData()",
        "tab": "bf43fd306ef4af56",
        "order": 1,
        "disp": true,
        "width": 14,
        "collapse": false,
        "className": ""
    },
    {
        "id": "bf43fd306ef4af56",
        "type": "ui_tab",
        "name": "Page Developer",
        "icon": "dashboard",
        "order": 3,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "28db708f95ee9d59",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-node-serialport": "2.0.3",
            "node-red-contrib-string": "1.0.0",
            "node-red-node-mysql": "3.0.0",
            "node-red-dashboard": "3.6.6"
        }
    }
]
