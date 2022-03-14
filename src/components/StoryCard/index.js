import Cloudinary from "../UploadImage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateMyStory } from "../../store/story/actions";
import { Button } from "react-bootstrap";
import { showModal, setCurrentStory } from "../../store/user/actions";


const StoryCard = (props) => {
  const { title, imageUrl, description, id } = props.story;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cImage, setCimage] = useState(imageUrl);

  const handleImageUpload = (url) => {
    //call PUTapi to update imageUrl in DB
    //dispatch action to update story
    dispatch(updateMyStory(title, description, url, id));
  };

  return (
    <div key={id}>
      <h3> {title}</h3>
      <text>{description}</text>
      <div style={{ textAlign: "center" }}>
        {
          <img
            width="100p"
            src={
              imageUrl
                ? imageUrl
                : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png "
            }
            alt=""
          />
        }
      </div>

      {/* <Cloudinary onChange={handleImageUpload}></Cloudinary> */}
      <Button
        variant="success"
        href="#"
        onClick={() => navigate(`/stories/${id}`, { replace: true })}
      >
        View Details
      </Button>
      <Button
        onClick={() => {
          dispatch(showModal("UPDATE"));
          dispatch(setCurrentStory(props.story))
          console.log("clicked");
        }}
        variant="info"
      >
        update
      </Button>
    </div>
  );
};
export default StoryCard;
