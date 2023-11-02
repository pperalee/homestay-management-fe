import Card from "react-bootstrap/Card";
import { format } from "date-fns";

const NotiCard = (props) => {
  if (props.seen) {
    return (
      <Card style={{ width: "600px", margin: "auto" }} key={props._id}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {format(new Date(props.date), "dd/MM/yyyy")}
          </Card.Subtitle>
          <Card.Text>{props.message}</Card.Text>
          <Card.Link href="/bookings/your-bookings">Check details</Card.Link>
        </Card.Body>
      </Card>
    );
  } else {
    return (
      <Card
        style={{
          width: "600px",
          margin: "auto",
          backgroundColor: "rgba(217, 203, 246,0.2)",
        }}
        key={props._id}
      >
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">
            {format(new Date(props.date), "dd/MM/yyyy")}
          </Card.Subtitle>
          <Card.Text>{props.message}</Card.Text>
          <Card.Link href="/bookings/your-bookings">Check details</Card.Link>
        </Card.Body>
      </Card>
    );
  }
};
export default NotiCard;
