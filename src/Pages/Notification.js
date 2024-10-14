import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./notification.css";
import { useDispatch } from "react-redux";
import { makeAnyServerRequest } from "../utils/authUtils";
import { GETALLNOTIFICATION, DELNOTIFICATION, CONFIRMAITION } from "../urls";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchTeamTasks = async () => {
      try {
        const nots = await makeAnyServerRequest(GETALLNOTIFICATION, "GET");
        console.log("notif>>>>>      ", nots.data);
        setNotifications(nots.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTeamTasks();
  }, []);

  const deleteNotification = async (id) => {
    try {
      await makeAnyServerRequest(DELNOTIFICATION, "DELETE", {
        notificationId: id,
      });
      const updatedNotifications = notifications.filter(
        (notification) => notification._id !== id
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewDetails = (taskId) => {
    navigate(`/task/${taskId}`);
  };
  const confirmNotification = async (id) => {
    try {
      await makeAnyServerRequest(CONFIRMAITION, "POST", {
        addRequestNotificationID: id,
        decidedResponse: "confirm",
      });
      const updatedNotifications = notifications.filter(
        (notification) => notification._id !== id
      );
      setNotifications(updatedNotifications);
    } catch (error) {
      console.log(error);
    }
  };
  const rejectNotification = async(id) => {
    try {
        await makeAnyServerRequest(CONFIRMAITION, "POST", {
          addRequestNotificationID: id,
          decidedResponse: "reject",
        });
        const updatedNotifications = notifications.filter(
          (notification) => notification._id !== id
        );
        setNotifications(updatedNotifications);
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="container h-100 position-relative overflow-auto">
      <Row className="my-4">
        <Col>
          <div className="d-flex align-items-center">
            <BsArrowLeft
              size={24}
              className="me-2"
              onClick={() => navigate("/dashboard")}
              style={{ cursor: "pointer" }}
            />
            <h2>Notifications</h2>
          </div>
          <p>Stay updated with the latest task deadlines and reminders.</p>
        </Col>
      </Row>

      <Row className="mt-4 notification-list">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <Col key={notification._id} md={12} className="mb-3">
              <div className="row shadow py-4">
                <div className="col-8">
                  <Card.Title>{notification.message}</Card.Title>
                </div>
                <div className="col text-center">
                  {notification.isInteractive ? (
                    <div>
                      <Button
                        className="btn btn-success me-2"
                        onClick={() => confirmNotification(notification._id)}
                      >
                        Confirm
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => rejectNotification(notification._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="btn btn-danger px-5"
                      onClick={() => deleteNotification(notification._id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </Col>
          ))
        ) : (
          <Col>
            <p>No notifications found.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Notification;
