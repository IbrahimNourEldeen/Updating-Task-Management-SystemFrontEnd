import React, { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeAnyServerRequest } from "../utils/authUtils";
import { DELETETASK, UPDATETASK } from "../urls";
import { AddTasks } from "../features/tasks/taskSlice";

const TaskInformation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const MD = searchParams.get("md");
  let Task = {};
  let Tasks = [];
  const myTasks = useSelector((state) => state.tasks).tasks;
  const teamTasks = useSelector((state) => state.tasks).teamTasks;

  if (MD === "tasks") {
    Tasks = myTasks;
    Task = myTasks.find(task => task._id === id);
  } else {
    Tasks = teamTasks;
    Task = teamTasks.find(task => task._id === id);
  }

  const [isCompleted, setIsCompleted] = useState(Task?.status === "completed");

  const handleFinishTask = async () => {
    try {
      const response = await makeAnyServerRequest(UPDATETASK, "PATCH", {
        newStatus: "completed",
        taskId: id,
      });
      setIsCompleted(true);
      console.log("update", response);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/updateTasks?taskId=${id}&teamId=0&URL=UPDATETASK`);
  };

  const handleDelete = async (id) => {
    try {
      await makeAnyServerRequest(DELETETASK, "DELETE", { taskId: id });
      let temp = Tasks.filter(task => task._id !== id);
      dispatch(AddTasks(temp));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="task-info-container pt-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center">
            <BsArrowLeft
              size={24}
              className="me-2 back-button"
              onClick={() => navigate("/dashboard")}
            />
            <h2 className="heading">Task Information</h2>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <Form>
            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Task:</Form.Label>
              </Col>
              <Col md={11}>
                {Task && Task.title}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Deadline: </Form.Label>
              </Col>
              <Col md={11}>
                {new Date(Task && Task.dueDate).toLocaleString()}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Category:</Form.Label>
              </Col>
              <Col md={11}>
                {Task && Task.category}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Status: </Form.Label>
              </Col>
              <Col md={11}>
                <div className="text-white px-1 rounded-2" style={{backgroundColor:"#553C9A", width:"fit-content"}}>
                  {isCompleted ? "Completed" : Task?.status}
                </div>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={1}>
                <Form.Label>Comments: </Form.Label>
              </Col>
              <Col md={11}>
                {Task && Task.description}
              </Col>
            </Row>

            <Row className="mb-4">
              <Col className="text-center">
                <Button 
                  className="btn" style={{backgroundColor:"#553C9A"}} 
                  onClick={handleFinishTask} 
                  disabled={isCompleted}
                >
                  {isCompleted ? "Task Completed" : "Finish Task"}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <Row className="buttons-row mb-3 mt-4 justify-content-end">
        <Col className="text-end">
          <Button
            className="btn btn-success mx-3"
            onClick={() => {
              handleUpdate(Task._id);
            }}
          >
            Update
          </Button>
          <Button className="delete-btn" variant="danger"
            onClick={() => {
              handleDelete(Task._id);
            }}>
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskInformation;
