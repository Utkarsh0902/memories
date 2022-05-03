import Card from "../../components/Card/Card";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { Grid } from "@mui/material";
export default function ViewAll() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <Grid
      container
      sx={{
        // marginLeft: "300px",
        // eslint-disable-next-line no-useless-computed-key
        ["@media (max-width:960px)"]: {
          // display: "none",
          marginLeft: "-70px",
        },
        marginTop: "30px",
        // marginRight: "30px",
        // maxWidth: "83%",
      }}
    >
      {user.TestimonialsSent.map((test) => {
        return (
          <Grid item p={2} xs={12} md={6}>
            <Card Name={test.Name} Email={test.To} Content={test.Content} />
          </Grid>
        );
      })}
    </Grid>
  );
}
