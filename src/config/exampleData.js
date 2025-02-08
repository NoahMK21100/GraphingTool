export const EXAMPLE_DATA = {
    companies: {
        anduril: {
            name: "Anduril",
            technologies: {
                barracuda: {
                    name: "Barracuda",
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
                    weights: {
                        "Precision Strike": 0.25,
                        "Strategic Deterrence": 0.20,
                        "Target Elimination": 0.20,
                        "High Precision Impact": 0.15,
                        "Multi-Target Engagement": 0.20,
                        "Air": 0.20,
                        "Land": 0.20,
                        "Maritime": 0.20,
                        "Stand-off Strike": 0.50,
                        "Air Defense Suppression": 0.50,
                        "Anti-Ship Strike": 0.50,
                        "Strategic Strike": 0.50,
                        "Area Denial": 0.50,
                        "Artificial Intelligence": 0.50,
                        "Autonomous Systems": 0.50,
                        "Barracuda M": {
                            "Barracuda-500": 0.34,
                            "Barracuda-250": 0.33,
                            "Barracuda-10": 0.33
                        }
                    }
                },
                lattice: {
                    name: "Lattice",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["Lattice", "C2", "Network Layer", "Secure Data Link", "USA"],
                        ["Lattice", "ISR Processing", "Computer Vision", "AI Target Recognition Module", "Canada"],
                        ["Lattice", "Tactical Edge AI", "Decision Support", "Neural Processing Unit", "UK"],
                        ["Lattice", "ISR Processing", "Data Fusion Engine", "Multi-Source Sensor Integration", "USA"],
                        ["Lattice", "AI & Autonomy", "Predictive Targeting", "Deep Learning Model", "Germany"],
                        ["Lattice", "Communications", "Low-Latency Mesh Networking", "Edge Compute Module", "USA"],
                        ["Lattice", "Cybersecurity", "AI-Based Intrusion Detection", "Neural Security Model", "Israel"],
                        ["Lattice", "Electronic Warfare", "RF Spectrum Analysis", "Digital Signal Processor", "USA"]
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
                }
            }
        },
        boeing: {
            name: "Boeing",
            technologies: {
                superHornet: {
                    name: "F/A-18 Super Hornet",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["F/A-18", "Avionics", "Radar System", "AN/APG-79 AESA Radar", "USA"],
                        ["F/A-18", "Avionics", "Targeting System", "AN/ASQ-228 ATFLIR", "USA"],
                        ["F/A-18", "Weapons System", "Missile Guidance", "AIM-9X Block II Sidewinder", "Germany"],
                        ["F/A-18", "Weapons System", "Bomb Guidance", "JDAM GPS/INS Kit", "UK"],
                        ["F/A-18", "Propulsion", "Jet Engine", "General Electric F414-GE-400", "USA"],
                        ["F/A-18", "Electronic Warfare", "Countermeasures", "AN/ALQ-214 IDECM", "USA"],
                        ["F/A-18", "ISR", "Electro-Optical Sensors", "DTP-N", "Canada"],
                        ["F/A-18", "Survivability", "Composite Materials", "Low-RCS Airframe Coatings", "USA"]
                    ]
                },
                stingray: {
                    name: "MQ-25 Stingray",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["MQ-25", "AI & Autonomy", "Autonomous Flight Control", "AI Flight Management System", "USA"],
                        ["MQ-25", "Avionics", "Navigation System", "GPS/INS Integration", "UK"],
                        ["MQ-25", "ISR", "Situational Awareness", "Multi-Spectral Sensor Suite", "Canada"],
                        ["MQ-25", "Aerial Refueling", "Fuel Transfer System", "Advanced Drogue System", "USA"],
                        ["MQ-25", "Communications", "Data Link System", "Secure Network Protocol", "Germany"]
                    ]
                },
                poseidon: {
                    name: "P-8A Poseidon",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["P-8A", "Maritime Patrol", "ASW Systems", "Acoustic Processor", "USA"],
                        ["P-8A", "ISR", "Radar Systems", "AN/APY-10 Maritime Radar", "USA"],
                        ["P-8A", "Weapons", "Torpedo Systems", "Mk 54 Integration", "UK"],
                        ["P-8A", "Communications", "Data Links", "Multi-band Secure Comms", "Canada"],
                        ["P-8A", "Navigation", "INS/GPS", "Enhanced Navigation System", "Germany"]
                    ]
                }
            }
        },
        lockheedMartin: {
            name: "Lockheed Martin",
            technologies: {
                f35: {
                    name: "F-35 Lightning II",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["F-35", "Avionics", "Sensor Fusion AI", "Neural Network Processor", "UK"],
                        ["F-35", "Electronic Warfare", "Radar Warning Receiver", "Advanced EW Suite", "Germany"],
                        ["F-35", "Stealth Technology", "Low-Observability Coating", "Radar Absorbent Material", "USA"],
                        ["F-35", "Weapons System", "Internal Missile Bay", "AIM-120D AMRAAM", "USA"],
                        ["F-35", "Propulsion", "Engine", "Pratt & Whitney F135", "USA"],
                        ["F-35", "AI & Autonomy", "Predictive Maintenance", "AI Diagnostic System", "USA"],
                        ["F-35", "Survivability", "IR Signature Reduction", "Advanced Cooling System", "Canada"]
                    ]
                },
                sr72: {
                    name: "SR-72 Darkstar",
                    columns: [
                        'Technology',
                        'Tech Type',
                        'Subsystem',
                        'Component',
                        'Country of Manufacture'
                    ],
                    data: [
                        ["SR-72", "Propulsion", "Hypersonic Engine", "Combined Cycle Propulsion", "USA"],
                        ["SR-72", "Thermal Management", "Heat Dissipation", "Advanced Cooling System", "Germany"],
                        ["SR-72", "Avionics", "Navigation System", "Inertial Guidance Unit", "UK"],
                        ["SR-72", "ISR", "Sensor Suite", "Multi-Spectral Imaging System", "Canada"],
                        ["SR-72", "Materials", "Heat-Resistant Structure", "Advanced Composites", "USA"]
                    ]
                },
                orion: {
                    name: "Orion Spacecraft",
                    data: [
                        ["Orion", "Navigation", "Star Tracking", "Optical Sensor Array", "Japan"],
                        ["Orion", "Life Support", "Water Recovery", "Filtration System", "France"],
                        ["Orion", "Avionics", "Flight Computer", "Radiation-Hardened Processor", "USA"],
                        ["Orion", "Propulsion", "Deep Space", "Ion Thruster Array", "UK"],
                        ["Orion", "Communications", "Space Relay", "High-Gain Antenna", "Canada"]
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
                    ]
                }
            }
        }
    }
};
