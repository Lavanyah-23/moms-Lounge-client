import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { apiUrl } from "../../config/constants";

export default function AskAI() {
  const token = useSelector((state) => state.user.token);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]); // {question, answer}
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Check if user is logged in
    if (!token) {
      setError("Please log in to use AI features");
      return;
    }
    
    setError("");
    setLoading(true);
    const userQuestion = input;
    setInput("");
    
    try {
      console.log('Sending AI request with token:', token ? 'Token exists' : 'No token');
      const res = await axios.post(
        `${apiUrl}/ai/chat`,
        { question: userQuestion },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('AI response:', res.data);
      setChat([
        ...chat,
        { question: userQuestion, answer: res.data.data.answer },
      ]);
    } catch (e) {
      console.error('AI request error:', e.response?.data);
      setError(e.response?.data?.message || "Failed to get AI response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2 className="mb-4">Ask AI</h2>
      <Form onSubmit={handleSubmit} className="d-flex mb-3 gap-2">
        <Form.Control
          type="text"
          placeholder="Type your parenting question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
        />
        <Button type="submit" variant="primary" disabled={loading || !input.trim()}>
          {loading ? <Spinner as="span" animation="border" size="sm" /> : "Ask"}
        </Button>
      </Form>
      {error && <Alert variant="danger">{error}</Alert>}
      <div style={{ minHeight: 200 }}>
        {chat.length === 0 && (
          <p className="text-muted">Start a conversation with our AI assistant!</p>
        )}
        {chat.map((entry, idx) => (
          <Card key={idx} className="mb-3 shadow-sm">
            <Card.Body>
              <div style={{ marginBottom: 8 }}>
                <strong>You:</strong>
                <div style={{ whiteSpace: "pre-line" }}>{entry.question}</div>
              </div>
              <div>
                <strong>AI:</strong>
                <div style={{ whiteSpace: "pre-line" }}>{entry.answer}</div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
} 