import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {user,setUser,notification, token,setToken} = useStateContext()

    if(!token){
        return <Navigate to='login' />
    }

    const onLogout = (ev) =>{
        ev.preventDefault()

        axiosClient.post('/logout')
        .then(()=>{
            setUser({})
            setToken(null)
        })
    }


    useEffect(()=>{
        axiosClient.get('/user')
        .then(({data}) => {
            setUser(data)
        })
    }, [])

    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/users">Users</Link>
            </aside>
            <div className="content">
                <header>
                    <div>
                        header
                    </div>
                    <div>
                        {user.name}
                        <a onClick={onLogout} className="btn-logout">Logout</a>
                    </div>
                </header>
                <main>
                    <Outlet/>
                </main>
                {notification &&
                <div className="notification">
                    {notification}
                </div>
                }

            </div>

        </div>
    )
}