import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Button, Form, Card, Alert } from 'react-bootstrap';
import { FaHeart, FaRegHeart, FaComment, FaTrash } from 'react-icons/fa';
import { apiUrl } from '../../config/constants';
import './style.css';

const CommentSection = ({ storyId }) => {
  const token = useSelector((state) => state.user.token);
  const currentUser = useSelector((state) => state.user);
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [commentLikes, setCommentLikes] = useState({});

  // Fetch comments and like status when component mounts
  useEffect(() => {
    if (storyId && token) {
      fetchComments();
      fetchLikeStatus();
    }
  }, [storyId, token]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/comments/story/${storyId}`);
      if (response.data.success) {
        setComments(response.data.data);
        // Fetch like status for each comment
        if (token) {
          fetchCommentLikes(response.data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const fetchCommentLikes = async (commentsData) => {
    try {
      const likesData = {};
      for (const comment of commentsData) {
        const response = await axios.get(
          `${apiUrl}/comments/like/${comment.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (response.data.success) {
          likesData[comment.id] = {
            liked: response.data.liked,
            likeCount: response.data.likeCount
          };
        }
      }
      setCommentLikes(likesData);
    } catch (error) {
      console.error('Error fetching comment likes:', error);
    }
  };

  const fetchLikeStatus = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/comments/like/story/${storyId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.success) {
        setLiked(response.data.liked);
        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      console.error('Error fetching like status:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!token) {
      setError('Please log in to comment');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        `${apiUrl}/comments/story/${storyId}`,
        { comments: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setComments([response.data.data, ...comments]);
        setNewComment('');
        setShowComments(true);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to add comment');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleLike = async () => {
    if (!token) {
      setError('Please log in to like stories');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/comments/like/story/${storyId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setLiked(response.data.liked);
        setLikeCount(response.data.likeCount);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      setError('Failed to toggle like');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return;
    }

    try {
      const response = await axios.delete(
        `${apiUrl}/comments/${commentId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setComments(comments.filter(comment => comment.id !== commentId));
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete comment');
    }
  };

  const handleToggleCommentLike = async (commentId) => {
    if (!token) {
      setError('Please log in to like comments');
      return;
    }

    try {
      const response = await axios.post(
        `${apiUrl}/comments/like/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCommentLikes(prev => ({
          ...prev,
          [commentId]: {
            liked: response.data.liked,
            likeCount: response.data.likeCount
          }
        }));
      }
    } catch (error) {
      console.error('Error toggling comment like:', error);
      setError('Failed to toggle comment like');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="comment-section">
      {/* Like and Comment Actions */}
      <div className="story-actions">
        <div className="action-buttons">
          <Button
            variant="link"
            className={`like-button ${liked ? 'liked' : ''}`}
            onClick={handleToggleLike}
          >
            {liked ? <FaHeart className="heart-filled" /> : <FaRegHeart />}
            <span className="action-text">{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
          </Button>
          
          <Button
            variant="link"
            className="comment-button"
            onClick={() => setShowComments(!showComments)}
          >
            <FaComment />
            <span className="action-text">{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
          </Button>
        </div>
      </div>

      {/* Add Comment Form */}
      {token && (
        <Form onSubmit={handleAddComment} className="add-comment-form">
          <div className="comment-input-group">
            <Form.Control
              type="text"
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={loading}
              className="comment-input"
            />
            <Button
              type="submit"
              variant="primary"
              disabled={loading || !newComment.trim()}
              className="comment-submit"
            >
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </Form>
      )}

      {error && <Alert variant="danger" className="mt-2">{error}</Alert>}

      {/* Comments List */}
      {showComments && (
        <div className="comments-list">
          {comments.length === 0 ? (
            <p className="no-comments">No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id} className="comment-card">
                <Card.Body className="comment-body">
                  <div className="comment-header">
                    <div className="comment-author">
                      <strong>{comment.user.name}</strong>
                      <span className="comment-time">{formatDate(comment.createdAt)}</span>
                    </div>
                    {currentUser.id === comment.userId && (
                      <Button
                        variant="link"
                        size="sm"
                        className="delete-comment"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <FaTrash />
                      </Button>
                    )}
                  </div>
                  <p className="comment-text">{comment.comments}</p>
                  
                  {/* Comment Like Button */}
                  {token && (
                    <div className="comment-actions">
                      <Button
                        variant="link"
                        className={`comment-like-button ${
                          commentLikes[comment.id]?.liked ? 'liked' : ''
                        }`}
                        onClick={() => handleToggleCommentLike(comment.id)}
                      >
                        {commentLikes[comment.id]?.liked ? (
                          <FaHeart className="heart-filled" />
                        ) : (
                          <FaRegHeart />
                        )}
                        <span className="like-count">
                          {commentLikes[comment.id]?.likeCount || 0}
                        </span>
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CommentSection;
