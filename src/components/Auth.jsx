import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'sonner';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, loading, error] = useAuthState(auth);
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        if (loading) return;
        if (user) navigate('/'); 
    }, [user, loading, navigate]);

    const register = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error('Algo ha fallado, asegúrate que el email está bien y usas una contraseña robusta')
        }
    };

    const login = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            toast.error('Nombre de usuario o contraseña incorrectos')
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-md">
            <h1 className="text-3xl font-semibold text-center mb-6">{isRegistering ? "Registrarse" : "Iniciar Sesión"}</h1>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 w-full mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            <input
                type="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full mb-6 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
            {isRegistering ? (
                <>
                    <button onClick={register} className="bg-gray-800 px-4 py-2 text-white rounded hover:bg-black w-full mb-2">
                        Registrarse
                    </button>
                    <p className="text-center text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <button onClick={() => setIsRegistering(false)} className="text-gray-800 hover:text-black underline">
                            Inicia sesión
                        </button>
                    </p>
                </>
            ) : (
                <>
                    <button onClick={login} className="bg-gray-800 px-4 py-2 text-white rounded hover:bg-black w-full mb-2">
                        Iniciar Sesión
                    </button>
                    <p className="text-center text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <button onClick={() => setIsRegistering(true)} className="text-gray-800 hover:text-black underline">
                            Regístrate
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};

export default Auth;