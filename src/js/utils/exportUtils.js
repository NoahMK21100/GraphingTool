import html2canvas from 'html2canvas';
import * as d3 from 'd3';

export async function exportToPNG(wrapper) {
    try {
        // Get the SVG element and its dimensions
        const svg = wrapper.querySelector('svg');
        if (!svg) throw new Error('No SVG element found');

        const width = svg.getBoundingClientRect().width;
        const height = svg.getBoundingClientRect().height;

        // Create a container for the complete image
        const container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '-9999px';
        container.style.width = width + 'px';
        container.style.height = (height + 100) + 'px'; // Extra space for title
        document.body.appendChild(container);

        // Add title section
        const titleSection = document.createElement('div');
        titleSection.style.textAlign = 'center';
        titleSection.style.padding = '20px';
        titleSection.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg-primary');
        titleSection.style.color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');

        const companyName = document.getElementById('companyName')?.value || '';
        const techName = document.getElementById('techName')?.value || '';

        titleSection.innerHTML = `
            <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">${companyName}</div>
            <div style="font-size: 18px;">${techName}</div>
        `;

        container.appendChild(titleSection);

        // Add the graph
        const graphContainer = document.createElement('div');
        graphContainer.style.width = width + 'px';
        graphContainer.style.height = height + 'px';
        graphContainer.appendChild(svg.cloneNode(true));
        container.appendChild(graphContainer);

        // Use html2canvas to create the PNG
        const canvas = await html2canvas(container, {
            backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'),
            scale: 2,
            useCORS: true,
            logging: false
        });

        // Clean up
        document.body.removeChild(container);

        // Create download link
        const link = document.createElement('a');
        link.download = `${companyName}-${techName}.png`.replace(/\s+/g, '-');
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error exporting PNG:', error);
        alert('Failed to export PNG. Please try again.');
    }
}

export function exportToSVG(wrapper) {
    try {
        // Get the SVG element
        const svg = wrapper.querySelector('svg');
        if (!svg) throw new Error('No SVG element found');

        // Clone the SVG
        const clonedSvg = svg.cloneNode(true);

        // Get the current dimensions from the original SVG's viewBox or client rect
        const originalViewBox = svg.getAttribute('viewBox')?.split(' ').map(Number);
        const clientRect = svg.getBoundingClientRect();
        const width = originalViewBox ? originalViewBox[2] : clientRect.width;
        const height = originalViewBox ? originalViewBox[3] : clientRect.height;

        // Create a new SVG container
        const containerSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        containerSvg.setAttribute('xmlns', "http://www.w3.org/2000/svg");
        containerSvg.setAttribute('width', width);
        containerSvg.setAttribute('height', height + 100); // Extra space for title
        containerSvg.setAttribute('viewBox', `0 0 ${width} ${height + 100}`);

        // Add background for the entire SVG
        const fullBgRect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        fullBgRect.setAttribute('x', 0);
        fullBgRect.setAttribute('y', 0);
        fullBgRect.setAttribute('width', width);
        fullBgRect.setAttribute('height', height + 100);
        fullBgRect.setAttribute('fill', getComputedStyle(document.documentElement).getPropertyValue('--bg-primary'));

        // Create title group
        const titleGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        const companyName = document.getElementById('companyName')?.value || '';
        const techName = document.getElementById('techName')?.value || '';

        // Add title text
        const titleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        titleText.textContent = companyName;
        titleText.setAttribute('x', width / 2);
        titleText.setAttribute('y', 40);
        titleText.setAttribute('text-anchor', 'middle');
        titleText.setAttribute('font-size', '24px');
        titleText.setAttribute('font-weight', 'bold');
        titleText.setAttribute('fill', getComputedStyle(document.documentElement).getPropertyValue('--text-primary'));

        // Add subtitle text
        const subtitleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        subtitleText.textContent = techName;
        subtitleText.setAttribute('x', width / 2);
        subtitleText.setAttribute('y', 70);
        subtitleText.setAttribute('text-anchor', 'middle');
        subtitleText.setAttribute('font-size', '18px');
        subtitleText.setAttribute('fill', getComputedStyle(document.documentElement).getPropertyValue('--text-secondary'));

        // Create graph group and position it below the title
        const graphGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        graphGroup.setAttribute('transform', `translate(0, 100)`);

        // Move all content from cloned SVG to the graph group
        while (clonedSvg.firstChild) {
            graphGroup.appendChild(clonedSvg.firstChild);
        }

        // Add all elements to the container SVG in the correct order
        containerSvg.appendChild(fullBgRect);
        containerSvg.appendChild(titleGroup);
        titleGroup.appendChild(titleText);
        titleGroup.appendChild(subtitleText);
        containerSvg.appendChild(graphGroup);

        // Convert to string and create download link
        const serializer = new XMLSerializer();
        const svgString = serializer.serializeToString(containerSvg);

        const link = document.createElement('a');
        link.download = `${companyName}-${techName}.svg`.replace(/\s+/g, '-');
        link.href = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgString);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error exporting SVG:', error);
        alert('Failed to export SVG. Please try again.');
    }
}