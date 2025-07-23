import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import { apiUrl } from "../../config/constants";

const PROMPTS = [
  { key: "parenting_tips", label: "Parenting Tips" },
  { key: "health_wellness", label: "Health & Wellness" },
  { key: "family_planning", label: "Family Planning" },
  { key: "emotional_support", label: "Emotional Support" },
  { key: "meal_planning", label: "Meal Planning" },
  { key: "sleep_routines", label: "Sleep Routines" },
];

export default function PromptLibrary() {
  const token = useSelector((state) => state.user.token);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePromptClick = async (promptKey) => {
    setSelectedPrompt(promptKey);
    setResponse("");
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${apiUrl}/ai/prompt-library`,
        { promptType: promptKey },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResponse(res.data.data.response);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to get response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
      <h2 className="mb-4">Moms Helper Prompt Library</h2>
      <div className="d-flex flex-wrap gap-2 mb-3 justify-content-center">
        {PROMPTS.map((prompt) => (
          <Button
            key={prompt.key}
            variant={selectedPrompt === prompt.key ? "primary" : "outline-primary"}
            onClick={() => handlePromptClick(prompt.key)}
            disabled={loading && selectedPrompt === prompt.key}
            style={{ minWidth: 140, marginBottom: 8 }}
          >
            {prompt.label}
            {loading && selectedPrompt === prompt.key && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="ms-2"
              />
            )}
          </Button>
        ))}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {response && (
        <Card className="mt-3 shadow-sm">
          <Card.Body>
            <Card.Title>AI Response</Card.Title>
            <Card.Text style={{ whiteSpace: "pre-line" }}>{response}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
} 