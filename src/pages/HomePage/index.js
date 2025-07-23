import { Button, Jumbotron, Modal, Card, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addMyStory,
  fetchAllStories,
  updateMyStory,
} from "../../store/story/actions";
import { storySelector } from "../../store/story/selector";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../../components/UploadImage";
import {
  selectIsModalOpen,
  selectModalOp,
  selectToken,
} from "../../store/user/selectors";
import "./HomePage.css";
import StoryCard from "../../components/StoryCard";
import { hideModal, showModal } from "../../store/user/actions";
import StoryForm from "../StoryForm";
import { FaComments, FaLightbulb, FaStore, FaRobot, FaHeart } from "react-icons/fa";

const placeHolderImage =
  "https://s3.amazonaws.com/gallerist-live/products/40386/large/motherhood-17.jpg?1609839194";

const HomePage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchAllStories());
  }, []);
  const storiesState = useSelector(storySelector);
  const isModalOpen = useSelector(selectIsModalOpen);
  const modalOp = useSelector(selectModalOp);
  const token = useSelector(selectToken);

  const handleOnSubmit = (title, description, imageUrl, id) => {
    if (modalOp === "UPDATE") {
      dispatch(updateMyStory(title, description, imageUrl, id));
    }
    if (modalOp === "ADD") {
      dispatch(addMyStory(title, description, imageUrl));
    }
  };

  const features = [
    {
      icon: <FaComments className="text-primary" size={40} />,
      title: "Community Forum",
      description: "Share your motherhood journey and connect with other moms",
      action: () => navigate("/forum"),
    },
    {
      icon: <FaLightbulb className="text-warning" size={40} />,
      title: "Prompt Library",
      description: "Get instant answers to common parenting questions",
      action: () => navigate("/prompt-library"),
    },
    {
      icon: <FaStore className="text-success" size={40} />,
      title: "Marketplace",
      description: "Buy and sell baby items within our trusted community",
      action: () => navigate("/marketplace"),
    },
    {
      icon: <FaRobot className="text-info" size={40} />,
      title: "Ask AI",
      description: "Get personalized parenting advice from our AI assistant",
      action: () => navigate("/ask-ai"),
    },
  ];

  return (
    <div className="HomePage">
      {/* Hero Section */}
      <div className="bg-light py-5 mb-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold text-primary mb-3">
                Welcome to Moms Lounge
              </h1>
              <p className="lead mb-4">
                A supportive community where moms connect, share, and grow together. 
                Find advice, buy/sell items, and get AI-powered parenting help.
              </p>
              <div className="d-flex gap-3">
                {token ? (
                  <Button variant="primary" size="lg" onClick={() => dispatch(showModal("ADD"))}>
                    Share Your Story
                  </Button>
                ) : (
                  <Button variant="primary" size="lg" onClick={() => navigate("/signup")}>
                    Join Our Community
                  </Button>
                )}
                <Button variant="outline-primary" size="lg" onClick={() => navigate("/forum")}>
                  Explore Stories
                </Button>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <FaHeart className="text-danger" size={100} />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mb-5">
        <h2 className="text-center mb-5">What We Offer</h2>
        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} lg={3} md={6}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="mb-3">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                  <Card.Text className="text-muted">{feature.description}</Card.Text>
                  <Button variant="outline-primary" onClick={feature.action}>
                    Explore
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Recent Stories Section */}
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Recent Community Stories</h2>
          <Button variant="outline-primary" onClick={() => navigate("/forum")}>
            View All Stories
          </Button>
        </div>
        
        {storiesState.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted">No stories yet. Be the first to share!</p>
            {token && (
              <Button variant="primary" onClick={() => dispatch(showModal("ADD"))}>
                Share Your First Story
              </Button>
            )}
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            {storiesState.slice(0, 6).map((story) => (
              <div key={story.id} className="col">
                <StoryCard story={story} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Story Creation Modal */}
      <Modal
        show={isModalOpen}
        onHide={() => dispatch(hideModal())}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalOp === "UPDATE"
              ? "Update your story here"
              : "Add your story here"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <StoryForm onSubmit={handleOnSubmit} op={modalOp} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => dispatch(hideModal())}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HomePage;
