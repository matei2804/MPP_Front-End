import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../redux/userSlicer';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../redux/userSlicer';
import { Button } from 'react-bootstrap';
import { jwtDecode } from "jwt-decode";

function UserPage() {
    const dispatch = useDispatch();
    const [roles, setRoles] = useState([]);
    const { data: users, isLoading, error } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUserList());

        const token = localStorage.getItem('jwtToken');
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setRoles(decoded.roles ? decoded.roles.split(' ') : []);
            } catch (error) {
                console.error("Failed to decode the token:", error);
            }
        }
    }, [dispatch]);

    const handleDelete = async (id) => {
        await dispatch(deleteUser(id));
        dispatch(fetchUserList());
    };

    const hasRole = (role) => {
        return roles.includes(role);
    };

    return (
        <div>
            <h1>User Page</h1>
            {isLoading && <p>Loading users...</p>}
            {error && <p>Error loading users: {error}</p>}
            {hasRole('ROLE_ADMIN') && (
                <Link to="/addUser">
                    <button style={{ fontSize: '24px' }}>Create</button>
                </Link>
            )}
            <br /><br />
            <ul>
                {users.map(user => {
                    return (
                        <li key={user.id}>
                            {user.name} - {user.email}
                            {hasRole('ROLE_ADMIN') && (
                                <>
                                    <Link to={`/updateUser/${user.id}`}>
                                        <Button variant="info">Update</Button>
                                    </Link>
                                    <button onClick={() => handleDelete(user.id)}>Delete</button>
                                    <Link to={`/updateUserRole/${user.id}`}>
                                        <Button variant="info">Update Role</Button>
                                    </Link>
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default UserPage;
