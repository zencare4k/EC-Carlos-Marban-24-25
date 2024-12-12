# Ejercicio 1 - Sprint 4

## Análisis del problema
En este directorio se resolverá el problema específico de la asignatura. El problema debe ser descrito de manera clara, sin ambigüedades, y debe ser simple y autocontenido.

## Diseño de la propuesta de solución del problema
Para resolver el problema, es necesario diseñar una o varias soluciones que se implementarán en el siguiente paso. Utilizaremos herramientas para realizar esquemas gráficos como UML y diagramas de flujo para ayudar en este proceso.

## Implementación del diseño propuesto
En este punto, procederemos a implementar todo el diseño establecido en el punto anterior.

## Pruebas de la resolución del problema
Es indispensable realizar pruebas para verificar la integridad y correcto funcionamiento de la implementación. Compararemos el comportamiento esperado del análisis del problema con la implementación realizada para asegurarnos de que se ha implementado de forma adecuada.

# Boletín de Ejercicios Sprint 4

## Descripción del ejercicio
Para asentar los conocimientos mostrados en la parte teórica, se tendrá que proceder a resolver los siguientes ejercicios/problemas en el orden correcto. Para ello, primero pasamos a explicar los criterios que debemos seguir para la resolución de los ejercicios/problemas.

## Fases de la resolución de problemas
1. **Análisis del problema**: Se debe indicar en el directorio específico de la asignatura el problema que se va a resolver de una forma adecuada, es decir, no debe contener ambigüedades, debe ser simple y autocontenido.
2. **Diseño de la propuesta de solución del problema**: Como todo aquel problema que se quiere resolver, es necesario realizar el diseño de la o las soluciones que se procederá a implementar en el siguiente paso. Para esto nos debemos ayudar de las herramientas para realizar esquemas gráficos (UML, Diagramas de flujos, etc…)
3. **Implementación del diseño propuesto**: En este punto ya se procederá a implementar todo el diseño establecido en el punto anterior.
4. **Pruebas de la resolución del problema**: Es indispensable el realizar pruebas para verificar la integridad y correcto funcionamiento de la implementación realizada, para ello simplemente compararemos si el comportamiento esperado del análisis del problema se ha implementado de forma adecuada.

## COMPONENTES GENERALES
- `AppHeader`: Mostrará la cabecera de la web y los dos elementos router. Es una barra estática, es decir, si desplazamos el ratón hacia abajo, debería de quedar fija.
- `AppFooter`: Mostrará el típico texto de copyright indicando que la web ha sido desarrollada con React. Es un componente que siempre se encuentra abajo y no es estático.
- `ConfirmationDialog`: Modal genérico utilizado para confirmar acciones destructivas y/o de modificación, como eliminar/editar miembros o parties. Requiere que el usuario confirme la acción antes de proceder. (Botón de SI y botón de NO)
- `NotificationSystem`: Maneja la visualización de notificaciones o mensajes al usuario. Utilizado para mostrar mensajes de éxito, error o información. Muestra notificaciones emergentes al usuario sobre el éxito o fallo de acciones realizadas. Puede utilizarse para informar sobre conflictos de horario, requisitos no cumplidos, etc.
- `ValidationSystem`: 
  - `validateMember`: Verifica si un miembro cumple con los requisitos y restricciones al ser añadido.
  - `validateTeamComposition`: Asegura que la composición del equipo respeta los roles requeridos y limitaciones. Proporciona mensajes claros sobre cualquier problema encontrado durante la validación.

## Estructura de carpetas mínima:
```
/src
  /components
    /AppHeader
    /AppFooter
    /ConfirmationDialog
    /NotificationSystem
    /ValidationSystem
    /GuildMemberManagement
      /FilterBar
      /SortControls
      /CreateMember
      /MemberList
        /Pagination
        /MemberItem
          /BulkActions
          /MemberDetailsModal
          /MemberEditModal
  /services
    guildmembers_API.js
    partyfinder_API.js
```

## Ejercicio 1: Panel Avanzado de Gestión de Miembros del Gremio

### Contexto
Este ejercicio se basa en ampliar y mejorar el sistema de gestión de miembros de la guild que ya han implementado previamente. El objetivo es crear un Panel de Gestión de Miembros más avanzado, que permita funcionalidades adicionales como filtrado, ordenamiento, selección múltiple y acciones en lote, proporcionando una interfaz más robusta y eficiente para administrar a los miembros del gremio.

### Requerimientos Funcionales
1. **Visualización Avanzada de Miembros**:
   - Tabla de Miembros:
     - Mostrar todos los miembros del gremio en una tabla dinámica.
     - Incluir las siguientes columnas:
       - `user_id` (integer) (este es único)
       - `username` (string)
       - `level` (integer)
       - `ilvl` (integer)
       - `character_role` (enum: TANK, HEALER, DAMAGE, SUPPORT)
       - `guild_role` (enum: LIDER, GERENTE SENIOR, GERENTE, GERENTE A2, ALPHA 2, MEMBER)
       - `main_archetype` (enum: BARD, CLERIC, FIGHTER, MAGE, RANGER, ROGUE, SUMMONER, TANK)
       - `secondary_archetype` (enum: BARD, CLERIC, FIGHTER, MAGE, RANGER, ROGUE, SUMMONER, TANK)
       - `grandmaster_profession_one` (enum: FISHING, HERBALISM, HUNTING, LUMBERJACKING, MINING, ALCHEMY, ANIMALHUSBANDRY, COOKING, FARMING, LUMBERMILLING, METALWORKING, STONECUTTING, TANNING, WEAVING, ARCANEENGINEERING, ARMORSMITHING, CARPENTRY, JEWELCUTTING, LEATHERWORKING, SCRIBE, TAILORING, WEAPONSMITHING)
       - `grandmaster_profession_two` (enum: FISHING, HERBALISM, HUNTING, LUMBERJACKING, MINING, ALCHEMY, ANIMALHUSBANDRY, COOKING, FARMING, LUMBERMILLING, METALWORKING, STONECUTTING, TANNING, WEAVING, ARCANEENGINEERING, ARMORSMITHING, CARPENTRY, JEWELCUTTING, LEATHERWORKING, SCRIBE, TAILORING, WEAPONSMITHING)
     - Añadir una columna con una casilla de verificación para seleccionar miembros.
     - Cada fila debe tener botones de Editar y Eliminar.
