# Proyecto Frontend React

Este proyecto es el frontend de una aplicación web, construido con React y Vite.
Se desarrolla una aplicacion la cual nos permite agregar Alumnos y Cursos. Para luego inscribir un Alumno a un Curso

## Tecnologías Utilizadas

* **React:** Biblioteca para construir interfaces de usuario.
* **React DOM:** Proporciona métodos específicos del DOM para React.
* **React Router DOM:** Para el enrutamiento en la aplicación.
* **Axios:** Cliente HTTP para realizar peticiones al backend.
* **UnoCSS:** Framework de CSS atómico.
* **Vite:** Herramienta de construcción que proporciona un entorno de desarrollo rápido.
* **@vitejs/plugin-react:** Plugin de Vite para usar React.
* **@unocss/preset-wind3:** Preset de UnoCSS para usar la sintaxis de Tailwind CSS.
* **ESLint:** Linter para asegurar la calidad del código.

## Dependencias

Las dependencias del proyecto se gestionan con npm. Aquí un resumen de las principales:

### Dependencias de Producción

* `axios`: Cliente HTTP para realizar peticiones al backend.
* `react`: Biblioteca principal de React para construir la interfaz de usuario.
* `react-dom`: Proporciona métodos específicos del DOM para React.
* `react-router-dom`: Enrutamiento para la aplicación web.

### Dependencias de Desarrollo

* `@eslint/js`: Reglas recomendadas de ESLint.
* `@types/react`: Tipos de TypeScript para React.
* `@types/react-dom`: Tipos de TypeScript para React DOM.
* `@unocss/preset-wind3`: Preset de UnoCSS para usar la sintaxis de Tailwind CSS.
* `@vitejs/plugin-react`: Plugin de Vite para React.
* `eslint`: Linter para JavaScript.
* `eslint-plugin-react-hooks`: Reglas de ESLint para Hooks de React.
* `eslint-plugin-react-refresh`: Plugin de ESLint para prevenir problemas con la Recarga Rápida en React.
* `globals`: Define variables globales de JavaScript para ESLint.
* `unocss`: El motor de CSS atómico.
* `vite`: Herramienta de construcción.

## Scripts

El archivo `package.json` define los siguientes scripts:

* `dev`: Inicia el servidor de desarrollo de Vite.
* `build`: Construye la aplicación para producción.
* `lint`: Ejecuta ESLint para analizar el código.
* `preview`: Inicia un servidor local para previsualizar la construcción de producción.

## Configuración de UnoCSS

Este proyecto utiliza UnoCSS con el preset `@unocss/preset-wind3`, lo que permite utilizar una sintaxis similar a Tailwind CSS para estilizar la aplicación. UnoCSS es un motor de CSS atómico que genera estilos bajo demanda, resultando en un tamaño de bundle menor en comparación con los frameworks de CSS tradicionales.

La configuración de UnoCSS se encuentra en el archivo `vite.config.js`. El plugin de Vite y el preset se añaden a la configuración de Vite de la siguiente manera:

```javascript
    import { defineConfig } from 'vite';
    import react from '@vitejs/plugin-react';
    import UnoCSS from 'unocss/vite';
    import presetWind from '@unocss/preset-wind';

    export default defineConfig({
        plugins: [
            react(),
            UnoCSS({
                presets: [
                    presetWind(),
                ],
            }),
        ],
    });
```
## Requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

* [Node.js](https://nodejs.org/): Entorno de tiempo de ejecución de JavaScript.
* [npm](https://www.npmjs.com/): Administrador de paquetes de Node.js.

## Instalación

1.  Clona el repositorio.
2.  Navega al directorio del proyecto:

    ```bash
    cd tu-proyecto
    ```

3.  Instala las dependencias:

    ```bash
    npm install
    ```

## Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev