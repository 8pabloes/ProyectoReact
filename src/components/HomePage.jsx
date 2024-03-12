import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
  const navigate = useNavigate();

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const obtenerProductos = async () => {
      const querySnapshot = await getDocs(collection(db, "productos"));
      const productosList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(productosList);
    };

    obtenerProductos();
  }, []);

  const irADetallesProducto = (productoId) => {
    navigate(`/producto/${productoId}`);
  };

  return (
    <section className="text-black font-sans font-semibold">
      <div className="container mx-auto flex flex-col px-5 py-16 justify-center items-center">
        <div className="w-full md:w-2/3 flex flex-col mb-4 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">PelucheWorld</h1>
          <p className="mb-8 leading-relaxed">
            Descubre nuestra colección exclusiva de peluches. Calidad y buen precio en cada pieza.
          </p>
          <div className="flex w-full justify-center">
            <button onClick={() => navigate('/productos')} className="inline-flex text-white bg-black border-0 py-2 px-6 focus:outline-none hover:bg-gray-800 rounded text-lg">
              Ver Productos
            </button>
          </div>
        </div>

        <div className="flex flex-wrap">
          {productos.slice(0, 4).map((producto, index) => (
            <div key={index} className="p-4 md:w-1/2 w-full cursor-pointer" onClick={() => irADetallesProducto(producto.id)}>
              <div className="flex flex-col md:flex-row h-full bg-gray-200 p-8 rounded justify-between">
                <div className="mr-5">
                  <h2 className="text-gray-900 title-font font-medium">{producto.nombre}</h2>
                  <p className="text-gray-600 lg:max-w-[400px]">{producto.descripcion}</p>
                  <p className="text-gray-900 mt-5 text-[20px]">{producto.precio}€</p>
                </div>
                <div className=" h-full">
                  <img src={producto.imageUrl} width={150} className=" items-center mx-auto"/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2439.036504241648!2d-8.409548545935788!3d43.36615916638726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2ses!4v1710268456333!5m2!1ses!2ses" 
          width="1000" height="200" allowFullScreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade">  
        </iframe>
        </div>
      </div>
    </section>
  );
};

export default HomePage;