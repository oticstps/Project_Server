[
    {
        "id": "4704f07eb087a91c",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "1,PART,242,0,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "1,PART,242,0,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 180,
        "wires": [
            [
                "46f15598786c03e3"
            ]
        ]
    },
    {
        "id": "7c77fdf919c20fa9",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 1,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR1",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3110,
        "wires": []
    },
    {
        "id": "b8d0d36a45240c6d",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 2,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR2",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3145,
        "wires": []
    },
    {
        "id": "c22dbdb362a57682",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 3,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR3",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3180,
        "wires": []
    },
    {
        "id": "68684fa2108dc3b7",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 4,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR4",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3215,
        "wires": []
    },
    {
        "id": "95a2973a3f5f4160",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 5,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR5",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3250,
        "wires": []
    },
    {
        "id": "c38024f1980c1636",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 6,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR6",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3285,
        "wires": []
    },
    {
        "id": "35e6816f3bbf91a7",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 7,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR7",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3320,
        "wires": []
    },
    {
        "id": "36f4d48b578766fd",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 8,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR8",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3355,
        "wires": []
    },
    {
        "id": "b8f27dd3c484e67c",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 9,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR9",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3390,
        "wires": []
    },
    {
        "id": "49e31f177a01219c",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 10,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR10",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3425,
        "wires": []
    },
    {
        "id": "c90479e2e25750b4",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 11,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR11",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3460,
        "wires": []
    },
    {
        "id": "788ad2d13a7c668b",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 12,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR12",
        "label": "units",
        "format": "{{msg.dataStop}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 3495,
        "wires": []
    },
    {
        "id": "52914dede0a4d2ee",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 1,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR1",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1700,
        "wires": []
    },
    {
        "id": "68fe77c4d4239c8d",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 2,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR2",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1735,
        "wires": []
    },
    {
        "id": "7d87336a5e0a1975",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 3,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR3",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1770,
        "wires": []
    },
    {
        "id": "07b4d39baf6220e1",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 4,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR4",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1805,
        "wires": []
    },
    {
        "id": "430c12ad8af086c8",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 5,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR5",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1840,
        "wires": []
    },
    {
        "id": "3170b886d931f4a7",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 6,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR6",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1875,
        "wires": []
    },
    {
        "id": "61e91b752790c61e",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 7,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR7",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1910,
        "wires": []
    },
    {
        "id": "6e2559fe26abe977",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 8,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR8",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1945,
        "wires": []
    },
    {
        "id": "de017b05fc6d8636",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 9,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR9",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 1980,
        "wires": []
    },
    {
        "id": "17999a74b7a786df",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 10,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR10",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 2015,
        "wires": []
    },
    {
        "id": "49eafd1691d15406",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 11,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR11",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 2050,
        "wires": []
    },
    {
        "id": "0cea63bab1f54ac8",
        "type": "ui_gauge",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 12,
        "width": 2,
        "height": 2,
        "gtype": "gage",
        "title": "CR12",
        "label": "units",
        "format": "{{msg.dataStart}}",
        "min": 0,
        "max": 10,
        "colors": [
            "#ff0000",
            "#e6e600",
            "#00ff00"
        ],
        "seg1": "",
        "seg2": "",
        "diff": false,
        "className": "",
        "x": 1830,
        "y": 2085,
        "wires": []
    },
    {
        "id": "1aa25c52b4d98458",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 1,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR1",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 560,
        "wires": []
    },
    {
        "id": "2130b1a450e609c7",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 3,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR2",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 595,
        "wires": []
    },
    {
        "id": "9a5ee0a6028efefe",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 5,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR3",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 630,
        "wires": []
    },
    {
        "id": "f010e64186d4b4da",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 7,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR4",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 665,
        "wires": []
    },
    {
        "id": "5e0f056f0754ac6d",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 12,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR12",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 945,
        "wires": []
    },
    {
        "id": "990468f07b5a1eed",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 9,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR5",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 700,
        "wires": []
    },
    {
        "id": "4c7cd086449b8013",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 10,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR11",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 910,
        "wires": []
    },
    {
        "id": "012070d470f8c57f",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 11,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR6",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 735,
        "wires": []
    },
    {
        "id": "d0c56f1140a19e60",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 2,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR7",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 770,
        "wires": []
    },
    {
        "id": "a629cf67786176d8",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 4,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR8",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 805,
        "wires": []
    },
    {
        "id": "5f8b0aa189b3fdb0",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 6,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR9",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 840,
        "wires": []
    },
    {
        "id": "a8fb92fac0ea6d2d",
        "type": "ui_text",
        "z": "4ca0ab2242a45861",
        "group": "84bdaf9aa3b2d757",
        "order": 8,
        "width": 2,
        "height": 1,
        "name": "",
        "label": "CR10",
        "format": "{{msg.payload}}",
        "layout": "row-spread",
        "className": "",
        "style": false,
        "font": "",
        "fontSize": 16,
        "color": "#000000",
        "x": 1830,
        "y": 875,
        "wires": []
    },
    {
        "id": "53624097b55aaf7b",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR12",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2550,
        "wires": [
            [
                "0cea63bab1f54ac8"
            ]
        ]
    },
    {
        "id": "1fe78d02064b9a51",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR11",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2520,
        "wires": [
            [
                "49eafd1691d15406"
            ]
        ]
    },
    {
        "id": "cc2ce9d948cb1e0c",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR10",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2490,
        "wires": [
            [
                "17999a74b7a786df"
            ]
        ]
    },
    {
        "id": "ce20fa4c2558cc29",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR9",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2460,
        "wires": [
            [
                "de017b05fc6d8636"
            ]
        ]
    },
    {
        "id": "a44298ff34b223bf",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR8",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2430,
        "wires": [
            [
                "6e2559fe26abe977"
            ]
        ]
    },
    {
        "id": "ff835bc558e3ef3f",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR7",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2400,
        "wires": [
            [
                "61e91b752790c61e"
            ]
        ]
    },
    {
        "id": "1ca79e4c3e6592f4",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR5",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2340,
        "wires": [
            [
                "430c12ad8af086c8"
            ]
        ]
    },
    {
        "id": "564f77671e9c9fe0",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR4",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2310,
        "wires": [
            [
                "07b4d39baf6220e1"
            ]
        ]
    },
    {
        "id": "262b5344e475bd10",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR6",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2370,
        "wires": [
            [
                "3170b886d931f4a7"
            ]
        ]
    },
    {
        "id": "3833ba2c624658f6",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR3",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2280,
        "wires": [
            [
                "7d87336a5e0a1975"
            ]
        ]
    },
    {
        "id": "a8f6de23a0857929",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "0",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1820,
        "y": 2220,
        "wires": [
            [
                "52914dede0a4d2ee"
            ]
        ]
    },
    {
        "id": "657b8744754765ab",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR2",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1820,
        "y": 2250,
        "wires": [
            [
                "68fe77c4d4239c8d"
            ]
        ]
    },
    {
        "id": "921ef330c380a1f1",
        "type": "debug",
        "z": "4ca0ab2242a45861",
        "name": "debug 2",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 340,
        "y": 40,
        "wires": []
    },
    {
        "id": "a7c37f242951bbb8",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR10",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 530,
        "y": 4680,
        "wires": [
            [
                "3b4798e776375175",
                "14fc81e520fcdddd",
                "73102a63ec5085b5",
                "592ba39c8f1bdd15",
                "802d63d3b4b20201",
                "67bfcdf4629a1e86",
                "de2fb9d07f386e08",
                "b5952e11c25687d0",
                "97d1853e5e13016a",
                "cdc6b2f25f5b53f1",
                "9efeb2f05b7e96ea"
            ]
        ]
    },
    {
        "id": "3b4798e776375175",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '10'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 4680,
        "wires": [
            []
        ]
    },
    {
        "id": "14fc81e520fcdddd",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4720,
        "wires": [
            []
        ]
    },
    {
        "id": "f439c03fdfdf0e1f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4760,
        "wires": [
            []
        ]
    },
    {
        "id": "73102a63ec5085b5",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '10'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4800,
        "wires": [
            [
                "a8fb92fac0ea6d2d"
            ]
        ]
    },
    {
        "id": "592ba39c8f1bdd15",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4840,
        "wires": [
            []
        ]
    },
    {
        "id": "802d63d3b4b20201",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 4880,
        "wires": [
            []
        ]
    },
    {
        "id": "67bfcdf4629a1e86",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4920,
        "wires": [
            []
        ]
    },
    {
        "id": "de2fb9d07f386e08",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4960,
        "wires": [
            []
        ]
    },
    {
        "id": "b5952e11c25687d0",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '10' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '10' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5000,
        "wires": [
            [
                "17999a74b7a786df",
                "49e31f177a01219c"
            ]
        ]
    },
    {
        "id": "97d1853e5e13016a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5040,
        "wires": [
            []
        ]
    },
    {
        "id": "cdc6b2f25f5b53f1",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 5080,
        "wires": [
            []
        ]
    },
    {
        "id": "9efeb2f05b7e96ea",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5120,
        "wires": [
            []
        ]
    },
    {
        "id": "cc3cc2f5300b3a07",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR11_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '11'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5260,
        "wires": [
            []
        ]
    },
    {
        "id": "567683fcd270a951",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR11_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '11'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5300,
        "wires": [
            []
        ]
    },
    {
        "id": "421f0930f617bcb7",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5340,
        "wires": [
            []
        ]
    },
    {
        "id": "6115b0f2d29204d4",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR11_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '11'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5380,
        "wires": [
            [
                "4c7cd086449b8013"
            ]
        ]
    },
    {
        "id": "2c88bf98582fb4c5",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5420,
        "wires": [
            []
        ]
    },
    {
        "id": "53017064bb1b2053",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 5460,
        "wires": [
            []
        ]
    },
    {
        "id": "0eada9294d0527f8",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5500,
        "wires": [
            []
        ]
    },
    {
        "id": "a22dc6ed8406105f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5540,
        "wires": [
            []
        ]
    },
    {
        "id": "48941e17da8d258d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR11_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '11' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '11' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5580,
        "wires": [
            [
                "49eafd1691d15406",
                "c90479e2e25750b4"
            ]
        ]
    },
    {
        "id": "cef9b5d834883d54",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5620,
        "wires": [
            []
        ]
    },
    {
        "id": "fc96fa097915599c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 5660,
        "wires": [
            []
        ]
    },
    {
        "id": "fd57b1dbd6c7b32c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5700,
        "wires": [
            []
        ]
    },
    {
        "id": "8af1e5698cc16a52",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR11",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 530,
        "y": 5260,
        "wires": [
            [
                "cc3cc2f5300b3a07",
                "567683fcd270a951",
                "421f0930f617bcb7",
                "6115b0f2d29204d4",
                "2c88bf98582fb4c5",
                "53017064bb1b2053",
                "0eada9294d0527f8",
                "a22dc6ed8406105f",
                "48941e17da8d258d",
                "cef9b5d834883d54",
                "fc96fa097915599c",
                "fd57b1dbd6c7b32c"
            ]
        ]
    },
    {
        "id": "681b46c382dfa2c3",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR12_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '12'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 5760,
        "wires": [
            []
        ]
    },
    {
        "id": "16cd9ee7d3232428",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR12_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '12'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5800,
        "wires": [
            []
        ]
    },
    {
        "id": "8d3d62a416247e2f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5840,
        "wires": [
            []
        ]
    },
    {
        "id": "23fba6088ae992aa",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR12_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '12'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 5880,
        "wires": [
            [
                "5e0f056f0754ac6d"
            ]
        ]
    },
    {
        "id": "ef2303cdfa1f40ce",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 5920,
        "wires": [
            []
        ]
    },
    {
        "id": "85b79bf730db2c66",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 5960,
        "wires": [
            []
        ]
    },
    {
        "id": "f241369de26d5211",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 6000,
        "wires": [
            []
        ]
    },
    {
        "id": "b1c5bf08499b557f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 6040,
        "wires": [
            []
        ]
    },
    {
        "id": "74cbdc0b53485f11",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR12_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '12' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '12' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 6080,
        "wires": [
            [
                "0cea63bab1f54ac8",
                "788ad2d13a7c668b"
            ]
        ]
    },
    {
        "id": "b5e28388c7f8dc4a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 6120,
        "wires": [
            []
        ]
    },
    {
        "id": "b178bdd685cd161a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 6160,
        "wires": [
            []
        ]
    },
    {
        "id": "8127943e0ecc02f5",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 6200,
        "wires": [
            []
        ]
    },
    {
        "id": "d81a36849e9a189e",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR12",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 530,
        "y": 5760,
        "wires": [
            [
                "681b46c382dfa2c3",
                "16cd9ee7d3232428",
                "8d3d62a416247e2f",
                "23fba6088ae992aa",
                "ef2303cdfa1f40ce",
                "85b79bf730db2c66",
                "f241369de26d5211",
                "b1c5bf08499b557f",
                "74cbdc0b53485f11",
                "b5e28388c7f8dc4a",
                "b178bdd685cd161a",
                "8127943e0ecc02f5"
            ]
        ]
    },
    {
        "id": "34a766d32419b6c7",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR9",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 530,
        "y": 4180,
        "wires": [
            [
                "edea0a7c30e82d7a",
                "99a438c89ce07a3a",
                "8884fcddd359190d",
                "fd607247536f4465",
                "9fca8138e16b68d9",
                "0567bb10c23007d6",
                "293eaba7cb7e4ada",
                "bde90295a2ae4b83",
                "44d8a10924f1499d",
                "f03e31376a5c17bd",
                "0dcce54040cb283c"
            ]
        ]
    },
    {
        "id": "edea0a7c30e82d7a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR9_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '9'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4180,
        "wires": [
            [
                "518b2ec501a3f56f"
            ]
        ]
    },
    {
        "id": "99a438c89ce07a3a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4220,
        "wires": [
            []
        ]
    },
    {
        "id": "70a85b73b7c06314",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4260,
        "wires": [
            []
        ]
    },
    {
        "id": "8884fcddd359190d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR9_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '9'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4300,
        "wires": [
            [
                "5f8b0aa189b3fdb0"
            ]
        ]
    },
    {
        "id": "fd607247536f4465",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4340,
        "wires": [
            []
        ]
    },
    {
        "id": "9fca8138e16b68d9",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 4380,
        "wires": [
            []
        ]
    },
    {
        "id": "0567bb10c23007d6",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4420,
        "wires": [
            []
        ]
    },
    {
        "id": "293eaba7cb7e4ada",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4460,
        "wires": [
            []
        ]
    },
    {
        "id": "bde90295a2ae4b83",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR9_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '9' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '9' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4500,
        "wires": [
            [
                "de017b05fc6d8636",
                "b8f27dd3c484e67c"
            ]
        ]
    },
    {
        "id": "44d8a10924f1499d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 770,
        "y": 4540,
        "wires": [
            []
        ]
    },
    {
        "id": "f03e31376a5c17bd",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 800,
        "y": 4580,
        "wires": [
            []
        ]
    },
    {
        "id": "0dcce54040cb283c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 750,
        "y": 4620,
        "wires": [
            []
        ]
    },
    {
        "id": "52144e0e6db114f5",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR3",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 1100,
        "wires": [
            [
                "94cdf82b80a217bb",
                "34b91588a34b011b",
                "8a8e070d9ca00ae6",
                "922cc188c876ef8c",
                "5928d55db190fed9",
                "61906e37c7ba92f1",
                "4a9c0df6fdf7cd4a",
                "fcf8f8ba8403ac47",
                "c0242f6674274a5f",
                "b2cb234f2590b893",
                "cf5700f74a68aba4",
                "ddbedc1a5df560bc"
            ]
        ]
    },
    {
        "id": "94cdf82b80a217bb",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR3_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '3'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1100,
        "wires": [
            []
        ]
    },
    {
        "id": "34b91588a34b011b",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1140,
        "wires": [
            []
        ]
    },
    {
        "id": "ddbedc1a5df560bc",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1180,
        "wires": [
            []
        ]
    },
    {
        "id": "8a8e070d9ca00ae6",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR3_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '3'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1220,
        "wires": [
            [
                "9a5ee0a6028efefe"
            ]
        ]
    },
    {
        "id": "922cc188c876ef8c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1260,
        "wires": [
            []
        ]
    },
    {
        "id": "5928d55db190fed9",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1300,
        "wires": [
            []
        ]
    },
    {
        "id": "61906e37c7ba92f1",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1340,
        "wires": [
            []
        ]
    },
    {
        "id": "4a9c0df6fdf7cd4a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1380,
        "wires": [
            []
        ]
    },
    {
        "id": "fcf8f8ba8403ac47",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR3_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '3' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '3' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1420,
        "wires": [
            [
                "7d87336a5e0a1975",
                "c22dbdb362a57682"
            ]
        ]
    },
    {
        "id": "c0242f6674274a5f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1460,
        "wires": [
            []
        ]
    },
    {
        "id": "b2cb234f2590b893",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 1500,
        "wires": [
            []
        ]
    },
    {
        "id": "cf5700f74a68aba4",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1540,
        "wires": [
            []
        ]
    },
    {
        "id": "46f15598786c03e3",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR1",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 100,
        "wires": [
            [
                "99979744be5a3e0e",
                "7204993cc0b97d58",
                "b61ae85827ac9bcc",
                "421ae9b95919ac33",
                "e68efaee8bebd543",
                "c8cfbbe5641469f5",
                "956e2ed7b185265d",
                "bc013215474e3ce2",
                "ee5229a35e94a97a",
                "eb40ae26f845db41",
                "f2f399a30501b8a3",
                "edf996b8cacb2bab",
                "a7cdb74ef67e0ba3"
            ]
        ]
    },
    {
        "id": "99979744be5a3e0e",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR1_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '1'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 100,
        "wires": [
            []
        ]
    },
    {
        "id": "7204993cc0b97d58",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 140,
        "wires": [
            []
        ]
    },
    {
        "id": "a7cdb74ef67e0ba3",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 180,
        "wires": [
            []
        ]
    },
    {
        "id": "b61ae85827ac9bcc",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR1_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '1'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 220,
        "wires": [
            [
                "1aa25c52b4d98458"
            ]
        ]
    },
    {
        "id": "421ae9b95919ac33",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 260,
        "wires": [
            []
        ]
    },
    {
        "id": "e68efaee8bebd543",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 300,
        "wires": [
            []
        ]
    },
    {
        "id": "c8cfbbe5641469f5",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 340,
        "wires": [
            []
        ]
    },
    {
        "id": "956e2ed7b185265d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 380,
        "wires": [
            []
        ]
    },
    {
        "id": "bc013215474e3ce2",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR1_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '1' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '1' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 420,
        "wires": [
            [
                "52914dede0a4d2ee",
                "7c77fdf919c20fa9"
            ]
        ]
    },
    {
        "id": "ee5229a35e94a97a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 460,
        "wires": [
            []
        ]
    },
    {
        "id": "eb40ae26f845db41",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 500,
        "wires": [
            []
        ]
    },
    {
        "id": "f2f399a30501b8a3",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 540,
        "wires": [
            []
        ]
    },
    {
        "id": "4f0a1899fa92cd8e",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR2",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 600,
        "wires": [
            [
                "ab25799cb9fbe8fa",
                "9f20f7689e797941",
                "d192d16f8c048380",
                "6d7f6f481ad1cc45",
                "122059569ca193ce",
                "1b1da93f22db5d91",
                "e884b717bf3b2f2c",
                "9ca434b07302f76f",
                "fd5b3e1f3b841094",
                "4565b829a674ba67",
                "d562301cc7f7ec59",
                "fd401ddbd98bf86f"
            ]
        ]
    },
    {
        "id": "ab25799cb9fbe8fa",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR2_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '2'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 600,
        "wires": [
            []
        ]
    },
    {
        "id": "9f20f7689e797941",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 640,
        "wires": [
            []
        ]
    },
    {
        "id": "fd401ddbd98bf86f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 680,
        "wires": [
            []
        ]
    },
    {
        "id": "d192d16f8c048380",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR2_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '2'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 720,
        "wires": [
            [
                "2130b1a450e609c7"
            ]
        ]
    },
    {
        "id": "6d7f6f481ad1cc45",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 760,
        "wires": [
            []
        ]
    },
    {
        "id": "122059569ca193ce",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 800,
        "wires": [
            []
        ]
    },
    {
        "id": "1b1da93f22db5d91",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 840,
        "wires": [
            []
        ]
    },
    {
        "id": "e884b717bf3b2f2c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 880,
        "wires": [
            []
        ]
    },
    {
        "id": "9ca434b07302f76f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR2_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif (line_id === '2' && status === 'START') {\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n} else if (line_id === '2' && status === 'STOP') {\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse {\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 920,
        "wires": [
            [
                "68fe77c4d4239c8d",
                "b8d0d36a45240c6d"
            ]
        ]
    },
    {
        "id": "fd5b3e1f3b841094",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 960,
        "wires": [
            []
        ]
    },
    {
        "id": "4565b829a674ba67",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 1000,
        "wires": [
            []
        ]
    },
    {
        "id": "d562301cc7f7ec59",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1040,
        "wires": [
            []
        ]
    },
    {
        "id": "7cbe812c32a438b9",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR4",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 1600,
        "wires": [
            [
                "85ca7324ca0b8541",
                "286d2c5d80bb71d0",
                "e4da58a7e5fc8865",
                "d5ba19ba72bcfd8f",
                "97f7d23bfe9c15fe",
                "0b3e3facabd0a5ee",
                "cf873f2ccbafba32",
                "d1547ae9f4a27a9c",
                "54d4c4c125076983",
                "a2fafdb2036fe7b7",
                "8c042e651bf19252",
                "cf62e156b6c62f3e"
            ]
        ]
    },
    {
        "id": "85ca7324ca0b8541",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR4_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '4'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1600,
        "wires": [
            []
        ]
    },
    {
        "id": "286d2c5d80bb71d0",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1640,
        "wires": [
            []
        ]
    },
    {
        "id": "cf62e156b6c62f3e",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1680,
        "wires": [
            []
        ]
    },
    {
        "id": "e4da58a7e5fc8865",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR4_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '4'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1720,
        "wires": [
            [
                "f010e64186d4b4da"
            ]
        ]
    },
    {
        "id": "d5ba19ba72bcfd8f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1760,
        "wires": [
            []
        ]
    },
    {
        "id": "97f7d23bfe9c15fe",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 1800,
        "wires": [
            []
        ]
    },
    {
        "id": "0b3e3facabd0a5ee",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1840,
        "wires": [
            []
        ]
    },
    {
        "id": "cf873f2ccbafba32",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1880,
        "wires": [
            []
        ]
    },
    {
        "id": "d1547ae9f4a27a9c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR4_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '4' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '4' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 1920,
        "wires": [
            [
                "07b4d39baf6220e1",
                "68684fa2108dc3b7"
            ]
        ]
    },
    {
        "id": "54d4c4c125076983",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 1960,
        "wires": [
            []
        ]
    },
    {
        "id": "a2fafdb2036fe7b7",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 2000,
        "wires": [
            []
        ]
    },
    {
        "id": "8c042e651bf19252",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2040,
        "wires": [
            []
        ]
    },
    {
        "id": "4869aafd54480777",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR5",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 2100,
        "wires": [
            [
                "ed500a13fd60143e",
                "4b969ee71198b52a",
                "332c2ab36246e298",
                "591c70f94cbf1402",
                "14aef0bb7b798be4",
                "61da3fd4d5c59e23",
                "69fc43a2f286ee70",
                "3e2955c51c848f8d",
                "786942f0bb549137",
                "a7bfd9acc1699c0a",
                "f421361a161607e9",
                "875955bb817c4f63"
            ]
        ]
    },
    {
        "id": "ed500a13fd60143e",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR5_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '5'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2100,
        "wires": [
            []
        ]
    },
    {
        "id": "4b969ee71198b52a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2140,
        "wires": [
            []
        ]
    },
    {
        "id": "875955bb817c4f63",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2180,
        "wires": [
            []
        ]
    },
    {
        "id": "332c2ab36246e298",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR5_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '5'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2220,
        "wires": [
            [
                "990468f07b5a1eed"
            ]
        ]
    },
    {
        "id": "591c70f94cbf1402",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2260,
        "wires": [
            []
        ]
    },
    {
        "id": "14aef0bb7b798be4",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2300,
        "wires": [
            []
        ]
    },
    {
        "id": "61da3fd4d5c59e23",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2340,
        "wires": [
            []
        ]
    },
    {
        "id": "69fc43a2f286ee70",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2380,
        "wires": [
            []
        ]
    },
    {
        "id": "3e2955c51c848f8d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR5_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '5' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '5' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2420,
        "wires": [
            [
                "430c12ad8af086c8",
                "95a2973a3f5f4160"
            ]
        ]
    },
    {
        "id": "786942f0bb549137",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2460,
        "wires": [
            []
        ]
    },
    {
        "id": "a7bfd9acc1699c0a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 2500,
        "wires": [
            []
        ]
    },
    {
        "id": "f421361a161607e9",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2540,
        "wires": [
            []
        ]
    },
    {
        "id": "2d88b866b36f3301",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR6",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 2600,
        "wires": [
            [
                "8827d9fe3a133e81",
                "3f08ee139ac41153",
                "72738c139b614df3",
                "d807a4b88518a63a",
                "e27d8781a3e9530a",
                "a1548a8478e6625d",
                "ce294bd26b95d6cf",
                "4daf3915a216a99a",
                "b18799a4f739f874",
                "c1b0aedd5b18d1a1",
                "e69907a6a33d5c44",
                "01f5dedba65f693c"
            ]
        ]
    },
    {
        "id": "8827d9fe3a133e81",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR6_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '6'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2600,
        "wires": [
            []
        ]
    },
    {
        "id": "3f08ee139ac41153",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2640,
        "wires": [
            []
        ]
    },
    {
        "id": "01f5dedba65f693c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2680,
        "wires": [
            []
        ]
    },
    {
        "id": "72738c139b614df3",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR6_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '6'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2720,
        "wires": [
            [
                "012070d470f8c57f"
            ]
        ]
    },
    {
        "id": "d807a4b88518a63a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2760,
        "wires": [
            []
        ]
    },
    {
        "id": "e27d8781a3e9530a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 2800,
        "wires": [
            []
        ]
    },
    {
        "id": "a1548a8478e6625d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2840,
        "wires": [
            []
        ]
    },
    {
        "id": "ce294bd26b95d6cf",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2880,
        "wires": [
            []
        ]
    },
    {
        "id": "4daf3915a216a99a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR6_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '6' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '6' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 2920,
        "wires": [
            [
                "3170b886d931f4a7",
                "c38024f1980c1636"
            ]
        ]
    },
    {
        "id": "b18799a4f739f874",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 2960,
        "wires": [
            []
        ]
    },
    {
        "id": "c1b0aedd5b18d1a1",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 3000,
        "wires": [
            []
        ]
    },
    {
        "id": "e69907a6a33d5c44",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3040,
        "wires": [
            []
        ]
    },
    {
        "id": "af5997fd0d89b4f4",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR7",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 3100,
        "wires": [
            [
                "209b33a24ebe06ec",
                "962c93bc3cd385a1",
                "6b9178d2f850fbb0",
                "9d59a504a3e6d8ca",
                "7b586071fc02ca6c",
                "f7e6e8a669bb321b",
                "8166f2e1a58bca29",
                "9de8698547dafabd",
                "80f6090394314868",
                "474cea484ce4d6c7",
                "2f9181cf9913b7a0",
                "62b6f5d64d89214f"
            ]
        ]
    },
    {
        "id": "209b33a24ebe06ec",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR7_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '7'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3100,
        "wires": [
            []
        ]
    },
    {
        "id": "962c93bc3cd385a1",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3140,
        "wires": [
            []
        ]
    },
    {
        "id": "62b6f5d64d89214f",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3180,
        "wires": [
            []
        ]
    },
    {
        "id": "6b9178d2f850fbb0",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR7_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '7'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3220,
        "wires": [
            [
                "d0c56f1140a19e60"
            ]
        ]
    },
    {
        "id": "9d59a504a3e6d8ca",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3260,
        "wires": [
            []
        ]
    },
    {
        "id": "7b586071fc02ca6c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 3300,
        "wires": [
            []
        ]
    },
    {
        "id": "f7e6e8a669bb321b",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3340,
        "wires": [
            []
        ]
    },
    {
        "id": "8166f2e1a58bca29",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3380,
        "wires": [
            []
        ]
    },
    {
        "id": "9de8698547dafabd",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR7_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '7' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '7' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3420,
        "wires": [
            [
                "61e91b752790c61e",
                "35e6816f3bbf91a7"
            ]
        ]
    },
    {
        "id": "80f6090394314868",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3460,
        "wires": [
            []
        ]
    },
    {
        "id": "474cea484ce4d6c7",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 3500,
        "wires": [
            []
        ]
    },
    {
        "id": "2f9181cf9913b7a0",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3540,
        "wires": [
            []
        ]
    },
    {
        "id": "38d86c02e83e0cc6",
        "type": "string",
        "z": "4ca0ab2242a45861",
        "name": "montiv CR8",
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
                        "value": "20"
                    }
                ]
            }
        ],
        "prop": "payload",
        "propout": "payload",
        "object": "msg",
        "objectout": "msg",
        "x": 490,
        "y": 3600,
        "wires": [
            [
                "df1f65c1fb73fdb1",
                "e04ec887c65d46c6",
                "a75d95aaedcf92d6",
                "62ab3d5d448201cb",
                "3ad058d0c13f238e",
                "807a200443dae726",
                "798b8cdf644b795a",
                "60ab2899b2fb304c",
                "3dac7af0cb9a03ca",
                "204a19c858a31995",
                "773ce8f6f93f3f20",
                "2eda53bbb4ce97e8"
            ]
        ]
    },
    {
        "id": "df1f65c1fb73fdb1",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR7_line_id",
        "func": "let line_id = msg.payload[0];\nif(line_id === '7'){\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3600,
        "wires": [
            []
        ]
    },
    {
        "id": "e04ec887c65d46c6",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_name_part",
        "func": "let line_id = msg.payload[0];\nlet name_part = msg.payload[1]\nif(line_id === '10'){\n    msg.payload = name_part;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3640,
        "wires": [
            []
        ]
    },
    {
        "id": "2eda53bbb4ce97e8",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_target",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3680,
        "wires": [
            []
        ]
    },
    {
        "id": "a75d95aaedcf92d6",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR8_actual",
        "func": "let line_id = msg.payload[0];\nlet actual = msg.payload[3]\nif(line_id === '8'){\n    msg.payload = actual;\n    return msg;\n}else{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3720,
        "wires": [
            [
                "a629cf67786176d8"
            ]
        ]
    },
    {
        "id": "62ab3d5d448201cb",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_loading_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3760,
        "wires": [
            []
        ]
    },
    {
        "id": "3ad058d0c13f238e",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_efisiensi",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 720,
        "y": 3800,
        "wires": [
            []
        ]
    },
    {
        "id": "807a200443dae726",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_delay",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3840,
        "wires": [
            []
        ]
    },
    {
        "id": "798b8cdf644b795a",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_cycle_time",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3880,
        "wires": [
            []
        ]
    },
    {
        "id": "60ab2899b2fb304c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR8_status",
        "func": "let line_id = msg.payload[0];\nlet status = msg.payload[8]\nif(line_id === '8' && status === 'START'){\n    msg.dataStart = '10';\n    msg.dataStop = '0';\n    return msg;\n}else if(line_id === '8' && status === 'STOP'){\n    msg.dataStop = '10';\n    msg.dataStart = '0';\n    return msg;\n}\nelse{\n    return null;\n}",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 3920,
        "wires": [
            [
                "6e2559fe26abe977",
                "36f4d48b578766fd"
            ]
        ]
    },
    {
        "id": "3dac7af0cb9a03ca",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 730,
        "y": 3960,
        "wires": [
            []
        ]
    },
    {
        "id": "204a19c858a31995",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_time_trouble_quality",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 760,
        "y": 4000,
        "wires": [
            []
        ]
    },
    {
        "id": "773ce8f6f93f3f20",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "CR10_andon",
        "func": "\nreturn msg;",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 710,
        "y": 4040,
        "wires": [
            []
        ]
    },
    {
        "id": "edf996b8cacb2bab",
        "type": "debug",
        "z": "4ca0ab2242a45861",
        "name": "debug 1",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 630,
        "y": 40,
        "wires": []
    },
    {
        "id": "a79b1443ffc717ec",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR12",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 430,
        "wires": [
            [
                "5e0f056f0754ac6d"
            ]
        ]
    },
    {
        "id": "c6e0c2a59751b306",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR11",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 400,
        "wires": [
            [
                "4c7cd086449b8013"
            ]
        ]
    },
    {
        "id": "b9547ccdfa376e10",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR10",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 370,
        "wires": [
            [
                "a8fb92fac0ea6d2d"
            ]
        ]
    },
    {
        "id": "f1113b08de54a4e0",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR9",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 340,
        "wires": [
            [
                "5f8b0aa189b3fdb0"
            ]
        ]
    },
    {
        "id": "cdfcead0a86ba38d",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR8",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 310,
        "wires": [
            [
                "a629cf67786176d8"
            ]
        ]
    },
    {
        "id": "8c3c6926a36cdefe",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR7",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 280,
        "wires": [
            [
                "d0c56f1140a19e60"
            ]
        ]
    },
    {
        "id": "1a931ef182cfeb57",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR5",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 220,
        "wires": [
            [
                "990468f07b5a1eed"
            ]
        ]
    },
    {
        "id": "7f60cc96b931c2a3",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR4",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 190,
        "wires": [
            [
                "f010e64186d4b4da"
            ]
        ]
    },
    {
        "id": "1ed0a1bc355531a8",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR6",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 250,
        "wires": [
            [
                "012070d470f8c57f"
            ]
        ]
    },
    {
        "id": "02d654f94f6c5e72",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR3",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 160,
        "wires": [
            [
                "9a5ee0a6028efefe"
            ]
        ]
    },
    {
        "id": "f0527290813e2312",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR1",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 100,
        "wires": [
            [
                "1aa25c52b4d98458"
            ]
        ]
    },
    {
        "id": "11ae33acb93c13fe",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "CR2",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1830,
        "y": 130,
        "wires": [
            [
                "2130b1a450e609c7"
            ]
        ]
    },
    {
        "id": "ef0f82e4adc2f1db",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "2,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "2,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 660,
        "wires": [
            [
                "4f0a1899fa92cd8e"
            ]
        ]
    },
    {
        "id": "3dc95a0247664dc8",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "3,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "3,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 1160,
        "wires": [
            [
                "52144e0e6db114f5"
            ]
        ]
    },
    {
        "id": "0fae3c2d3bcc38f3",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "4,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "4,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 1660,
        "wires": [
            [
                "7cbe812c32a438b9"
            ]
        ]
    },
    {
        "id": "bf92817c0acb05f7",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "5,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "5,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 2160,
        "wires": [
            [
                "4869aafd54480777"
            ]
        ]
    },
    {
        "id": "0f17613d1da1c86e",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "6,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 2660,
        "wires": [
            [
                "2d88b866b36f3301"
            ]
        ]
    },
    {
        "id": "0e7f142477313c8f",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "7,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "7,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 3160,
        "wires": [
            [
                "af5997fd0d89b4f4"
            ]
        ]
    },
    {
        "id": "ebe85761c4ff37fc",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "8,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "8,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 3660,
        "wires": [
            [
                "38d86c02e83e0cc6"
            ]
        ]
    },
    {
        "id": "3cf13fceabe92a74",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "9,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "9,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 4240,
        "wires": [
            [
                "34a766d32419b6c7"
            ]
        ]
    },
    {
        "id": "6ba2d0eb5581846f",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "10,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "10,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 310,
        "y": 4740,
        "wires": [
            [
                "a7c37f242951bbb8"
            ]
        ]
    },
    {
        "id": "852a24597be1bfa2",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "11,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "11,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 310,
        "y": 5320,
        "wires": [
            [
                "8af1e5698cc16a52"
            ]
        ]
    },
    {
        "id": "59334d117549647a",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "12,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "12,PART,242,219,372,902,35,920,START,0,0,OFF;",
        "payloadType": "str",
        "x": 310,
        "y": 5820,
        "wires": [
            [
                "d81a36849e9a189e"
            ]
        ]
    },
    {
        "id": "63b387896956291f",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR12",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1570,
        "wires": [
            [
                "0cea63bab1f54ac8"
            ]
        ]
    },
    {
        "id": "72cd45bba874cebb",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR11",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1540,
        "wires": [
            [
                "49eafd1691d15406"
            ]
        ]
    },
    {
        "id": "7144aeb11ac59165",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR10",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1510,
        "wires": [
            [
                "17999a74b7a786df"
            ]
        ]
    },
    {
        "id": "eaeba0843a0c8061",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR9",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1480,
        "wires": [
            [
                "de017b05fc6d8636"
            ]
        ]
    },
    {
        "id": "9c79a8061a86c105",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR8",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1450,
        "wires": [
            [
                "6e2559fe26abe977"
            ]
        ]
    },
    {
        "id": "fe35f9f106a1d1de",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR7",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1420,
        "wires": [
            [
                "61e91b752790c61e"
            ]
        ]
    },
    {
        "id": "90ceacf8fcaf8f1d",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR5",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1360,
        "wires": [
            [
                "430c12ad8af086c8"
            ]
        ]
    },
    {
        "id": "b8307827365753c8",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR4",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1330,
        "wires": [
            [
                "07b4d39baf6220e1"
            ]
        ]
    },
    {
        "id": "46c77944a35fdfe5",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR6",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1390,
        "wires": [
            [
                "3170b886d931f4a7"
            ]
        ]
    },
    {
        "id": "6eb0b28f547b2373",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR3",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1300,
        "wires": [
            [
                "7d87336a5e0a1975"
            ]
        ]
    },
    {
        "id": "d882aebbbb84bbc6",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "10",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1820,
        "y": 1240,
        "wires": [
            [
                "52914dede0a4d2ee"
            ]
        ]
    },
    {
        "id": "4ba087f822914b8e",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR2",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 1270,
        "wires": [
            [
                "68fe77c4d4239c8d"
            ]
        ]
    },
    {
        "id": "ec480a11d6798956",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "1,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "1,PART,242,0,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 220,
        "wires": [
            [
                "46f15598786c03e3"
            ]
        ]
    },
    {
        "id": "6c5a506d8bee966c",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "2,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "2,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 700,
        "wires": [
            [
                "4f0a1899fa92cd8e"
            ]
        ]
    },
    {
        "id": "1ea73322012e6ee4",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "3,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "3,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 1200,
        "wires": [
            [
                "52144e0e6db114f5"
            ]
        ]
    },
    {
        "id": "87773686b7f2c7f4",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "5,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "5,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 280,
        "y": 2200,
        "wires": [
            [
                "4869aafd54480777"
            ]
        ]
    },
    {
        "id": "acbdcbfb23699fe0",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "6,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "6,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 2700,
        "wires": [
            [
                "2d88b866b36f3301"
            ]
        ]
    },
    {
        "id": "1c73034335ce814a",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "7,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "7,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 3200,
        "wires": [
            [
                "af5997fd0d89b4f4"
            ]
        ]
    },
    {
        "id": "e8760e74f2672490",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "8,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "8,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 3700,
        "wires": [
            [
                "38d86c02e83e0cc6"
            ]
        ]
    },
    {
        "id": "4ce0ad65be590549",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "9,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "9,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 4280,
        "wires": [
            [
                "34a766d32419b6c7"
            ]
        ]
    },
    {
        "id": "1ecc6a304442e0ac",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "10,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
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
        "payload": "10,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 4780,
        "wires": [
            [
                "a7c37f242951bbb8"
            ]
        ]
    },
    {
        "id": "d1095e9f21700035",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "11,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
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
        "payload": "11,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 5360,
        "wires": [
            [
                "8af1e5698cc16a52"
            ]
        ]
    },
    {
        "id": "60986bdbaeafedf1",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "12,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
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
        "payload": "12,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 300,
        "y": 5860,
        "wires": [
            [
                "d81a36849e9a189e"
            ]
        ]
    },
    {
        "id": "03c8cbb16b95eeb9",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR12",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2990,
        "wires": [
            [
                "788ad2d13a7c668b"
            ]
        ]
    },
    {
        "id": "b0874ccebe679346",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR11",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2960,
        "wires": [
            [
                "c90479e2e25750b4"
            ]
        ]
    },
    {
        "id": "06679f8d98201449",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR10",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2930,
        "wires": [
            [
                "49e31f177a01219c"
            ]
        ]
    },
    {
        "id": "69b37e9bedc7e23e",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR9",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2900,
        "wires": [
            [
                "b8f27dd3c484e67c"
            ]
        ]
    },
    {
        "id": "71d9d1907d039332",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR8",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2870,
        "wires": [
            [
                "36f4d48b578766fd"
            ]
        ]
    },
    {
        "id": "4ab1731bfa10c87b",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR7",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2840,
        "wires": [
            [
                "35e6816f3bbf91a7"
            ]
        ]
    },
    {
        "id": "15d714ed2d623e17",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR5",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2780,
        "wires": [
            [
                "95a2973a3f5f4160"
            ]
        ]
    },
    {
        "id": "52db88152c7c3150",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR4",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2750,
        "wires": [
            [
                "68684fa2108dc3b7"
            ]
        ]
    },
    {
        "id": "42b5e965a3137c81",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR6",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2810,
        "wires": [
            [
                "c38024f1980c1636"
            ]
        ]
    },
    {
        "id": "14e83e5019342f02",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR3",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2720,
        "wires": [
            [
                "c22dbdb362a57682"
            ]
        ]
    },
    {
        "id": "b8dae8d248a5228e",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "10",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1820,
        "y": 2660,
        "wires": [
            [
                "7c77fdf919c20fa9"
            ]
        ]
    },
    {
        "id": "5306116d72f754e5",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "ON CR2",
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
        "payload": "10",
        "payloadType": "str",
        "x": 1820,
        "y": 2690,
        "wires": [
            [
                "b8d0d36a45240c6d"
            ]
        ]
    },
    {
        "id": "3bdee9a5cb55b84c",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR12",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3940,
        "wires": [
            [
                "788ad2d13a7c668b"
            ]
        ]
    },
    {
        "id": "237eb8294509dd0e",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR11",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3910,
        "wires": [
            [
                "c90479e2e25750b4"
            ]
        ]
    },
    {
        "id": "80cf8f160073e043",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR10",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3880,
        "wires": [
            [
                "49e31f177a01219c"
            ]
        ]
    },
    {
        "id": "5cdbedfc5da41f13",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR9",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3850,
        "wires": [
            [
                "b8f27dd3c484e67c"
            ]
        ]
    },
    {
        "id": "510d0a121e701e69",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR8",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3820,
        "wires": [
            [
                "36f4d48b578766fd"
            ]
        ]
    },
    {
        "id": "b9c97fc6d4ab7fac",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR7",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3790,
        "wires": [
            [
                "35e6816f3bbf91a7"
            ]
        ]
    },
    {
        "id": "4f17c23108596cbb",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR5",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3730,
        "wires": [
            [
                "95a2973a3f5f4160"
            ]
        ]
    },
    {
        "id": "7d4ec79f92ebff4a",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR4",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3700,
        "wires": [
            [
                "68684fa2108dc3b7"
            ]
        ]
    },
    {
        "id": "6c92bb9d3d089c49",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR6",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3760,
        "wires": [
            [
                "c38024f1980c1636"
            ]
        ]
    },
    {
        "id": "128b072e522a3454",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR3",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3670,
        "wires": [
            [
                "c22dbdb362a57682"
            ]
        ]
    },
    {
        "id": "0f3606c988a39bff",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR1",
        "props": [
            {
                "p": "dataStart",
                "v": "0",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "x": 1840,
        "y": 3610,
        "wires": [
            [
                "7c77fdf919c20fa9"
            ]
        ]
    },
    {
        "id": "0fe7f2309ff5fe7e",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "OFF CR2",
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
        "payload": "0",
        "payloadType": "str",
        "x": 1840,
        "y": 3640,
        "wires": [
            [
                "b8d0d36a45240c6d"
            ]
        ]
    },
    {
        "id": "97df7f0da44138ac",
        "type": "inject",
        "z": "4ca0ab2242a45861",
        "name": "4,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "props": [
            {
                "p": "payload"
            },
            {
                "p": "topic",
                "vt": "str"
            },
            {
                "p": "data",
                "v": "1",
                "vt": "str"
            }
        ],
        "repeat": "",
        "crontab": "",
        "once": false,
        "onceDelay": 0.1,
        "topic": "",
        "payload": "4,PART,242,219,372,902,35,920,STOP,0,0,OFF;",
        "payloadType": "str",
        "x": 260,
        "y": 1700,
        "wires": [
            [
                "7cbe812c32a438b9"
            ]
        ]
    },
    {
        "id": "5ebabc3302950468",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 13,
        "width": 8,
        "height": 1,
        "passthru": false,
        "label": "Start Reset ALL",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1100,
        "y": 2560,
        "wires": [
            [
                "dcbfe09be412f86c"
            ]
        ]
    },
    {
        "id": "784e5845e03c500a",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 13,
        "width": 0,
        "height": 0,
        "passthru": false,
        "label": "Stop Reset ALL",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1100,
        "y": 2600,
        "wires": [
            [
                "4d35d04d9e44039d"
            ]
        ]
    },
    {
        "id": "4d35d04d9e44039d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '0';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 2640,
        "wires": [
            [
                "7c77fdf919c20fa9",
                "b8d0d36a45240c6d",
                "c22dbdb362a57682",
                "68684fa2108dc3b7",
                "95a2973a3f5f4160",
                "c38024f1980c1636",
                "35e6816f3bbf91a7",
                "36f4d48b578766fd",
                "b8f27dd3c484e67c",
                "49e31f177a01219c",
                "c90479e2e25750b4",
                "788ad2d13a7c668b"
            ]
        ]
    },
    {
        "id": "dcbfe09be412f86c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '0';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1270,
        "y": 2520,
        "wires": [
            [
                "0cea63bab1f54ac8",
                "49eafd1691d15406",
                "17999a74b7a786df",
                "de017b05fc6d8636",
                "6e2559fe26abe977",
                "61e91b752790c61e",
                "3170b886d931f4a7",
                "430c12ad8af086c8",
                "07b4d39baf6220e1",
                "7d87336a5e0a1975",
                "68fe77c4d4239c8d",
                "52914dede0a4d2ee"
            ]
        ]
    },
    {
        "id": "584df753bc3e3952",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 14,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR1",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1740,
        "wires": [
            [
                "232895f6f90b96cf"
            ]
        ]
    },
    {
        "id": "232895f6f90b96cf",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1740,
        "wires": [
            [
                "52914dede0a4d2ee"
            ]
        ]
    },
    {
        "id": "e9263ae20530a3eb",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 15,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR2",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1780,
        "wires": [
            [
                "6a11489c06ba3a65"
            ]
        ]
    },
    {
        "id": "6a11489c06ba3a65",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1780,
        "wires": [
            [
                "68fe77c4d4239c8d"
            ]
        ]
    },
    {
        "id": "d58b28515753af3e",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 16,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR3",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1820,
        "wires": [
            [
                "8c144e4b97929b12"
            ]
        ]
    },
    {
        "id": "8c144e4b97929b12",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1820,
        "wires": [
            [
                "7d87336a5e0a1975"
            ]
        ]
    },
    {
        "id": "04d72630a774a78e",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 17,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR4",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1860,
        "wires": [
            [
                "da90b5770329b21d"
            ]
        ]
    },
    {
        "id": "da90b5770329b21d",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1860,
        "wires": [
            [
                "07b4d39baf6220e1"
            ]
        ]
    },
    {
        "id": "a645afd024fd8636",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 18,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR5",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1900,
        "wires": [
            [
                "210940a02222677c"
            ]
        ]
    },
    {
        "id": "210940a02222677c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1900,
        "wires": [
            [
                "430c12ad8af086c8"
            ]
        ]
    },
    {
        "id": "cf1e0c13e2831f78",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 19,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR6",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1940,
        "wires": [
            [
                "9eb6fcd2e9b04620"
            ]
        ]
    },
    {
        "id": "9eb6fcd2e9b04620",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1940,
        "wires": [
            [
                "3170b886d931f4a7"
            ]
        ]
    },
    {
        "id": "6c70cc3a29842003",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 20,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR7",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 1980,
        "wires": [
            [
                "d1e6be907bbc6f2c"
            ]
        ]
    },
    {
        "id": "d1e6be907bbc6f2c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 1980,
        "wires": [
            [
                "61e91b752790c61e"
            ]
        ]
    },
    {
        "id": "87022f70f02feffa",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 21,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR8",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 2020,
        "wires": [
            [
                "78c3c99d6aab8ac1"
            ]
        ]
    },
    {
        "id": "78c3c99d6aab8ac1",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 2020,
        "wires": [
            [
                "6e2559fe26abe977"
            ]
        ]
    },
    {
        "id": "5138239e180b2e54",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 22,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR9",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1180,
        "y": 2060,
        "wires": [
            [
                "58b7229c6bfcad24"
            ]
        ]
    },
    {
        "id": "58b7229c6bfcad24",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 2060,
        "wires": [
            [
                "de017b05fc6d8636"
            ]
        ]
    },
    {
        "id": "c734f9906801e789",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 23,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR10",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1190,
        "y": 2100,
        "wires": [
            [
                "46a39c6f942767b9"
            ]
        ]
    },
    {
        "id": "46a39c6f942767b9",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 2100,
        "wires": [
            [
                "17999a74b7a786df"
            ]
        ]
    },
    {
        "id": "675ec7b35dc68b7b",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 24,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR11",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1190,
        "y": 2140,
        "wires": [
            [
                "89f82a4f40757f39"
            ]
        ]
    },
    {
        "id": "89f82a4f40757f39",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 2140,
        "wires": [
            [
                "49eafd1691d15406"
            ]
        ]
    },
    {
        "id": "3a384d1215aafeab",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "b966e997bd61c03b",
        "order": 25,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Start CR12",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1190,
        "y": 2180,
        "wires": [
            [
                "e5ad68a526dde954"
            ]
        ]
    },
    {
        "id": "e5ad68a526dde954",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStart = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1390,
        "y": 2180,
        "wires": [
            [
                "0cea63bab1f54ac8"
            ]
        ]
    },
    {
        "id": "b73b41fac409b19a",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 14,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR1",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3000,
        "wires": [
            [
                "2277bc6deed3eb53"
            ]
        ]
    },
    {
        "id": "2277bc6deed3eb53",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3000,
        "wires": [
            [
                "7c77fdf919c20fa9"
            ]
        ]
    },
    {
        "id": "f6ca6766c4b09d94",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 15,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR2",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3040,
        "wires": [
            [
                "9bac344cb68a5437"
            ]
        ]
    },
    {
        "id": "9bac344cb68a5437",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3040,
        "wires": [
            [
                "b8d0d36a45240c6d"
            ]
        ]
    },
    {
        "id": "383edc512b1a4abd",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 16,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR3",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3080,
        "wires": [
            [
                "1f3b50c9ef3f1cc5"
            ]
        ]
    },
    {
        "id": "1f3b50c9ef3f1cc5",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3080,
        "wires": [
            [
                "c22dbdb362a57682"
            ]
        ]
    },
    {
        "id": "798bbb0b4280ea8f",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 17,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR4",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3120,
        "wires": [
            [
                "3c66a7f861187805"
            ]
        ]
    },
    {
        "id": "3c66a7f861187805",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3120,
        "wires": [
            [
                "68684fa2108dc3b7"
            ]
        ]
    },
    {
        "id": "38e88b1418476d4a",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 18,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR5",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3160,
        "wires": [
            [
                "346a4ff168a247f7"
            ]
        ]
    },
    {
        "id": "346a4ff168a247f7",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3160,
        "wires": [
            [
                "95a2973a3f5f4160"
            ]
        ]
    },
    {
        "id": "86d3b05e8cd7d207",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 19,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR6",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3200,
        "wires": [
            [
                "9f073e1c57623666"
            ]
        ]
    },
    {
        "id": "9f073e1c57623666",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3200,
        "wires": [
            [
                "c38024f1980c1636"
            ]
        ]
    },
    {
        "id": "4996d70583360ed9",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 20,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR7",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3240,
        "wires": [
            [
                "5f304ff1f8f43a2c"
            ]
        ]
    },
    {
        "id": "5f304ff1f8f43a2c",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3240,
        "wires": [
            [
                "35e6816f3bbf91a7"
            ]
        ]
    },
    {
        "id": "3c8bd1f3a1c855bf",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 21,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR8",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3280,
        "wires": [
            [
                "42c205017f6116e8"
            ]
        ]
    },
    {
        "id": "42c205017f6116e8",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3280,
        "wires": [
            [
                "36f4d48b578766fd"
            ]
        ]
    },
    {
        "id": "92f622dcf3cd5225",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 22,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR9",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1160,
        "y": 3320,
        "wires": [
            [
                "9c9be989938f1cf6"
            ]
        ]
    },
    {
        "id": "9c9be989938f1cf6",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if (msg.payload === '1') {\n    msg.dataStop = '10';\n    return msg;\n} else {\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3320,
        "wires": [
            [
                "b8f27dd3c484e67c"
            ]
        ]
    },
    {
        "id": "a6ca334617da7d79",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 23,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR10",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1170,
        "y": 3360,
        "wires": [
            [
                "c05b1cd495dc6717"
            ]
        ]
    },
    {
        "id": "c05b1cd495dc6717",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3360,
        "wires": [
            [
                "49e31f177a01219c"
            ]
        ]
    },
    {
        "id": "0f37b6661c085d6a",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 24,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR11",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1170,
        "y": 3400,
        "wires": [
            [
                "cdd27c99803fa140"
            ]
        ]
    },
    {
        "id": "cdd27c99803fa140",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3400,
        "wires": [
            [
                "c90479e2e25750b4"
            ]
        ]
    },
    {
        "id": "71626a08f4bda297",
        "type": "ui_button",
        "z": "4ca0ab2242a45861",
        "name": "",
        "group": "3ccabc5e5ecb8654",
        "order": 25,
        "width": 2,
        "height": 1,
        "passthru": false,
        "label": "Stop CR12",
        "tooltip": "",
        "color": "",
        "bgcolor": "",
        "className": "",
        "icon": "",
        "payload": "1",
        "payloadType": "str",
        "topic": "topic",
        "topicType": "msg",
        "x": 1170,
        "y": 3440,
        "wires": [
            [
                "b5aab846a6d6d0bc"
            ]
        ]
    },
    {
        "id": "b5aab846a6d6d0bc",
        "type": "function",
        "z": "4ca0ab2242a45861",
        "name": "reset",
        "func": "if(msg.payload === '1'){\n    msg.dataStop = '10';\n    return msg;\n}else{\n    return null;\n}\n",
        "outputs": 1,
        "timeout": 0,
        "noerr": 0,
        "initialize": "",
        "finalize": "",
        "libs": [],
        "x": 1370,
        "y": 3440,
        "wires": [
            [
                "788ad2d13a7c668b"
            ]
        ]
    },
    {
        "id": "518b2ec501a3f56f",
        "type": "debug",
        "z": "4ca0ab2242a45861",
        "name": "debug 5",
        "active": false,
        "tosidebar": true,
        "console": false,
        "tostatus": false,
        "complete": "false",
        "statusVal": "",
        "statusType": "auto",
        "x": 940,
        "y": 4140,
        "wires": []
    },
    {
        "id": "59e741051a4d5c75",
        "type": "link in",
        "z": "4ca0ab2242a45861",
        "name": "link in 1",
        "links": [
            "8811433ba5ab721e"
        ],
        "x": 165,
        "y": 40,
        "wires": [
            [
                "921ef330c380a1f1",
                "a7c37f242951bbb8",
                "8af1e5698cc16a52",
                "d81a36849e9a189e",
                "34a766d32419b6c7",
                "52144e0e6db114f5",
                "46f15598786c03e3",
                "4f0a1899fa92cd8e",
                "7cbe812c32a438b9",
                "4869aafd54480777",
                "2d88b866b36f3301",
                "af5997fd0d89b4f4",
                "38d86c02e83e0cc6"
            ]
        ]
    },
    {
        "id": "3ccabc5e5ecb8654",
        "type": "ui_group",
        "name": "ALL_COMMON_RAIL_STOP",
        "tab": "93243cb4efa9a6a9",
        "order": 3,
        "disp": true,
        "width": 8,
        "collapse": false,
        "className": ""
    },
    {
        "id": "b966e997bd61c03b",
        "type": "ui_group",
        "name": "ALL_COMMON_RAIL_START",
        "tab": "93243cb4efa9a6a9",
        "order": 1,
        "disp": true,
        "width": 8,
        "collapse": false,
        "className": ""
    },
    {
        "id": "84bdaf9aa3b2d757",
        "type": "ui_group",
        "name": "ACTUAL PCS",
        "tab": "93243cb4efa9a6a9",
        "order": 2,
        "disp": true,
        "width": 4,
        "collapse": false,
        "className": ""
    },
    {
        "id": "93243cb4efa9a6a9",
        "type": "ui_tab",
        "name": "Otics Monitoring Manhour Start_Stop",
        "icon": "dashboard",
        "order": 2,
        "disabled": false,
        "hidden": false
    },
    {
        "id": "69d8847702a5cc7f",
        "type": "global-config",
        "env": [],
        "modules": {
            "node-red-dashboard": "3.6.6",
            "node-red-contrib-string": "1.0.0"
        }
    }
]
