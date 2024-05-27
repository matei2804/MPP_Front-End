import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { updateUserRole, fetchUserDetails } from '../../redux/userSlicer';

function UpdateRoleUser() {
    const [role, setRole] = useState("");
    const [email, setEmail] = useState("");
    const { userId } = useParams(); 
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { user, isLoading, error } = useSelector(state => state.users);

    useEffect(() => {
        dispatch(fetchUserDetails(userId));
    }, [dispatch, userId]);

    useEffect(() => {
        if (user) {
            setEmail(user.email);
        }
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && role) {
            dispatch(updateUserRole({ email, role }))
                .unwrap()
                .then(() => {
                    alert('User role updated successfully');
                    navigate('/userPage');
                })
                .catch((err) => {
                    console.log(err);
                    alert(`Failed to update user role: ${err}`);
                });
        }
    };

    return (
        <div>
            <h2>Update Role</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                        type="text"
                        value={role}
                        required
                        onChange={(e) => setRole(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </div>
    );
}

export default UpdateRoleUser;
