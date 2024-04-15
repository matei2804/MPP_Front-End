import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOnline, setOffline } from './redux/connectionSlice';


const ConnectivityListener = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        const checkInitialStatus = () => {
            if (navigator.onLine) {
                dispatch(setOnline());
                console.log('Initial status: Online');  
            } else {
                dispatch(setOffline());
                console.log('Initial status: Offline');
            }
        };
    
        checkInitialStatus();  

        const handleOnline = () => {
            console.log('Network online');
            dispatch(setOnline());
            alert('You are back online.');
        };

        const handleOffline = () => {
            console.log('Network offline');
            dispatch(setOffline());
            alert('You are offline. Please check your internet connection.');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [dispatch]);

    return null;
};

export default ConnectivityListener;
