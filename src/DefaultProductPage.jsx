import { Link } from "react-router-dom";
import DefaultPage from "./DefaultPage";

function DefaultLayout({ children }) {
  return (
    <DefaultPage>
      <div>
        <h2 className="text-center mt-4">Welcome to MyShop!!</h2>

        <main className="container mt-4">{children}</main>
      </div>
    </DefaultPage>
  );
}

export default DefaultLayout;
