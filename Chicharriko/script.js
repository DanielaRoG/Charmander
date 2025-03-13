const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch'); // Para realizar peticiones HTTP

dotenv.config(); // Cargar las variables de entorno de .env

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Habilitar CORS
app.use(express.json()); // Permitir que el servidor reciba datos en formato JSON
app.use(express.static('public')); // Para servir archivos estáticos como HTML, CSS y JS (si usas archivos de frontend)

// Ruta para enviar el correo desde el backend
app.post('/send-email', (req, res) => {
  const { nombre, apellidos, correo, mensaje } = req.body;

  // Crear el objeto con los datos del formulario
  const datosFormulario = {
    personalizations: [
      {
        to: [{ email: 'chicharrikos@hotmail.com' }], // Dirección de correo del administrador
        subject: 'Nuevo mensaje de contacto',
        dynamic_template_data: {
          nombre,
          apellidos,
          correo,
          mensaje,
        },
        template_id: 'd-c00d206a941a4444bb9029e90994374d', // Template ID para el administrador
      },
      {
        to: [{ email: correo }],
        subject: 'Confirmación de recepción del mensaje',
        dynamic_template_data: {
          nombre,
          apellidos,
        },
        template_id: 'd-c74c0aaa1ade4107826fb772de4dcdd9', // Template ID para el usuario
      },
    ],
    from: { email: 'tu-correo-verificado@dominio.com' }, // Dirección de correo verificado
  };

  // Enviar el correo a la API de SendGrid
  fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`, // Usar la API key de SendGrid desde .env
    },
    body: JSON.stringify(datosFormulario),
  })
    .then(response => response.json())
    .then(data => {
      res.status(200).json({ message: 'Correo enviado exitosamente', data });
    })
    .catch(error => {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo', error });
    });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nombre = document.getElementById('fname').value;
    const apellidos = document.getElementById('lname').value;
    const correo = document.getElementById('email').value;
    const mensaje = document.getElementById('comment').value;
  
    if (!nombre || !apellidos || !correo || !mensaje) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    const datosFormulario = {
      nombre,
      apellidos,
      correo,
      mensaje,
    };
  
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosFormulario),
    })
      .then(response => response.json())
      .then(data => {
        alert('Correo enviado con éxito');
      })
      .catch(error => {
        console.error('Error al enviar el correo:', error);
        alert('Hubo un error al enviar el correo.');
      });
  });
  