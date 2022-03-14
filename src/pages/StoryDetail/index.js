/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStoryById } from "../../store/story/actions";
// import story from "../../store/story/reducer";
import { storyDetailsSelector } from "../../store/story/selector";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";

export default function () {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  // console.log(params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoryById(id));
    
  }, []);

  const storyDetail = useSelector(storyDetailsSelector);
  // console.log("getting story details", storyDetail);

  return (
    <div>
      <h2>story by id is:</h2>
      <div className="imageDisplay_div">
        <img src={storyDetail.imageUrl} alt="" width="150px"/>
      </div>
      <div className="title_div">
        <h3>{storyDetail.title}</h3>
      </div>
      <div className="desc_div">
        <p>{storyDetail.description}</p>
      </div>
      <Button variant= "secondary" size="sm" onClick={() => {}}>Comment</Button>
      
    </div>
  );
}
