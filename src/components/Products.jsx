import React, { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Products = () => {
    const [productos, setProductos] = useState([]);
    const [filtroPrecio, setFiltroPrecio] = useState({ min: 0, max: 200 }); 
    const [busquedaNombre, setBusquedaNombre] = useState('');
    const [filtroTipo, setFiltroTipo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerProductos = async () => {
            const productosCol = collection(db, 'productos');
            const productosSnapshot = await getDocs(productosCol);
            const productosList = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProductos(productosList);
        };

        obtenerProductos();
    }, []);


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mt-4 mb-8 text-center">Listado de productos</h2>
            <div className="mb-8">
                <input 
                    className='mb-4 border-black border-[1px] rounded-md p-2 w-full' 
                    type="text" id="name-search" 
                    value={busquedaNombre} 
                    onChange={(e) => setBusquedaNombre(e.target.value)} 
                    placeholder='Busca tu producto'    
                />
                <div className='flex w-full'>
                    <div className="mb-4 w-full">
                        <label className="text-lg font-medium text-gray-700">Filtrar por precio:</label>
                        <div className="flex items-center space-x-2">
                            <input type="range" id="price-range" min="0" max="200" value={filtroPrecio.max} className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer focus:outline-none focus:ring-0" onChange={(e) => setFiltroPrecio({ ...filtroPrecio, max: e.target.value })} />
                            <span className="text-sm font-semibold text-gray-900">Max: {filtroPrecio.max}€</span>
                        </div>
                    </div>
                    <div className="filter-type mb-4 w-full">
                        <label htmlFor="type-select" className="block text-sm font-medium text-gray-700 ">Filtrar por tipo:</label>
                        <select id="type-select" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className=" border-black border-[1px] mt-1 block w-full pl-3 pr-10 py-2 text-bas focus:outline-none sm:text-sm rounded-md shadow-sm">
                            <option value="">Todos</option>
                            <option value="Dibujos">Dibujos</option>
                            <option value="Animales">Animales</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid lg:md:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 cursor-pointer">
            {productos
                .filter(producto => producto.precio <= filtroPrecio.max)
                .filter(producto => producto.nombre.toLowerCase().includes(busquedaNombre.toLowerCase()))
                .filter(producto => filtroTipo ? producto.categoria === filtroTipo : true)
                .map((producto) => (
                    <div key={producto.id} className="flex flex-col justify-between rounded-md border p-4 border-black/50 shadow-xl" onClick={() => navigate(`/producto/${producto.id}`)}>
                        <div>
                            <h3 className="font-bold text-[24px]">{producto.nombre}</h3>
                        </div>
                        <img src={producto.imageUrl} alt={producto.nombre} className='w-36 h-36 rounded-md mx-auto mt-2' />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;