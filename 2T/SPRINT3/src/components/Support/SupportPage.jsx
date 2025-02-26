import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import '../../styles/SupportPage.css';

const SupportPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const templateParams = {
      to_name: name,
      from_name: 'Telite Team',
      from_email: 'your-email@example.com',
      to_email: email,
      message: message,
    };

    emailjs.send('service_oxurxxs', 'template_37iampg', templateParams, 'B-kJoB9UDT4MRmInH')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setSuccess('Tu mensaje ha sido enviado con éxito');
        setName('');
        setEmail('');
        setMessage('');
        setError('');
      }, (err) => {
        console.error('FAILED...', err);
        setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
      });
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