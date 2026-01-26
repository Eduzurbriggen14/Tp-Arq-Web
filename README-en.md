# Practical Work -- Web Architecture-UP

# Web Project

This is a web system composed of a **React Frontend** and a **Spring Boot Backend**. The application allows you to manage students and courses, and to enroll students in courses.

---

## Technologies Used

### Backend (Java + Spring Boot)

* **Spring Boot Web** - To build REST APIs.
* **Spring Data JPA** - For database access using JPA.
* **MySQL** / **H2** - Database engines (local or in-memory).
* **Lombok** - To reduce boilerplate for getters/setters.
* **Maven** - For dependency management.
* **Spring Boot Test** - For unit and integration testing.

### Frontend (React + Vite)

* **React** - To build user interfaces.
* **React Router DOM** - For routing.
* **Axios** - HTTP client to communicate with the backend.
* **UnoCSS with Wind preset (Tailwind-like)** - Atomic CSS framework.
* **Vite** - Fast build tool for development.

---

## Requirements

### Backend

* JDK 17
* Maven
* MySQL (if you don't want to use H2)

### Frontend

* Node.js
* npm

---

## Project Structure

```
ARQUITECTURA-WEB-TP/
│
├── BackEnd/ # Spring Boot project with Maven
│ ├── src/ # Backend source code
│ ├── target/ # Build directory
│ ├── pom.xml # Maven configuration file
│ └── Readme.md # Backend-specific documentation
│
├── FrontEnd/
│ └── app-frontend/ # React project with Vite
│ ├── public/ # Static files
│ ├── src/ # Frontend source code
│ ├── package.json # Project configuration
│ └── README.md # Frontend-specific documentation
│
└── README.md
```

---

## Application Usage

##  Clone the Repository

To get started with the project, clone this repository and go to the root directory:

```bash
git clone https://github.com/Eduzurbriggen14/Tp-Arq-Web.git
cd Tp-Arq-Web

To install the dependencies, navigate to the corresponding Back and Front folders

cd BackEnd
./mvnw clean install

cd ../FrontEnd/app-frontend
npm install
```

* CRUD for **students**. Deleting a student is only possible if they are not enrolled in any course.
* Add, list, and delete **courses**. Deleting a course is only possible if it has no enrolled students.
* Enroll **students** in **courses** and remove enrollments.
* View information from the frontend by connecting to the backend REST APIs.

---

## Author

* **Zurbriggen Eduardo**.

---

## License

This project is free to use for educational purposes.

