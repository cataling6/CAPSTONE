import { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const useSession = () => {
    const session = JSON.parse(localStorage.getItem('auth'));
    const decodedSession = session ? jwtDecode(session) : null;

    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) {
            navigate('/', { replace: true })
        }

        if (session && location.pathname !== '/') {
            return;
        }
        navigate('/home', { replace: true })

    }, [navigate, session]);

    return decodedSession;
};

export default useSession;
