import React from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function Marketplace() {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Marketplace</h2>
        <Button variant="primary">
          Create Listing
        </Button>
      </div>

      <Alert variant="info">
        <h4>Marketplace Coming Soon!</h4>
        <p>
          The marketplace feature is ready but needs the backend server to be running. 
          This will allow moms to buy and sell baby items within our community.
        </p>
        <hr />
        <p className="mb-0">
          Features that will be available:
        </p>
        <ul>
          <li>Browse baby clothes, toys, furniture, and books</li>
          <li>Create listings with photos and descriptions</li>
          <li>Filter by category and condition</li>
          <li>Contact sellers directly</li>
          <li>Manage your own listings</li>
        </ul>
      </Alert>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-4">
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">👕 Baby Clothes</h5>
              <p className="card-text text-muted">Gently used clothing for all ages</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🧸 Toys & Games</h5>
              <p className="card-text text-muted">Educational toys and entertainment</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🪑 Furniture</h5>
              <p className="card-text text-muted">Cribs, changing tables, and more</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">📚 Books</h5>
              <p className="card-text text-muted">Children's books and parenting guides</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🚗 Strollers & Car Seats</h5>
              <p className="card-text text-muted">Transportation essentials</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">🎨 Arts & Crafts</h5>
              <p className="card-text text-muted">Creative supplies and activities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 