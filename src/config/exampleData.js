export const EXAMPLE_DATA = {
    companies: {
        anduril: {
            name: "Anduril",
            technologies: {
                barracudaDomain: {
                    name: "Barracuda Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Precision", "Smart Target Acquisition", "Artificial Intelligence", "Barracuda-500"],
                        ["Air Domain", "Offense", "Loitering Attack System", "Autonomous And Robotic Systems", "Barracuda-250"],
                        ["Land Domain", "Offense", "Precision Strike Module", "Weapon Systems", "Barracuda-10"],
                        ["Land Domain", "Defense", "Mine Deployment System", "Sensors And Detection", "Barracuda-500"],
                        ["Maritime Domain", "Offense", "Anti-Ship Targeting", "Weapon Systems", "Barracuda-250"],
                        ["Maritime Domain", "Coordination", "Swarm Control Interface", "Communications Systems", "Barracuda-10"],
                        ["Electromagnetic Spectrum Domain", "Electronic Warfare", "RF Jamming Module", "Electronic Warfare (EW)", "Barracuda-500"],
                        ["Information Domain", "Electronic Warfare", "Cyber Attack Package", "Cyber And Information Systems", "Barracuda-250"]
                    ],
                    rowWeights: [
                        [0.15, 0.25, 0.22, 0.18, 0.20],
                        [0.25, 0.20, 0.15, 0.25, 0.15],
                        [0.20, 0.30, 0.10, 0.25, 0.15],
                        [0.18, 0.15, 0.30, 0.17, 0.20],
                        [0.22, 0.20, 0.18, 0.20, 0.20],
                        [0.25, 0.15, 0.25, 0.15, 0.20],
                        [0.18, 0.22, 0.20, 0.25, 0.15],
                        [0.20, 0.18, 0.28, 0.17, 0.17]
                    ]
                },
                barracudaEffect: {
                    name: "Barracuda Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Munition Penetration", "Breach", "Air Domain", "Precision"],
                        ["Anti-Armor Effectiveness", "Breach", "Land Domain", "Offense"],
                        ["Loitering Munition", "Ambush", "Air Domain", "Precision"],
                        ["Hypersonic Effects", "Ambush", "Air Domain", "Offense"],
                        ["Smart Munition Guidance", "Ambush", "Maritime Domain", "Offense"],
                        ["Directed Energy", "Destroy", "Air Domain", "Precision"],
                        ["Artillery Accuracy", "Destroy", "Land Domain", "Precision"],
                        ["Swarm Behavior", "Demonstrate", "Air Domain", "Coordination"],
                        ["Jamming Success", "Deny", "Electromagnetic Spectrum Domain", "Defense"],
                        ["Smart Mine Deployment", "Deny", "Land Domain", "Defense"],
                        ["EMP Effects", "Deny", "Information Domain", "Electronic Warfare"],
                        ["Jamming Impact", "Disrupt", "Electromagnetic Spectrum Domain", "Electronic Warfare"],
                        ["Electromagnetic Disruption", "Disrupt", "Information Domain", "Electronic Warfare"],
                        ["Cyber-Physical Attack", "Disrupt", "Information Domain", "Offense"]
                    ],
                    rowWeights: [
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28],
                        [0.22, 0.18, 0.32, 0.28]
                    ]
                },
                barracudaSystem: {
                    name: "Barracuda System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Barracuda", "Loitering Attack System", "Autonomous Flight Control Unit", "USA"],
                        ["Barracuda", "Loitering Attack System", "Multi-Mode Propulsion System", "USA"],
                        ["Barracuda", "Smart Target Acquisition", "AI-Powered Target Recognition", "USA"],
                        ["Barracuda", "Smart Target Acquisition", "Multi-Spectral Imaging System", "USA"],
                        ["Barracuda", "Precision Strike Module", "Hypersonic Warhead", "USA"],
                        ["Barracuda", "Precision Strike Module", "Terminal Guidance System", "USA"],
                        ["Barracuda", "Anti-Ship Targeting", "Maritime Target Identification Radar", "USA"],
                        ["Barracuda", "Anti-Ship Targeting", "Sea-Skimming Navigation Module", "USA"],
                        ["Barracuda", "RF Jamming Module", "Directional Electronic Attack System", "USA"],
                        ["Barracuda", "RF Jamming Module", "Spectrum Analysis Processor", "Israel"],
                        ["Barracuda", "Swarm Control Interface", "Mesh Network Communications", "USA"],
                        ["Barracuda", "Swarm Control Interface", "Distributed Decision Engine", "USA"],
                        ["Barracuda", "Mine Deployment System", "Smart Mine Dispenser", "USA"],
                        ["Barracuda", "Cyber Attack Package", "Battlefield Network Penetration Module", "USA"]
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
                latticeDomain: {
                    name: "Lattice Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Monitoring/Tracking", "Drone Detection System", "Artificial Intelligence", "Lattice"],
                        ["Air Domain", "Sensing/Detection", "Aerial Surveillance Module", "Sensors And Detection", "Lattice"],
                        ["Land Domain", "Intelligence", "Real-Time Threat Assessment", "Data And Infrastructure", "Lattice"],
                        ["Land Domain", "Coordination", "Multi-Sensor Fusion Engine", "Data And Infrastructure", "Lattice"],
                        ["Maritime Domain", "Security", "Perimeter Defense System", "Sensors And Detection", "Lattice"],
                        ["Maritime Domain", "Sensing/Detection", "Maritime Surveillance Network", "Sensors And Detection", "Lattice"],
                        ["Information Domain", "Analysis", "Pattern Recognition Engine", "Artificial Intelligence", "Lattice"],
                        ["Information Domain", "Decision Support", "Command Interface", "Cyber And Information Systems", "Lattice"],
                        ["Electromagnetic Spectrum Domain", "Communication", "Secure Mesh Network", "Communications Systems", "Lattice"],
                        ["Electromagnetic Spectrum Domain", "Defense", "Signal Interference Detection", "Electronic Warfare (EW)", "Lattice"]
                    ],
                    rowWeights: [
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15],
                        [0.25, 0.22, 0.18, 0.20, 0.15]
                    ]
                },
                latticeEffect: {
                    name: "Lattice Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Threat Identification", "Expose", "Land Domain", "Intelligence"],
                        ["Detection Sensitivity", "Expose", "Air Domain", "Sensing/Detection"],
                        ["Sensor Sensitivity", "Understand", "Air Domain", "Monitoring/Tracking"],
                        ["Data Fusion", "Understand", "Information Domain", "Analysis"],
                        ["Situational Awareness", "Understand", "Land Domain", "Coordination"],
                        ["Observation", "Guard", "Maritime Domain", "Monitoring/Tracking"],
                        ["Defense Integration", "Secure", "Air Domain", "Security"],
                        ["Trust Development", "Inform", "Information Domain", "Decision Support"],
                        ["Information Capacity", "Inform", "Electromagnetic Spectrum Domain", "Communication"],
                        ["System Resilience", "Protect", "Electromagnetic Spectrum Domain", "Defense"]
                    ],
                    rowWeights: [
                        [0.22, 0.18, 0.35, 0.25],
                        [0.25, 0.20, 0.25, 0.30],
                        [0.25, 0.15, 0.35, 0.25],
                        [0.22, 0.23, 0.20, 0.35],
                        [0.20, 0.25, 0.30, 0.25],
                        [0.20, 0.30, 0.20, 0.30],
                        [0.22, 0.32, 0.18, 0.28],
                        [0.30, 0.15, 0.30, 0.25],
                        [0.20, 0.22, 0.38, 0.20],
                        [0.22, 0.28, 0.25, 0.25]
                    ]
                },
                latticeSystem: {
                    name: "Lattice System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Lattice", "Sensor Fusion Platform", "Multi-Sensor Integration Module", "USA"],
                        ["Lattice", "Sensor Fusion Platform", "Advanced Signal Processing Unit", "USA"],
                        ["Lattice", "Edge Computing Network", "Distributed Computing Nodes", "USA"],
                        ["Lattice", "Edge Computing Network", "Low-Latency Communication Links", "USA"],
                        ["Lattice", "AI Analysis Engine", "Computer Vision Algorithms", "USA"],
                        ["Lattice", "AI Analysis Engine", "Threat Detection Neural Networks", "USA"],
                        ["Lattice", "AI Analysis Engine", "Behavioral Pattern Recognition", "USA"],
                        ["Lattice", "Command & Control Interface", "Real-Time Visualization Dashboard", "USA"],
                        ["Lattice", "Command & Control Interface", "Decision Support Tools", "USA"],
                        ["Lattice", "Communications Backbone", "Encrypted Mesh Network", "USA"],
                        ["Lattice", "Communications Backbone", "Satellite Data Link", "USA"],
                        ["Lattice", "Security Layer", "Intrusion Detection System", "USA"],
                        ["Lattice", "Security Layer", "Anti-Jamming Protection", "Israel"],
                        ["Lattice", "Autonomous Response System", "Automated Alert Generation", "USA"]
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
                ghost4Domain: {
                    name: "Ghost 4 Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Reconnaissance", "Sensor Suite", "Sensors And Detection", "Ghost 4"],
                        ["Air Domain", "Monitoring/Tracking", "Navigation System", "Positioning And Navigation", "Ghost 4"],
                        ["Air Domain", "Communication", "Data Link", "Communications Systems", "Ghost 4"],
                        ["Electromagnetic Spectrum Domain", "Sensing/Detection", "Electronic Warfare Suite", "Electronic Warfare (EW)", "Ghost 4"],
                        ["Information Domain", "Computation", "AI Processing", "Artificial Intelligence", "Ghost 4"],
                        ["Air Domain", "Transportation/Mobilization", "Propulsion", "Aerospace And Propulsion", "Ghost 4"],
                        ["Air Domain", "Performance", "Airframe", "Advanced Materials And Clothing", "Ghost 4"],
                        ["Air Domain", "Sensing/Detection", "Payload", "Sensors And Detection", "Ghost 4"],
                        ["Land Domain", "Monitoring/Tracking", "Ground Control Station", "Communications Systems", "Ghost 4"],
                        ["Information Domain", "Analysis", "Autonomy Software", "Artificial Intelligence", "Ghost 4"]
                    ],
                    rowWeights: [
                        [0.35, 0.25, 0.15, 0.15, 0.10],
                        [0.30, 0.30, 0.20, 0.12, 0.08],
                        [0.28, 0.22, 0.20, 0.18, 0.12],
                        [0.20, 0.25, 0.15, 0.30, 0.10],
                        [0.18, 0.20, 0.22, 0.25, 0.15],
                        [0.30, 0.18, 0.25, 0.17, 0.10],
                        [0.25, 0.15, 0.30, 0.18, 0.12],
                        [0.27, 0.30, 0.18, 0.15, 0.10],
                        [0.18, 0.25, 0.22, 0.20, 0.15],
                        [0.22, 0.28, 0.15, 0.25, 0.10]
                    ]
                },

                ghost4Effect: {
                    name: "Ghost 4 Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Stealth Avoidance", "Bypass", "Air Domain", "Reconnaissance"],
                        ["Navigation Precision", "Bypass", "Air Domain", "Positioning"],
                        ["Detection Sensitivity", "Expose", "Air Domain", "Sensing/Detection"],
                        ["Sensor Sensitivity", "Understand", "Electromagnetic Spectrum Domain", "Intelligence"],
                        ["Decoy Success", "Mislead", "Air Domain", "Defense"],
                        ["Electronic Warfare", "Deceive", "Electromagnetic Spectrum Domain", "Defense"],
                        ["Threat Identification", "Understand", "Information Domain", "Intelligence"],
                        ["Sensor Reliability", "Monitor", "Air Domain", "Reconnaissance"],
                        ["Monitoring Effectiveness", "Monitor", "Land Domain", "Reconnaissance"],
                        ["Swarm Coordination", "Demonstrate", "Air Domain", "Coordination"]
                    ],
                    rowWeights: [
                        [0.30, 0.15, 0.40, 0.15],
                        [0.35, 0.15, 0.30, 0.20],
                        [0.32, 0.18, 0.35, 0.15],
                        [0.28, 0.17, 0.25, 0.30],
                        [0.15, 0.25, 0.35, 0.25],
                        [0.18, 0.22, 0.30, 0.30],
                        [0.40, 0.20, 0.15, 0.25],
                        [0.35, 0.10, 0.35, 0.20],
                        [0.25, 0.15, 0.30, 0.30],
                        [0.32, 0.23, 0.30, 0.15]
                    ]
                },

                ghost4System: {
                    name: "Ghost 4 System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Ghost 4", "Propulsion", "Electric Motors", "USA"],
                        ["Ghost 4", "Propulsion", "Battery System", "USA"],
                        ["Ghost 4", "Propulsion", "Rotor Assembly", "USA"],
                        ["Ghost 4", "Airframe", "Carbon Fiber Shell", "USA"],
                        ["Ghost 4", "Airframe", "Structural Components", "USA"],
                        ["Ghost 4", "Sensor Suite", "Thermal Camera", "USA"],
                        ["Ghost 4", "Sensor Suite", "Electro-Optical Camera", "USA"],
                        ["Ghost 4", "Sensor Suite", "LIDAR System", "USA"],
                        ["Ghost 4", "Navigation", "GPS Receiver", "USA"],
                        ["Ghost 4", "Navigation", "Inertial Navigation Unit", "USA"],
                        ["Ghost 4", "Communications", "Encrypted Data Link", "USA"],
                        ["Ghost 4", "Communications", "Mesh Network Radio", "USA"],
                        ["Ghost 4", "Autonomy", "Edge Computing Processor", "USA"],
                        ["Ghost 4", "Autonomy", "Computer Vision Algorithms", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.40, 0.20],
                        [0.15, 0.35, 0.35, 0.15],
                        [0.15, 0.30, 0.40, 0.15],
                        [0.15, 0.20, 0.50, 0.15],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.45, 0.20],
                        [0.15, 0.30, 0.35, 0.20],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.40, 0.20],
                        [0.15, 0.25, 0.35, 0.25],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.50, 0.15]
                    ]
                },
                anvilDomain: {
                    name: "Anvil Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Defense", "Drone Intercept System", "Autonomous And Robotic Systems", "Anvil"],
                        ["Air Domain", "Offense", "Kinetic Neutralization Module", "Weapon Systems", "Anvil"],
                        ["Air Domain", "Precision", "Targeting System", "Sensors And Detection", "Anvil"],
                        ["Electromagnetic Spectrum Domain", "Sensing/Detection", "Radar Detection Array", "Sensors And Detection", "Anvil"],
                        ["Electromagnetic Spectrum Domain", "Electronic Warfare", "RF Tracking System", "Electronic Warfare (EW)", "Anvil"],
                        ["Information Domain", "Computation", "Threat Classification AI", "Artificial Intelligence", "Anvil"],
                        ["Information Domain", "Decision Support", "Autonomous Engagement System", "Artificial Intelligence", "Anvil"],
                        ["Air Domain", "Performance", "Propulsion System", "Aerospace And Propulsion", "Anvil"],
                        ["Air Domain", "Navigation", "Intercept Navigation System", "Positioning And Navigation", "Anvil"],
                        ["Information Domain", "Communication", "Command & Control Link", "Communications Systems", "Anvil"]
                    ],
                    rowWeights: [
                        [0.40, 0.30, 0.15, 0.10, 0.05],
                        [0.35, 0.35, 0.15, 0.10, 0.05],
                        [0.30, 0.35, 0.15, 0.15, 0.05],
                        [0.35, 0.20, 0.25, 0.15, 0.05],
                        [0.30, 0.25, 0.20, 0.20, 0.05],
                        [0.15, 0.20, 0.25, 0.35, 0.05],
                        [0.15, 0.30, 0.20, 0.30, 0.05],
                        [0.40, 0.25, 0.20, 0.10, 0.05],
                        [0.35, 0.30, 0.20, 0.10, 0.05],
                        [0.15, 0.25, 0.20, 0.35, 0.05]
                    ]
                },

                anvilEffect: {
                    name: "Anvil Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Counter-Drone Effectiveness", "Defeat", "Air Domain", "Defense"],
                        ["Attack Success", "Defeat", "Air Domain", "Offense"],
                        ["Navigation Precision", "Penetrate", "Air Domain", "Precision"],
                        ["Radar Effectiveness", "Expose", "Electromagnetic Spectrum Domain", "Sensing/Detection"],
                        ["Jamming Success", "Deny", "Electromagnetic Spectrum Domain", "Electronic Warfare"],
                        ["Detection Sensitivity", "Expose", "Air Domain", "Sensing/Detection"],
                        ["Threat Identification", "Understand", "Information Domain", "Intelligence"],
                        ["Decision Manipulation", "Deter", "Information Domain", "Offense"],
                        ["Interception Success", "Defeat", "Air Domain", "Defense"],
                        ["Smart Munition Guidance", "Destroy", "Air Domain", "Precision"]
                    ],
                    rowWeights: [
                        [0.45, 0.25, 0.20, 0.10],
                        [0.40, 0.25, 0.25, 0.10],
                        [0.30, 0.20, 0.25, 0.25],
                        [0.25, 0.15, 0.40, 0.20],
                        [0.20, 0.25, 0.35, 0.20],
                        [0.35, 0.15, 0.30, 0.20],
                        [0.30, 0.20, 0.25, 0.25],
                        [0.15, 0.30, 0.25, 0.30],
                        [0.45, 0.20, 0.25, 0.10],
                        [0.35, 0.20, 0.25, 0.20]
                    ]
                },

                anvilSystem: {
                    name: "Anvil System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Anvil", "Intercept Drone", "Reinforced Airframe", "USA"],
                        ["Anvil", "Intercept Drone", "High-Speed Motors", "USA"],
                        ["Anvil", "Intercept Drone", "Kinetic Impact Assembly", "USA"],
                        ["Anvil", "Detection System", "Multi-Band Radar", "USA"],
                        ["Anvil", "Detection System", "RF Signal Analyzer", "USA"],
                        ["Anvil", "Detection System", "Optical Tracking Camera", "USA"],
                        ["Anvil", "Command & Control", "Secure Communications Link", "USA"],
                        ["Anvil", "Command & Control", "Battle Management System", "USA"],
                        ["Anvil", "Autonomy System", "Threat Classification AI", "USA"],
                        ["Anvil", "Autonomy System", "Intercept Planning Processor", "USA"],
                        ["Anvil", "Navigation", "GPS-Denied Navigation", "USA"],
                        ["Anvil", "Navigation", "Inertial Guidance System", "USA"],
                        ["Anvil", "Power System", "High-Performance Battery", "USA"],
                        ["Anvil", "Launch System", "Rapid Deployment Launcher", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.55, 0.05],
                        [0.15, 0.20, 0.60, 0.05],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.40, 0.15],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.25, 0.50, 0.10]
                    ]
                },
                counterUASDomain: {
                    name: "Counter-UAS Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Defense", "Detection & Tracking System", "Sensors And Detection", "Counter-UAS"],
                        ["Air Domain", "Monitoring/Tracking", "Multi-Sensor Fusion", "Data And Infrastructure", "Counter-UAS"],
                        ["Electromagnetic Spectrum Domain", "Electronic Warfare", "RF Jamming System", "Electronic Warfare (EW)", "Counter-UAS"],
                        ["Electromagnetic Spectrum Domain", "Sensing/Detection", "Spectrum Monitoring Array", "Sensors And Detection", "Counter-UAS"],
                        ["Information Domain", "Analysis", "Threat Classification Engine", "Artificial Intelligence", "Counter-UAS"],
                        ["Information Domain", "Decision Support", "Response Selection System", "Artificial Intelligence", "Counter-UAS"],
                        ["Air Domain", "Offense", "Kinetic Neutralization", "Weapon Systems", "Counter-UAS"],
                        ["Air Domain", "Defense", "Multi-Layered Protection", "Cyber And Information Systems", "Counter-UAS"],
                        ["Electromagnetic Spectrum Domain", "Defense", "GPS/Navigation Denial", "Electronic Warfare (EW)", "Counter-UAS"],
                        ["Information Domain", "Coordination", "Command & Control Network", "Communications Systems", "Counter-UAS"]
                    ],
                    rowWeights: [
                        [0.32, 0.28, 0.18, 0.17, 0.05],
                        [0.30, 0.32, 0.20, 0.13, 0.05],
                        [0.38, 0.30, 0.15, 0.12, 0.05],
                        [0.40, 0.25, 0.18, 0.12, 0.05],
                        [0.18, 0.22, 0.28, 0.27, 0.05],
                        [0.15, 0.30, 0.25, 0.25, 0.05],
                        [0.25, 0.35, 0.22, 0.13, 0.05],
                        [0.30, 0.30, 0.20, 0.15, 0.05],
                        [0.35, 0.25, 0.22, 0.13, 0.05],
                        [0.18, 0.27, 0.30, 0.20, 0.05]
                    ]
                },

                counterUASEffect: {
                    name: "Counter-UAS Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Counter-Drone Effectiveness", "Counter", "Air Domain", "Defense"],
                        ["RF Jamming", "Deny", "Electromagnetic Spectrum Domain", "Electronic Warfare"],
                        ["Electromagnetic Disruption", "Disrupt", "Electromagnetic Spectrum Domain", "Defense"],
                        ["Detection Sensitivity", "Expose", "Air Domain", "Sensing/Detection"],
                        ["Threat Identification", "Understand", "Information Domain", "Intelligence"],
                        ["Decision Manipulation", "Coerce", "Information Domain", "Electronic Warfare"],
                        ["System Integration", "Control", "Information Domain", "Coordination"],
                        ["Cyber Deception", "Deceive", "Information Domain", "Defense"],
                        ["Jamming Success", "Suppress", "Electromagnetic Spectrum Domain", "Electronic Warfare"],
                        ["EMP Effects", "Deny", "Electromagnetic Spectrum Domain", "Offense"]
                    ],
                    rowWeights: [
                        [0.42, 0.23, 0.25, 0.10],
                        [0.38, 0.22, 0.30, 0.10],
                        [0.32, 0.18, 0.35, 0.15],
                        [0.35, 0.20, 0.25, 0.20],
                        [0.28, 0.17, 0.25, 0.30],
                        [0.22, 0.25, 0.23, 0.30],
                        [0.20, 0.30, 0.25, 0.25],
                        [0.25, 0.25, 0.30, 0.20],
                        [0.35, 0.25, 0.28, 0.12],
                        [0.30, 0.22, 0.33, 0.15]
                    ]
                },

                counterUASSystem: {
                    name: "Counter-UAS System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Counter-UAS", "Detection System", "Multi-Band Radar Array", "USA"],
                        ["Counter-UAS", "Detection System", "RF Spectrum Analyzer", "USA"],
                        ["Counter-UAS", "Detection System", "Electro-Optical/Infrared Sensors", "USA"],
                        ["Counter-UAS", "Electronic Countermeasures", "Directional RF Jammer", "USA"],
                        ["Counter-UAS", "Electronic Countermeasures", "GPS Signal Disruptor", "USA"],
                        ["Counter-UAS", "Kinetic Countermeasures", "Anvil Interceptor Drone", "USA"],
                        ["Counter-UAS", "Kinetic Countermeasures", "Directed Energy System", "USA"],
                        ["Counter-UAS", "Command & Control", "Lattice Integration Platform", "USA"],
                        ["Counter-UAS", "Command & Control", "Threat Response Automation", "USA"],
                        ["Counter-UAS", "Intelligence Processing", "AI Classification Engine", "USA"],
                        ["Counter-UAS", "Intelligence Processing", "Behavioral Analysis Module", "USA"],
                        ["Counter-UAS", "Communications", "Secure Network Infrastructure", "USA"],
                        ["Counter-UAS", "Communications", "Battlefield Integration Link", "USA"],
                        ["Counter-UAS", "Physical Infrastructure", "Deployable Command Center", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.25, 0.40, 0.20],
                        [0.15, 0.25, 0.40, 0.20],
                        [0.15, 0.20, 0.50, 0.15]
                    ]
                },
                diveLDDomain: {
                    name: "Dive-LD Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Maritime Domain", "Reconnaissance", "Sensor Package", "Sensors And Detection", "Dive-LD"],
                        ["Maritime Domain", "Monitoring/Tracking", "Autonomous Navigation", "Autonomous And Robotic Systems", "Dive-LD"],
                        ["Maritime Domain", "Intelligence", "Underwater Surveillance", "Sensors And Detection", "Dive-LD"],
                        ["Maritime Domain", "Communication", "Underwater Communications", "Communications Systems", "Dive-LD"],
                        ["Information Domain", "Analysis", "AI Processing System", "Artificial Intelligence", "Dive-LD"],
                        ["Maritime Domain", "Transportation/Mobilization", "Propulsion System", "Maritime Systems", "Dive-LD"],
                        ["Maritime Domain", "Sensing/Detection", "Sonar Array", "Acoustic Systems", "Dive-LD"],
                        ["Information Domain", "Coordination", "Lattice Integration", "Communications Systems", "Dive-LD"],
                        ["Electromagnetic Spectrum Domain", "Communication", "Encrypted Data Link", "Communications Systems", "Dive-LD"],
                        ["Maritime Domain", "Performance", "Deep-Dive Capability", "Advanced Materials And Clothing", "Dive-LD"]
                    ],
                    rowWeights: [
                        [0.45, 0.25, 0.15, 0.10, 0.05],
                        [0.40, 0.30, 0.15, 0.10, 0.05],
                        [0.42, 0.25, 0.18, 0.10, 0.05],
                        [0.38, 0.22, 0.20, 0.15, 0.05],
                        [0.20, 0.25, 0.25, 0.25, 0.05],
                        [0.40, 0.25, 0.20, 0.10, 0.05],
                        [0.42, 0.23, 0.20, 0.10, 0.05],
                        [0.25, 0.20, 0.30, 0.20, 0.05],
                        [0.30, 0.25, 0.25, 0.15, 0.05],
                        [0.45, 0.20, 0.20, 0.10, 0.05]
                    ]
                },

                diveLDEffect: {
                    name: "Dive-LD Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Underwater Communication System", "Communicate", "Maritime Domain", "Communication"],
                        ["Acoustic Sensors", "Expose", "Maritime Domain", "Sensing/Detection"],
                        ["Sensing Capability", "Understand", "Maritime Domain", "Intelligence"],
                        ["Observation", "Monitor", "Maritime Domain", "Reconnaissance"],
                        ["Navigation Precision", "Control", "Maritime Domain", "Positioning"],
                        ["Autonomous Operations", "Control", "Maritime Domain", "Coordination"],
                        ["Stealth Avoidance", "Bypass", "Maritime Domain", "Defense"],
                        ["Data Fusion", "Understand", "Information Domain", "Analysis"],
                        ["System Integration", "Enhance", "Information Domain", "Coordination"],
                        ["Detection Sensitivity", "Expose", "Maritime Domain", "Intelligence"]
                    ],
                    rowWeights: [
                        [0.42, 0.18, 0.30, 0.10],
                        [0.45, 0.15, 0.30, 0.10],
                        [0.38, 0.22, 0.25, 0.15],
                        [0.40, 0.20, 0.30, 0.10],
                        [0.35, 0.22, 0.28, 0.15],
                        [0.32, 0.25, 0.28, 0.15],
                        [0.30, 0.28, 0.25, 0.17],
                        [0.28, 0.22, 0.30, 0.20],
                        [0.25, 0.25, 0.28, 0.22],
                        [0.35, 0.20, 0.30, 0.15]
                    ]
                },

                diveLDSystem: {
                    name: "Dive-LD System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Dive-LD", "Propulsion", "Underwater Electric Motors", "USA"],
                        ["Dive-LD", "Propulsion", "High-Density Battery System", "USA"],
                        ["Dive-LD", "Hull Structure", "Pressure-Resistant Shell", "USA"],
                        ["Dive-LD", "Hull Structure", "Hydrodynamic Design Elements", "USA"],
                        ["Dive-LD", "Sensor Suite", "Multi-Array Sonar System", "USA"],
                        ["Dive-LD", "Sensor Suite", "Acoustic Detection Array", "USA"],
                        ["Dive-LD", "Sensor Suite", "Underwater Cameras", "USA"],
                        ["Dive-LD", "Navigation", "Inertial Navigation Unit", "USA"],
                        ["Dive-LD", "Navigation", "Underwater Positioning System", "USA"],
                        ["Dive-LD", "Communications", "Acoustic Communication Link", "USA"],
                        ["Dive-LD", "Communications", "Surface RF Data Transmitter", "USA"],
                        ["Dive-LD", "Autonomy", "Underwater Mission Computer", "USA"],
                        ["Dive-LD", "Autonomy", "Environmental Mapping System", "USA"],
                        ["Dive-LD", "Power Management", "Energy Distribution System", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.25, 0.50, 0.10]
                    ]
                },

                furyDomain: {
                    name: "Fury Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Offense", "Loitering Munition System", "Weapon Systems", "Fury"],
                        ["Air Domain", "Precision", "Target Acquisition System", "Sensors And Detection", "Fury"],
                        ["Air Domain", "Performance", "Propulsion System", "Aerospace And Propulsion", "Fury"],
                        ["Air Domain", "Navigation", "Autonomous Navigation", "Positioning And Navigation", "Fury"],
                        ["Information Domain", "Decision Support", "AI Targeting Computer", "Artificial Intelligence", "Fury"],
                        ["Air Domain", "Defense", "Stealth Characteristics", "Advanced Materials And Clothing", "Fury"],
                        ["Electromagnetic Spectrum Domain", "Communication", "Encrypted Data Link", "Communications Systems", "Fury"],
                        ["Information Domain", "Coordination", "Lattice Integration", "Communications Systems", "Fury"],
                        ["Air Domain", "Monitoring/Tracking", "ISR Payload", "Sensors And Detection", "Fury"],
                        ["Air Domain", "Transportation/Mobilization", "Modular Launch System", "Aerospace And Propulsion", "Fury"]
                    ],
                    rowWeights: [
                        [0.35, 0.35, 0.15, 0.10, 0.05],
                        [0.30, 0.40, 0.15, 0.10, 0.05],
                        [0.38, 0.30, 0.17, 0.10, 0.05],
                        [0.35, 0.30, 0.20, 0.10, 0.05],
                        [0.20, 0.30, 0.20, 0.25, 0.05],
                        [0.30, 0.25, 0.25, 0.15, 0.05],
                        [0.25, 0.25, 0.25, 0.20, 0.05],
                        [0.20, 0.20, 0.30, 0.25, 0.05],
                        [0.30, 0.35, 0.20, 0.10, 0.05],
                        [0.35, 0.30, 0.20, 0.10, 0.05]
                    ]
                },

                furyEffect: {
                    name: "Fury Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Loitering Munition", "Attrite", "Air Domain", "Offense"],
                        ["Smart Munition Guidance", "Destroy", "Air Domain", "Precision"],
                        ["Blast Distribution", "Destroy", "Air Domain", "Offense"],
                        ["Stealth Avoidance", "Bypass", "Air Domain", "Defense"],
                        ["Navigation Precision", "Control", "Air Domain", "Positioning"],
                        ["Threat Identification", "Understand", "Information Domain", "Intelligence"],
                        ["Detection Sensitivity", "Expose", "Air Domain", "Sensing/Detection"],
                        ["System Integration", "Control", "Information Domain", "Coordination"],
                        ["AI Accuracy", "Understand", "Information Domain", "Decision Support"],
                        ["Anti-Armor Effectiveness", "Destroy", "Land Domain", "Offense"]
                    ],
                    rowWeights: [
                        [0.45, 0.25, 0.20, 0.10],
                        [0.40, 0.25, 0.25, 0.10],
                        [0.35, 0.35, 0.20, 0.10],
                        [0.30, 0.20, 0.35, 0.15],
                        [0.32, 0.25, 0.28, 0.15],
                        [0.25, 0.20, 0.30, 0.25],
                        [0.30, 0.25, 0.30, 0.15],
                        [0.20, 0.30, 0.25, 0.25],
                        [0.25, 0.20, 0.25, 0.30],
                        [0.40, 0.25, 0.25, 0.10]
                    ]
                },

                furySystem: {
                    name: "Fury System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Fury", "Airframe", "Composite Structure", "USA"],
                        ["Fury", "Airframe", "Stealth Design Elements", "USA"],
                        ["Fury", "Propulsion", "High-Efficiency Engine", "USA"],
                        ["Fury", "Propulsion", "Fuel Management System", "USA"],
                        ["Fury", "Warhead", "Multi-Purpose Explosive Payload", "USA"],
                        ["Fury", "Warhead", "Proximity Sensor Array", "USA"],
                        ["Fury", "Navigation", "GPS/INS Hybrid System", "USA"],
                        ["Fury", "Navigation", "Terrain Following System", "USA"],
                        ["Fury", "Sensor Suite", "Electro-Optical/Infrared Camera", "USA"],
                        ["Fury", "Sensor Suite", "Target Acquisition Radar", "USA"],
                        ["Fury", "Communications", "Encrypted Command Link", "USA"],
                        ["Fury", "Communications", "Mesh Network Integration", "USA"],
                        ["Fury", "Control System", "AI Target Discrimination", "USA"],
                        ["Fury", "Launch System", "Mobile Launch Platform", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.55, 0.05],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.30, 0.50, 0.05],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.45, 0.15],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.25, 0.50, 0.10]
                    ]
                },
                roadRunnerDomain: {
                    name: "RoadRunner Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Offense", "Air-to-Air Intercept System", "Weapon Systems", "RoadRunner"],
                        ["Air Domain", "Performance", "Vertical Launch System", "Aerospace And Propulsion", "RoadRunner"],
                        ["Air Domain", "Performance", "High-Speed Propulsion", "Aerospace And Propulsion", "RoadRunner"],
                        ["Air Domain", "Navigation", "High-G Navigation System", "Positioning And Navigation", "RoadRunner"],
                        ["Air Domain", "Defense", "Aerial Denial System", "Electronic Warfare (EW)", "RoadRunner"],
                        ["Information Domain", "Decision Support", "Autonomous Targeting System", "Artificial Intelligence", "RoadRunner"],
                        ["Information Domain", "Coordination", "Lattice Integration", "Communications Systems", "RoadRunner"],
                        ["Electromagnetic Spectrum Domain", "Communication", "Secure Data Link", "Communications Systems", "RoadRunner"],
                        ["Electromagnetic Spectrum Domain", "Sensing/Detection", "Target Tracking Radar", "Sensors And Detection", "RoadRunner"]
                    ],
                    rowWeights: [
                        [0.38, 0.32, 0.15, 0.10, 0.05],
                        [0.40, 0.25, 0.20, 0.10, 0.05],
                        [0.42, 0.28, 0.15, 0.10, 0.05],
                        [0.35, 0.30, 0.20, 0.10, 0.05],
                        [0.32, 0.30, 0.18, 0.15, 0.05],
                        [0.20, 0.28, 0.22, 0.25, 0.05],
                        [0.18, 0.22, 0.30, 0.25, 0.05],
                        [0.28, 0.25, 0.25, 0.17, 0.05],
                        [0.30, 0.25, 0.25, 0.15, 0.05]
                    ]
                },

                roadRunnerEffect: {
                    name: "RoadRunner Effect",
                    columns: [
                        'Detailed Effect',
                        'Master Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Counter-Drone Effectiveness", "Defeat", "Air Domain", "Defense"],
                        ["Attack Success", "Defeat", "Air Domain", "Offense"],
                        ["Smart Munition Guidance", "Destroy", "Air Domain", "Precision"],
                        ["Radar Effectiveness", "Expose", "Electromagnetic Spectrum Domain", "Sensing/Detection"],
                        ["Navigation Precision", "Control", "Air Domain", "Positioning"],
                        ["Interception Success", "Defeat", "Air Domain", "Defense"],
                        ["Swarm Coordination", "Demonstrate", "Air Domain", "Coordination"],
                        ["Hypersonic Effects", "Penetrate", "Air Domain", "Offense"],
                        ["System Integration", "Control", "Information Domain", "Coordination"],
                        ["Threat Identification", "Understand", "Information Domain", "Intelligence"]
                    ],
                    rowWeights: [
                        [0.45, 0.20, 0.25, 0.10],
                        [0.40, 0.25, 0.25, 0.10],
                        [0.35, 0.20, 0.30, 0.15],
                        [0.28, 0.22, 0.35, 0.15],
                        [0.32, 0.18, 0.35, 0.15],
                        [0.45, 0.20, 0.25, 0.10],
                        [0.25, 0.25, 0.30, 0.20],
                        [0.38, 0.22, 0.30, 0.10],
                        [0.20, 0.28, 0.27, 0.25],
                        [0.28, 0.22, 0.25, 0.25]
                    ]
                },

                roadRunnerSystem: {
                    name: "RoadRunner System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["RoadRunner", "Airframe", "Aerodynamic Body", "USA"],
                        ["RoadRunner", "Airframe", "Composite Structure", "USA"],
                        ["RoadRunner", "Propulsion", "Multi-Stage Rocket Motor", "USA"],
                        ["RoadRunner", "Propulsion", "Supersonic Air-Breathing Engine", "USA"],
                        ["RoadRunner", "Guidance", "Integrated GPS/INS", "USA"],
                        ["RoadRunner", "Guidance", "Terminal Guidance Seeker", "USA"],
                        ["RoadRunner", "Sensor Suite", "Active Radar Seeker", "USA"],
                        ["RoadRunner", "Sensor Suite", "Infrared Imaging System", "USA"],
                        ["RoadRunner", "Communications", "Encrypted Data Link", "USA"],
                        ["RoadRunner", "Communications", "Lattice Network Interface", "USA"],
                        ["RoadRunner", "Launch System", "Vertical Launch Module", "USA"],
                        ["RoadRunner", "Launch System", "Mobile Deployment Platform", "USA"],
                        ["RoadRunner", "Payload", "Multi-Purpose Warhead", "USA"],
                        ["RoadRunner", "Autonomy", "Onboard Target Processing", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.55, 0.05],
                        [0.15, 0.25, 0.55, 0.05],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.20, 0.55, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.25, 0.50, 0.10],
                        [0.15, 0.25, 0.50, 0.10]
                    ]
                }
            }
        },
        firestorm: {
            name: "Firestorm",
            technologies: {
                tempestDomain: {
                    name: "Tempest Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Surveillance", "Tactical Reconnaissance", "Unmanned Aerial Systems", "Tempest 50"],
                        ["Air Domain", "Offense", "Loitering Munition", "Weapon Systems", "Tempest 50"],
                        ["Land Domain", "Surveillance", "Persistent ISR", "Intelligence Systems", "Tempest 50"],
                        ["Maritime Domain", "Surveillance", "Maritime Patrol", "Unmanned Aerial Systems", "Tempest 50"],
                        ["Air Domain", "Electronic Warfare", "Signal Intelligence", "Electronic Warfare Systems", "Tempest 50"],
                        ["Land Domain", "Logistics", "Cargo Delivery", "Autonomous Systems", "Tempest 50"],
                        ["Air Domain", "Communication", "Relay Station", "Communication Systems", "Tempest 50"]
                    ],
                    rowWeights: [
                        [0.30, 0.25, 0.20, 0.15, 0.10],
                        [0.28, 0.30, 0.22, 0.12, 0.08],
                        [0.30, 0.25, 0.20, 0.15, 0.10],
                        [0.32, 0.23, 0.20, 0.15, 0.10],
                        [0.25, 0.30, 0.20, 0.15, 0.10],
                        [0.20, 0.35, 0.25, 0.10, 0.10],
                        [0.25, 0.30, 0.25, 0.10, 0.10]
                    ]
                },
                tempestEffect: {
                    name: "Tempest Effect",
                    columns: [
                        'Master Effect',
                        'Secondary Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Monitor", "High-Resolution Imaging", "Air Domain", "Surveillance"],
                        ["Neutralize", "Precision Strike Capability", "Air Domain", "Offense"],
                        ["Inform", "Real-Time Intelligence Gathering", "Land Domain", "Surveillance"],
                        ["Observe", "Extended Maritime Surveillance", "Maritime Domain", "Surveillance"],
                        ["Disrupt", "Electronic Signal Interception", "Air Domain", "Electronic Warfare"],
                        ["Supply", "Efficient Cargo Transport", "Land Domain", "Logistics"],
                        ["Connect", "Communication Relay Enhancement", "Air Domain", "Communication"]
                    ],
                    rowWeights: [
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18]
                    ]
                },
                tempestSystem: {
                    name: "Tempest System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["Tempest 50", "OCTRA", "OCTRA PCBA", "USA"],
                        ["Tempest 50", "Autonomous Reconnaissance", "AI Navigation Module", "USA"],
                        ["Tempest 50", "Loitering Munition", "Explosive Payload", "USA"],
                        ["Tempest 50", "Persistent ISR", "Multi-Sensor Suite", "USA"],
                        ["Tempest 50", "Maritime Patrol", "Saltwater-Resistant Coating", "USA"],
                        ["Tempest 50", "Signal Intelligence", "Electronic Warfare Suite", "USA"],
                        ["Tempest 50", "Cargo Delivery", "Payload Drop Mechanism", "USA"],
                        ["Tempest 50", "Relay Station", "Communication Relay Module", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10]
                    ]
                },
                elNinoDomain: {
                    name: "El Niño Domain",
                    columns: [
                        'Domain',
                        'Use',
                        'Subsystem',
                        'Tech Type',
                        'Tech Name'
                    ],
                    data: [
                        ["Air Domain", "Surveillance", "Tactical Reconnaissance", "Unmanned Aerial Systems", "El Niño"],
                        ["Air Domain", "Defense", "Electronic Countermeasures", "Electronic Warfare Systems", "El Niño"],
                        ["Land Domain", "Surveillance", "Close-Range ISR", "Intelligence Systems", "El Niño"],
                        ["Air Domain", "Offense", "Kinetic Strike", "Weapon Systems", "El Niño"],
                        ["Maritime Domain", "Surveillance", "Anti-Piracy Patrol", "Unmanned Aerial Systems", "El Niño"],
                        ["Air Domain", "Communication", "Data Relay", "Communication Systems", "El Niño"],
                        ["Land Domain", "Logistics", "Medical Supply Delivery", "Autonomous Systems", "El Niño"]
                    ],
                    rowWeights: [
                        [0.30, 0.25, 0.20, 0.15, 0.10],
                        [0.28, 0.30, 0.22, 0.12, 0.08],
                        [0.30, 0.25, 0.20, 0.15, 0.10],
                        [0.32, 0.23, 0.20, 0.15, 0.10],
                        [0.25, 0.30, 0.20, 0.15, 0.10],
                        [0.20, 0.35, 0.25, 0.10, 0.10],
                        [0.25, 0.30, 0.25, 0.10, 0.10]
                    ]
                },
                elNinoEffect: {
                    name: "El Niño Effect",
                    columns: [
                        'Master Effect',
                        'Secondary Effect',
                        'Domain',
                        'Use'
                    ],
                    data: [
                        ["Monitor", "Rapid Deployment Surveillance", "Air Domain", "Surveillance"],
                        ["Disrupt", "Signal Jamming Capabilities", "Air Domain", "Defense"],
                        ["Inform", "Immediate Intelligence Support", "Land Domain", "Surveillance"],
                        ["Neutralize", "Precision Airstrike Targeting", "Air Domain", "Offense"],
                        ["Observe", "Long-Endurance Maritime Surveillance", "Maritime Domain", "Surveillance"],
                        ["Connect", "Data Relay Optimization", "Air Domain", "Communication"],
                        ["Supply", "Critical Medical Supply Air-Drop", "Land Domain", "Logistics"]
                    ],
                    rowWeights: [
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18],
                        [0.25, 0.35, 0.22, 0.18]
                    ]
                },
                elNinoSystem: {
                    name: "El Niño System",
                    columns: [
                        "System",
                        "Subsystem",
                        "Component",
                        "Country"
                    ],
                    data: [
                        ["El Niño", "Tactical Reconnaissance", "Compact Sensor Array", "USA"],
                        ["El Niño", "Electronic Countermeasures", "Miniaturized Jamming Device", "USA"],
                        ["El Niño", "Close-Range ISR", "High-Speed Data Link", "USA"],
                        ["El Niño", "Kinetic Strike", "Hypersonic Warhead", "USA"],
                        ["El Niño", "Anti-Piracy Patrol", "Multi-Spectral Targeting System", "USA"],
                        ["El Niño", "Data Relay", "Mesh Network Communications", "USA"],
                        ["El Niño", "Medical Supply Delivery", "Precision Air-Drop Module", "USA"]
                    ],
                    rowWeights: [
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10],
                        [0.15, 0.30, 0.45, 0.10]
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