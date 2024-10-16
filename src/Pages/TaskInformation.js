import React, { useState } from 'react';
import { Button, Container, Row, Col, Form, ProgressBar } from 'react-bootstrap';
import { BsArrowLeft, BsPencil } from 'react-icons/bs';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import './TaskInformation.css';
import { useSelector } from 'react-redux';

const TaskInformation = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const MD = searchParams.get('md');

  const Tasks = `${useSelector((state) => state.tasks)}.${MD}`;

  const [task, setTask] = useState({
    name: 'Design logo for company',
    category: 'Design',
    status: 'In Progress',
    comments: 'Ensure design is simple and modern.',
    progress: 50,
  });

  const [assignee, setAssignee] = useState({
    name: 'Robert Smith',
    email: 'robert.smith@example.com',
    
  });

  const [isFinished, setIsFinished] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleProgressChange = (e) => {
    if (!isFinished) { 
      setTask((prevTask) => ({
        ...prevTask,
        progress: e.target.value,
      }));
    }
  };

  const handleFinishTask = () => {
    setTask((prevTask) => ({
      ...prevTask,
      status: 'Finished',
      progress: 100, 
    }));
    setIsFinished(true);
  };

  const handleChangeStatus = () => {
    setTask((prevTask) => ({
      ...prevTask,
      status: 'In Progress',
    }));
    setIsFinished(false); 
  };

  return (
    <Container className="task-info-container pt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center">
            <BsArrowLeft size={24} className="me-2 back-button" onClick={() => navigate('/dashboard')} />
            <h2 className="heading">Task Information</h2>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Form>
            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Task</Form.Label>
              </Col>
              <Col md={11}>
                <Form.Control
                  type="text"
                  name="name"
                  value={task.name}
                  onChange={handleInputChange}
                  size="sm" 
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Category</Form.Label>
              </Col>
              <Col md={11}>
                <Form.Select name="category" value={task.category} onChange={handleInputChange} size="sm">
                  <option>Design</option>
                  <option>Development</option>
                  <option>Marketing</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Status</Form.Label>
              </Col>
              <Col md={1}>
                <div className="badge">{task.status}</div>
              </Col>
              <Col md={10} className="text-start"> 
                {task.status === 'Finished' && (
                  <BsPencil size={20} className="change-status-icon" onClick={handleChangeStatus} />
                )}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Comments</Form.Label>
              </Col>
              <Col md={11}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="comments"
                  value={task.comments}
                  onChange={handleInputChange}
                  size="sm" 
                />
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="text-center">
                <Button className="task-finish-btn" onClick={handleFinishTask}>Finish Task</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row className="assignee-section">
        <Col md={12}>
          <h4>Task Assignee</h4>
          <p><strong>Name:</strong> {assignee.name}</p>
          <p><strong>Email:</strong> {assignee.email}</p>
        </Col>
      </Row>

      <Row className="buttons-row mb-3 mt-4 justify-content-end">
        <Col className="text-end">
          <Button className="update-btn mx-3">Update</Button>
          <Button className="delete-btn" variant="danger">Delete</Button> 
        </Col>
      </Row>
    </Container>
  );
};

export default TaskInformation;
