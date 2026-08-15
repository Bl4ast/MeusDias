// Configuração do Gráfico de Radar
const ctx = document.getElementById('radarChart').getContext('2d');
        
Chart.defaults.color = '#888';
Chart.defaults.font.family = "'JetBrains Mono', monospace";

new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Physical', 'Intel', 'Spiritual', 'Core', 'Psyche', 'Craft'],
        datasets: [{
            label: 'Player Stats',
            data: [700, 500, 600, 900, 480, 800],
            backgroundColor: 'rgba(230, 46, 54, 0.2)', // Vermelho transparente
            borderColor: '#e62e36', // Vermelho forte
            pointBackgroundColor: '#e62e36',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#e62e36',
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            r: {
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                pointLabels: {
                    color: '#f0f0f0',
                    font: { size: 11 }
                },
                ticks: {
                    display: false, // Esconde os números do eixo para ficar clean
                    min: 0,
                    max: 1000
                }
            }
        }
    }
});