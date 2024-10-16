import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./notification.css";
import { useDispatch, useSelector } from "react-redux";
import { makeAnyServerRequest, makeSSERequest } from "../utils/authUtils";
import {
  GETALLNOTIFICATION,
  DELNOTIFICATION,
  CONFIRMAITION,
  NOTIFICATIONSSE,
  GETALLTEAMS,
} from "../urls";
import store from "../app/store";
const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.log("component")
  
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const nots = await makeAnyServerRequest(GETALLNOTIFICATION, "GET");
        console.log("notif>>>>>      ", nots.data);
        setNotifications(nots.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchNotifications();
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
  const rejectNotification = async (id) => {
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

  //SSE

  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    console.log("use effect")
    let eventSource = new EventSource(
      `${NOTIFICATIONSSE}?accessToken=${accessToken}`
    );

    eventSource.onerror = async (error) => {
      await makeAnyServerRequest(GETALLTEAMS, "GET");
    };
      // eventSource.onmessage = (event) => {
      //   const initialMessage = JSON.parse(event.data);
      //   console.log("Initial Message from SSE:", initialMessage);
      //   // You can handle this message if needed (e.g., show a banner)
      // }

    eventSource.addEventListener('insert', (event) => {
      const newNotification = JSON.parse(event.data);
      console.log(newNotification)
      // setNotifications(notifications.push(newNotification))
      // setNotifications(prev => [...prev, newNotification]);
    });

    //   eventSource.addEventListener('update', (event) => {
    //     const updatedNotification = JSON.parse(event.data);
    //     setNotifications(prev =>
    //       prev.map(n => n._id === updatedNotification._id ? updatedNotification : n)
    //     );
    //   });

    //   eventSource.addEventListener('delete', (event) => {
    //     const deletedNotificationId = JSON.parse(event.data);
    //     setNotifications(prev => prev.filter(n => n._id !== deletedNotificationId));
    //   });

      return () => {
        eventSource.close(); // Close SSE connection on component unmount
      };
  }, []);

  ///////////////////////////////////////////////////////////////////////////////

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
