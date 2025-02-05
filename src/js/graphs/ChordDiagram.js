update() {
    // Update ribbons
    this.svg.selectAll('.ribbon')
        .attr('fill-opacity', this.getLinkOpacity());

    // Update arcs
    this.svg.selectAll('.arc')
        .attr('fill', d => this.getNodeColor(d))
        .attr('fill-opacity', this.getNodeOpacity());

    // Update labels
    this.svg.selectAll('text')
        .style('fill', this.currentLabelColor);
}

createChordDiagram(svg, chords, ribbon, arc) {
    // Add the ribbons
    const ribbons = svg.append('g')
        .selectAll('path')
        .data(chords)
        .join('path')
        .attr('class', 'ribbon')
        .attr('d', ribbon)
        .attr('fill', d => this.getNodeColor(d.source))
        .attr('fill-opacity', this.getLinkOpacity())
        .attr('stroke', d => d3.rgb(this.getNodeColor(d.source)).darker());

    // Add the outer arcs
    const group = svg.append('g')
        .selectAll('g')
        .data(chords.groups)
        .join('g');

    group.append('path')
        .attr('class', 'arc')
        .attr('fill', d => this.getNodeColor(d))
        .attr('fill-opacity', this.getNodeOpacity())
        .attr('d', arc);
} 