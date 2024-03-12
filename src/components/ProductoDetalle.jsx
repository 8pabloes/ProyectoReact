import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from '../firebase-config';
import { doc, getDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCarrito } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ProductoDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({});
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const obtenerProducto = async () => {
      const docRef = doc(db, "productos", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProducto({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such document!");
      }
    };

    obtenerProducto();
  }, [id]);

  const handleCartClick = () => {
    if(user) {
        agregarAlCarrito(producto);
        toast.success('Producto añadido al carrito correctamente')
        navigate("/productos");
    } else {
        navigate("/login");
    }
    };

  return (
    <div className='p-10'>
        <h1 className='text-3xl font-sans font-semibold text-center mb-10'>
            Detalles del producto
        </h1>
        <div key={producto.id} className="flex md:flex-row flex-col rounded-md p-4 gap-20 text-[30px] justify-center mx-auto ">
            <img src={producto.imageUrl} alt={producto.nombre} className='w-[300px] h-[300px] lg:w-[600px] lg:h-[600px] rounded-md' />
            <div className='md:w-[800px]'>
                <h3 className="font-bold">{producto.nombre}</h3>
                <p className='mt-10 text-black/70 max-w-[900px]'>{producto.descripcion}</p>
                <p className='mt-10 font-bold'>{`Precio:`}</p>
                <p className='font-sans font-semibold'>{producto.precio}€</p>
                <p className='mt-10 font-bold'>Talla:</p> 
                <p className='font-sans font-semibold'> {producto.talla} </p>
                {user ? (
                    <button onClick={handleCartClick} className='mt-10 bg-black text-white py-4 px-6 rounded-lg font-sans font-semibold w-full'>
                        Añadir al carrito
                    </button>
                ) : (
                    <button onClick={handleCartClick} className='mt-10 bg-black text-white py-4 px-6 rounded-lg font-sans font-semibold w-full'>
                        Iniciar sesión para añadir
                    </button>
                )}
            </div>
        </div>
    </div>
    
  );
};

export default ProductoDetalle;