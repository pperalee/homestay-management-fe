import { Rating } from "@mui/material";
const ReviewCard = (props) => {
  const linkImage = `http://localhost:3333/reviews/${props.id}/image`;
  return (
    <>
      <div className="card" style={{ width: "100%", marginTop: "15px" }}>
        <div className="row">
          <div className="col-md-9">
            <p style={{ padding: "10px 15px 0px 15px" }}>{props.username}</p>
            <Rating
              name="read-only"
              value={props.rate}
              readOnly
              style={{ padding: "0px 15px" }}
            />
            <p style={{ padding: "0px 15px" }}>Comment: {props.comment}</p>
          </div>
          {props.image && (
            <div className="col-md-3">
              <img src={linkImage} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ReviewCard;
