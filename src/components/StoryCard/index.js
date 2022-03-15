import Cloudinary from "../UploadImage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMyStory } from "../../store/story/actions";
import { Button } from "react-bootstrap";
import { showModal, setCurrentStory } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import "./style.css";

const StoryCard = (props) => {
  const { title, imageUrl, description, id, userId } = props.story;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [cImage, setCimage] = useState(imageUrl);

  const handleImageUpload = (url) => {
    dispatch(updateMyStory(title, description, url, id));
  };

  return (
    <div className="storyCard_Main">
      <div className="storyCard_div" key={id}>
        <div className="Story_Info">
          <div className="story_title_Div">
            <h3> {title}</h3>
          </div>
          <div className="Story_Description_Div ">
            <text>{description}</text>
          </div>
        </div>
        <div className="Image_Div_StoryCard">
          {
            <img
              className="Image_card_div"
              src={
                imageUrl
                  ? imageUrl
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png "
              }
              alt=""
            />
          }
        </div>
      </div>
      <div>
        {user && user.id === userId ? (
          <Button
            onClick={() => {
              dispatch(showModal("UPDATE"));
              dispatch(setCurrentStory(props.story));
              console.log("clicked");
            }}
            variant="info"
          >
            update
          </Button>
        ) : null}
        <Button
          className="View_details_Button"
          variant="warning"
          href="#"
          onClick={() => navigate(`/stories/${id}`, { replace: true })}
        >
          View Details
        </Button>
      </div>
      {/* <Cloudinary onChange={handleImageUpload}></Cloudinary> */}
    </div>
  );
};
export default StoryCard;
