import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">DigiWaste</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link className="nav-link btn btn-light text-dark mx-1" to="/myorders">MyOrders</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
              <Link className="nav-link btn btn-light text-dark mx-1" to="/mycart">MyCart</Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/rewards">Rewards</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link btn btn-light text-dark mx-1" to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link btn btn-light text-dark mx-1" to="/signup">Signup</Link>
              </li>
             

            </ul>


          </div>
        </div>
      </nav>
    </div>
  );
}