2. **Filtrado y Ordenamiento**:
   - Barra de Filtros que permita filtrar a los miembros por:
     - Character Role
     - Guild Role
     - Main Archetype
     - Secondary Archetype
     - Grandmaster Profession (tanto para la 1 como para la 2)
     - Nivel mínimo y máximo
     - Item Level mínimo y máximo
   - Los filtros deben poder combinarse (por ejemplo, filtrar por Character Role y Level mínimo).
   - Ordenamiento:
     - Permite ordenar la tabla por cualquiera de las columnas, tanto ascendente como descendente.
3. **Selección Múltiple y Acciones en Lote**:
   - Selección Múltiple:
     - Los usuarios pueden seleccionar múltiples miembros utilizando las casillas de verificación.
     - Añadir una casilla de verificación en el encabezado para seleccionar/deseleccionar todos los miembros visibles.
   - Acciones en Lote:
     - Cambiar Guild Role: Permite cambiar el rol del gremio de todos los miembros seleccionados a un rol específico.
     - Eliminar Miembros: Permite eliminar a todos los miembros seleccionados (requiere confirmación en una alerta).
4. **Optimización**:
   - Renderización Eficiente:
     - Implementar técnicas para evitar renderizaciones innecesarias, mejorando el rendimiento con grandes cantidades de datos.
     - Utilizar `React.memo`, `useMemo`, y `useCallback` cuando sea apropiado.
   - Paginación:
     - Implementar paginación de la lista para manejar eficientemente listas con muchos miembros.
     - Poner un selector para decidir si mostrar 10, 20 o 50 miembros.
5. **Detalles de Miembro y Edición**:
   - Detalle de Miembro:
     - Al hacer clic en el Username de un miembro, se abre un Modal con detalles completos del miembro.
   - Edición Mejorada:
     - El Modal de edición debe permitir actualizar todos los campos del miembro excepto el `user_id`.
     - Implementar validaciones avanzadas:
       - Asegurar que los niveles (Level e ilvl) sean números enteros positivos.
       - Evitar duplicados en `user_id`.
6. **Validaciones y Manejo de Errores**:
   - Validaciones en Tiempo Real:
     - Mostrar mensajes de error mientras el usuario completa los formularios si los datos no son válidos.
     - Deshabilitar el botón de enviar hasta que el formulario sea válido.
   - Manejo de Errores de API:
     - Mostrar mensajes de error claros si ocurre algún problema al comunicarse con la API.
     - Manejar errores comunes como fallos de red o respuestas con códigos de error.

### Pruebas a Realizar
1. **Prueba 1: Filtrado Combinado con Ordenamiento y Acciones en Lote**
   - Aplicar múltiples filtros simultáneamente (e.g., Character Role = 'DAMAGE', Guild Role = 'MEMBER', Level entre 50 y 60, Main Archetype = 'MAGE', Grandmaster Profession One = 'ALCHEMY').
   - Ordenar los resultados por ilvl en orden descendente.
   - Seleccionar todos los miembros filtrados utilizando la casilla de verificación en el encabezado.
   - Realizar una acción en lote para cambiar su Guild Role a 'GERENTE'.
   - Verificar que solo los miembros visibles y filtrados se actualizan correctamente y que la paginación refleja los cambios.
2. **Prueba 2: Edición de Miembro con Validación en Tiempo Real y Manejo de Errores de API**
   - Editar un miembro desde el MemberEditModal e introducir valores inválidos (e.g., Level negativo, ilvl no numérico).
   - Comprobar que las validaciones en tiempo real impiden la sumisión y muestran mensajes de error claros.
   - Simular un fallo en la API al guardar cambios válidos y verificar que el NotificationSystem informa adecuadamente sin afectar la usabilidad.
3. **Prueba 3: Creación de Miembro con Duplicidad de `user_id` y Actualización en Tiempo Real**
   - Intentar crear un nuevo miembro con un `user_id` que ya existe.
   - Verificar que el ValidationSystem detecta la duplicidad antes de enviar y muestra un mensaje de error claro.
   - Corregir el `user_id` y completar la creación.
   - Confirmar que el nuevo miembro aparece inmediatamente en la MemberList sin necesidad de recargar.

![Prueba 3](resources/Prueba%203.gif)

4. **Prueba 4: Persistencia y Consistencia al Filtrar, Ordenar y Editar**
   - Aplicar filtros y ordenamientos específicos.
   - Editar un miembro de manera que ya no cumpla con los filtros aplicados (e.g., cambiar su Level fuera del rango filtrado).
   - Comprobar que, tras guardar, el miembro desaparece de la lista filtrada y que la paginación se ajusta correctamente.
5. **Prueba 5: Paginación Dinámica y Manejo de Cambios en el Conjunto de Datos**
   - Cambiar el número de miembros mostrados por página (10, 20, 50).
   - Navegar a una página específica.
   - Aplicar un filtro que reduce el número total de páginas.
   - Verificar que la aplicación redirige a una página válida y no muestra contenido vacío o errores.

![Prueba 3](resources/Prueba%205.gif)
