 const estudiantes =[
    { nombre: "Carlos", asignaturas: { matemáticas: 9, física: 8.0, química: 8.5, tiene_beca: true } },
    { nombre: "Ana", asignaturas: { matemáticas: 8, física: 7.0, química: 9.5, tiene_beca: true } },
    { nombre: "Pedro", asignaturas: { matemáticas: 7, física: 5.0, química: 6.5, tiene_beca: false } },
    { nombre: "Laura", asignaturas: { matemáticas: 4, física: 3.0, química: 5.5, tiene_beca: false } },
    { nombre: "Miguel", asignaturas: { matemáticas: 6, física: 9.0, química: 1.5, tiene_beca: false } },
    { nombre: "Julia", asignaturas: { matemáticas: 9, física: 8.0, química: 8.5, tiene_beca: true } },
]


 //Ejercicio 1

 //Parte 1 
 function mejoresEstudiantesPorAsignatura(asignatura) {
    const ordenados = estudiantes .filter(estudiantes => estudiantes.asignaturas[asignatura] !== undefined)
                                  .sort((a, b) => b.asignaturas[asignatura] - a.asignaturas[asignatura]) 

    let topEstudiantes = ordenados.slice(0,3)
    let terceraNota = topEstudiantes[2]?.asignaturas[asignatura]

    for (let i = 3; i < ordenados.length; i++){
       if (ordenados[i].asignaturas[asignatura] === terceraNota) {
        topEstudiantes.push(ordenados[i])
       } else {
        break;
       }
    
       
    }

 }
 //Parte 2

 function calcularPromedio(notas) {
    const suma = notas.reduce((acumulado, nota) => acumulado + nota, 0);
    return suma / notas.length;
  }
  
  function asignaturaMenorRendimiento() {
    const promediosPorAsignatura = {};
  
    estudiantes.forEach(estudiante => {
      Object.keys(estudiante.asignaturas).forEach(asignatura => {
        if (!promediosPorAsignatura[asignatura]) {
          promediosPorAsignatura[asignatura] = [];
        }
        promediosPorAsignatura[asignatura].push(estudiante.asignaturas[asignatura]);
      });
    });
  
    let asignaturaConMenorPromedio = null;
    let menorPromedio = Infinity;
  
    Object.keys(promediosPorAsignatura).forEach(asignatura => {
      const promedio = calcularPromedio(promediosPorAsignatura[asignatura]);
      
      if (promedio < menorPromedio) {
        menorPromedio = promedio;
        asignaturaConMenorPromedio = asignatura;
      }
    });
  
    return asignaturaConMenorPromedio;
  }

//Parte 3

function aumentarNotasConBeca(estudiantes) {

    estudiantes.forEach(estudiante => {
        if (estudiante.tiene_beca) {  
            let nuevaNota = estudiante.nota * 1.1;
            estudiante.nota = Math.min(nuevaNota, 10);
        }
    });
}






