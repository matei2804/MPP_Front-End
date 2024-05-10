import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserList } from '../../redux/userSlicer';
import { Link } from 'react-router-dom';
import { deleteUser } from '../../redux/userSlicer';
import { Button } from 'react-bootstrap';

function UserPage() {
    const dispatch = useDispatch();
    const { data: users, isLoading, error } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUserList());
    }, [dispatch]);


    const handleDelete = (id) => {
        dispatch(deleteUser(id));
        dispatch(fetchUserList);
    };

    return (
        <div>
            <h1>User Page</h1>
            {isLoading && <p>Loading users...</p>}
            <Link to="/addUser">
                    <button style={{ fontSize: '24px' }}>Create</button>
            </Link>
            <br/><br/>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                        <Link to={`/updateUser/${user.id}`}>
                                        <Button variant="info">Update</Button>
                        </Link>
                        <button onClick={() => handleDelete(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserPage;
