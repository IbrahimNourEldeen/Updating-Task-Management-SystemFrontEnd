import React from 'react'
import { GiFalconMoon } from "react-icons/gi";
const Footer = () => {
  return (
    <footer className="pt-5" style={{ backgroundColor: "#f7f7f7" }}>
        <div className="container text-center">
          <h2 className="fs-1 fw-bold my-5">
            <GiFalconMoon  style={{ color: '#6b71e0' }} className="me-2 fs-3" />
            Task Master
          </h2>
          <p className="fs-5 mb-2 fw-bold">Subscribe to our website</p>
          <div className="col-12 col-md-6 col-lg-4 mx-auto position-relative">
            <input
              type="email"
              placeholder="input your email"
              className="form-control mx-auto my-3"
            />
            <button className="btn btn-success bgBtns text-white fw-bold position-absolute end-0 top-0">
              Subscribe
            </button>
          </div>
          <div className="row my-5">
            <div className="col-6 col-md-4">
              <h3 className="fw-bold">Products</h3>
              <ul>
                <li>
                  <a className='text-secondary fw-bold' href="#">Task Master</a>
                </li>
                <li>
                  <a className='text-secondary fw-bold' href="#">Task management</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-4">
              <h3 className="fw-bold">Resources</h3>
              <ul>
                <li>
                  <a className='text-secondary fw-bold' href="#">w3schools</a>
                </li>
                <li>
                  <a className='text-secondary fw-bold' href="#">React document</a>
                </li>
                <li>
                  <a className='text-secondary fw-bold' href="#">Redux toolkit document</a>
                </li>
              </ul>
            </div>
            <div className="col-6 col-md-4">
              <h3 className="fw-bold">Company</h3>
              <ul>
                <li>
                  <a className='text-secondary fw-bold' href="#">Global Knowledge</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="d-flex justify-content-evenly">
            <p>Copyright © 2024 - DEPI team</p>
            <ul className="d-flex">
              <li className="me-3">
                <a href="..">
                  <i className="fa-brands fa-twitter text-info "></i>
                </a>
              </li>
              <li className="me-3">
                <a href="..">
                  <i className="fa-brands fa-linkedin"></i>
                </a>
              </li>
              <li className="me-3">
                <a href="..">
                  <i className="fa-brands fa-facebook"></i>
                </a>
              </li>
              <li>
                <a href="..">
                  <i className="fa-brands fa-youtube text-danger"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  )
}

export default Footer