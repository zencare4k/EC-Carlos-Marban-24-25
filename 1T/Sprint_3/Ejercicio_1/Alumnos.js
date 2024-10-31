const estudiantes = [
  { nombre: "Juan", ciudad: "Madrid", beca: false, edad: 21, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
  { nombre: "Ana", ciudad: "Barcelona", beca: true, edad: 20, calificaciones: { matematicas: 9, fisica: 6, historia: 8 } },
  { nombre: "Pedro", ciudad: "Madrid", beca: false, edad: 23, calificaciones: { matematicas: 4, fisica: 5, historia: 7 } },
  { nombre: "Maria", ciudad: "Sevilla", beca: true, edad: 19, calificaciones: { matematicas: 8, fisica: 7, historia: 9 } },
  { nombre: "Jose", ciudad: "Madrid", beca: false, edad: 22, calificaciones: { matematicas: 6, fisica: 7, historia: 5 } },
  { nombre: "Isabel", ciudad: "Valencia", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 8, historia: 7 } },
  { nombre: "David", ciudad: "Bilbao", beca: false, edad: 24, calificaciones: { matematicas: 7, fisica: 6, historia: 8 } },
  { nombre: "Laura", ciudad: "Barcelona", beca: true, edad: 19, calificaciones: { matematicas: 6, fisica: 8, historia: 7 } },
  { nombre: "Miguel", ciudad: "Sevilla", beca: false, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 8 } },
  { nombre: "Sara", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 6, fisica: 5, historia: 9 } },
  { nombre: "Daniela", ciudad: "Valencia", beca: false, edad: 22, calificaciones: { matematicas: 8, fisica: 9, historia: 6 } },
  { nombre: "Alberto", ciudad: "Bilbao", beca: true, edad: 23, calificaciones: { matematicas: 5, fisica: 8, historia: 6 } },
  { nombre: "Gabriel", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 8, fisica: 5, historia: 7 } },
  { nombre: "Carmen", ciudad: "Barcelona", beca: true, edad: 24, calificaciones: { matematicas: 9, fisica: 9, historia: 9 } },
  { nombre: "Roberto", ciudad: "Madrid", beca: false, edad: 20, calificaciones: { matematicas: 4, fisica: 5, historia: 5 } },
  { nombre: "Carolina", ciudad: "Valencia", beca: true, edad: 22, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
  { nombre: "Alejandro", ciudad: "Bilbao", beca: false, edad: 23, calificaciones: { matematicas: 9, fisica: 8, historia: 8 } },
  { nombre: "Lucia", ciudad: "Barcelona", beca: true, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 7 } },
  { nombre: "Ricardo", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 6, fisica: 5, historia: 6 } },
  { nombre: "Marina", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 9, historia: 8 } }
];

//Readme para el ejercicio 1 y 2 separados y readme para el 3, 4 y 5 juntos
 //Ejercicio 1

 /*/Parte 1 
 function estudiantesDestacadosPorAsignatura(estudiantes, asignatura) {
  return estudiantes
      .filter(estudiante => estudiante.calificaciones[asignatura] !== undefined) // Asegúrate de que la asignatura existe
      .sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura]) // Ordenar descendentemente por nota
      .slice(0, 3) // Tomar los 3 mejores
      .map(estudiante => estudiante.nombre); // Retornar solo los nombres
}

// Ejemplo de uso:
console.log(estudiantesDestacadosPorAsignatura(estudiantes, 'matematicas'));


 //Parte 2

 function asignaturaMenorRendimiento(estudiantes) {
  const promedios = {};
  
  estudiantes.forEach(estudiante => {
      Object.entries(estudiante.calificaciones).forEach(([asignatura, nota]) => {
          if (!promedios[asignatura]) {
              promedios[asignatura] = { suma: 0, conteo: 0 };
          }
          promedios[asignatura].suma += nota;
          promedios[asignatura].conteo++;
      });
  });

  let menorRendimiento = null;
  let asignaturaMenor = '';

  for (const [asignatura, { suma, conteo }] of Object.entries(promedios)) {
      const promedio = suma / conteo;
      if (menorRendimiento === null || promedio < menorRendimiento) {
          menorRendimiento = promedio;
          asignaturaMenor = asignatura;
      }
  }

  return asignaturaMenor;
}

console.log(asignaturaMenorRendimiento(estudiantes));

//Parte 3/

function mejoraNotasBeca(estudiantes) {
  estudiantes.forEach(estudiante => {
      if (estudiante.beca) {
          Object.keys(estudiante.calificaciones).forEach(asignatura => {
              estudiante.calificaciones[asignatura] = Math.min(estudiante.calificaciones[asignatura] * 1.1, 10);
          });
      }
  });
}

mejoraNotasBeca(estudiantes);
console.log(estudiantes);

//Parte 4/

function filtrarPorCiudadYAsignatura(estudiantes, ciudad, asignatura) {
  return estudiantes
      .filter(estudiante => estudiante.ciudad === ciudad) // Filtrar por ciudad
      .sort((a, b) => b.calificaciones[asignatura] - a.calificaciones[asignatura]) // Ordenar descendentemente por nota
      .map(estudiante => estudiante.nombre); // Retornar solo los nombres
}

// Ejemplo de uso:
console.log(filtrarPorCiudadYAsignatura(estudiantes, 'Madrid', 'matematicas'));
*/
/*/Parte 5

function estudiantesSinBecaPorCiudad(estudiantes, ciudad) {
  return estudiantes.filter(estudiante => 
      estudiante.ciudad === ciudad && !estudiante.beca
  ).length;
}

// Ejemplo de uso:
console.log(estudiantesSinBecaPorCiudad(estudiantes, 'Madrid'));

//Parte 6

function promedioEdadEstudiantesConBeca(estudiantes) {
  const estudiantesConBeca = estudiantes.filter(estudiante => estudiante.beca);
  const sumaEdades = estudiantesConBeca.reduce((suma, estudiante) => suma + estudiante.edad, 0);
  return estudiantesConBeca.length ? (sumaEdades / estudiantesConBeca.length) : 0;
}

// Ejemplo de uso:
console.log(promedioEdadEstudiantesConBeca(estudiantes));


// Parte 7

function mejoresEstudiantes(estudiantes) {
  const estudiantesConPromedio = estudiantes.map(estudiante => {
      const notas = Object.values(estudiante.calificaciones);
      const promedio = notas.reduce((suma, nota) => suma + nota, 0) / notas.length;
      return { nombre: estudiante.nombre, promedio };
  });

  return estudiantesConPromedio.sort((a, b) => b.promedio - a.promedio).slice(0, 2);
}

console.log(mejoresEstudiantes(estudiantes));

//Parte 8*/

function estudiantesAprobados(estudiantes) {
  return estudiantes.filter(estudiante => {
      const notas = Object.values(estudiante.calificaciones);
      return notas.every(nota => nota >= 5); 
  }).map(estudiante => estudiante.nombre);
}

console.log(estudiantesAprobados(estudiantes));



 

