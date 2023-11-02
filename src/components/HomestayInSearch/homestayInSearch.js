import classes from "./style.module.css";
import { Link } from "react-router-dom";
const HomestayInSearch = (props) => {
  const link = `/homestays/${props.id}`;
  const imgLink = `http://localhost:3333/homestays/${props.id}/images?index=0`;
  return (
    <>
      <div className={classes["l-post"]}>
        <figure>
          <img
            alt=""
            src={imgLink}
            style={{ height: "250px", width: "300px" }}
          />
        </figure>
        <div className={classes["l-post-meta"]}>
          <h4 class="font-weight-bold">
            <Link to={link}>{props.name}</Link>
          </h4>
          <div className={classes["l-post-ranking"]}></div>
          <p className="font-weight-bold" style={{ color: "#212529" }}>
            Address: {props.address}
          </p>
          <p className="font-weight-bold" style={{ color: "#212529" }}>
            Price: {props.price}
          </p>
          <div className="row">
            <p className="col-6" style={{ color: "#212529" }}>
              People: {props.people}
            </p>
            {props.pool ? (
              <p className="col-6" style={{ color: "#212529" }}>
                Pool: Yes
              </p>
            ) : (
              <p className="col-6" style={{ color: "#212529" }}>
                Pool: No
              </p>
            )}
          </div>
          <div className="row">
            <p className="col-6" style={{ color: "#212529" }}>
              Rate: 5
            </p>
            <p className="col-6" style={{ color: "#212529" }}>
              Number of booking: 10
            </p>
          </div>

          <Link to={link}>More info</Link>
        </div>
      </div>
    </>
  );
};
export default HomestayInSearch;
