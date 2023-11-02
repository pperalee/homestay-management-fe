import Card from "react-bootstrap/Card";
import { format } from "date-fns";
import { Link } from "react-router-dom";
const ChatCard = (props) => {
  const link = `/chats/${props.chatuserid}`;
  return (
    <Card style={{ width: "600px", margin: "auto" }} key={props._id}>
      <Card.Body>
        <Link to={link}>
          <Card.Title>{props.name}</Card.Title>
        </Link>
        <Card.Subtitle className="mb-2 text-muted">
          {format(new Date(props.time), "dd/MM/yyyy hh:mm")}
        </Card.Subtitle>
        {props.fromMe ? (
          <Card.Text>
            Me:{" "}
            {props.lastMessage.message.length < 50
              ? props.lastMessage?.message
              : props.lastMessage.message.substring(0, 49) + "..."}
          </Card.Text>
        ) : (
          <Card.Text>
            {props.name} {": "}{" "}
            {props.lastMessage.message.length < 50
              ? props.lastMessage?.message
              : props.lastMessage.message.substring(0, 49) + "..."}
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};
export default ChatCard;
