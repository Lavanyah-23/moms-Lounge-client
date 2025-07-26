/* eslint-disable import/no-anonymous-default-export */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchStoryById } from "../../store/story/actions";
// import story from "../../store/story/reducer";
import { storyDetailsSelector } from "../../store/story/selector";
import { selectUser } from "../../store/user/selectors";
import { Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import CommentSection from "../../components/CommentSection";

export default function () {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const user = useSelector(selectUser);
  // console.log(params.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStoryById(id));
  }, []);

  const storyDetail = useSelector(storyDetailsSelector);
  // console.log("getting story details", storyDetail);

  return (
    <div>
      <h2> {user.name} story </h2>
      <div className="title_div">
        <h3>{storyDetail.title}</h3>
      </div>
      <div className="imageDisplay_div">
        <img src={storyDetail.imageUrl} alt="" width="300px" />
      </div>

      <div className="desc_div">
        <p>{storyDetail.description}</p>
      </div>
      
      {/* Instagram/Facebook-style Comment and Like System */}
      <CommentSection storyId={id} />
    </div>
  );
}
