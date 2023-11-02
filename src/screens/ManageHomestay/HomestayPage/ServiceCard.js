import { Link } from "react-router-dom";

const ServiceCard = (props) => {
  const linkEdit = `/services/${props.id}/edit`;
  return (
    <>
      <div
        class="card"
        style={{
          width: "100%",
          borderTop: "20px",
        }}
      >
        <div class="card-body">
          <div className="row">
            <div className="col-md-9">
              <h5 class="card-title">{props.name}</h5>
              <p class="card-text">Price: {props.price}</p>
              <p class="card-text">Description: {props.description}</p>
            </div>
            <div className="col-md-3">
              {props.isOwner && (
                <Link
                  to={linkEdit}
                  class="btn btn-primary"
                  style={{ padding: "4px", margin: "auto" }}
                >
                  Edit Service
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
