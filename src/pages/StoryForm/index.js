import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMyStory, updateMyStory } from "../../store/story/actions";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import Cloudinary from "../../components/UploadImage";
import { selectCurrentState, selectModalOp } from "../../store/user/selectors";
import { hideModal } from "../../store/user/actions";
import axios from "axios";
import { apiUrl } from "../../config/constants";
import { FaLightbulb } from "react-icons/fa";

const StoryForm = (props) => {
  const modalOp = useSelector(selectModalOp);
  const currentStory = useSelector(selectCurrentState);
  const token = useSelector((state) => state.user.token);
  const [title, setTitle] = useState(currentStory ? currentStory.title : "");
  const [imageUrl, setImageUrl] = useState(
    currentStory ? currentStory.imageUrl : ""
  );
  const [description, setDescription] = useState(
    currentStory ? currentStory.description : ""
  );
  const [generatingIdea, setGeneratingIdea] = useState(false);
  const [ideaError, setIdeaError] = useState("");
  const dispatch = useDispatch();

  const handleGenerateIdea = async () => {
    setGeneratingIdea(true);
    setIdeaError("");
    try {
      const res = await axios.post(
        `${apiUrl}/ai/generate-post-idea`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle(res.data.data.idea);
    } catch (e) {
      setIdeaError(e.response?.data?.message || "Failed to generate post idea");
    } finally {
      setGeneratingIdea(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (modalOp === "UPDATE") {
      dispatch(updateMyStory(title, description, imageUrl, currentStory.id));
    }
    if (modalOp === "ADD") {
      dispatch(addMyStory(title, description, imageUrl));
      dispatch(hideModal());
    }
    setDescription("");
    setImageUrl("");
    setTitle("");
  };

  return (
    <div className="Form_Div">
      <form onSubmit={handleOnSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <div className="d-flex gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Enter your story title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {modalOp === "ADD" && (
              <Button
                variant="outline-primary"
                onClick={handleGenerateIdea}
                disabled={generatingIdea}
                style={{ whiteSpace: "nowrap" }}
              >
                {generatingIdea ? (
                  <Spinner as="span" animation="border" size="sm" />
                ) : (
                  <>
                    <FaLightbulb className="me-1" />
                    Generate Idea
                  </>
                )}
              </Button>
            )}
          </div>
          {ideaError && <Alert variant="danger" className="mt-2">{ideaError}</Alert>}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            rows={3}
            value={description}
            placeholder="Share your story..."
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
            alt=""
            className="img-fluid mb-2"
            style={{ maxHeight: "300px", width: "auto" }}
          />
          <Cloudinary onChange={(url) => setImageUrl(url)} />
        </div>

        <Button variant="primary" type="submit">
          {modalOp === "UPDATE" ? "Update Story" : "Save Story"}
        </Button>
      </form>
    </div>
  );
};

export default StoryForm;
