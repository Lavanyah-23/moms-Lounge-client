import { Button, Jumbotron, Modal } from "react-bootstrap";
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
import "./HomePage.css";

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

  const handleOnSubmit = (title, description, imageUrl, id) => {
    if (modalOp === "UPDATE") {
      dispatch(updateMyStory(title, description, imageUrl, id));
    }
    if (modalOp === "ADD") {
      dispatch(addMyStory(title, description, imageUrl));
    }
  };

  return (
    <Jumbotron>
      <div className="HomePage">
        <h1>Stories</h1>
        <Button onClick={() => dispatch(showModal("ADD"))}>Add</Button>
        <div className="Story_Card_List">
          {storiesState.map((story) => {
            // console.log("getting all stories here", story);

            return <StoryCard story={story}></StoryCard>;
          })}
        </div>
      </div>

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
    </Jumbotron>
  );
};
export default HomePage;
