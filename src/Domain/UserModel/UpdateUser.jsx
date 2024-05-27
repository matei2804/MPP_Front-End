import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, fetchUserList, fetchUserDetails } from '../../redux/userSlicer';

function UpdateUser() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { userId } = useParams(); 
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector(state => state.users);


    useEffect(() => {
        dispatch(fetchUserDetails(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedUser = {
            name,
            email,
            password
        };
        
        dispatch(updateUser({ userId, updatedUser }))
            .then(() => {
                dispatch(fetchUserList());
            })
            .catch(error => {
                console.error("Failed to update the user:", error);
            });
            navigate("/userPage");
    };

    return (
        <div>
            <h2>Update User</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdateUser;
