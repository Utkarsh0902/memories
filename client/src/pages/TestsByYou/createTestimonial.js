import { Select, Container, Textarea, Button, Text } from "@mantine/core";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import contacts from "../../contacts";
const emails = contacts.map((contact) => contact.Email);

export default function CreateTest({ requestEmail, clearRequestEmail }) {
  const [targetEmail, setTargetEmail] = useState("");
  const [targetContent, setTargetContent] = useState("");
  const [isSubmitted, setIsSubmitted] = useState("");
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    if (targetEmail === "" && requestEmail !== "") {
      setTargetEmail(requestEmail);
      clearRequestEmail();
    }
  });

  const handleSubmit = async () => {
    const response = await axios.post(
      "http://localhost:5000/users/createTest",
      {
        id: user._id,
        from: user.Email,
        to: targetEmail,
        content: targetContent,
        Name: user.Name,
      }
    );
    // console.log(user);
    setIsSubmitted(response.data.result);
    setTargetContent("");

    // Update FromRequests array
    let requestObj = user.FromRequests.find((req) => req.Email === targetEmail);
    if (requestObj) {
      // need to update the context variable
      var updatedUser = user;
      var index = updatedUser.FromRequests.indexOf(requestObj);
      updatedUser.FromRequests.splice(index, 1);

      // update in database
      const putResponse = await axios.put(
        "http://localhost:5000/users/update/" + user._id,
        {
          FromRequests: updatedUser.FromRequests,
        }
      );
      setUser(updatedUser);
    }

    // setIsSubmitted(response.)
  };

  const handleChange = (e) => {
    setTargetEmail(e);
  };
  const handleContentChange = (e) => {
    setTargetContent(e.target.value);
  };

  return (
    <>
      <Container sx={{ margin: "auto" }}>
        <Select
          placeholder="BITSmail"
          label="Email"
          required
          size="lg"
          searchable
          nothingFound="No options"
          maxDropdownHeight={280}
          data={emails}
          onChange={handleChange}
          value={targetEmail}
          sx={{
            width: "40vw",
            label: { color: "white" },
            input: { textAlign: "center" },
            margin: "auto",
            marginTop: "20px",
            // eslint-disable-next-line no-useless-computed-key
            ["@media (max-width:960px)"]: {
              width: "80%",
              margin: "20px 0",
            },
          }}
        />
        <Textarea
          placeholder="Pour your Heart out :)"
          label="Content"
          autosize
          required
          size="lg"
          minRows={3}
          value={targetContent}
          onChange={handleContentChange}
          sx={{
            width: "40vw",
            margin: "auto",
            marginTop: "20px",
            label: { color: "white" },
            // eslint-disable-next-line no-useless-computed-key
            ["@media (max-width:960px)"]: {
              width: "80%",
              margin: "20px 0",
            },
          }}
        />
        <Button
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan" }}
          sx={{
            display: "block",
            margin: "auto",
            marginTop: "30px",
          }}
          onClick={handleSubmit}
        >
          Submit Testimonial
        </Button>
        {isSubmitted === "Sent" && (
          <Text color="green" weight={700} sx={{ marginTop: "20px" }}>
            Testimonial Successfully Submitted.
          </Text>
        )}
        {isSubmitted === "Repeated" && (
          <Text color="red" weight={700} sx={{ marginTop: "20px" }}>
            You have already submitted a Testimonial for this email, Please go
            to View All section to Edit pre-existing testimonial.
          </Text>
        )}
      </Container>
    </>
  );
}
