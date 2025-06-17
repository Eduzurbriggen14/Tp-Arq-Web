# Trabajo Practico -- Arquitectura Web-UP

# Proyecto Web

Este es un sistema web compuesto por un **Frontend en React** y un **Backend en Spring Boot**. La aplicación permite gestionar alumnos y cursos, y realizar la inscripción de alumnos en cursos.

---

## Tecnologías Utilizadas

### Backend (Java + Spring Boot)

* **Spring Boot Web** - Para construir APIs REST.
* **Spring Data JPA** - Para acceder a la base de datos usando JPA.
* **MySQL** / **H2** - Motores de base de datos (local o en memoria).
* **Lombok** - Para reducir boilerplate de getters/setters.
* **Maven** - Para la gestión de dependencias.
* **Spring Boot Test** - Para pruebas unitarias y de integración.

### Frontend (React + Vite)

* **React** - Para construir interfaces de usuario.
* **React Router DOM** - Para el enrutamiento.
* **Axios** - Cliente HTTP para comunicar con el backend.
* **UnoCSS con preset Wind (tipo Tailwind)** - Framework CSS atómico.
* **Vite** - Herramienta de construcción rápida para desarrollo.

---

## Requisitos

### Backend

* JDK 17
* Maven
* MySQL (si no se desea usar H2)

### Frontend

* Node.js
* npm

---

## Estructura del Proyecto

```
ARQUITECTURA-WEB-TP/
│
├── BackEnd/ # Proyecto Spring Boot con Maven
│ ├── src/ # Código fuente del backend
│ ├── target/ # Directorio de compilación
│ ├── pom.xml # Archivo de configuración de Maven
│ └── Readme.md # Documentación específica del backend
│
├── FrontEnd/
│ └── app-frontend/ # Proyecto React con Vite
│ ├── public/ # Archivos estáticos
│ ├── src/ # Código fuente del frontend
│ ├── package.json # Configuración del proyecto
│ └── README.md # Documentación específica del frontend
│
└── README.md
```

---

## Uso de la Aplicación

* CRUD **alumnos**. La eliminacion de un alumno se realiza solo si el mismo no esta inscripto en ningun curso.
* Agregar, listar y eliminar **cursos**. La eliminacion de un curso se realiza solo si no tiene alumnos inscriptos.
* Inscribir **alumnos** en **cursos** y eliminar inscripciones.
* Visualizar la información desde el frontend conectando con las API REST del backend.

---

## Autor

* Zurbriggen Eduardo.

---

## Licencia

Este proyecto es de libre uso con fines educativos.

