importScripts('https://d3js.org/d3.v7.min.js');

onmessage = function(event) {
    const { nodes, links, width, height } = event.data;
    
    // Calculate scale based on provided dimensions
    const scale = Math.min(width, height) / 1000;
    
    nodes.forEach(node => {
        node.x = 0;
        node.y = 0;
    });

    const centerNode = nodes.find(n => n.type === "technology");
    if (centerNode) {
        centerNode.fx = 0;
        centerNode.fy = 0;
    }

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links)
            .id(d => d.id)
            .distance(d => {
                if (d.source.type === "technology") return 100;
                if (d.source.type === "domain") return 80;
                return 60;
            })
            .strength(0.7))
        .force("charge", d3.forceManyBody()
            .strength(d => d.type === "technology" ? -500 :
                        d.type === "domain" ? -400 :
                        d.type === "use" ? -300 :
                        -200))
        .force("collide", d3.forceCollide()
            .radius(d => {
                const baseRadius = d.type === "technology" ? 45 :
                                 d.type === "domain" ? 35 :
                                 d.type === "use" ? 25 : 20;
                return baseRadius + 15;
            })
            .strength(1)
            .iterations(2))
        .force("center", d3.forceCenter(0, 0))
        // Modified radial force to keep nodes closer to center
        .force("radial", d3.forceRadial(d => {
            if (d.type === "domain") return 110;      // Slightly reduced
            if (d.type === "use") return 170;         // Slightly reduced
            if (d.type === "effect") return 220;      // Reduced more to pull in outer nodes
            return 0;
        }, 0, 0).strength(0.35))  // Slightly increased strength
        // Add a gentle force to push nodes upward
        .force("y", d3.forceY().strength(d => {
            if (d.type === "effect") return 0.05;     // Gentle upward force on outer nodes
            return 0;
        }))
        .stop();

    simulation.alphaDecay(0.01);
    
    const n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
    
    for (let i = 0; i < n; ++i) {
        simulation.tick();
        if (i % 5 === 0) {
            postMessage({type: "tick", progress: i/n});
        }
    }

    postMessage({type: "end", nodes: nodes, links: links});
    self.close();
};