import { Link } from "react-router-dom";
import DefaultPage from "./DefaultPage";

function DefaultLayout({ children }) {
  return (
    <div>
      <DefaultPage/>
      <h2 className="text-center mt-4">Welcome to MyShop!!</h2>

      <main className="container mt-4">{children}</main>

      <footer className="bg-light text-center p-3 mt-5">
        <small>&copy; {new Date().getFullYear()} MyShop</small>
      </footer>
    </div>
  );
}

export default DefaultLayout;
