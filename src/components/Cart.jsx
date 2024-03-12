import { useEffect }from 'react';
import { useCarrito } from '../CartContext';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';
import IconTrash from './TrashIcon';
import { toast } from 'sonner';

const Carrito = () => {
  const { carrito, eliminarDelCarrito, actualizarCantidad } = useCarrito();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate(); 

  useEffect(() => {
      if (loading) return;
      if (!user) navigate('/'); 
  }, [user, loading, navigate]);

  const manejarEliminar = (id) => {
    eliminarDelCarrito(id);
  };

  const manejarCantidad = (id, cantidad) => {
    actualizarCantidad(id, cantidad);
  };

  const onPurchase = () =>{
    if (carrito.length !=0) toast.success("Producto comprado con éxito!")
    else toast.error("Mete productos en el carrito para comprarlos")
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className='font-sans font-semibold text-center text-[30px] mb-5'>Tu carrito está vacío</p>
      ) : (
        <div>
      <ul className="flex flex-col gap-4">
        {carrito.map((producto) => (
          <li key={producto.id} className="flex justify-between items-center border-b pb-2">
            <div className='flex sm:flex-row flex-col justify-between w-full'>
              <div className='flex gap-4 items-center'>
                <img src={producto.imageUrl} width={70} height={70} className='rounded-md'/>
                <span className='text-[20px] font-sans font-semibold'>
                  {producto.nombre} - {producto.cantidad} x ${producto.precio}
                </span>
              </div>
              <div className='flex gap-4 sm:mt-0 mt-5 sm:justify-center items-center'>
                  <button onClick={() => manejarCantidad(producto.id, producto.cantidad + 1)} className='px-5 py-1 bg-black hover:bg-black/70 text-white rounded-lg h-[50px]'>+</button>
                  <button onClick={() => manejarCantidad(producto.id, producto.cantidad - 1)} className='px-5 py-1 bg-black hover:bg-black/70 text-white rounded-lg h-[50px]'>-</button>
                  <button onClick={() => manejarEliminar(producto.id)} className='px-5 py-3 bg-black hover:bg-black/70 text-white rounded-lg h-[50px]'><IconTrash /></button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mt-4">Total: ${carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)}</h3>
      </div>
      )}
      <button 
        className='bg-black text-white font-semibold w-full py-4 hover:bg-black/70 transition-all duration-150 rounded-md' 
        onClick={onPurchase}
      >
        
          Comprar productos
      </button>
    </div>
  );
};

export default Carrito;