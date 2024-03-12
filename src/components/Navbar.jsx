
import { auth } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import ExitIcon from "./LogOutSvg";
import IconShoppingCart from "./IconShoppingCart";
import LoginIcon from "./LoginIcon";

const Navbar = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const logout = async () => {
    await auth.signOut();
  };

  const goToCart = () => {
    navigate("/carrito")
  }



  return (
    <nav className="bg-black text-white font-semibold p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a onClick={() => navigate("/")} className="text-xl cursor-pointer">PelucheWorld</a>
        <div className="sm:flex hidden">
          {user ? (
            <div className="flex gap-4">
               <button onClick={goToCart} className=" bg-white text-black px-4 py-2 rounded w-36 hover:bg-gray-300 transition duration-200 cursor-pointer">
                Ver carrito
              </button>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded w-36 hover:bg-red-400 transition duration-200 cursor-pointer">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <a onClick={() => navigate("/login")} className="bg-white text-black px-4 py-2 rounded hover:bg-gray-300 transition duration-200 cursor-pointer">
              Iniciar Sesión
            </a>
          )}
        </div>
        
        <div className="flex gap-8 sm:hidden">
        {user ? (
          <div>
            <button
              className="ml-auto"
              px="px-3"
              onClick={goToCart}
            >
              <IconShoppingCart/>
            </button>
            <button
              className="ml-auto "
              px="px-3"
              onClick={logout}
            >
              <ExitIcon/>
            </button>
          </div>
          ) : (
            <button
            className="ml-auto"
            px="px-3"
            onClick={goToCart}
          >
            <LoginIcon/>
          </button>
          ) }
        </div>

      </div>
    </nav>
  );
};

export default Navbar;