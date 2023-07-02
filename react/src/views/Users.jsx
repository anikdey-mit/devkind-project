import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getUsers();
      }, [])

    const onDelete= (u) => {
        if (!window.confirm("Are you sure to delete user?")){
            return
        }
        axiosClient.delete(`/users/${u.id}`)
        getUsers()
    }

    const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
        return
    }
    axiosClient.delete(`/users/${user.id}`)
        .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
        })
    } 

    const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
        .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
        })
        .catch(() => {
        setLoading(false)
        })
    }

    return (
        <div>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <h2>Users</h2>
                <Link to="/users/new" className="btn-add">Add new</Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(u =>(
                            <tr>
                                <td>{u.id}</td>
                                <td>{u.name}</td>
                                <td>{u.email}</td>
                                <td>{u.age}</td>
                                <td>{u.phone}</td>
                                <td>{u.created_at}</td>
                                <td>
                                    <Link className="btn-edit" to={'/users/'+u.id}>Edit</Link>
                                    &nbsp;
                                    <button onClick={ev => onDelete(u)} className="btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}