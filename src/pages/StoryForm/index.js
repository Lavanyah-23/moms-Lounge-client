import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMyStory, updateMyStory } from "../../store/story/actions";
import Button from "react-bootstrap/Button";
import Cloudinary from "../../components/UploadImage";
import { useSelector } from "react-redux";
import { selectCurrentState } from "../../store/user/selectors";
import { selectModalOp } from "../../store/user/selectors";
import { hideModal } from "../../store/user/actions";

const StoryForm = (props) => {
  const modalOp = useSelector(selectModalOp);
  const currentStory = useSelector(selectCurrentState);
  const [title, setTitle] = useState(currentStory ? currentStory.title : "");
  const [imageUrl, setImageUrl] = useState(
    currentStory ? currentStory.imageUrl : ""
  );
  const [description, setDescription] = useState(
    currentStory ? currentStory.description : ""
  );
  const dispatch = useDispatch();
  console.log("currentstory", currentStory);

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
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={description}
          placeholder="description "
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* {
          <input
            type="file"
            placeholder="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        } */}

        {
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
            }
            alt=""
            h
            height={"300px"}
          />
        }

        <Cloudinary onChange={(url) => setImageUrl(url)}></Cloudinary>
        <Button variant="info" type="submit" onClick={handleOnSubmit}>
          Save
        </Button>
      </form>
    </div>
  );
};
export default StoryForm;
