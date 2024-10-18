import React from "react";
import styles from './Tabla.module.css';

export default function DiscordTable() {
    return (
        <div>
            <table border={1} className={styles.table}>
                <thead>
                    <tr>
                        <th>Token de autentificación</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo Electrónico</th>
                        <th>Contraseña</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    );
}
