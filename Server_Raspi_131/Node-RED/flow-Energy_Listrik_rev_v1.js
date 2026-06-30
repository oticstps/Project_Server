[
    {
        "id": "7cbe226e7f9c0ede",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "shift_1 jam 7.10",
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
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 700,
        "y": 90,
        "wires": [
            []
        ]
    },
    {
        "id": "a857fe35eb7a71d9",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "shift_2 jam 19.50",
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
        "crontab": "50 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 700,
        "y": 130,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_00_10_001",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "00:10",
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
        "crontab": "10 00 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 90,
        "wires": [
            [
                "2d9349e380521030"
            ]
        ]
    },
    {
        "id": "inj_00_15_002",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "00:15",
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
        "crontab": "15 00 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 130,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_00_20_003",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "00:20",
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
        "crontab": "20 00 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 170,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_01_10_004",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "01:10",
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
        "crontab": "10 01 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 210,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_01_15_005",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "01:15",
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
        "crontab": "15 01 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 250,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_01_20_006",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "01:20",
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
        "crontab": "20 01 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 290,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_02_10_007",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "02:10",
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
        "crontab": "10 02 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 330,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_02_15_008",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "02:15",
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
        "crontab": "15 02 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 370,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_02_20_009",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "02:20",
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
        "crontab": "20 02 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 410,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_03_10_010",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "03:10",
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
        "crontab": "10 03 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 450,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_03_15_011",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "03:15",
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
        "crontab": "15 03 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 490,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_03_20_012",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "03:20",
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
        "crontab": "20 03 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 530,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_04_10_013",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "04:10",
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
        "crontab": "10 04 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 90,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_04_15_014",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "04:15",
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
        "crontab": "15 04 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 130,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_04_20_015",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "04:20",
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
        "crontab": "20 04 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 170,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_05_10_016",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "05:10",
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
        "crontab": "10 05 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 210,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_05_15_017",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "05:15",
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
        "crontab": "15 05 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 250,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_05_20_018",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "05:20",
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
        "crontab": "20 05 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 290,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_06_10_019",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "06:10",
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
        "crontab": "10 06 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 330,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_06_15_020",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "06:15",
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
        "crontab": "15 06 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 370,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_06_20_021",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "06:20",
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
        "crontab": "20 06 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 410,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_07_10_022",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "07:10",
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
        "crontab": "10 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 450,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_07_15_023",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "07:15",
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
        "crontab": "15 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 490,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_07_20_024",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "07:20",
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
        "crontab": "20 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 530,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_08_10_025",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "08:10",
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
        "crontab": "10 08 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 90,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_08_15_026",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "08:15",
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
        "crontab": "15 08 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 130,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_08_20_027",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "08:20",
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
        "crontab": "20 08 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 170,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_09_10_028",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "09:10",
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
        "crontab": "10 09 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 210,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_09_15_029",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "09:15",
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
        "crontab": "15 09 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 250,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_09_20_030",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "09:20",
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
        "crontab": "20 09 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 290,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_10_10_031",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "10:10",
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
        "crontab": "10 10 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 330,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_10_15_032",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "10:15",
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
        "crontab": "15 10 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 370,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_10_20_033",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "10:20",
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
        "crontab": "20 10 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 410,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_11_10_034",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "11:10",
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
        "crontab": "10 11 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 450,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_11_15_035",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "11:15",
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
        "crontab": "15 11 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 490,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_11_20_036",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "11:20",
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
        "crontab": "20 11 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 530,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_12_10_037",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "12:10",
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
        "crontab": "10 12 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 610,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_12_15_038",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "12:15",
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
        "crontab": "15 12 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 650,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_12_20_039",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "12:20",
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
        "crontab": "20 12 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 690,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_13_10_040",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "13:10",
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
        "crontab": "10 13 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 730,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_13_15_041",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "13:15",
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
        "crontab": "15 13 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 770,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_13_20_042",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "13:20",
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
        "crontab": "20 13 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 810,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_14_10_043",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "14:10",
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
        "crontab": "10 14 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 850,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_14_15_044",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "14:15",
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
        "crontab": "15 14 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 890,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_14_20_045",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "14:20",
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
        "crontab": "20 14 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 930,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_15_10_046",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "15:10",
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
        "crontab": "10 15 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 970,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_15_15_047",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "15:15",
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
        "crontab": "15 15 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 1010,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_15_20_048",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "15:20",
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
        "crontab": "20 15 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 130,
        "y": 1050,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_16_10_049",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "16:10",
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
        "crontab": "10 16 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 610,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_16_15_050",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "16:15",
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
        "crontab": "15 16 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 650,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_16_20_051",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "16:20",
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
        "crontab": "20 16 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 690,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_17_10_052",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "17:10",
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
        "crontab": "10 17 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 730,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_17_15_053",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "17:15",
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
        "crontab": "15 17 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 770,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_17_20_054",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "17:20",
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
        "crontab": "20 17 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 810,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_18_10_055",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "18:10",
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
        "crontab": "10 18 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 850,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_18_15_056",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "18:15",
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
        "crontab": "15 18 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 890,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_18_20_057",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "18:20",
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
        "crontab": "20 18 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 930,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_19_10_058",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "19:10",
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
        "crontab": "10 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 970,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_19_15_059",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "19:15",
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
        "crontab": "15 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 1010,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_19_20_060",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "19:20",
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
        "crontab": "20 19 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 310,
        "y": 1050,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_20_10_061",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "20:10",
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
        "crontab": "10 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 610,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_20_15_062",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "20:15",
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
        "crontab": "15 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 650,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_20_20_063",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "20:20",
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
        "crontab": "20 20 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 690,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_21_10_064",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "21:10",
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
        "crontab": "10 21 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 730,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_21_15_065",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "21:15",
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
        "crontab": "15 21 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 770,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_21_20_066",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "21:20",
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
        "crontab": "20 21 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 810,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_22_10_067",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "22:10",
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
        "crontab": "10 22 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 850,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_22_15_068",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "22:15",
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
        "crontab": "15 22 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 890,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_22_20_069",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "22:20",
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
        "crontab": "20 22 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 930,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_23_10_070",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "23:10",
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
        "crontab": "10 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 970,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_23_15_071",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "23:15",
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
        "crontab": "15 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 1010,
        "wires": [
            []
        ]
    },
    {
        "id": "inj_23_20_072",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "23:20",
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
        "crontab": "20 23 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 490,
        "y": 1050,
        "wires": [
            []
        ]
    },
    {
        "id": "9872d160d94f7369",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "daily_00:10",
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
        "crontab": "10 00 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 680,
        "y": 210,
        "wires": [
            []
        ]
    },
    {
        "id": "bd7c0f9651d936a7",
        "type": "inject",
        "z": "6e61b29031c2df40",
        "name": "weekly_00:10",
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
        "crontab": "10 00 * * 1",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "true",
        "payloadType": "bool",
        "x": 690,
        "y": 290,
        "wires": [
            []
        ]
    },
    {
        "id": "2d9349e380521030",
        "type": "function",
        "z": "6e61b29031c2df40",
        "name": "get_last_data & insert_tb",
        "func": "// Ambil data terbaru per panel & meter dari sumber,\n// lalu insert ke tabel 5-menit jika belum ada\nlet query = `\nINSERT INTO bn_pivot_220v_five_minutes \n  (panel_name, power_meter, data_wh, timestamp, shift, day, week, month, year)\nSELECT \n  t1.panel_name, t1.power_meter, t1.data_wh, t1.timestamp,\n  t1.shift, t1.day, t1.week, t1.month, t1.year\nFROM bn_pivot_220v t1\nINNER JOIN (\n  SELECT panel_name, power_meter, MAX(timestamp) AS max_ts\n  FROM bn_pivot_220v\n  WHERE timestamp <= NOW()\n  GROUP BY panel_name, power_meter\n) t2 ON t1.panel_name = t2.panel_name \n     AND t1.power_meter = t2.power_meter \n     AND t1.timestamp = t2.max_ts\nWHERE NOT EXISTS (\n  SELECT 1 FROM bn_pivot_220v_five_minutes dest\n  WHERE dest.panel_name = t1.panel_name \n    AND dest.power_meter = t1.power_meter \n    AND dest.timestamp = t1.timestamp\n);\n`;\n\nmsg.topic = query;\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 370,
        "wires": [
            [
                "7651f796e6996a44"
            ]
        ]
    },
    {
        "id": "7651f796e6996a44",
        "type": "mysql",
        "z": "6e61b29031c2df40",
        "mydb": "c121afbbb1a7d0cb",
        "name": "",
        "x": 1010,
        "y": 430,
        "wires": [
            []
        ]
    },
    {
        "id": "c121afbbb1a7d0cb",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_tps_energy_listrik",
        "tz": "",
        "charset": "UTF8"
    }
]
