import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-blue-200 text-white p-4 shadow-md">
      <div className="max-w-screen-lg mx-auto flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-800">GESTOR DE CURSOS</h1>
        <nav className="flex flex-wrap justify-center md:justify-start gap-4">
          {["ALUMNOS", "CURSOS", "INSCRIPCIONES"].map((route) => {
            const routeTitle = route.charAt(0).toUpperCase() + route.slice(1);
            return (
              <Link
                key={route}
                to={`/${route}`}
                className={`
                  px-4 py-2 rounded-md
                  bg-blue-600 hover:bg-blue-500
                  text-white font-semibold
                  border border-blue-500
                  transition-colors duration-200
                  shadow-md hover:shadow-lg
                  no-underline
                `}
              >
                {routeTitle}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}