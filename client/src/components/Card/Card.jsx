import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import styles from "./Card.module.css";
import { useState } from "react";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className={text}>
      {isReadMore ? text.slice(0, 250) : text}
      {text.length > 250 ? (
        <span onClick={toggleReadMore} className={styles.readorhide}>
          {isReadMore ? "...read more" : `\u00A0\u00A0 show less`}
        </span>
      ) : (
        <></>
      )}
    </p>
  );
};

export default function TestimonialCard(props) {
  let name;
  if (props.to === false) name = props.Name;
  else name = "To : " + props.Name;
  return (
    <Card sx={{ bgcolor: "white" }} className={styles.cardbackground}>
      <CardHeader
        action={
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        }
        // header="Name"
        title={name}
        subheader={props.Email}
      />

      <CardContent>
        <p>
          <ReadMore>{props.Content}</ReadMore>
        </p>
      </CardContent>
    </Card>
  );
}
