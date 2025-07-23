import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { useSelector } from "react-redux";
import { apiUrl } from "../../config/constants";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

export default function MyPosts() {
  const token = useSelector((state) => state.user.token);
  const user = useSelector((state) => state.user);
  const [stories, setStories] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      fetchUserContent();
    }
  }, [token]);

  const fetchUserContent = async () => {
    setLoading(true);
    try {
      const [storiesRes, listingsRes] = await Promise.all([
        axios.get(`${apiUrl}/stories`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${apiUrl}/marketplace/user/listings`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      
      // Filter stories to only show user's own
      const userStories = storiesRes.data.filter(story => story.userId === user.id);
      setStories(userStories);
      setListings(listingsRes.data.data);
    } catch (e) {
      setError("Failed to load your content");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await axios.delete(`${apiUrl}/marketplace/${listingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setListings(listings.filter(listing => listing.id !== listingId));
      } catch (e) {
        setError("Failed to delete listing");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h2 className="mb-4">My Posts</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}

      <Tab.Container id="my-posts-tabs" defaultActiveKey="stories">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="stories">
              Stories ({stories.length})
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="listings">
              Marketplace Listings ({listings.length})
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="stories">
            {stories.length === 0 ? (
              <Alert variant="info">You haven't posted any stories yet.</Alert>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {stories.map((story) => (
                  <div key={story.id} className="col">
                    <Card className="h-100 shadow-sm">
                      {story.imageUrl && (
                        <Card.Img
                          variant="top"
                          src={story.imageUrl}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{story.title}</Card.Title>
                        <Card.Text className="text-muted">
                          {story.description.length > 100
                            ? `${story.description.substring(0, 100)}...`
                            : story.description}
                        </Card.Text>
                      </Card.Body>
                      <Card.Footer>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" />
                            Edit
                          </Button>
                          <Button variant="outline-info" size="sm">
                            <FaEye className="me-1" />
                            View
                          </Button>
                        </div>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </Tab.Pane>

          <Tab.Pane eventKey="listings">
            {listings.length === 0 ? (
              <Alert variant="info">You haven't created any marketplace listings yet.</Alert>
            ) : (
              <div className="row row-cols-1 row-cols-md-2 g-4">
                {listings.map((listing) => (
                  <div key={listing.id} className="col">
                    <Card className="h-100 shadow-sm">
                      {listing.imageUrl && (
                        <Card.Img
                          variant="top"
                          src={listing.imageUrl}
                          style={{ height: 200, objectFit: "cover" }}
                        />
                      )}
                      <Card.Body>
                        <Card.Title>{listing.title}</Card.Title>
                        <Card.Text className="text-muted">
                          {listing.description.length > 100
                            ? `${listing.description.substring(0, 100)}...`
                            : listing.description}
                        </Card.Text>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="fw-bold text-primary">${listing.price}</span>
                          <span className="badge bg-secondary">{listing.category}</span>
                        </div>
                      </Card.Body>
                      <Card.Footer>
                        <div className="d-flex gap-2">
                          <Button variant="outline-primary" size="sm">
                            <FaEdit className="me-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <FaTrash className="me-1" />
                            Delete
                          </Button>
                        </div>
                      </Card.Footer>
                    </Card>
                  </div>
                ))}
              </div>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
} 