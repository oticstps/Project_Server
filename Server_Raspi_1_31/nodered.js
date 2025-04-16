[
    {
        "id": "c0874e23b7245dfb",
        "type": "mqtt in",
        "z": "8b197288a196e470",
        "name": "",
        "topic": "topic_coreengine_server_montiv",
        "qos": "2",
        "datatype": "auto-detect",
        "broker": "e9bbeaa170eeda4e",
        "nl": false,
        "rap": true,
        "rh": 0,
        "inputs": 0,
        "x": 170,
        "y": 100,
        "wires": [
            [
                "4741c7ca3ecec1b5"
            ]
        ]
    },
    {
        "id": "74acf311740ee2e3",
        "type": "debug",
        "z": "8b197288a196e470",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 530,
        "y": 50,
        "wires": []
    },
    {
        "id": "4741c7ca3ecec1b5",
        "type": "string",
        "z": "8b197288a196e470",
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
        "y": 100,
        "wires": [
            [
                "375278458d6b71fc",
                "74acf311740ee2e3",
                "50189758d5ee29ae",
                "7ffd063fb6548cc6",
                "1d8075c231ba89ee",
                "e465695bd65a3064",
                "6ba362c12b1dcc49",
                "2bf1f802bfe7ae88",
                "542348b4b41b404a",
                "0fd01acf57013441",
                "d815c5df43afca14",
                "f1b07656530ae7e6",
                "f9bb179ad695ef3f",
                "b6bfb69a968ca01f",
                "c3df54acd1761fcc",
                "badf9fe39668b42d",
                "6e8f79edf6f253b3",
                "4c100eb32bc3e067",
                "27f1b8125acd7720",
                "3ff5bb43411bdd50",
                "39832f3b4ad3348f",
                "9424fbcb6db54db4",
                "a9385c5357971218",
                "ed944163495c899e",
                "518ea97e693815a7",
                "cd31361cf9b884fe",
                "4e2dbb2a88827f09",
                "270cf5c931d46f04",
                "1aaa1df3dce09e7d",
                "3510cecae3bca55b",
                "8e295516661333d4"
            ]
        ]
    },
    {
        "id": "375278458d6b71fc",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "get_all_montiv",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\nif (line_id == \"1\") {\n    line_name = 'Common Rail 1'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"2\") {\n    line_name = 'Common Rail 2'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"3\") {\n    line_name = 'Common Rail 3'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"4\") {\n    line_name = 'Common Rail 4'\n    pg = 'PG2.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"5\") {\n\n    line_name = 'Common Rail 5'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"6\") {\n    line_name = 'Common Rail 6'\n    pg = 'PG2.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"7\") {\n    line_name = 'Common Rail 7'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"8\") {\n    line_name = 'Common Rail 8'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"9\") {\n    line_name = 'Common Rail 9'\n    pg = 'PG2.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"10\") {\n    line_name = 'Common Rail 10'\n    pg = 'PG2.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"11\") {\n    line_name = 'Common Rail 11'\n    pg = 'PG2.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"12\") {\n    line_name = 'Common Rail 12'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"13\") {\n    line_name = 'Cam housing'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"13A\") {\n    line_name = 'Cam housing A'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"13B\") {\n    line_name = 'Cam housing B'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"14\") {\n    line_name = 'Cam housing'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values (null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"14A\") {\n    line_name = 'Cam housing C'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"14B\") {\n    line_name = 'Cam housing D'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"15\") {\n    line_name = 'Cam housing'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"15A\") {\n    line_name = 'Cam housing E NR'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"15B\") {\n    line_name = 'Cam housing E D05E'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"16\") {\n    line_name = 'Cam housing Assy A'\n    pg = 'PG2.3'\n}\n\nelse if (line_id == \"17\") {\n    line_name = 'Cam housing Assy B'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"18\") {\n    line_name = 'Cam housing Assy'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"18A\") {\n    line_name = 'Cam housing Assy C NR'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"18B\") {\n    line_name = 'Cam housing Assy C D05E'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"19\") {\n    line_name = 'Cam Cap 1A'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"20\") {\n    line_name = 'Cam Cap 1B'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"21\") {\n    line_name = 'Cam Cap'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"21A\") {\n    line_name = 'Cam Cap 1C NR'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"21B\") {\n    line_name = 'Cam Cap 1C D05E'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"22\") {\n    line_name = 'Cam Cap'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"22A\") {\n    line_name = 'Cam Cap 2 2MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"22B\") {\n    line_name = 'Cam Cap 2 3MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"22C\") {\n    line_name = 'Cam Cap 2 4MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"22D\") {\n    line_name = 'Cam Cap 2 5MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"23\") {\n    line_name = 'Cam Cap'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"23A\") {\n    line_name = 'Cam Cap 3 2MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"23B\") {\n    line_name = 'Cam Cap 3 3MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"23C\") {\n    line_name = 'Cam Cap 3 4MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"23D\") {\n    line_name = 'Cam Cap 3 5MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"24\") {\n    line_name = 'Cam Cap'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"24A\") {\n    line_name = 'Cam Cap 4 2MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"24B\") {\n    line_name = 'Cam Cap 4 3MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"24C\") {\n    line_name = 'Cam Cap 4 4MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"24D\") {\n    line_name = 'Cam Cap 4 5MP'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"25\") {\n    line_name = 'Cam Cap 2 & 3 D05E'\n    pg = 'PG2.3'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\n\n\n\n\nelse if (line_id == \"26\") {\n    line_name = 'Spacer Drive Gear'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"26A\") {\n    line_name = 'Retainer'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"27\") {\n    line_name = 'Connector'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"27A\") {\n    line_name = 'Retainer'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"27B\") {\n    line_name = 'Drive Gear'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"27C\") {\n    line_name = 'Spacer Drive Gear'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"28\") {\n    line_name = 'Housing'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"28A\") {\n    line_name = 'Housing Inlet TR '\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"28B\") {\n    line_name = 'Housing Inlet D13E'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\n\nelse if (line_id == \"29\") {\n    line_name = 'Balance Shaft NO 1'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"29A\") {\n    line_name = 'Balance Shaft NO 2'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"30\") {\n    line_name = 'Roller Arm 1'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"30A\") {\n    line_name = 'Roller Arm 1 A'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"30B\") {\n    line_name = 'Roller Arm 1 B'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"30C\") {\n    line_name = 'Roller Arm 1 C'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"30D\") {\n    line_name = 'Roller Arm 1 D'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"30E\") {\n    line_name = 'Roller Arm 1 E'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\nelse if (line_id == \"31\") {\n    line_name = 'Roller Arm 2'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"31A\") {\n    line_name = 'Roller Arm 2 A'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"31B\") {\n    line_name = 'Roller Arm 2 B'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"31C\") {\n    line_name = 'Roller Arm 2 C'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"31D\") {\n    line_name = 'Roller Arm 2 D'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"31E\") {\n    line_name = 'Roller Arm 2 E'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"32\") {\n    line_name = 'Hydraulic Lash Adjuster'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"32A\") {\n    line_name = 'Hydraulic Lash Adjuster A'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"32B\") {\n    line_name = 'Hydraulic Lash Adjuster B'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"32C\") {\n    line_name = 'Hydraulic Lash Adjuster C'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"32D\") {\n    line_name = 'Hydraulic Lash Adjuster D'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"32E\") {\n    line_name = 'Hydraulic Lash Adjuster E'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"33\") {\n    line_name = 'Housing Inlet Water'\n    pg = 'PG1.1'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"34\") {\n    line_name = 'Packing Assy A'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"35\") {\n    line_name = 'Packing Assy B'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"36\") {\n    line_name = 'Packing Assy C'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"37\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"38\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"39\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"40\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"41\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"42\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"43\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"44\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"45\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"46\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"47\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"48\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else if (line_id == \"49\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\nelse if (line_id == \"50\") {\n    line_name = 'Packing IMV'\n    pg = 'PG1.2'\n    msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n}\n\n\n\n\n\n\n\n// } else if (line_id == \"34A\") {\n//     line_name = 'Packing IMV 1'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34B\") {\n//     line_name = 'Packing IMV 2'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34C\") {\n//     line_name = 'Packing IMV 3'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34D\") {\n//     line_name = 'Packing IMV 4'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34E\") {\n//     line_name = 'Packing IMV 5'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34F\") {\n//     line_name = 'Packing IMV 6'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34G\") {\n//     line_name = 'Packing IMV 7'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34H\") {\n//     line_name = 'Packing IMV 8'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34I\") {\n//     line_name = 'Packing IMV 9'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34J\") {\n//     line_name = 'Packing IMV 10'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34K\") {\n//     line_name = 'Packing IMV 11'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34L\") {\n//     line_name = 'Packing IMV 12'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34M\") {\n//     line_name = 'Packing IMV 13'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34N\") {\n//     line_name = 'Packing IMV 14'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34O\") {\n//     line_name = 'Packing IMV 15'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34P\") {\n//     line_name = 'Packing IMV 16'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34Q\") {\n//     line_name = 'Packing IMV 17'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"34R\") {\n//     line_name = 'Packing IMV 18'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// } else if (line_id == \"35\") {\n//     line_name = 'Packing Common Rail'\n//     pg = 'PG1.2'\n//     msg.topic = \"INSERT INTO table_all_montiv (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n//     return msg;\n// }\n// \nelse {\n    // Tidak melakukan apapun jika data_condition tidak sama dengan \"signal\"\n    return null;\n}\n\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 560,
        "y": 160,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "73d5e0ea8bc856a7",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "d69ac283a741dda0",
        "name": "",
        "x": 1020,
        "y": 150,
        "wires": [
            []
        ]
    },
    {
        "id": "50189758d5ee29ae",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_1",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"1\") {\n    line_name = 'Common Rail 1'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_1 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 210,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "7ffd063fb6548cc6",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_2",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"2\") {\n    line_name = 'Common Rail 2'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_2 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 250,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "1d8075c231ba89ee",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_3",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"3\") {\n    line_name = 'Common Rail 3'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_3 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 290,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "e465695bd65a3064",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_4",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"4\") {\n    line_name = 'Common Rail 4'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_4 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 330,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "6ba362c12b1dcc49",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_5",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"5\") {\n    line_name = 'Common Rail 5'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_5 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 370,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "2bf1f802bfe7ae88",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_6",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"6\") {\n    line_name = 'Common Rail 6'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_6 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 410,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "542348b4b41b404a",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_7",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"7\") {\n    line_name = 'Common Rail 7'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_7 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 450,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "0fd01acf57013441",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_8",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"8\") {\n    line_name = 'Common Rail 8'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_8 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 490,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "d815c5df43afca14",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_9",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"9\") {\n    line_name = 'Common Rail 9'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_9 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 530,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "f1b07656530ae7e6",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_10",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"10\") {\n    line_name = 'Common Rail 10'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_10 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 570,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "f9bb179ad695ef3f",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_11",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"11\") {\n    line_name = 'Common Rail 11'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_11 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 610,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "b6bfb69a968ca01f",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_12",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"12\") {\n    line_name = 'Common Rail 12'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_cr_12 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 650,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "c2f757f0104cd3da",
        "type": "trigger",
        "z": "8b197288a196e470",
        "name": "",
        "op1": "1",
        "op2": "0",
        "op1type": "str",
        "op2type": "str",
        "duration": "250",
        "extend": false,
        "overrideDelay": false,
        "units": "ms",
        "reset": "",
        "bytopic": "all",
        "topic": "topic",
        "outputs": 1,
        "x": 1290,
        "y": 150,
        "wires": [
            []
        ]
    },
    {
        "id": "c3df54acd1761fcc",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "get_all_montiv_status",
        "func": "var line_id = msg.payload[0];\n\nvar column_mapping = {\n    \"1\": \"cr_1\",\n    \"2\": \"cr_2\",\n    \"3\": \"cr_3\",\n    \"4\": \"cr_4\",\n    \"5\": \"cr_5\",\n    \"6\": \"cr_6\",\n    \"7\": \"cr_7\",\n    \"8\": \"cr_8\",\n    \"9\": \"cr_9\",\n    \"10\": \"cr_10\",\n    \"11\": \"cr_11\",\n    \"12\": \"cr_12\",\n    \"13\": \"cam_housing_a\",\n    \"14\": \"cam_housing_b\",\n    \"15\": \"cam_housing_c\",\n    \"16\": \"cam_housing_d\",\n    \"17\": \"cam_housing_e\",\n    \"18\": \"cam_housing_f\",\n};\n\n\nif (column_mapping[line_id]) {\n    var column_name = column_mapping[line_id];\n\n    msg.topic = \"UPDATE table_all_status_line SET \" + column_name + \" = 1 WHERE id_primary = 1;\";\n\n    return msg;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 120,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "ccc32ca1ce478d2d",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "bf2e1b12ad751e91",
        "name": "",
        "x": 1180,
        "y": 240,
        "wires": [
            []
        ]
    },
    {
        "id": "84c314d73818e2b1",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "cc0c482c71644cc6",
        "name": "",
        "x": 1180,
        "y": 290,
        "wires": [
            []
        ]
    },
    {
        "id": "1b42c90f0e58bde0",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "85fba75f8d92ad37",
        "name": "",
        "x": 1180,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "badf9fe39668b42d",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_2_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"2\") {\n    return null;\n}\n\nif (line_id === \"2\") {\n    line_name = \"Common Rail 2\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 290,
        "wires": [
            [
                "84c314d73818e2b1"
            ]
        ]
    },
    {
        "id": "6e8f79edf6f253b3",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_3_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"3\") {\n    return null;\n}\n\nif (line_id === \"3\") {\n    line_name = \"Common Rail 3\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 340,
        "wires": [
            [
                "1b42c90f0e58bde0"
            ]
        ]
    },
    {
        "id": "e05afef4acb3c188",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "8c90c4d0f5594af5",
        "name": "",
        "x": 1180,
        "y": 390,
        "wires": [
            []
        ]
    },
    {
        "id": "757464e04f01d5f8",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "3f138b69e3ba3a16",
        "name": "",
        "x": 1180,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "d9739e5594de89e9",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "52fbe6cf93ef7c94",
        "name": "",
        "x": 1180,
        "y": 490,
        "wires": [
            []
        ]
    },
    {
        "id": "209d5632a465be9a",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "facc9f2671c003ff",
        "name": "",
        "x": 1180,
        "y": 540,
        "wires": [
            []
        ]
    },
    {
        "id": "8c87d089144d0df1",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "6536a293f8646b39",
        "name": "",
        "x": 1180,
        "y": 640,
        "wires": [
            []
        ]
    },
    {
        "id": "ea7d5673869af0bd",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "5dd8e1648a3bf500",
        "name": "",
        "x": 1180,
        "y": 590,
        "wires": [
            []
        ]
    },
    {
        "id": "1b732b0e525447d5",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "bbcf7c075b1212b1",
        "name": "",
        "x": 1190,
        "y": 690,
        "wires": [
            []
        ]
    },
    {
        "id": "37c12007fa79c812",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "2e1570a390539bc9",
        "name": "",
        "x": 1190,
        "y": 740,
        "wires": [
            []
        ]
    },
    {
        "id": "ad7fbd99c1a77b2b",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "48f3e2b7cdfbbb33",
        "name": "",
        "x": 1190,
        "y": 790,
        "wires": [
            []
        ]
    },
    {
        "id": "4c100eb32bc3e067",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_4_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"4\") {\n    return null;\n}\n\nif (line_id === \"4\") {\n    line_name = \"Common Rail 4\";\n    pg = \"PG2.1\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 390,
        "wires": [
            [
                "e05afef4acb3c188"
            ]
        ]
    },
    {
        "id": "27f1b8125acd7720",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_5_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"5\") {\n    return null;\n}\n\nif (line_id === \"5\") {\n    line_name = \"Common Rail 5\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 440,
        "wires": [
            [
                "757464e04f01d5f8"
            ]
        ]
    },
    {
        "id": "3ff5bb43411bdd50",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_6_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"6\") {\n    return null;\n}\n\nif (line_id === \"6\") {\n    line_name = \"Common Rail 6\";\n    pg = \"PG2.1\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 490,
        "wires": [
            [
                "d9739e5594de89e9"
            ]
        ]
    },
    {
        "id": "39832f3b4ad3348f",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_7_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"7\") {\n    return null;\n}\n\nif (line_id === \"7\") {\n    line_name = \"Common Rail 7\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 540,
        "wires": [
            [
                "209d5632a465be9a"
            ]
        ]
    },
    {
        "id": "9424fbcb6db54db4",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_8_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"8\") {\n    return null;\n}\n\nif (line_id === \"8\") {\n    line_name = \"Common Rail 8\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 590,
        "wires": [
            [
                "ea7d5673869af0bd"
            ]
        ]
    },
    {
        "id": "a9385c5357971218",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_9_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"9\") {\n    return null;\n}\n\nif (line_id === \"9\") {\n    line_name = \"Common Rail 9\";\n    pg = \"PG2.1\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 640,
        "wires": [
            [
                "8c87d089144d0df1"
            ]
        ]
    },
    {
        "id": "ed944163495c899e",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_10_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"10\") {\n    return null;\n}\n\nif (line_id === \"10\") {\n    line_name = \"Common Rail 10\";\n    pg = \"PG2.1\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 690,
        "wires": [
            [
                "1b732b0e525447d5"
            ]
        ]
    },
    {
        "id": "518ea97e693815a7",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_11_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"11\") {\n    return null;\n}\n\nif (line_id === \"11\") {\n    line_name = \"Common Rail 11\";\n    pg = \"PG2.1\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 740,
        "wires": [
            [
                "37c12007fa79c812"
            ]
        ]
    },
    {
        "id": "cd31361cf9b884fe",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_12_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"12\") {\n    return null;\n}\n\nif (line_id === \"12\") {\n    line_name = \"Common Rail 12\";\n    pg = \"PG2.1\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 970,
        "y": 790,
        "wires": [
            [
                "ad7fbd99c1a77b2b"
            ]
        ]
    },
    {
        "id": "4e2dbb2a88827f09",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "cr_1_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"1\") {\n    return null;\n}\n\nif (line_id === \"1\") {\n    line_name = \"Common Rail 1\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 240,
        "wires": [
            [
                "ccc32ca1ce478d2d"
            ]
        ]
    },
    {
        "id": "f25ab924fe2512e4",
        "type": "inject",
        "z": "8b197288a196e470",
        "name": "reset_status_line",
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
        "crontab": "00 07 * * *",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "",
        "payloadType": "date",
        "x": 160,
        "y": 170,
        "wires": [
            []
        ]
    },
    {
        "id": "270cf5c931d46f04",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "bs_1",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"29\") {\n    line_name = 'Balance Shaft No 1'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_bs_1 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 900,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "1aaa1df3dce09e7d",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "bs_2",
        "func": "var line_id\nvar name_product\nvar target\nvar actual\nvar loading_time\nvar efficiency\nvar delay\nvar cycle_time\nvar status_montiv\nvar loading_time\nvar status_hikitori\nvar time_trouble\nvar time_trouble_quality\nvar andon\nvar line_name\nvar pg\n\nline_id = msg.payload[0]\nname_product = msg.payload[1]\ntarget = msg.payload[2]\nactual = msg.payload[3]\nloading_time = msg.payload[4]\nefficiency = msg.payload[5]\ndelay = msg.payload[6]\ncycle_time = msg.payload[7]\nstatus_montiv = msg.payload[8]\ntime_trouble = msg.payload[9]\ntime_trouble_quality = msg.payload[10]\nandon = msg.payload[11]\n\n\n\nif (line_id == \"29A\") {\n    line_name = 'Balance Shaft No 2'\n    pg = 'PG2.2'\n    msg.topic = \"INSERT INTO table_all_bs_2 (id_primary, line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) values(null, '\" + line_id + \"','\" + pg + \"', '\" + line_name + \"', '\" + name_product + \"', '\" + target + \"', '\" + actual + \"', '\" + loading_time + \"', '\" + efficiency + \"', '\" + delay + \"','\" + cycle_time + \"','\" + status_montiv + \"', '\" + time_trouble + \"', '\" + time_trouble_quality + \"', '\" + andon + \"');\"\n    return msg;\n} else {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 530,
        "y": 940,
        "wires": [
            [
                "73d5e0ea8bc856a7"
            ]
        ]
    },
    {
        "id": "3510cecae3bca55b",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "bs_1_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"29\") {\n    return null;\n}\n\nif (line_id === \"29\") {\n    line_name = \"Balance Shaft No 1\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 900,
        "wires": [
            [
                "fb40f33141215d35"
            ]
        ]
    },
    {
        "id": "fb40f33141215d35",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "fe4f0ca66262baf9",
        "name": "",
        "x": 1190,
        "y": 900,
        "wires": [
            []
        ]
    },
    {
        "id": "86a4595d3e641bb7",
        "type": "mysql",
        "z": "8b197288a196e470",
        "mydb": "bf44c61d94c3de67",
        "name": "",
        "x": 1190,
        "y": 940,
        "wires": [
            []
        ]
    },
    {
        "id": "8e295516661333d4",
        "type": "function",
        "z": "8b197288a196e470",
        "name": "bs_2_control",
        "func": "// Ambil data dari msg.payload dengan fallback default agar tidak undefined atau NaN\nlet line_id = msg.payload[0] ? String(msg.payload[0]) : \"\"; // Ubah menjadi string\nlet name_product = msg.payload[1] ? msg.payload[1] : \"\";\nlet target = msg.payload[2] ? Number(msg.payload[2]) : 0;\nlet actual = msg.payload[3] ? Number(msg.payload[3]) : 0;\nlet loading_time = msg.payload[4] ? Number(msg.payload[4]) : 0;\nlet efficiency = msg.payload[5] ? Number(msg.payload[5]) : 0;\nlet delay = msg.payload[6] ? Number(msg.payload[6]) : 0;\nlet cycle_time = msg.payload[7] ? Number(msg.payload[7]) : 0;\nlet status_montiv = msg.payload[8] ? msg.payload[8] : \"\";\nlet time_trouble = msg.payload[9] ? Number(msg.payload[9]) : 0;\nlet time_trouble_quality = msg.payload[10] ? Number(msg.payload[10]) : 0;\nlet andon = msg.payload[11] ? msg.payload[11] : \"\";\nlet line_name = \"\";\nlet pg = \"\";\n\nif (line_id !== \"29A\") {\n    return null;\n}\n\nif (line_id === \"29A\") {\n    line_name = \"Balance Shaft No 2\";\n    pg = \"PG2.2\";\n}\n\n// Tentukan shift saat ini\nlet now = new Date();\nlet hours = now.getHours();\nlet minutes = now.getMinutes();\nlet currentShift = \"\";\n\n// Hitung waktu dalam menit sejak tengah malam\nlet totalMinutes = hours * 60 + minutes;\n\n// Kondisi untuk shift\nif ((totalMinutes >= 7 * 60 + 10) && (totalMinutes < 16 * 60 + 10)) {\n    currentShift = \"shift1\"; // Shift 1: 07:10 - 16:10\n} else if (\n    (totalMinutes >= 19 * 60 + 50) || // Shift 2: 19:50 - 23:59\n    (totalMinutes < 6 * 60 + 10)      // Shift 2: 00:00 - 06:10\n) {\n    currentShift = \"shift2\"; // Shift 2: 19:50 - 06:10\n} else {\n    return null; // Tidak ada shift yang aktif\n}\n\n// Buat nama tabel berdasarkan tanggal dan shift\nlet dateStr = now.toISOString().slice(0, 10).replace(/-/g, ''); // Format YYYYMMDD\nlet tableName = `table_cr_${line_id}_datetime_${dateStr}_${currentShift}`;\n\n// Query untuk membuat tabel jika belum ada\nlet createTableQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (\n    id_primary INT AUTO_INCREMENT PRIMARY KEY,\n    line_id VARCHAR(10) NOT NULL, -- Ubah tipe data ke VARCHAR untuk mendukung string\n    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,\n    pg VARCHAR(10) NOT NULL,\n    line_name VARCHAR(50) NOT NULL,\n    name_product VARCHAR(50) NOT NULL,\n    target INT NOT NULL,\n    actual INT NOT NULL,\n    loading_time INT NOT NULL,\n    efficiency INT NOT NULL,\n    delay INT NOT NULL,\n    cycle_time INT NOT NULL,\n    status VARCHAR(20) NOT NULL,\n    time_trouble INT NOT NULL,\n    time_trouble_quality INT NOT NULL,\n    andon VARCHAR(10) NOT NULL\n);`;\n\n// Kirim query untuk membuat tabel\nmsg.topic = createTableQuery;\nnode.send(msg);\n\n// Query INSERT tanpa `date_time` karena sudah pakai `CURRENT_TIMESTAMP`\nmsg.topic = `INSERT INTO ${tableName} \n(line_id, pg, line_name, name_product, target, actual, loading_time, efficiency, delay, cycle_time, status, time_trouble, time_trouble_quality, andon) \nVALUES \n('${line_id}', '${pg}', '${line_name}', '${name_product}', '${target}', '${actual}', '${loading_time}', '${efficiency}', '${delay}', '${cycle_time}', '${status_montiv}', '${time_trouble}', '${time_trouble_quality}', '${andon}');`;\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 960,
        "y": 940,
        "wires": [
            [
                "86a4595d3e641bb7"
            ]
        ]
    },
    {
        "id": "e9bbeaa170eeda4e",
        "type": "mqtt-broker",
        "name": "",
        "broker": "192.168.1.5",
        "port": "1883",
        "clientid": "",
        "autoConnect": true,
        "usetls": false,
        "protocolVersion": "4",
        "keepalive": "60",
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
        "id": "d69ac283a741dda0",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_montiv",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "bf2e1b12ad751e91",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "cc0c482c71644cc6",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_2",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "85fba75f8d92ad37",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_3",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "8c90c4d0f5594af5",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_4",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "3f138b69e3ba3a16",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_5",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "52fbe6cf93ef7c94",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_6",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "facc9f2671c003ff",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_7",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "6536a293f8646b39",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_9",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "5dd8e1648a3bf500",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_8",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "bbcf7c075b1212b1",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_10",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "2e1570a390539bc9",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_11",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "48f3e2b7cdfbbb33",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_common_rail_12",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "fe4f0ca66262baf9",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_balance_shaft_1",
        "tz": "",
        "charset": "UTF8"
    },
    {
        "id": "bf44c61d94c3de67",
        "type": "MySQLdatabase",
        "name": "",
        "host": "127.0.0.1",
        "port": "3306",
        "db": "database_balance_shaft_2",
        "tz": "",
        "charset": "UTF8"
    }
]
