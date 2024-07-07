function calcularCargaViento(coef_presion, velocidad_viento, area_expuesta) {
    return 0.5 * coef_presion * Math.pow(velocidad_viento, 2) * area_expuesta;
}

function calcularYActualizarGrafico() {
    var coefPresion = parseFloat(document.getElementById('coef_presion').value);
    var velocidadViento = parseFloat(document.getElementById('velocidad_viento').value);
    var areaExpuesta = parseFloat(document.getElementById('area_expuesta').value);

    // Calcular la carga de viento específica
    var cargaViento = calcularCargaViento(coefPresion, velocidadViento, areaExpuesta);
    document.getElementById('resultado').innerText = 'Carga de Viento: ' + cargaViento.toFixed(2) + ' N';

    // Determinar el color basado en la carga de viento
    var color;
    if (cargaViento < 50) {
        color = 'green';
    } else if (cargaViento < 200) {
        color = 'yellow';
    } else {
        color = 'red';
    }

    // Crear datos para el gráfico 3D
    var data = [{
        x: [coefPresion],
        y: [velocidadViento],
        z: [areaExpuesta],
        mode: 'markers',
        marker: {
            size: 10,
            color: color
        },
        type: 'scatter3d'
    }];

    var layout = {
        title: {
            text: 'Carga de Viento en 3D',
            font: {
                color: '#01579b' // Color del título del gráfico
            }
        },
        scene: {
            xaxis: { title: { text: 'Coeficiente de Presión', font: { color: '#01579b' } } },
            yaxis: { title: { text: 'Velocidad del Viento (m/s)', font: { color: '#01579b' } } },
            zaxis: { title: { text: 'Área Expuesta (m²)', font: { color: '#01579b' } } }
        },
        autosize: true
    };

    Plotly.newPlot('chart', data, layout);

    // Resaltar la sección de la barra de color correspondiente
    var segments = document.querySelectorAll('.color-segment');
    segments.forEach(function(segment) {
        segment.style.opacity = 0.5;
    });
    if (color === 'green') {
        segments[0].style.opacity = 1;
    } else if (color === 'yellow') {
        segments[1].style.opacity = 1;
    } else if (color === 'red') {
        segments[2].style.opacity = 1;
    }
}

function resetearValores() {
    document.getElementById('coef_presion').value = 1.2;
    document.getElementById('velocidad_viento').value = 10;
    document.getElementById('area_expuesta').value = 50;
    document.getElementById('resultado').innerText = '';
    calcularYActualizarGrafico();
}

document.addEventListener('DOMContentLoaded', function() {
    calcularYActualizarGrafico(); // Inicializar gráfico con valores predeterminados
});
function toggleTooltip(tooltipId) {
    var tooltip = document.getElementById(tooltipId);
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
}

function closeTooltip(tooltipId) {
    var tooltip = document.getElementById(tooltipId);
    tooltip.style.display = 'none';
}