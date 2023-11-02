import { Link } from "react-router-dom";

const HomestayInList = (props) => {
  var link = `/homestays/${props.id}`;
  var bookinglink = `/bookings/${props.id}`;
  const imgLink = `http://localhost:3333/homestays/${props.id}/images?index=0`;
  return (
    <>
      <div className="col-md-6 col-lg-4 mb-4">
        <div className="card listing-preview">
          <img alt="" src={imgLink} />
          {props.newBooking && (
            <>
              <div className="card-img-overlay">
                <h2>
                  <span className="badge badge-secondary text-white">
                    New Booking!!!
                  </span>
                </h2>
              </div>
            </>
          )}
          <div className="card-body">
            <div className="listing-heading text-center">
              <Link to={link}>
                <h4 className="text-primary">{props.name}</h4>
              </Link>
              <p>
                <i className="fas fa-map-marker text-secondary"></i> Address:{" "}
                {props.address}
              </p>
            </div>
            <div className="row py-2 text-secondary">
              <div className="col-6">
                <i className="fas fa-th-large"></i> People: {props.people}
              </div>
              {props.pool ? (
                <div className="col-6">
                  <i className="fas fa-car"></i> Pool: Yes
                </div>
              ) : (
                <div className="col-6">
                  <i className="fas fa-car"></i> Pool: No
                </div>
              )}
            </div>
            <div className="row py-2 text-secondary">
              <div className="col-6">
                <i className="fas fa-bed"></i> Rate: {props.rate}
              </div>
              <div className="col-6">
                <i className="fas fa-bath"></i> Bookings: {props.bookingNumber}
              </div>
            </div>
            {/* <div class="row py-2 text-secondary">
                <div class="col-12">
                  <i class="fas fa-user"></i> Kyle Brown
                </div>
              </div>
              <div class="row text-secondary pb-2">
                <div class="col-6">
                  <i class="fas fa-clock"></i> 2 days ago
                </div>
              </div> */}
            <Link to={bookinglink} className="btn btn-primary btn-block">
              Check bookings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomestayInList;
