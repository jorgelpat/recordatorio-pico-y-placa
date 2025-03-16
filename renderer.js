const fs = window.require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

const mensaje = document.getElementById('mensaje');
const hoy = new Date();
const diaSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][hoy.getDay()];
const placaUsuario = 1;

if (config.restricciones[diaSemana]?.includes(placaUsuario)) {
    mensaje.innerText = "Hoy no puedes circular";
    document.body.style.backgroundColor = 'red';
} else {
    const manana = new Date();
    manana.setDate(hoy.getDate() + 1);
    const diaManana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"][manana.getDay()];
    mensaje.textContent = "Hoy puedes circular";

    if (config.restricciones[diaManana]?.includes(placaUsuario)) {
        document.body.style.backgroundColor = 'yellow';
        mensaje.innerText = "Mañana tienes pico y placa";
    } else {
        document.body.style.backgroundColor = 'green';
        mensaje.innerText = "Hoy no tienes pico y placa";
    }
}