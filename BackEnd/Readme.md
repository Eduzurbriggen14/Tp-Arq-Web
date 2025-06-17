# Proyecto Spring Boot con MySQL

Este proyecto es una aplicación web construida con Spring Boot y utiliza MySQL o h2 como base de datos.

## Dependencias del Proyecto

Las siguientes dependencias se gestionan a través de Maven, como se define en el archivo `pom.xml`:

* **Spring Boot Data JPA:** `org.springframework.boot:spring-boot-starter-data-jpa`
    * Proporciona integración con la API de Persistencia de Java (JPA) para el acceso a la base de datos.
* **Spring Boot Web:** `org.springframework.boot:spring-boot-starter-web`
    * Construye aplicaciones web, incluyendo servicios RESTful.
* **MySQL Connector/J:** `com.mysql:mysql-connector-j`
    * Driver JDBC para conectar a la base de datos MySQL.
* **Conector para Base de datos H2:** `com.h2database`
    * Dependencias necesarias para H2-Base de datos en memoria
* **Lombok:** `org.projectlombok:lombok`
    * Librería para reducir el código boilerplate en Java (getter, setter, constructores, etc.).
* **Spring Boot Test:** `org.springframework.boot:spring-boot-starter-test`
    * Soporte para escribir pruebas unitarias e de integración.

## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* **JDK 17:** Kit de Desarrollo de Java.
* **Maven:** Herramienta de gestión de dependencias y construcción.
* **MySQL:** Sistema de gestión de bases de datos relacional.

## Configuración de la Base de Datos

1. **Usando h2:**
    * En el archivo `application.properties` en el directorio `src/main/resources` agrega la configuracion para la conexion con la base de datos MYSql.
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

    ***Para ingresar a la BBDD h2, ir a la siguiente dirección***  (completá las credenciales con los mismos datos de arriba)
    `http://localhost:8080/h2-console`


2.  **Usando MySQL:**
    1.  **Instala MySQL:** Si aún no lo has hecho, instala MySQL en tu sistema local.
    2.  **Crea una base de datos:** Crea una nueva base de datos para el proyecto.  Puedes hacerlo usando un cliente MySQL o la línea de comandos:

        ```sql
        CREATE DATABASE <nombre_de_la_base_de_datos>;
        ```

        Reemplaza `<nombre_de_la_base_de_datos>` con el nombre que desees.
    3.  **Configura la conexión a la base de datos:**
        * En el archivo `application.properties` en el directorio `src/main/resources` agrega la configuracion para la conexion con la base de datos MYSql.

            **application.properties:**

            ```properties
            spring.datasource.url=jdbc:mysql://localhost:3306/nombreBBDD
            spring.datasource.username=username(tu usuario de MYSql)
            spring.datasource.password=password(password para ingresar a MYSql)
            spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
            ```


## Construcción y Ejecución

1.  **Navega al directorio del proyecto:** Abre una terminal o línea de comandos y navega al directorio raíz del proyecto Spring Boot (donde se encuentra el archivo `pom.xml`).
2.  **Construye el proyecto:** Ejecuta el siguiente comando para compilar el proyecto y crear el archivo JAR ejecutable:

    ```bash
    ./mvnw clean install
    ```

    Esto descargará las dependencias, compilará el código y creará el archivo JAR en el directorio `target`.
3.  **Ejecuta la aplicación:** Ejecuta el siguiente comando, reemplazando `<nombre-del-archivo>.jar` con el nombre real del archivo JAR generado:

    ```bash
    java -jar target/ArqWeb-0.0.1-SNAPSHOT.jar
    ```
    Por ejemplo, si el archivo JAR se llama `ArqWeb-0.0.1-SNAPSHOT.jar`, el comando sería:

    ```bash
    java -jar target/ArqWeb-0.0.1-SNAPSHOT.jar
    ```
4.  **Accede a la aplicación:** La aplicación estará disponible en `http://localhost:8080` por defecto.  Abre un navegador web y visita esa URL para acceder a tu aplicación.

## Scripts Útiles

Usar Maven:

* **Limpiar y construir el proyecto:**
    ```bash
    ./mvnw clean install
    ```
    Este comando elimina los archivos de compilación anteriores y vuelve a compilar el proyecto desde cero.
    
* **Ejecutar la aplicación (modo desarrollo):**
    ```bash
    ./mvnw spring-boot:run
    ```
    Este comando inicia la aplicación Spring Boot. Es útil para el desarrollo, ya que Spring Boot reiniciará la aplicación automáticamente al detectar cambios en el código.

* **Tema Datos para prueba**
    En el directorio
    ```
    C:\Users\Usuario\Desktop\Arquitectura Web-TP\BackEnd\src\main\java\com\example\ArqWeb\config
    ```
    se crea la clase ***TestDataLoader*** la cual es la encargada de realizar la carga iniciar de datos para poder probar el funcionamiento. 
