import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Container, Row, Col, Alert } from 'react-bootstrap';
import './settings.css'; 
import lightImg from './img/light.png';
import darkImg from './img/dark.png';


const Settings = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: 'user@example.com', 
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [theme, setTheme] = useState('Light');

    useEffect(() => {
        document.body.className = theme === 'Light' ? 'light-theme' : 'dark-theme';
    }, [theme]);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    
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
        if (!formData.username) newErrors.username = 'Username is required';

        const passwordErrors = validatePassword(formData.password);
        if (passwordErrors.length > 0) newErrors.password = passwordErrors.join(' ');

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            
            setSuccessMessage('Profile updated successfully!');
            
            setErrors({});
        }
    };

  
    const applyTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    return (
        <div className='container h-100 position-relative overflow-auto'>
            <h2>Edit Profile</h2>
            <div className='row'>
                <div className='col-12 col-md-8 col-lg-6'>
                <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="email" className="mt-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        value={formData.email}
                        readOnly
                    />
                </Form.Group>

                <Form.Group controlId="password" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mt-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        isInvalid={!!errors.confirmPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.confirmPassword}
                    </Form.Control.Feedback>
                </Form.Group>

                <Button className="mt-4 save-btn" type="submit">Save changes</Button>
            </Form>
                </div>
            </div>

            {successMessage && (
                <Alert variant="success" className="mt-3">
                    {successMessage}
                </Alert>
            )}

            <h2 className="mt-5">Themes</h2>
            <Row>
                <Col xs={12} md={6} className="mb-4">
                    <Card className={`theme-card h-100 ${theme === 'Light' ? 'selected' : ''}`} onClick={() => applyTheme('Light')}>
                        <Row className="h-100">
                            <Col xs={4} >
                                <Card.Img src={lightImg} className="theme-img" />
                            </Col>
                            <Col xs={8} className="d-flex flex-column justify-content-center">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Light Theme</Card.Title>
                                    <Card.Text>A bright and clean theme with a white background.</Card.Text>
                                    <Button variant="outline-primary" className="apply-btn  p-2 align-self-start">Apply</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                <Col xs={12} md={6} className="mb-4">
                    <Card className={`theme-card h-100 ${theme === 'Dark' ? 'selected' : ''}`} onClick={() => applyTheme('Dark')}>
                        <Row className="h-100">
                            <Col xs={4} >
                                <Card.Img src={darkImg} className="theme-img" />
                            </Col>
                            <Col xs={8} className="d-flex flex-column justify-content-center">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>Dark Theme</Card.Title>
                                    <Card.Text>A modern dark theme that reduces eye strain.</Card.Text>
                                    <Button variant="outline-primary" className="apply-btn p-2 align-self-start" >Apply</Button>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>


            <h2 className="mt-5">Notifications</h2>
            <Row className="mb-4">
                <Col xs={12} md={6} lg={4}>
                    <Form.Check
                        type="radio"
                        label="ON"
                        name="notification"
                        id="notificationOn"
                        inline
                        defaultChecked
                    />
                    <Form.Check
                        type="radio"
                        label="OFF"
                        name="notification"
                        id="notificationOff"
                        inline
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Settings;
