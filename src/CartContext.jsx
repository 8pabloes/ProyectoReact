import { createContext, useContext, useState } from 'react';

const CarritoContexto = createContext();

export const useCarrito = () => useContext(CarritoContexto);

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prevCarrito) => {
            const productoExistente = prevCarrito.find(item => item.id === producto.id);
            if (productoExistente) {
                return prevCarrito.map(item =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [...prevCarrito, { ...producto, cantidad: 1 }];
        });
    };

    const eliminarDelCarrito = (id) => {
        setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
    };

    const actualizarCantidad = (id, cantidad) => {
        setCarrito((prevCarrito) => {
            if (cantidad <= 0) {
                return prevCarrito.filter(item => item.id !== id);
            } else {
                return prevCarrito.map(item =>
                    item.id === id ? { ...item, cantidad: cantidad } : item
                );
            }
        });
    };

    const valor = { carrito, agregarAlCarrito, eliminarDelCarrito, actualizarCantidad };

    return <CarritoContexto.Provider value={valor}>{children}</CarritoContexto.Provider>;
};