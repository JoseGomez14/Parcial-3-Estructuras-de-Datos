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
  - Ejecutar el comando `npm run start:2` para ejecutar el punto 2
  - Ejecutar el comando `npm run start:3` para ejecutar el punto 3

- **Resultados**
  - Punto 1:
    - `/1/sortedAddresses.json`
    - `/1/sortedAddressesByPostalCode.json`

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
