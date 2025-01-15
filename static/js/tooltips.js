document.addEventListener('DOMContentLoaded', function() {
    const tooltip = document.createElement('div');
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '3px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '1000';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s';
    document.body.appendChild(tooltip);

    document.body.addEventListener('mouseover', function(e) {
        const target = e.target.closest('[data-tooltip]');
        if (target) {
            const text = target.getAttribute('data-tooltip');
            tooltip.innerHTML = text;  // Usamos innerHTML para interpretar etiquetas HTML
            tooltip.style.opacity = '1';
            
            const rect = target.getBoundingClientRect();
            tooltip.style.left = rect.left + window.scrollX + 'px';
            tooltip.style.top = rect.bottom + window.scrollY + 5 + 'px';
        }
    });

    document.body.addEventListener('mouseout', function(e) {
        if (e.target.closest('[data-tooltip]')) {
            tooltip.style.opacity = '0';
        }
    });
});
