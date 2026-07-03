[
    {
        "id": "f1910fee6994e20b",
        "type": "file in",
        "z": "3443415f8911758b",
        "name": "Baca File JSON",
        "filename": "D:\\on\\Project_Monitoring_Energy_Listrik\\project_plts\\latest_scada_data.json",
        "filenameType": "str",
        "format": "utf8",
        "chunk": false,
        "sendError": false,
        "encoding": "none",
        "allProps": false,
        "x": 370,
        "y": 130,
        "wires": [
            [
                "32281f99db2237a8",
                "19d3d2a4eb837872"
            ]
        ]
    },
    {
        "id": "32281f99db2237a8",
        "type": "json",
        "z": "3443415f8911758b",
        "name": "Parse JSON",
        "property": "payload",
        "action": "",
        "pretty": false,
        "x": 565,
        "y": 145,
        "wires": [
            [
                "c56341df7b6c79fd",
                "61588ff4455ca90e",
                "4e4e23c6accbe8c6",
                "e9419011db1f8839",
                "0d86c4cfa73f3324",
                "8c6a08e81ae6f764",
                "44d57b7e26dec4f1",
                "7a74d46617e09bdb",
                "2d4e99f1c7ca76b7",
                "9a47cae4923d8a6c",
                "09bd893655113e1e",
                "909e18889bdafd2d",
                "398106fa3b7a197b",
                "167b84489325ac63",
                "561710cdfd63acc2",
                "ab770b9998aeea02",
                "7aa678417d35d506",
                "5bdd8e65fe71a108",
                "4c5439ded7ee03c9",
                "edcd25925823247d",
                "624c92d40628a764",
                "6e452ea61954a650",
                "bfa83cc7ca6089c0",
                "01eedcf634ac4688",
                "eb1dde61b763a78e",
                "3da3742e9df85206",
                "f9754bf2cb8ede41"
            ]
        ]
    },
    {
        "id": "88ee821210d0f7f5",
        "type": "inject",
        "z": "3443415f8911758b",
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
        "x": 200,
        "y": 130,
        "wires": [
            [
                "f1910fee6994e20b"
            ]
        ]
    },
    {
        "id": "19d3d2a4eb837872",
        "type": "debug",
        "z": "3443415f8911758b",
        "name": "debug 3",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 555,
        "y": 90,
        "wires": []
    },
    {
        "id": "c56341df7b6c79fd",
        "type": "debug",
        "z": "3443415f8911758b",
        "name": "debug 6",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "payload",
        "targetType": "msg",
        "statusVal": "",
        "statusType": "auto",
        "x": 740,
        "y": 125,
        "wires": []
    },
    {
        "id": "a95cbd4c937bfdb6",
        "type": "comment",
        "z": "3443415f8911758b",
        "name": "*LPDMTC,s,286.50,12915703.00,6.76,234.70,27355910.00,#",
        "info": "",
        "x": 230,
        "y": 80,
        "wires": []
    },
    {
        "id": "9236f4de412326cb",
        "type": "group",
        "z": "3443415f8911758b",
        "style": {
            "stroke": "#999999",
            "stroke-opacity": "1",
            "fill": "none",
            "fill-opacity": "1",
            "label": true,
            "label-position": "nw",
            "color": "#a4a4a4"
        },
        "nodes": [
            "7aa678417d35d506",
            "5bdd8e65fe71a108",
            "4c5439ded7ee03c9",
            "edcd25925823247d",
            "624c92d40628a764",
            "bfa83cc7ca6089c0",
            "eb1dde61b763a78e",
            "f9754bf2cb8ede41"
        ],
        "x": 659,
        "y": 224,
        "w": 312,
        "h": 327
    },
    {
        "id": "7aa678417d35d506",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Supply_From_Grid_Today",
        "func": "\nlet data = msg.payload.plant_2_huawei.Supply_From_Grid_Today;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 795,
        "y": 265,
        "wires": [
            []
        ]
    },
    {
        "id": "5bdd8e65fe71a108",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Total_Yield",
        "func": "\nlet data = msg.payload.plant_2_huawei.Total_Yield;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 755,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "4c5439ded7ee03c9",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Inverter_Rated_Power",
        "func": "\nlet data = msg.payload.plant_2_huawei.Inverter_Rated_Power;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 335,
        "wires": [
            []
        ]
    },
    {
        "id": "edcd25925823247d",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Installed_PV_Capacity",
        "func": "\nlet data = msg.payload.plant_2_huawei.Installed_PV_Capacity;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 370,
        "wires": [
            []
        ]
    },
    {
        "id": "624c92d40628a764",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Standard_Coal_Saved",
        "func": "\nlet data = msg.payload.plant_2_huawei.Standard_Coal_Saved;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 785,
        "y": 405,
        "wires": [
            []
        ]
    },
    {
        "id": "bfa83cc7ca6089c0",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "EquivalentTrees_Planted",
        "func": "\nlet data = msg.payload.plant_2_huawei.EquivalentTrees_Planted;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 795,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "eb1dde61b763a78e",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Mains power (kW)",
        "func": "\nlet data = msg.payload.plant_2_huawei[\"Mains power (kW)\"];\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 775,
        "y": 475,
        "wires": [
            []
        ]
    },
    {
        "id": "f9754bf2cb8ede41",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "9236f4de412326cb",
        "name": "Consumed by appliances (kW)",
        "func": "\nlet data = msg.payload.plant_2_huawei[\"Consumed by appliances (kW)\"];\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 815,
        "y": 510,
        "wires": [
            []
        ]
    },
    {
        "id": "5d30fb9b6966b73f",
        "type": "group",
        "z": "3443415f8911758b",
        "style": {
            "stroke": "#999999",
            "stroke-opacity": "1",
            "fill": "none",
            "fill-opacity": "1",
            "label": true,
            "label-position": "nw",
            "color": "#a4a4a4"
        },
        "nodes": [
            "4e4e23c6accbe8c6",
            "e9419011db1f8839",
            "8c6a08e81ae6f764",
            "44d57b7e26dec4f1",
            "2d4e99f1c7ca76b7",
            "09bd893655113e1e",
            "398106fa3b7a197b",
            "167b84489325ac63"
        ],
        "x": 269,
        "y": 224,
        "w": 352,
        "h": 327
    },
    {
        "id": "4e4e23c6accbe8c6",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "Phase_1_INV1",
        "func": "\nlet data = msg.payload.plant_1_otics.Phase_1_INV1;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 375,
        "y": 265,
        "wires": [
            []
        ]
    },
    {
        "id": "e9419011db1f8839",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "Phase_1_INV2",
        "func": "\nlet data = msg.payload.plant_1_otics.Phase_1_INV2;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 375,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "8c6a08e81ae6f764",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "PV_ENERGY_Monthly",
        "func": "\nlet data = msg.payload.plant_1_otics.PV_ENERGY_Monthly;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 395,
        "y": 335,
        "wires": [
            []
        ]
    },
    {
        "id": "44d57b7e26dec4f1",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "PV_ENERGY_Total",
        "func": "\nlet data = msg.payload.plant_1_otics.PV_ENERGY_Total;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 385,
        "y": 370,
        "wires": [
            []
        ]
    },
    {
        "id": "2d4e99f1c7ca76b7",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "PR",
        "func": "\nlet data = msg.payload.plant_1_otics.PR;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 345,
        "y": 405,
        "wires": [
            []
        ]
    },
    {
        "id": "09bd893655113e1e",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "WEATHER_FOR_CIKARANG_DATE",
        "func": "\nlet data = msg.payload.plant_1_otics.WEATHER_FOR_CIKARANG_DATE;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 445,
        "y": 440,
        "wires": [
            []
        ]
    },
    {
        "id": "398106fa3b7a197b",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "STATUS",
        "func": "\nlet data = msg.payload.plant_1_otics.STATUS;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 355,
        "y": 475,
        "wires": [
            []
        ]
    },
    {
        "id": "167b84489325ac63",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "5d30fb9b6966b73f",
        "name": "COMM_MONITORING_last",
        "func": "\nlet data = msg.payload.plant_1_otics.COMM_MONITORING_last;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 415,
        "y": 510,
        "wires": [
            []
        ]
    },
    {
        "id": "ea16a080e5f1e826",
        "type": "group",
        "z": "3443415f8911758b",
        "style": {
            "stroke": "#999999",
            "stroke-opacity": "1",
            "fill": "none",
            "fill-opacity": "1",
            "label": true,
            "label-position": "nw",
            "color": "#a4a4a4"
        },
        "nodes": [
            "61588ff4455ca90e",
            "0d86c4cfa73f3324",
            "7a74d46617e09bdb",
            "9a47cae4923d8a6c",
            "909e18889bdafd2d",
            "561710cdfd63acc2",
            "ab770b9998aeea02",
            "6e452ea61954a650",
            "01eedcf634ac4688",
            "3da3742e9df85206"
        ],
        "x": 1179,
        "y": 69,
        "w": 352,
        "h": 407
    },
    {
        "id": "61588ff4455ca90e",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "Power",
        "func": "\nlet data = msg.payload.plant_1_otics.Power;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1255,
        "y": 110,
        "wires": [
            []
        ]
    },
    {
        "id": "0d86c4cfa73f3324",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "PV_ENERGY_Today",
        "func": "\nlet data = msg.payload.plant_1_otics.PV_ENERGY_Today;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1305,
        "y": 145,
        "wires": [
            []
        ]
    },
    {
        "id": "7a74d46617e09bdb",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "Irradiation",
        "func": "\nlet data = msg.payload.plant_1_otics.Irradiation;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1265,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "9a47cae4923d8a6c",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "WEATHER_FOR_CIKARANG_TEMP",
        "func": "\nlet data = msg.payload.plant_1_otics.WEATHER_FOR_CIKARANG_TEMP;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1355,
        "y": 250,
        "wires": [
            []
        ]
    },
    {
        "id": "909e18889bdafd2d",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "CO2_Reduced",
        "func": "\nlet data = msg.payload.plant_1_otics.CO2_Reduced;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1285,
        "y": 215,
        "wires": [
            []
        ]
    },
    {
        "id": "561710cdfd63acc2",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "Temperature",
        "func": "\nlet data = msg.payload.plant_2_huawei.Temperature;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1275,
        "y": 435,
        "wires": [
            []
        ]
    },
    {
        "id": "ab770b9998aeea02",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "Yield_Today",
        "func": "\nlet data = msg.payload.plant_2_huawei.Yield_Today;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1275,
        "y": 330,
        "wires": [
            []
        ]
    },
    {
        "id": "6e452ea61954a650",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "CO2_Avoided",
        "func": "\nlet data = msg.payload.plant_2_huawei.CO2_Avoided;\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1285,
        "y": 400,
        "wires": [
            []
        ]
    },
    {
        "id": "01eedcf634ac4688",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "PV output (kW)",
        "func": "\nlet data = msg.payload.plant_2_huawei[\"PV output (kW)\"];\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1285,
        "y": 295,
        "wires": [
            []
        ]
    },
    {
        "id": "3da3742e9df85206",
        "type": "function",
        "z": "3443415f8911758b",
        "g": "ea16a080e5f1e826",
        "name": "Irradiance (W/m2)",
        "func": "\nlet data = msg.payload.plant_2_huawei[\"Irradiance (W/m2)\"];\nmsg.payload = data;\n\n\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1295,
        "y": 365,
        "wires": [
            []
        ]
    }
]
