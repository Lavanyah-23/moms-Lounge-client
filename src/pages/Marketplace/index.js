import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { FaPlus, FaClock } from 'react-icons/fa';
import { apiUrl } from '../../config/constants';

export default function Marketplace() {
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user);
  
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    price: '',
    condition: 'good',
    category: 'clothes',
    imageUrl: ''
  });

  const categories = [
    { value: 'clothes', label: '👕 Baby Clothes' },
    { value: 'toys', label: '🧸 Toys & Games' },
    { value: 'furniture', label: '🪑 Furniture' },
    { value: 'books', label: '📚 Books' },
    { value: 'other', label: '🎁 Other' }
  ];

  const conditions = [
    { value: 'new', label: 'New', color: 'success' },
    { value: 'excellent', label: 'Excellent', color: 'info' },
    { value: 'good', label: 'Good', color: 'primary' },
    { value: 'fair', label: 'Fair', color: 'warning' },
    { value: 'poor', label: 'Poor', color: 'secondary' }
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl}/marketplace`);
      if (response.data.success) {
        setListings(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching marketplace listings:', error);
      setError('Failed to load marketplace listings');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateListing = async (e) => {
    e.preventDefault();
    if (!token) {
      setError('Please log in to create a listing');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/marketplace`,
        newListing,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setListings([response.data.data, ...listings]);
        setShowCreateModal(false);
        setNewListing({
          title: '',
          description: '',
          price: '',
          condition: 'good',
          category: 'clothes',
          imageUrl: ''
        });
        setError('');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create listing');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getCategoryIcon = (category) => {
    const categoryObj = categories.find(c => c.value === category);
    return categoryObj ? categoryObj.label : '🎁 Other';
  };

  const getConditionColor = (condition) => {
    const conditionObj = conditions.find(c => c.value === condition);
    return conditionObj ? conditionObj.color : 'secondary';
  };

  return (
    <Container style={{ maxWidth: 1200, padding: 24 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>🛍️ Marketplace</h2>
        {token && (
          <Button 
            variant="primary" 
            onClick={() => setShowCreateModal(true)}
            className="d-flex align-items-center gap-2"
          >
            <FaPlus /> Create Listing
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {!token && (
        <Alert variant="info">
          <h5>Welcome to the Marketplace!</h5>
          <p>Please log in to create listings and contact sellers.</p>
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <Row className="g-4">
          {listings.length === 0 ? (
            <Col xs={12}>
              <Alert variant="info" className="text-center">
                <h5>No listings yet!</h5>
                <p>Be the first to create a marketplace listing.</p>
              </Alert>
            </Col>
          ) : (
            listings.map((listing) => (
              <Col key={listing.id} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm">
                  {listing.imageUrl && (
                    <Card.Img 
                      variant="top" 
                      src={listing.imageUrl} 
                      style={{ height: '200px', objectFit: 'cover' }}
                    />
                  )}
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <Badge bg={getConditionColor(listing.condition)} className="me-2">
                        {listing.condition}
                      </Badge>
                      <small className="text-muted">
                        <FaClock className="me-1" />
                        {formatDate(listing.createdAt)}
                      </small>
                    </div>
                    
                    <Card.Title className="h5">{listing.title}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {listing.description}
                    </Card.Text>
                    
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        <h5 className="text-primary mb-0">${listing.price}</h5>
                        <small className="text-muted">{getCategoryIcon(listing.category)}</small>
                      </div>
                      <div>
                        <small className="text-muted">by {listing.User?.name || 'Anonymous'}</small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      )}

      {/* Create Listing Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Listing</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleCreateListing}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="What are you selling?"
                    value={newListing.title}
                    onChange={(e) => setNewListing({...newListing, title: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0.00"
                    value={newListing.price}
                    onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Describe your item..."
                value={newListing.description}
                onChange={(e) => setNewListing({...newListing, description: e.target.value})}
                required
              />
            </Form.Group>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={newListing.category}
                    onChange={(e) => setNewListing({...newListing, category: e.target.value})}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Condition</Form.Label>
                  <Form.Control
                    as="select"
                    value={newListing.condition}
                    onChange={(e) => setNewListing({...newListing, condition: e.target.value})}
                  >
                    {conditions.map(cond => (
                      <option key={cond.value} value={cond.value}>{cond.label}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Image URL (optional)</Form.Label>
              <Form.Control
                type="url"
                placeholder="https://example.com/image.jpg"
                value={newListing.imageUrl}
                onChange={(e) => setNewListing({...newListing, imageUrl: e.target.value})}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Create Listing
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
} 