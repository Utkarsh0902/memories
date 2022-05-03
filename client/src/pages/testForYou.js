import { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "../components/Card/Card";
import { Grid } from "@mui/material";
import AuthContext from "../context/AuthContext";
import userUpdate from "../controllers/userUpdate";

export default function TestForYou() {
  const { user, setUser } = useContext(AuthContext);
  const updateUser = async () => {
    const data = await userUpdate(user._id);
    setUser(data);
  };
  useEffect(() => {
    updateUser();
  }, []);
  return (
    <Grid
      container
      // justify="center"
      spacing={0}
      sx={{
        marginLeft: "300px",
        // eslint-disable-next-line no-useless-computed-key
        ["@media (max-width:960px)"]: {
          // display: "none",
          marginLeft: "75px",
        },
        marginTop: "30px",
        // marginRight: "30px",
        maxWidth: "83%",
      }}
    >
      {user.TestimonialsReceived.map((testimonial) => {
        return (
          <Grid item p={2} xs={12} md={6}>
            <Card
              Email={testimonial.From}
              Content={testimonial.Content}
              Name={testimonial.Name}
              to={false}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}
