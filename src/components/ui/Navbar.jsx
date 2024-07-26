import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-chillax uppercase transition-all  duration-300 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none">
          <Link to="/">hola amigo!</Link>
        </div>
        <div className="space-x-4 ">
          <Link
            to="/"
            className="text-black hover:text-gray-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-black hover:text-gray-400 transition duration-300"
          >
            About
          </Link>
          {/* Add more links as needed */}
        </div>
      </div>
    </nav>
  );
}
