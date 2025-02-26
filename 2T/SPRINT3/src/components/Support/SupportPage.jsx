import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../../styles/SupportPage.css';

const SupportPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const templateParams = {
      to_name: name,
      from_name: email, // Aquí se coloca el correo del remitente
      from_email: email,
      to_email: 'support@example.com', // Correo del equipo de soporte
      message: message,
    };

    try {
      // Enviar correo de soporte con EmailJS
      await emailjs.send('service_oxurxxs', 'template_37iampg', templateParams, 'B-kJoB9UDT4MRmInH');
      console.log('Correo de soporte enviado con éxito');
      setSuccess('Tu mensaje ha sido enviado con éxito');
      setName('');
      setEmail('');
      setMessage('');
      setError('');

      // Enviar correo de confirmación con Nodemailer
      const response = await fetch('/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, message: 'Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.' })
      });

      if (response.ok) {
        console.log('Correo de confirmación enviado con éxito');
      } else {
        console.error('Error al enviar el correo de confirmación');
      }
    } catch (err) {
      console.error('Error al enviar el mensaje:', err);
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="support-page">
      <h2>Atención al Cliente</h2>
      <form onSubmit={handleSubmit} className="support-form">
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Mensaje:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default SupportPage;