import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { UPDATEPROFILE } from '../urls';
import { logoutUser, makeAnyServerRequest } from '../utils/authUtils';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { user, refreshToken } = useSelector((state) => state.auth);
    const navigate=useNavigate();
    console.log(user)
    const [newFullName, setNewFullName] = useState(user?.fullName);
    const [newUsername, setNewUserName] = useState(user?.username);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [errors, setErrors] = useState({});

    
    const validatePassword = (password) => {
        const rules = [
            { regex: /.{8,}/, message: 'Password must be at least 8 characters long.' },
            { regex: /[A-Z]/, message: 'Password must contain at least one uppercase letter.' },
            { regex: /[a-z]/, message: 'Password must contain at least one lowercase letter.' },
            { regex: /\d/, message: 'Password must contain at least one number.' },
            { regex: /[!@#$%^&*]/, message: 'Password must contain at least one special character.' }
        ];
        return rules.reduce((acc, { regex, message }) => {
            if (!regex.test(password)) acc.push(message);
            return acc;
        }, []);
    };

    
    const validateForm = () => {
        const newErrors = {};

        if (!oldPassword) newErrors.oldPassword = 'Old password is required.';

        if (newPassword || confirmNewPassword) {
            const passwordErrors = validatePassword(newPassword);
            if (passwordErrors.length > 0) newErrors.password = passwordErrors.join(' ');

            if (newPassword !== confirmNewPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };



    const handleLogout = async () => {
        await logoutUser(refreshToken);
        navigate("/", { replace: true });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("user",newUsername,"full",newFullName)
        if (validateForm()) {
            setErrors({});
            try {
                const response = await makeAnyServerRequest(UPDATEPROFILE, "POST", {
                    newFullName,
                    newUsername,
                    oldPassword,
                    ...(newPassword && { newPassword })
                });
                handleLogout()
                console.log("update", response);
            } catch (error) {
                console.error("Error updating profile:", error);
            }
        }
    };

    return (
        <div className='container h-100 position-relative overflow-auto pt-3'>
            <h2>Edit Profile</h2>
            <div className='row'>
                <div className='col-12 col-md-8 col-lg-6'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="fullname">
                            <Form.Label>FullName</Form.Label>
                            <Form.Control
                                type="text"
                                name="fullname"
                                placeholder={newFullName}
                                onChange={e => setNewFullName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="username" className='mt-3'>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                placeholder={newUsername}
                                onChange={e => setNewUserName(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mt-3">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                value={user?.email}
                                readOnly
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mt-3">
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder='Enter old password'
                                onChange={e => setOldPassword(e.target.value)}
                                isInvalid={!!errors.oldPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.oldPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="newPassword" className="mt-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="newPassword"
                                placeholder='Enter new password (optional)'
                                onChange={e => setNewPassword(e.target.value)}
                                isInvalid={!!errors.password}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="confirmPassword" className="mt-3">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmPassword"
                                placeholder='Confirm new password (optional)'
                                onChange={e => setConfirmNewPassword(e.target.value)}
                                isInvalid={!!errors.confirmPassword}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.confirmPassword}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button className="mt-4 btn btn-success bgBtns" type="submit">Save changes</Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
