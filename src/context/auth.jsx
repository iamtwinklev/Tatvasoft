import React, { createContext, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import shared from "../utils/shared";
import { RoutePaths } from '../utils/enum';
import { toast } from 'react-toastify';

const initialUserValue = {
    id: 0,
    firstName: "", 
    lastName: "",
    email:"",
    roleId: 0,
    role: "",
    password: ""
};

const initialState = {
    setUser: () => {},
    user: initialUserValue,
    signOut: () => {},
    appInitialize: false
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({children}) => {
    const [appInitialize, setAppInitialize] = useState(false);
    const [user, _setuser] = useState(initialUserValue);

    const navigate = useNavigate();
    const { pathname } = useLocation();

    const setUser = (user) => {
        console.log("test@test.com", user);
        localStorage.setItem(shared.LocalStorageKeys.USER, JSON.stringify(user));
        _setuser(user);
    }

    useEffect(() => {
        const itemStr = JSON.parse(localStorage.getItem(shared.LocalStorageKeys.USER)) || initialUserValue;

        if(!itemStr.id){
            navigate(`${RoutePaths.Login}`);
        }
        else{
            _setuser(itemStr);
        }
    }, []);

    const signOut = () => {
        _setuser(initialUserValue);
        localStorage.removeItem(shared.LocalStorageKeys.USER);
        navigate(`${RoutePaths.Login}`);
    }

    useEffect(() => {
        if(pathname === RoutePaths.Login && user.id){
            navigate(RoutePaths.BookListing);
        }
        if(!user.id){
            return;
        }
        const access = shared.hasAccess(pathname,user);
        if(!access){
            toast.warning("Sorry, you are not authorized to access this page");
            navigate(RoutePaths.BookListing);
            return;
        }
        setAppInitialize(true);
    }, [pathname, user]);

    const value = {
        user,
        setUser,
        signOut,
        appInitialize
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
    return useContext(AuthContext);
}