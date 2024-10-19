import React, { useEffect, useState } from "react";
import { Button, Row, Col, Card } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { makeAnyServerRequest, makeSSERequest } from "../utils/authUtils";
import {
  GETALLNOTIFICATION,
  DELNOTIFICATION,
  CONFIRMAITION,
  NOTIFICATIONSSE,
} from "../urls";
import {
  addNotification,
  removeNotification,
  setNotifications,
  updateNotification,
} from "../features/notifications/notificationsSlice";

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.notifications.items);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const nots = await makeAnyServerRequest(GETALLNOTIFICATION, "GET");
        // console.log("notif>>>>>      ", nots.data);
        dispatch(setNotifications(nots.data))
      } catch (error) {
        // console.error("Error fetching tasks:", error);
      }
    };
    fetchNotifications();
  }, []);

  const sortTasksByUpdatedAt = (notifications) => {
    const sorted = [...notifications].sort(
      (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    );
    dispatch(setNotifications(sorted));
  };
  
  const deleteNotification = async (id) => {
    try {
      await makeAnyServerRequest(DELNOTIFICATION, "DELETE", {
        notificationId: id,
      });
      dispatch(removeNotification(id));
    } catch (error) {
      // console.log(error);
    }
  };

  const confirmNotification = async (id) => {
    try {
      await makeAnyServerRequest(CONFIRMAITION, "POST", {
        addRequestNotificationID: id,
        decidedResponse: "confirm",
      });
      dispatch(removeNotification(id));
    } catch (error) {
      // console.log(error);
    }
  };

  const rejectNotification = async (id) => {
    try {
      await makeAnyServerRequest(CONFIRMAITION, "POST", {
        addRequestNotificationID: id,
        decidedResponse: "reject",
      });
      dispatch(removeNotification(id));
    } catch (error) {
      // console.log(error);
    }
  };

  //SSE

  const accessToken = useSelector((state) => state.auth.accessToken);
  useEffect(() => {
    // console.log("use effect", accessToken);
    let eventSource = new EventSource(
      `${NOTIFICATIONSSE}?accessToken=${accessToken}`
    );

    // eventSource.onopen = () => {
    //   console.log("SSE connection opened successfully.");
    // };

    eventSource.addEventListener("insert", (event) => {
      // console.log("insert...............", event.data);
      const newNotification = JSON.parse(event.data);
      // console.log("newNotification ", newNotification.collData);
      dispatch(addNotification(newNotification.collData));
    });

    eventSource.addEventListener("update", async(event) => {
      const updatedNotification = await JSON.parse(event.data);
      dispatch(removeNotification(updatedNotification.collData._id));
      dispatch(addNotification(JSON.parse(event.data).collData))
    });

    eventSource.addEventListener("delete", (event) => {
      const deletedNotificationId = JSON.parse(event.data);
      dispatch(removeNotification(deletedNotificationId.collData));
    });

    eventSource.onerror = async (error) => {
      // console.log("error", error);
    };

    return () => {
      eventSource.close();
    };
  }, [dispatch, accessToken]);

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
        {notifications?.length > 0 ? (
          notifications.map((notification) => (
            <Col key={notification?._id} md={12} className="mb-3">
              <div className="row shadow py-4">
                <div className="col-8">
                  <Card.Title>{notification?.message}</Card.Title>
                </div>
                <div className="col text-center">
                  {notification?.isInteractive ? (
                    <div>
                      <Button
                        className="btn btn-success me-2"
                        onClick={() => confirmNotification(notification?._id)}
                      >
                        Confirm
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => rejectNotification(notification?._id)}
                      >
                        Reject
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="btn btn-danger px-5"
                      onClick={() => deleteNotification(notification?._id)}
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
