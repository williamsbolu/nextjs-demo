import { useRouter } from "next/router";
import Image from "next/image";

import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";

import houseImg from "../../asset/house.jpg";

function MeetupItem(props) {
  const router = useRouter();

  const showDetailHandler = () => {
    // same as the <Link> component, but this is for programatic navigation
    router.push("/" + props.id); // "/props.id"
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <picture>
            <source srcSet={props.image} type="image/jpg" />
            <img src={props.image} alt={props.title} />
          </picture>
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
