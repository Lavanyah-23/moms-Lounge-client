import { Jumbotron } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAllStories } from "../../store/story/actions";
import { storySelector } from "../../store/story/selector";
import { useNavigate } from "react-router-dom";
import Cloudinary from "../../components/UploadImage";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(fetchAllStories());
  }, []);
  const storiesState = useSelector(storySelector);
  return (
    <Jumbotron>
      <h1>Stories</h1>
      <div>
        {storiesState.map((story) => {
          console.log("getting all stories here", story);
          const { title, imageUrl, description, id } = story;
          return (
            <div key={id}>
              <h3> {title}</h3>
              <text>{description}</text>
              <Cloudinary>
              <img src={imageUrl} alt={title} />
              </Cloudinary>
              <button
                onClick={() => navigate(`/stories/${id}`, { replace: true })}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </Jumbotron>
  );
};
export default HomePage;
