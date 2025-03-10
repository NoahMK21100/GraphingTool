export const EXAMPLE_DATA = {
    companies: {
        anduril: {
            name: "Anduril",
            technologies: {
                barracuda: {
                    name: "Barracuda Effect",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Precision Strike", "Air", "Stand-off Strike", "Artificial Intelligence", "Barracuda-500"],
                        ["Precision Strike", "Air", "Air Defense Suppression", "Autonomous Systems", "Barracuda-250"],
                        ["Precision Strike", "Land", "Anti-Ship Strike", "Artificial Intelligence", "Barracuda-10"],
                        ["Precision Strike", "Maritime", "Strategic Strike", "Autonomous Systems", "Barracuda-500"],
                        ["Strategic Deterrence", "Air", "Area Denial", "Artificial Intelligence", "Barracuda-250"],
                        ["Strategic Deterrence", "Land", "Stand-off Strike", "Autonomous Systems", "Barracuda-10"],
                        ["Strategic Deterrence", "Maritime", "Air Defense Suppression", "Artificial Intelligence", "Barracuda-500"],
                        ["Target Elimination", "Air", "Anti-Ship Strike", "Autonomous Systems", "Barracuda-250"],
                        ["Target Elimination", "Land", "Strategic Strike", "Artificial Intelligence", "Barracuda-10"],
                        ["Target Elimination", "Maritime", "Area Denial", "Autonomous Systems", "Barracuda-500"],
                        ["High Precision Impact", "Air", "Stand-off Strike", "Artificial Intelligence", "Barracuda-250"],
                        ["High Precision Impact", "Land", "Air Defense Suppression", "Autonomous Systems", "Barracuda-10"],
                        ["High Precision Impact", "Maritime", "Anti-Ship Strike", "Artificial Intelligence", "Barracuda-500"],
                        ["Multi-Target Engagement", "Air", "Strategic Strike", "Autonomous Systems", "Barracuda-250"],
                        ["Multi-Target Engagement", "Land", "Area Denial", "Artificial Intelligence", "Barracuda-10"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33]
                    ]
                },
                barracudaSystem: {
                    name: "Barracuda System",
                    columns: [
                        'System',
                        'Subsystem',
                        'Component',
                        'Location of Component'
                    ],
                    data: [
                        ["Barracuda-500", "Airframe", "Fuselage", "USA"],
                        ["Barracuda-500", "Airframe", "Wings", "USA"],
                        ["Barracuda-500", "Propulsion", "Turbojet Engine", "Germany"],
                        ["Barracuda-500", "Avionics", "Flight Control System", "Japan"],
                        ["Barracuda-500", "Payload", "Electro-Optical Sensor", "Israel"],
                        ["Barracuda-250", "Airframe", "Fuselage", "USA"],
                        ["Barracuda-250", "Airframe", "Wings", "USA"],
                        ["Barracuda-250", "Propulsion", "Turbojet Engine", "Germany"],
                        ["Barracuda-250", "Avionics", "Flight Control System", "Japan"],
                        ["Barracuda-250", "Payload", "Synthetic Aperture Radar", "Israel"],
                        ["Barracuda-10", "Airframe", "Fuselage", "USA"],
                        ["Barracuda-10", "Airframe", "Wings", "USA"],
                        ["Barracuda-10", "Propulsion", "Turbojet Engine", "Germany"],
                        ["Barracuda-10", "Avionics", "Flight Control System", "Japan"],
                        ["Barracuda-10", "Payload", "Electronic Warfare Suite", "Israel"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50],
                        [0.25, 0.20, 0.50, 0.50],
                        [0.25, 0.20, 0.50, 0.50],
                        [0.25, 0.20, 0.50, 0.50],
                        [0.25, 0.20, 0.50, 0.50],
                        [0.20, 0.20, 0.50, 0.50],
                        [0.20, 0.20, 0.50, 0.50],
                        [0.20, 0.20, 0.50, 0.50],
                        [0.20, 0.20, 0.50, 0.50],
                        [0.20, 0.20, 0.50, 0.50],
                        [0.15, 0.20, 0.50, 0.50],
                        [0.15, 0.20, 0.50, 0.50],
                        [0.15, 0.20, 0.50, 0.50],
                        [0.15, 0.20, 0.50, 0.50],
                        [0.15, 0.20, 0.50, 0.50]
                    ]
                },
                lattice: {
                    name: "Lattice",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Enhanced Situational Awareness", "Air Domain", "Securing Borders", "Artificial Intelligence", "Anduril Lattice"],
                        ["Enhanced Situational Awareness", "Land Domain", "Inspecting and Securing Critical Infrastructure", "Software Platform", "Anduril Lattice"],
                        ["Enhanced Situational Awareness", "Maritime Domain", "Wildfire Detection and Response", "Artificial Intelligence", "Anduril Lattice"],
                        ["Enhanced Situational Awareness", "Cyberspace Domain", "Military Command and Control", "Software Platform", "Anduril Lattice"],
                        ["Improved Decision-Making", "Air Domain", "Search and Rescue", "Artificial Intelligence", "Anduril Lattice"],
                        ["Improved Decision-Making", "Land Domain", "Military Command and Control", "Software Platform", "Anduril Lattice"],
                        ["Improved Decision-Making", "Maritime Domain", "Securing Borders", "Artificial Intelligence", "Anduril Lattice"],
                        ["Improved Decision-Making", "Cyberspace Domain", "Inspecting and Securing Critical Infrastructure", "Software Platform", "Anduril Lattice"],
                        ["Force Multiplication", "Air Domain", "Wildfire Detection and Response", "Artificial Intelligence", "Anduril Lattice"],
                        ["Force Multiplication", "Land Domain", "Search and Rescue", "Software Platform", "Anduril Lattice"],
                        ["Force Multiplication", "Maritime Domain", "Military Command and Control", "Artificial Intelligence", "Anduril Lattice"],
                        ["Force Multiplication", "Cyberspace Domain", "Securing Borders", "Software Platform", "Anduril Lattice"],
                        ["Real-Time Data Integration", "Air Domain", "Inspecting and Securing Critical Infrastructure", "Artificial Intelligence", "Anduril Lattice"],
                        ["Real-Time Data Integration", "Land Domain", "Wildfire Detection and Response", "Software Platform", "Anduril Lattice"],
                        ["Real-Time Data Integration", "Maritime Domain", "Search and Rescue", "Artificial Intelligence", "Anduril Lattice"],
                        ["Real-Time Data Integration", "Cyberspace Domain", "Military Command and Control", "Software Platform", "Anduril Lattice"]
                    ],
                    rowWeights: [
                        [0.25, 0.30, 0.25, 0.25, 0.50],
                        [0.25, 0.30, 0.25, 0.25, 0.50],
                        [0.25, 0.30, 0.25, 0.25, 0.50],
                        [0.25, 0.30, 0.25, 0.25, 0.50],
                        [0.25, 0.30, 0.25, 0.25, 0.50],
                        [0.20, 0.30, 0.25, 0.25, 0.50],
                        [0.20, 0.30, 0.25, 0.25, 0.50],
                        [0.20, 0.30, 0.25, 0.25, 0.50],
                        [0.20, 0.20, 0.25, 0.25, 0.50],
                        [0.20, 0.20, 0.25, 0.25, 0.50],
                        [0.20, 0.20, 0.25, 0.25, 0.50],
                        [0.20, 0.20, 0.25, 0.25, 0.50],
                        [0.25, 0.20, 0.25, 0.25, 0.50],
                        [0.20, 0.20, 0.25, 0.25, 0.50],
                        [0.20, 0.20, 0.25, 0.25, 0.50],
                        [0.15, 0.20, 0.25, 0.25, 0.50]
                    ]
                },
                ghost4: {
                    name: "Ghost 4",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["Ghost 4", "AI & Autonomy", "Autonomous Navigation", "Sensor Fusion AI", "UK"],
                        ["Ghost 4", "Avionics", "Computer Vision", "Real-Time Target Classification", "Canada"],
                        ["Ghost 4", "ISR", "Optical Sensors", "High-Res EO/IR Camera", "USA"],
                        ["Ghost 4", "Power Systems", "High-Density Battery Pack", "Lithium-Ion Cells", "Germany"],
                        ["Ghost 4", "Propulsion", "Electric Motor System", "Brushless DC Motors", "Japan"]
                    ]
                },
                anvil: {
                    name: "Anvil",
                    data: [
                        ["Anvil", "AI & Autonomy", "Collision Avoidance AI", "Deep Reinforcement Learning Model", "USA"],
                        ["Anvil", "ISR", "AI-Based Object Recognition", "Neural Network Model", "UK"],
                        ["Anvil", "Avionics", "Real-Time Flight Path Optimization", "AI-Powered Navigation", "Canada"],
                        ["Anvil", "Weapons System", "Kinetic Interceptor", "High-Speed Launch System", "USA"]
                    ]
                },
                counterUAS: {
                    name: "Counter-UAS",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["RF", "Land", "Unmanned Aircraft Detection", "Artificial Intelligence", "Counter-UAS System"],
                        ["RF", "Air", "Unmanned Aircraft Detection", "Autonomous Systems", "Counter-UAS System"],
                        ["RF", "Maritime", "Unmanned Aircraft Detection", "Software Platform", "Counter-UAS System"],
                        ["EW", "Land", "Unmanned Aircraft Tracking", "Artificial Intelligence", "Counter-UAS System"],
                        ["EW", "Air", "Unmanned Aircraft Tracking", "Autonomous Systems", "Counter-UAS System"],
                        ["EW", "Maritime", "Unmanned Aircraft Tracking", "Software Platform", "Counter-UAS System"],
                        ["Kinetic Effects", "Land", "Unmanned Aircraft Interception", "Artificial Intelligence", "Counter-UAS System"],
                        ["Kinetic Effects", "Air", "Unmanned Aircraft Interception", "Autonomous Systems", "Counter-UAS System"],
                        ["Kinetic Effects", "Maritime", "Unmanned Aircraft Interception", "Software Platform", "Counter-UAS System"]
                    ],
                    rowWeights: [
                        [0.25, 0.33, 0.33, 0.33, 0.20],
                        [0.50, 0.33, 0.33, 0.33, 0.20],
                        [0.25, 0.34, 0.34, 0.34, 0.20],
                        [0.30, 0.33, 0.33, 0.33, 0.20],
                        [0.50, 0.33, 0.33, 0.33, 0.20],
                        [0.20, 0.34, 0.34, 0.34, 0.20],
                        [0.35, 0.33, 0.33, 0.33, 0.20],
                        [0.50, 0.33, 0.33, 0.33, 0.20],
                        [0.15, 0.34, 0.34, 0.34, 0.20]
                    ]
                },
                diveld: {
                    name: "Dive-LD",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Intelligence Gathering", "Littoral", "Undersea ISR", "Autonomous Systems", "Dive-LD"],
                        ["Intelligence Gathering", "Deep Water", "Undersea ISR", "Autonomous Systems", "Dive-LD"],
                        ["Threat Neutralization", "Littoral", "Mine Counter-Warfare", "Autonomous Systems", "Dive-LD"],
                        ["Threat Neutralization", "Deep Water", "Mine Counter-Warfare", "Autonomous Systems", "Dive-LD"],
                        ["Environmental Awareness", "Littoral", "Anti-Submarine Warfare", "Autonomous Systems", "Dive-LD"],
                        ["Environmental Awareness", "Deep Water", "Anti-Submarine Warfare", "Autonomous Systems", "Dive-LD"],
                        ["Operational Endurance", "Littoral", "Survey and Inspection", "Autonomous Systems", "Dive-LD"],
                        ["Operational Endurance", "Deep Water", "Seafloor Mapping", "Autonomous Systems", "Dive-LD"],
                        ["Intelligence Gathering", "Littoral", "Survey and Inspection", "Autonomous Systems", "Dive-LD"],
                        ["Threat Neutralization", "Deep Water", "Undersea ISR", "Autonomous Systems", "Dive-LD"],
                        ["Environmental Awareness", "Littoral", "Mine Counter-Warfare", "Autonomous Systems", "Dive-LD"],
                        ["Operational Endurance", "Deep Water", "Anti-Submarine Warfare", "Autonomous Systems", "Dive-LD"]
                    ],
                    rowWeights: [
                        [0.25, 0.25, 0.20, 0.20, 0.20],
                        [0.25, 0.20, 0.20, 0.20, 0.20],
                        [0.25, 0.25, 0.20, 0.20, 0.20],
                        [0.25, 0.20, 0.20, 0.20, 0.20],
                        [0.25, 0.25, 0.20, 0.20, 0.20],
                        [0.25, 0.20, 0.20, 0.20, 0.20],
                        [0.25, 0.25, 0.20, 0.20, 0.20],
                        [0.25, 0.20, 0.20, 0.20, 0.20],
                        [0.25, 0.25, 0.20, 0.20, 0.20],
                        [0.25, 0.20, 0.20, 0.20, 0.20],
                        [0.25, 0.25, 0.20, 0.20, 0.20],
                        [0.25, 0.20, 0.20, 0.20, 0.20]
                    ]
                },
                fury: {
                    name: "Fury",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Enhanced Operational Flexibility", "Medium Altitude", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Enhanced Operational Flexibility", "Low Altitude", "ISR", "Autonomous Systems", "Anduril Fury"],
                        ["Enhanced Operational Flexibility", "Atmospheric Conditions", "Airborne Teaming Missions", "Artificial Intelligence", "Anduril Fury"],
                        ["Enhanced Operational Flexibility", "Uncontrolled Airspace", "ISR", "Autonomous Systems", "Anduril Fury"],
                        ["Enhanced Situational Awareness", "Medium Altitude", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Enhanced Situational Awareness", "Low Altitude", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"],
                        ["Enhanced Situational Awareness", "Atmospheric Conditions", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Enhanced Situational Awareness", "Uncontrolled Airspace", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"],
                        ["Force Multiplication", "Medium Altitude", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Force Multiplication", "Low Altitude", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"],
                        ["Force Multiplication", "Atmospheric Conditions", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Force Multiplication", "Uncontrolled Airspace", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"],
                        ["Reduced Human Risk", "Medium Altitude", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Reduced Human Risk", "Low Altitude", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"],
                        ["Reduced Human Risk", "Atmospheric Conditions", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Reduced Human Risk", "Uncontrolled Airspace", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"],
                        ["Reduced Pilot Risk", "Medium Altitude", "ISR", "Artificial Intelligence", "Anduril Fury"],
                        ["Reduced Pilot Risk", "Low Altitude", "Airborne Teaming Missions", "Autonomous Systems", "Anduril Fury"]
                    ],
                    rowWeights: [
                        [0.325, 0.30, 0.35, 0.50, 0.50],
                        [0.452, 0.24, 0.35, 0.50, 0.50],
                        [0.063, 0.084, 0.15, 0.50, 0.50],
                        [0.027, 0.036, 0.35, 0.50, 0.50],
                        [0.510, 0.30, 0.35, 0.50, 0.50],
                        [0.510, 0.24, 0.15, 0.50, 0.50],
                        [0.119, 0.196, 0.35, 0.50, 0.50],
                        [0.051, 0.084, 0.15, 0.50, 0.50],
                        [0.517, 0.30, 0.35, 0.50, 0.50],
                        [0.329, 0.24, 0.15, 0.50, 0.50],
                        [0.066, 0.196, 0.35, 0.50, 0.50],
                        [0.028, 0.036, 0.15, 0.50, 0.50],
                        [0.078, 0.30, 0.35, 0.50, 0.50],
                        [0.169, 0.24, 0.15, 0.50, 0.50],
                        [0.032, 0.196, 0.35, 0.50, 0.50],
                        [0.014, 0.036, 0.15, 0.50, 0.50],
                        [0.060, 0.30, 0.35, 0.50, 0.50],
                        [0.140, 0.24, 0.15, 0.50, 0.50]
                    ]
                },
                roadrunner: {
                    name: "Roadrunner",
                    columns: [
                        ["Precision Strike", "Air", "Interception", "Artificial Intelligence", "Roadrunner"],
                        ["Precision Strike", "Air", "Reconnaissance", "Artificial Intelligence", "Roadrunner-M"],
                        ["Precision Strike", "Air", "Modular Payload Deployment", "Artificial Intelligence", "Nest"],
                        ["Precision Strike", "Land", "Interception", "Artificial Intelligence", "Roadrunner"],
                        ["Precision Strike", "Land", "Reconnaissance", "Artificial Intelligence", "Roadrunner-M"],
                        ["Precision Strike", "Land", "Modular Payload Deployment", "Artificial Intelligence", "Nest"],
                        ["Target Elimination", "Air", "Interception", "Autonomous Air Vehicle (AAV)", "Roadrunner"],
                        ["Target Elimination", "Air", "Reconnaissance", "Autonomous Air Vehicle (AAV)", "Roadrunner-M"],
                        ["Target Elimination", "Air", "Modular Payload Deployment", "Autonomous Air Vehicle (AAV)", "Nest"],
                        ["Target Elimination", "Land", "Interception", "Autonomous Air Vehicle (AAV)", "Roadrunner"],
                        ["Target Elimination", "Land", "Reconnaissance", "Autonomous Air Vehicle (AAV)", "Roadrunner-M"],
                        ["Target Elimination", "Land", "Modular Payload Deployment", "Autonomous Air Vehicle (AAV)", "Nest"],
                        ["Situational Awareness", "Air", "Interception", "Artificial Intelligence", "Roadrunner"],
                        ["Situational Awareness", "Air", "Reconnaissance", "Artificial Intelligence", "Roadrunner-M"],
                        ["Situational Awareness", "Air", "Modular Payload Deployment", "Artificial Intelligence", "Nest"],
                        ["Situational Awareness", "Land", "Interception", "Artificial Intelligence", "Roadrunner"],
                        ["Situational Awareness", "Land", "Reconnaissance", "Artificial Intelligence", "Roadrunner-M"],
                        ["Situational Awareness", "Land", "Modular Payload Deployment", "Artificial Intelligence", "Nest"],
                        ["Modular Adaptability", "Air", "Interception", "Autonomous Air Vehicle (AAV)", "Roadrunner"],
                        ["Modular Adaptability", "Air", "Reconnaissance", "Autonomous Air Vehicle (AAV)", "Roadrunner-M"],
                        ["Modular Adaptability", "Air", "Modular Payload Deployment", "Autonomous Air Vehicle (AAV)", "Nest"],
                        ["Modular Adaptability", "Land", "Interception", "Autonomous Air Vehicle (AAV)", "Roadrunner"],
                        ["Modular Adaptability", "Land", "Reconnaissance", "Autonomous Air Vehicle (AAV)", "Roadrunner-M"],
                        ["Modular Adaptability", "Land", "Modular Payload Deployment", "Autonomous Air Vehicle (AAV)", "Nest"]
                    ],
                    rowWeights: [
                        [0.40, 0.40, 0.25, 0.25, 0.40],
                        [0.40, 0.30, 0.25, 0.25, 0.35],
                        [0.40, 0.30, 0.25, 0.25, 0.25],
                        [0.30, 0.50, 0.25, 0.25, 0.40],
                        [0.30, 0.25, 0.25, 0.25, 0.35],
                        [0.30, 0.25, 0.25, 0.25, 0.25],
                        [0.35, 0.40, 0.25, 0.25, 0.40],
                        [0.35, 0.30, 0.25, 0.25, 0.35],
                        [0.35, 0.30, 0.25, 0.25, 0.25],
                        [0.25, 0.50, 0.25, 0.25, 0.40],
                        [0.25, 0.25, 0.25, 0.25, 0.35],
                        [0.25, 0.25, 0.25, 0.25, 0.25],
                        [0.50, 0.40, 0.25, 0.25, 0.40],
                        [0.50, 0.30, 0.25, 0.25, 0.35],
                        [0.50, 0.30, 0.25, 0.25, 0.25],
                        [0.20, 0.50, 0.25, 0.25, 0.40],
                        [0.20, 0.25, 0.25, 0.25, 0.35],
                        [0.20, 0.25, 0.25, 0.25, 0.25],
                        [0.45, 0.40, 0.25, 0.25, 0.40],
                        [0.45, 0.30, 0.25, 0.25, 0.35],
                        [0.45, 0.30, 0.25, 0.25, 0.25],
                        [0.35, 0.50, 0.25, 0.25, 0.40],
                        [0.35, 0.25, 0.25, 0.25, 0.35],
                        [0.35, 0.25, 0.25, 0.25, 0.25]
                    ]
                }
            }
        },
        flightwave: {
            name: "FlightWave",
            technologies: {
                edge130: {
                    name: "Edge130",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Vertical Takeoff", "Air", "Surveillance", "Autonomous Systems", "Edge130"],
                        ["Vertical Takeoff", "Air", "Reconnaissance", "Autonomous Systems", "Edge130"],
                        ["Vertical Takeoff", "Maritime", "Search and Rescue", "Autonomous Systems", "Edge130"],
                        ["Extended Range", "Air", "Surveillance", "Autonomous Systems", "Edge130"],
                        ["Extended Range", "Air", "Reconnaissance", "Autonomous Systems", "Edge130"],
                        ["Extended Range", "Maritime", "Search and Rescue", "Autonomous Systems", "Edge130"],
                        ["All-Weather Operation", "Air", "Surveillance", "Autonomous Systems", "Edge130"],
                        ["All-Weather Operation", "Air", "Reconnaissance", "Autonomous Systems", "Edge130"],
                        ["All-Weather Operation", "Maritime", "Search and Rescue", "Autonomous Systems", "Edge130"],
                        ["Payload Flexibility", "Air", "Surveillance", "Autonomous Systems", "Edge130"],
                        ["Payload Flexibility", "Air", "Reconnaissance", "Autonomous Systems", "Edge130"],
                        ["Payload Flexibility", "Maritime", "Search and Rescue", "Autonomous Systems", "Edge130"]
                    ],
                    rowWeights: [
                        [0.30, 0.30, 0.30, 0.40, 0.50],
                        [0.30, 0.30, 0.30, 0.40, 0.50],
                        [0.30, 0.30, 0.30, 0.40, 0.50],
                        [0.25, 0.30, 0.30, 0.40, 0.50],
                        [0.25, 0.30, 0.30, 0.40, 0.50],
                        [0.25, 0.30, 0.30, 0.40, 0.50],
                        [0.25, 0.30, 0.30, 0.40, 0.50],
                        [0.25, 0.30, 0.30, 0.40, 0.50],
                        [0.25, 0.30, 0.30, 0.40, 0.50],
                        [0.20, 0.30, 0.30, 0.40, 0.50],
                        [0.20, 0.30, 0.30, 0.40, 0.50],
                        [0.20, 0.30, 0.30, 0.40, 0.50]
                    ]
                }
            }
        },
        tempest: {
            name: "Tempest",
            technologies: {
                uas: {
                    name: "Unmanned Aircraft System",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Cost Efficiency", "Air", "Reconnaissance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Cost Efficiency", "Air", "Surveillance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Cost Efficiency", "Air", "Payload Delivery", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Cost Efficiency", "Air", "Loitering Missions", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Rapid Deployment", "Air", "Reconnaissance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Rapid Deployment", "Air", "Surveillance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Rapid Deployment", "Air", "Payload Delivery", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Rapid Deployment", "Air", "Loitering Missions", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Modular Adaptability", "Air", "Reconnaissance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Modular Adaptability", "Air", "Surveillance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Modular Adaptability", "Air", "Payload Delivery", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Modular Adaptability", "Air", "Loitering Missions", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Operational Flexibility", "Air", "Reconnaissance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Operational Flexibility", "Air", "Surveillance", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Operational Flexibility", "Air", "Payload Delivery", "Unmanned Aircraft System (UAS)", "Tempest"],
                        ["Operational Flexibility", "Air", "Loitering Missions", "Unmanned Aircraft System (UAS)", "Tempest"]
                    ],
                    rowWeights: [
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0],
                        [0.25, 0.25, 0.25, 0.25, 1.0]
                    ]
                }
            }
        },
        boeing: {
            name: "Boeing",
            technologies: {
                superHornetEffect: {
                    name: "F/A-18 Super Hornet Effect",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Air Superiority", "Air", "Air-to-Air Combat", "Artificial Intelligence", "F/A-18E"],
                        ["Air Superiority", "Air", "Electronic Warfare", "Autonomous Systems", "F/A-18F"],
                        ["Air Superiority", "Maritime", "Maritime Strike", "Neural Networks", "F/A-18E"],
                        ["Precision Strike", "Air", "Ground Attack", "Artificial Intelligence", "F/A-18F"],
                        ["Precision Strike", "Land", "Close Air Support", "Autonomous Systems", "F/A-18E"],
                        ["Precision Strike", "Maritime", "Anti-Ship", "Neural Networks", "F/A-18F"],
                        ["Force Protection", "Air", "Escort", "Artificial Intelligence", "F/A-18E"],
                        ["Force Protection", "Land", "Battlefield Support", "Autonomous Systems", "F/A-18F"],
                        ["Force Protection", "Maritime", "Fleet Defense", "Neural Networks", "F/A-18E"],
                        ["ISR Operations", "Air", "Reconnaissance", "Artificial Intelligence", "F/A-18F"],
                        ["ISR Operations", "Land", "Surveillance", "Autonomous Systems", "F/A-18E"],
                        ["ISR Operations", "Maritime", "Maritime Patrol", "Neural Networks", "F/A-18F"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33]
                    ]
                },
                superHornetSystem: {
                    name: "F/A-18 Super Hornet System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Airframe", "Fuselage", "Center/Aft fuselage with vertical tails", "USA"],
                        ["Airframe", "Aerostructures", "Various structural components", "USA"],
                        ["Airframe", "Pylons", "Centerline Pylon assembly", "USA"],
                        ["Avionics", "Electronic Systems", "Advanced Electronic Warfare (ADVEW) system", "USA"],
                        ["Avionics", "Targeting Systems", "LITENING Targeting Pod", "USA"],
                        ["Avionics", "Power Systems", "Integrated power distribution", "USA"],
                        ["Propulsion", "Engines", "F414-GE-400 turbofan engines", "USA"],
                        ["Propulsion", "Power Systems", "Onboard power generation", "USA"],
                        ["Sensors", "Targeting", "LITENING Targeting Pod", "USA"],
                        ["Sensors", "Radar", "AN/APG-79 AESA Radar", "USA"],
                        ["Structural Components", "Aerostructures", "Various structural components", "USA"],
                        ["Structural Components", "Electrical Systems", "Electrical wiring and power distribution", "USA"]
                    ],
                    rowWeights: [
                        [0.18, 0.15, 0.35, 0.32],
                        [0.18, 0.15, 0.35, 0.32],
                        [0.20, 0.15, 0.30, 0.35],
                        [0.25, 0.20, 0.30, 0.25],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.25, 0.20, 0.30, 0.25],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.20, 0.15, 0.30, 0.35],
                        [0.18, 0.15, 0.35, 0.32],
                        [0.18, 0.15, 0.35, 0.32]
                    ]
                },
                stingray: {
                    name: "MQ-25 Stingray",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Aerial Refueling", "Air", "Carrier Operations", "Autonomous Systems", "MQ-25A"],
                        ["Aerial Refueling", "Maritime", "Fleet Support", "AI-Enhanced", "MQ-25A"],
                        ["ISR Collection", "Air", "Reconnaissance", "Autonomous Systems", "MQ-25A"],
                        ["ISR Collection", "Maritime", "Surveillance", "AI-Enhanced", "MQ-25A"],
                        ["Force Multiplier", "Air", "Extended Operations", "Autonomous Systems", "MQ-25A"],
                        ["Force Multiplier", "Maritime", "Maritime Support", "AI-Enhanced", "MQ-25A"],
                        ["Carrier Integration", "Air", "Deck Operations", "Autonomous Systems", "MQ-25A"],
                        ["Carrier Integration", "Maritime", "Fleet Mobility", "AI-Enhanced", "MQ-25A"],
                        ["Mission Support", "Air", "Combat Support", "Autonomous Systems", "MQ-25A"],
                        ["Mission Support", "Maritime", "Naval Operations", "AI-Enhanced", "MQ-25A"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34]
                    ]
                },
                poseidon: {
                    name: "P-8A Poseidon",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Maritime Patrol", "Air", "Anti-Submarine Warfare", "AI-Enhanced", "P-8A"],
                        ["Maritime Patrol", "Maritime", "Surface Warfare", "Neural Networks", "P-8A"],
                        ["ISR Operations", "Air", "Reconnaissance", "AI-Enhanced", "P-8A"],
                        ["ISR Operations", "Maritime", "Surveillance", "Neural Networks", "P-8A"],
                        ["Search and Rescue", "Air", "Combat SAR", "AI-Enhanced", "P-8A"],
                        ["Search and Rescue", "Maritime", "Maritime SAR", "Neural Networks", "P-8A"],
                        ["Command and Control", "Air", "Battle Management", "AI-Enhanced", "P-8A"],
                        ["Command and Control", "Maritime", "Fleet Coordination", "Neural Networks", "P-8A"],
                        ["Multi-Mission", "Air", "Intelligence Collection", "AI-Enhanced", "P-8A"],
                        ["Multi-Mission", "Maritime", "Maritime Security", "Neural Networks", "P-8A"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34]
                    ]
                }
            }
        },
        lockheedMartin: {
            name: "Lockheed Martin",
            technologies: {
                f35Domain: {
                    name: "F-35 Lightning II Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Accelerate", "F414-GE-400 Turbofan Engine", "Positioning and Navigation", "F-35A"],
                        ["Air Domain", "Intelligence", "LITENING Advanced Targeting Pod", "Sensors and Detection", "F-35B"],
                        ["Air Domain", "Offense", "Centerline Pylon Assembly", "Weapon Systems", "F-35C"],
                        ["Air Domain", "Defense", "Advanced Electronic Warfare System", "Electronic Warfare (EW)", "F-35A"],
                        ["Land Domain", "Precision", "AN/APG-81 AESA Radar", "Sensors and Detection", "F-35B"],
                        ["Land Domain", "Communication", "Integrated Power Distribution", "Communications Systems", "F-35C"],
                        ["Electromagnetic Spectrum Domain", "Information Operations", "Advanced Electronic Warfare System", "Electronic Warfare (EW)", "F-35A"],
                        ["Electromagnetic Spectrum Domain", "Analysis", "LITENING Advanced Targeting Pod", "Sensors and Detection", "F-35B"],
                        ["Electromagnetic Spectrum Domain", "Defense", "Advanced Electronic Warfare System", "Weapon Systems", "F-35C"],
                        ["Maritime Domain", "Intelligence", "AN/APG-81 AESA Radar", "Sensors and Detection", "F-35A"],
                        ["Maritime Domain", "Offense", "Centerline Pylon Assembly", "Weapon Systems", "F-35B"],
                        ["Maritime Domain", "Communication", "Integrated Power Distribution", "Communications Systems", "F-35C"]
                    ],
                    rowWeights: [
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.28, 0.20, 0.16, 0.11],
                        [0.25, 0.30, 0.18, 0.15, 0.12],
                        [0.25, 0.20, 0.22, 0.18, 0.15],
                        [0.25, 0.30, 0.18, 0.15, 0.12],
                        [0.25, 0.22, 0.25, 0.18, 0.10],
                        [0.25, 0.28, 0.20, 0.15, 0.12],
                        [0.25, 0.18, 0.28, 0.17, 0.12],
                        [0.25, 0.22, 0.20, 0.20, 0.13],
                        [0.25, 0.28, 0.20, 0.15, 0.12],
                        [0.25, 0.30, 0.18, 0.15, 0.12],
                        [0.25, 0.22, 0.25, 0.18, 0.10]
                    ]
                },
                f35Effect: {
                    name: "F-35 Lightning II Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Air Dominance", "Neutralize", "Air Domain", "Offense"],
                        ["Air Dominance", "Neutralize", "Electromagnetic Spectrum Domain", "Information Operations"],
                        ["Strike Operations", "Destroy", "Land Domain", "Precision"],
                        ["Strike Operations", "Destroy", "Maritime Domain", "Offense"],
                        ["ISR Collection", "Understand", "Air Domain", "Intelligence"],
                        ["Electronic Warfare", "Disrupt", "Electromagnetic Spectrum Domain", "Analysis"],
                        ["Electronic Warfare", "Suppress", "Land Domain", "Defense"],
                        ["Network Operations", "Control", "Information Domain", "Communication"],
                        ["Network Operations", "Control", "Cyberspace Domain", "Coordination"]
                    ],
                    rowWeights: [
                        [0.18, 0.15, 0.35, 0.32],
                        [0.18, 0.15, 0.35, 0.32],
                        [0.20, 0.15, 0.30, 0.35],
                        [0.20, 0.20, 0.30, 0.25],
                        [0.22, 0.18, 0.32, 0.20],
                        [0.22, 0.18, 0.32, 0.20],
                        [0.25, 0.20, 0.30, 0.25],
                        [0.22, 0.18, 0.20, 0.22],
                        [0.22, 0.18, 0.15, 0.22]
                    ]
                },

                f35System: {
                    name: "F-35 Lightning II System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["F-35", "F414-GE-400 Turbofan Engine", "High-Pressure Compressor (HPC)", "USA"],
                        ["F-35", "F414-GE-400 Turbofan Engine", "High-Pressure Turbine (HPT)", "USA"],
                        ["F-35", "Advanced Electronic Warfare System", "AN/APG-81 Active Electronically Scanned Array Radar (AESA)", "USA"],
                        ["F-35", "Advanced Electronic Warfare System", "AN/AAQ-37 Distributed Aperture System (DAS)", "USA"],
                        ["F-35", "LITENING Advanced Targeting Pod", "Electro-Optical and Infrared Sensors", "USA"],
                        ["F-35", "LITENING Advanced Targeting Pod", "Electro-Optical and Infrared Sensors", "Israel"],
                        ["F-35", "LITENING Advanced Targeting Pod", "Laser Designator and Rangefinder", "USA"],
                        ["F-35", "LITENING Advanced Targeting Pod", "Laser Designator and Rangefinder", "Israel"],
                        ["F-35", "Fuselage", "Forward Fuselage", "USA"],
                        ["F-35", "Fuselage", "Center Fuselage", "USA"],
                        ["F-35", "Fuselage", "Aft Fuselage with vertical tails", "USA"],
                        ["F-35", "Integrated Power Distribution", "Power Management System", "USA"],
                        ["F-35", "AN/APG-81 AESA Radar", "Radar Processing Unit", "USA"],
                        ["F-35", "Centerline Pylon Assembly", "Weapons Interface Unit", "USA"]
                    ],
                    rowWeights: [
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.20, 0.25, 0.35, 0.20]
                    ]
                },
                sr72: {
                    name: "SR-72 Darkstar",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Strategic Reconnaissance", "Air", "High-Altitude Intel", "AI-Enhanced", "SR-72"],
                        ["Strategic Reconnaissance", "Space", "Orbital Support", "Neural Networks", "SR-72"],
                        ["Global Strike", "Air", "Hypersonic Strike", "AI-Enhanced", "SR-72"],
                        ["Global Strike", "Space", "Strategic Operations", "Neural Networks", "SR-72"],
                        ["ISR Collection", "Air", "Advanced Sensing", "AI-Enhanced", "SR-72"],
                        ["ISR Collection", "Space", "Space Reconnaissance", "Neural Networks", "SR-72"],
                        ["Rapid Response", "Air", "Global Reach", "AI-Enhanced", "SR-72"],
                        ["Rapid Response", "Space", "Orbital Operations", "Neural Networks", "SR-72"],
                        ["Tech Demonstration", "Air", "Hypersonic Research", "AI-Enhanced", "SR-72"],
                        ["Tech Demonstration", "Space", "Advanced Propulsion", "Neural Networks", "SR-72"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34]
                    ]
                },
                orion: {
                    name: "Orion Spacecraft",
                    columns: [
                        'Mission Type',
                        'Domain',
                        'Operation Type',
                        'System Type',
                        'Platform'
                    ],
                    data: [
                        ["Space Exploration", "Space", "Deep Space Transit", "AI-Enhanced", "Orion"],
                        ["Space Exploration", "Lunar", "Lunar Operations", "Neural Networks", "Orion"],
                        ["Crew Transport", "Space", "Life Support", "AI-Enhanced", "Orion"],
                        ["Crew Transport", "Lunar", "Surface Operations", "Neural Networks", "Orion"],
                        ["Scientific Research", "Space", "Zero-G Studies", "AI-Enhanced", "Orion"],
                        ["Scientific Research", "Lunar", "Lunar Science", "Neural Networks", "Orion"],
                        ["Space Operations", "Space", "Orbital Maneuvers", "AI-Enhanced", "Orion"],
                        ["Space Operations", "Lunar", "Landing Support", "Neural Networks", "Orion"],
                        ["Emergency Response", "Space", "Space Rescue", "AI-Enhanced", "Orion"],
                        ["Emergency Response", "Lunar", "Surface Rescue", "Neural Networks", "Orion"]
                    ],
                    rowWeights: [
                        [0.25, 0.20, 0.50, 0.50, 0.34],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.25, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.34],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.20, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.33],
                        [0.15, 0.20, 0.50, 0.50, 0.34]
                    ]
                }
            }
        },
        palantir: {
            name: "Palantir",
            technologies: {
                gotham: {
                    name: "Gotham Platform",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["Gotham", "Data Analytics", "Pattern Recognition", "Neural Network Engine", "USA"],
                        ["Gotham", "AI Processing", "Threat Analysis", "Machine Learning Core", "UK"],
                        ["Gotham", "Integration", "Data Fusion", "Multi-source Analyzer", "Canada"],
                        ["Gotham", "Visualization", "3D Mapping", "Real-time Renderer", "Germany"],
                        ["Gotham", "Security", "Encryption", "Quantum-resistant Protocols", "USA"]
                    ],
                    rowWeights: [
                        [0.40, 0.45, 0.50, 0.50, 0.40],
                        [0.40, 0.45, 0.50, 0.50, 0.40],
                        [0.35, 0.40, 0.45, 0.45, 0.35],
                        [0.35, 0.40, 0.45, 0.45, 0.35],
                        [0.40, 0.45, 0.50, 0.50, 0.40]
                    ]
                },
                foundry: {
                    name: "Foundry Platform",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["Foundry", "AI Operations", "Process Automation", "Workflow Engine", "USA"],
                        ["Foundry", "Data Science", "Predictive Analytics", "Statistical Core", "UK"],
                        ["Foundry", "Integration", "API Management", "Service Mesh", "Germany"],
                        ["Foundry", "Security", "Access Control", "Zero Trust Framework", "Canada"],
                        ["Foundry", "Analytics", "Real-time Processing", "Stream Processing Engine", "USA"]
                    ],
                    rowWeights: [
                        [0.40, 0.45, 0.50, 0.50, 0.40],
                        [0.40, 0.45, 0.50, 0.50, 0.40],
                        [0.35, 0.40, 0.45, 0.45, 0.35],
                        [0.40, 0.45, 0.50, 0.50, 0.40],
                        [0.35, 0.40, 0.45, 0.45, 0.35]
                    ]
                }
            }
        },
        northropGrumman: {
            name: "Northrop Grumman",
            technologies: {
                globalHawk: {
                    name: "Global Hawk",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["Global Hawk", "ISR", "Imaging System", "Enhanced Integrated Sensor Suite", "USA"],
                        ["Global Hawk", "Communications", "Data Links", "Beyond Line of Sight System", "UK"],
                        ["Global Hawk", "Navigation", "Flight Control", "Advanced Flight Computer", "Germany"],
                        ["Global Hawk", "Propulsion", "Engine Control", "Turbofan Management System", "Canada"],
                        ["Global Hawk", "Mission Systems", "Payload Management", "Multi-Intelligence Platform", "USA"]
                    ],
                    rowWeights: [
                        [0.40, 0.45, 0.50, 0.50, 0.40],
                        [0.35, 0.40, 0.45, 0.45, 0.35],
                        [0.35, 0.40, 0.45, 0.45, 0.35],
                        [0.35, 0.40, 0.45, 0.45, 0.35],
                        [0.40, 0.45, 0.50, 0.50, 0.40]
                    ]
                }
            }
        }
    }
}