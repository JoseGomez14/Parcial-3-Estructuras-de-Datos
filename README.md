# Parcial 3 - Estructuras de Datos

- ### Nicolás Carmona Cardona
- ### Jose David Gómez Muñetón

---

## **💻 Ejecución:**

- **Requisitos:**

  - Node.js
  - NPM

- **Pasos:**

  - Clonar el repositorio
  - Abrir una terminal en la carpeta del proyecto
  - Ejecutar el comando `npm install`
  - Ejecutar el comando `npm run start:1` para ejecutar el punto 1

- **Resultados**

  - Punto 1:

    - `/1/sortedAddresses.json`
    - `/1/sortedAddressesByPostalCode.json`

  - Punto 2:

  - Punto 3:
    - `/3/ERHospital.jpeg`

---

## Punto 1

- **📄 Enunciado:** Planificación de rutas de entrega: Ordenar direcciones para optimizar rutas de entrega.

- **💡 Estrategia:**

  - **🛢️ Datos:** Se tomó un conjunto de 210 direcciones de Estados Unidos.

    ```JS
    [
      "777 Brockton Avenue, Abington MA 2351",
      "30 Memorial Drive, Avon MA 2322",
      "250 Hartford Avenue, Bellingham MA 2019",
      "700 Oak Street, Brockton MA 2301",
      "66-4 Parkhurst Rd, Chelmsford MA 1824",
      "591 Memorial Dr, Chicopee MA 1020",
      "55 Brooksby Village Way, Danvers MA 1923",
      ...
    ]
    ```

    [Ver conjunto de datos completo](/1/addresses.js)

    y un **punto de reparto** (Punto desde el cuál se planean las rutas de reparto).

    ```JS
    // Ubicación de referencia (Punto de repartos)
    const BASE_ADDRESS = "1300 Montgomery Highway, Vestavia Hills AL 35216";
    ```

  - Luego se decidió calcular las distancias usando la **distancia euclidiana** basadas en sus ubicaciones geográficas (Latitud y Longitud).

    **Nota:** _La información acerca de la latitud y longitud se puede obtener a través de [Geocodings API de Google Maps](https://developers.google.com/maps/documentation/geocoding?hl=es-419)_
    <div align="center">
     <img src="https://github.com/JoseGomez14/Parcial-3-Estructuras-de-Datos/assets/110755221/a293df94-85ef-43a1-a35b-34ee2da5130b" width="500" />
    </div>

  - En vista de que puntos opuestos pueden tener el mismo valor en distancia, se agregó información acerca del código postal que divide los mapas en reiones y así tener segmentado el conjunto de ubicaciones que se encuentran en cada región

   <div align="center">
   <img src="https://github.com/JoseGomez14/Parcial-3-Estructuras-de-Datos/assets/110755221/a0b878a0-d8e4-4990-851a-d3b136d36b5a" width="500" />
  </div>

  - Se aplicó una [función para obtener la información](/1/getLocsInfo.js) requerida de cada dirección y se obtuvo el siguiente conjunto de datos:

    ```JS
    [
      {
        lat: 42.0967107,
        lng: -70.9678569,
        address: "777 Brockton Ave, Abington, MA 02351, USA",
        postalCode: "02351",
      },
      {
        lat: 42.1210458,
        lng: -71.0300988,
        address: "30 Memorial Dr, Avon, MA 02322, USA",
        postalCode: "02322",
      },
      ...
    ]
    ```

  [Ver conjunto de datos completo](/1/parsedAddresses.js)

  - Para cada dirección se [calcula su distancia con respecto al punto de reparto](/1/utils.js#L3):

    ```JS
    [
       {
         lat: 42.0967107,
         lng: -70.9678569,
         address: '777 Brockton Ave, Abington, MA 02351, USA',
         postalCode: '02351',
         distance: 325.53333900623136
       },
       {
         lat: 42.1210458,
         lng: -71.0300988,
         address: '30 Memorial Dr, Avon, MA 02322, USA',
         postalCode: '02322',
         distance: 323.989854650114
      },
      ...
    ]
    ```

  - Se tomó la decisión de implementar el algoritmo [**_Merge Sort_**](/1/mergeSort.js) por el hecho de ser un algoritmo que tiene un rendimiento muy eficiente para grandes conjuntos de datos, lo cual es muy útil en este tipo de situaciones donde el tamaño del conjunto de datos puede ser muy elevado, en el ejercicio, muchos pedidos lo que lleva a muchas direcciones de reparto.

    Se eligió además por encima del **_Quick Sort_** que a pesar de tener un rendimiento muy similar, no garantiza la estabilidad (Conservar el orden relativo en elementos iguales), lo cuál en el segundo ordenamiento propuesto (Por código postal) es muy importante, dado que se buscaba agrupar elementos con igual código postal, pero que mantenga el orden relativo en términos de la distancia al punto de reparto.

    **Nota:** _Al algoritmo de Merge Sort se le realizó una variación que permite ordenan objetos con relación a una clave pasada como parámetro_

- **✅ Resultado:**

  ```JS
  [
    // Primeros 2 elementos
    {
      "lat": 33.4469749,
      "lng": -86.8209358,
      "address": "209 Lakeshore Pkwy, Homewood, AL 35209, USA",
      "postalCode": "35209",
      "distance": 0.001183769618600099
    },
    {
      "lat": 33.4679023,
      "lng": -86.82164180000001,
      "address": "312 Palisades Blvd, Birmingham, AL 35209, USA",
      "postalCode": "United States",
      "distance": 0.002430748375120535
    },
    ...
    // Últimos dos elementos
    {
      "lat": 42.494501,
      "lng": -70.9355235,
      "address": "450 Highland Ave, Salem, MA 01970, USA",
      "postalCode": "01970",
      "distance": 333.6120559169789
    },
    {
      "lat": 42.5545669,
      "lng": -70.96824,
      "address": "55 Brooksby Village Dr, Danvers, MA 01923, USA",
      "postalCode": "01923",
      "distance": 333.6683072292898
    }
  ]
  ```

  [Ver conjunto de datos ordenado - completo](/1/sortedAddresses.json)

  Elementos cercanos

    <div align="center">
      <img src="https://github.com/JoseGomez14/Parcial-3-Estructuras-de-Datos/assets/110755221/37c87471-da84-4f90-b06a-c15e58ee636f" width="500" />
    </div>
   
    Elementos distantes

    <div align="center">
      <img src="https://github.com/JoseGomez14/Parcial-3-Estructuras-de-Datos/assets/110755221/bb37cfb3-189b-44dc-a185-d89bdadbaebe" width="500" />
    </div>

## Punto 2

- **📄 Enunciado:** Renderizado de gráficos 3D - Utilizar árboles BSP para determinar qué objetos renderizar en un entorno 3D.

- **💡 Estrategia:**

## Punto 3

- **📄 Enunciado:** Gestión de un Hospital - Crea un modelo ER para administrar pacientes, doctores, citas, tratamientos y habitaciones de hospital.

- **💡 Estrategia:**

  - Para el diseño del modelo relacional se asumieron las siguientes reglas de negocio:

    1. Paciente:

       - Un paciente puede solicitar muchas citas.
       - Un paciente puede pasar por muchas habitaciones.
       - Un paciente puede acceder a muchos tratamientos.

    2. Doctor:

       - Un doctor puede atender muchas citas.
       - Un doctor puede acompañar muchos tratamientos.

    3. Tratamiento:

       - Un tratamiento está asignado a uno o muchos doctores.
       - El mismo tratamiento puede ser asignado a muchos pacientes.

    4. Habitación:

       - En una habitación pueden estar muchos pacientes.

    5. Cita:

       - Una cita es asignada a un solo paciente.
       - Una cita es atendida por un solo doctor.

  - Relaciones:

    - **Paciente** - **Cita** (1 - N)
    - **Doctor** - **Cita** (1 - N)

    - En el caso de la relación entre **Habitación** y **Paciente** se decidió crear una tabla intermedia que permitiera relacionar los elementos, dado que una habitación puede tener muchos pacientes y un paciente puede estar en una habitación a la vez, pero en su historia clínica puede haber pasado por muchas habitaciones.

      - Problema relaciones N - N

        - **Habitación** - **Paciente** (N - N)

      - Solución propuesta

        - **Habitación** - **Habitación x Paciente** (1 - N)
        - **Paciente** - **Habitación x Paciente** (1 - N)

    - En el caso de la relación entre **Tratamiento**, **Paciente** y **Doctor** se decidió crear una tabla intermedia que permitiera relacionar los elementos, dado que un tratamiento puede ser asignado a muchos doctores, un doctor puede acompañar muchos tratamientos y un tratamiento puede ser asignado a muchos pacientes.

      - Problema relaciones N - N

        - **Tratamiento** - **Doctor** (N - N)
        - **Tratamiento** - **Paciente** (N - N)

      - Solución propuesta

        - **Tratamiento** - **Tratamiento x Doctor x Paciente** (1 - N)
        - **Doctor** - **Tratamiento x Doctor x Paciente** (1 - N)
        - **Paciente** - **Tratamiento x Doctor x Paciente** (1 - N)

  - Atributos:

    - **Paciente**

      - **id(PK):** Identificador único del paciente
      - **nombre:** Nombre del paciente
      - **fechaNacimiento:** Fecha de nacimiento del paciente
      - **genero:** Género del paciente
      - **direccion:** Dirección de residencia del paciente
      - **numeroTelefono:** Número de teléfono del paciente
      - **tipoSangre:** Tipo de sangre del paciente

    - **Doctor**

      - **id(PK):** Identificador único del doctor
      - **nombre:** Nombre del doctor
      - **especialidad:** Especialidad del doctor
      - **numeroTelefono:** Número de teléfono del doctor
      - **direccion:** Dirección de residencia del doctor

    - **Tratamiento**

      - **id(PK):** Identificador único del tratamiento
      - **nombre:** Nombre del tratamiento
      - **descripcion:** Descripción del tratamiento
      - **duración:** Duración del tratamiento

    - **Habitación**

      - **id(PK):** Identificador único de la habitación
      - **tipo:** Tipo de habitación
      - **capacidad:** Cantidad de pacientes que puede tener la habitación
      - **estado:** Estado de la habitación (Disponible, Ocupada, Mantenimiento, Inhabilitada)

    - **Cita**

      - **id(PK):** Identificador único de la cita
      - **idPaciente(FK):** Identificador del paciente
      - **idDoctor(FK):** Identificador del doctor
      - **fecha:** Fecha y hora de la cita
      - **estado:** Estado de la cita (Pendiente, Cancelada, Realizada)
      - **descripcion:** Descripción de la cita

    - **Habitación x Paciente**

      - **id(PK):** Identificador único de la relación
      - **idHabitacion(FK):** Identificador de la habitación
      - **idPaciente(FK):** Identificador del paciente
      - **fechaIngreso:** Fecha de ingreso del paciente a la habitación
      - **fechaSalida:** Fecha de salida del paciente de la habitación

    - **Tratamiento x Doctor x Paciente**

      - **id(PK):** Identificador único de la relación
      - **idTratamiento(FK):** Identificador del tratamiento
      - **idDoctor(FK):** Identificador del doctor
      - **idPaciente(FK):** Identificador del paciente
      - **fechaInicio:** Fecha de inicio del tratamiento
      - **fechaFin:** Fecha de finalización del tratamiento

- **✅ Modelo ER:**
  <div align="center">
    <img src="/3/ERHospital.jpeg"/>
  </div>
