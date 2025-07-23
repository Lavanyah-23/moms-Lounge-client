import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import { apiUrl } from "../../config/constants";
import StoryCard from "../../components/StoryCard";

export default function Forum() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get(`${apiUrl}/stories`);
      setStories(res.data);
    } catch (e) {
      setError("Failed to load community stories");
    } finally {
      setLoading(false);
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
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
      <h2 className="mb-4">Community Forum</h2>
      <p className="text-muted mb-4">Share and discover stories from our amazing moms community.</p>
      
      {error && <Alert variant="danger">{error}</Alert>}

      {stories.length === 0 ? (
        <Alert variant="info">No stories posted yet. Be the first to share!</Alert>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {stories.map((story) => (
            <div key={story.id} className="col">
              <StoryCard story={story} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 