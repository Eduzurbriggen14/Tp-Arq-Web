# Spring Boot Project with MySQL or H2

This project is a web application built with Spring Boot and uses MySQL or H2 as the database.

## Project Dependencies

The following dependencies are managed through Maven, as defined in the `pom.xml` file:

* **Spring Boot Data JPA:** `org.springframework.boot:spring-boot-starter-data-jpa`
    * Provides integration with the Java Persistence API (JPA) for database access.
* **Spring Boot Web:** `org.springframework.boot:spring-boot-starter-web`
    * Builds web applications, including RESTful services.
* **MySQL Connector/J:** `com.mysql:mysql-connector-j`
    * JDBC driver to connect to the MySQL database.
* **H2 Database Connector:** `com.h2database`
    * Dependencies needed for H2 in-memory database.
* **Lombok:** `org.projectlombok:lombok`
    * Library to reduce boilerplate code in Java (getters, setters, constructors, etc.).
* **Spring Boot Test:** `org.springframework.boot:spring-boot-starter-test`
    * Support for writing unit and integration tests.

## Requirements

Before starting, make sure you have the following installed:

* **JDK 17:** Java Development Kit.
* **Maven:** Dependency management and build tool.
* **MySQL:** Relational database management system.

## Database Configuration

1. **Using H2:**
    * In the `application.properties` file located in `src/main/resources`, add the configuration for connecting to the H2 database.
    **application.properties:**

    ```properties
    spring.datasource.url=jdbc:h2:mem:testdb
    spring.datasource.driverClassName=org.h2.Driver
    spring.datasource.username=sa
    spring.datasource.password=
    spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
    spring.h2.console.enabled=true
    spring.h2.console.path=/h2-console
    ```

    ***To access the H2 database, go to the following address***  (use the same credentials as above)
    `http://localhost:8080/h2-console`

2.  **Using MySQL:**
    1.  **Install MySQL:** If you haven't already, install MySQL on your local system.
    2.  **Create a database:** Create a new database for the project. You can do this using a MySQL client or the command line:

        ```sql
        CREATE DATABASE <database_name>;
        ```

        Replace `<database_name>` with your desired name.
    3.  **Configure the database connection:**
        * In the `application.properties` file located in `src/main/resources`, add the configuration for connecting to the MySQL database.

            **application.properties:**

            ```properties
            spring.datasource.url=jdbc:mysql://localhost:3306/databaseName
            spring.datasource.username=username(your MySQL user)
            spring.datasource.password=password(password to access MySQL)
            spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
            ```

## Build and Run

1.  **Navigate to the project directory:** Open a terminal or command prompt and go to the root directory of the Spring Boot project (where the `pom.xml` file is located).
2.  **Build the project:** Run the following command to compile the project and create the executable JAR file:

    ```bash
    ./mvnw clean install
    ```

    This will download dependencies, compile the code, and create the JAR file in the `target` directory.
3.  **Run the application:** Run the following command, replacing `<file-name>.jar` with the actual name of the generated JAR file:

    ```bash
    java -jar target/ArqWeb-0.0.1-SNAPSHOT.jar
    ```
    For example, if the JAR file is named `ArqWeb-0.0.1-SNAPSHOT.jar`, the command would be:

    ```bash
    java -jar target/ArqWeb-0.0.1-SNAPSHOT.jar
    ```
4.  **Access the application:** The application will be available at `http://localhost:8080` by default. Open a web browser and visit that URL to access your application.

## Useful Scripts

Using Maven:

* **Clean and build the project:**
    ```bash
    ./mvnw clean install
    ```
    This command removes previous build files and recompiles the project from scratch.
    
* **Run the application (development mode):**
    ```bash
    ./mvnw spring-boot:run
    ```
    This command starts the Spring Boot application. It's useful for development, as Spring Boot will automatically restart the application when it detects code changes.

* **Test Data Loader**
    In the directory
    ```
    C:\Users\Usuario\Desktop\Arquitectura Web-TP\BackEnd\src\main\java\com\example\ArqWeb\config
    ```
    the class ***TestDataLoader*** is created, which is responsible for loading initial data to test the application's functionality.
