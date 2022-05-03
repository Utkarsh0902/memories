import React, { useContext } from "react";
import { Select, Container, Textarea, Button } from "@mantine/core";
import AuthContext from "../context/AuthContext";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "row",
  },
  right_section: {
    margin: 10,
    padding: 10,
    width: "60%",
  },
  left_section: {
    margin: 10,
    padding: 10,
    width: "40%",
    backgroundColor: "#22577E",
    borderRadius: "10",
  },
  profile_container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20",
    marginBottom: "20px",
    height: "150",
    fontFamily: "Helvetica-Bold",
  },
  name_text: {
    paddingTop: "10px",
    paddingBottom: "5px",
    fontSize: "14px",
    fontWeight: "900",
    color: "white",
  },
  profession_text: {
    color: "#d1d5db",
    fontSize: "11px",
  },
  nick_text: {
    fontSize: "12px",
    fontStyle: "italic",
    color: "white",
  },
  profile_img: {
    width: "100px",
    height: "100px",
    borderRadius: "90",
  },
  album_img: {
    borderRadius: "5",
    margin: "10px",
  },
  right_heading: {
    fontSize: "24px",
    color: "#22577E",
    fontStyle: "italic",
    marginBottom: "10px",
  },
  test_view: {
    marginBottom: "10px",
    padding: "10px",
  },
  test_content: {
    fontSize: "11px",
  },
  test_name: {
    fontSize: "13px",
    color: "#22577E",
    textAlign: "right",
  },
});

const user = {
  Name: "Jonathan Samuel",
  ID: "2018AAPS0460H",
  ProfilePic:
    "https://media-exp1.licdn.com/dms/image/C4E03AQHTus4zxT6Kww/profile-displayphoto-shrink_800_800/0/1641397714251?e=1655337600&v=beta&t=TVe7FMBtr7H4un6MMbLqSUBlXh3vtsJUo5EBXgc9VKk",

  NickName: "Jonny",
  PhotoAlbum: [
    "https://res.cloudinary.com/pensieve/image/upload/v1650188377/bdlkczbjxhegln8vaedf.jpg?w=NaN&h=NaN&fit=crop&auto=format&dpr=2",
    "https://res.cloudinary.com/pensieve/image/upload/v1650188389/rimfo0pkgewvw5bto4nu.jpg?w=NaN&h=NaN&fit=crop&auto=format&dpr=2",
  ],
  TestimonialsReceived: [
    {
      From: "Tanya Prasad",
      Content:
        "Yo Jonnieeee. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet diam nec est accumsan aliquet. Vestibulum eu sapien imperdiet, commodo tortor in, congue nisi. Cras sit amet urna eget velit tempor ornare ac in purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed gravida nunc ut sapien tempor, et tristique erat pretium. Mauris sed velit semper, ullamcorper erat quis, auctor lacus. Vivamus suscipit sollicitudin lacus, sed pretium erat semper sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam urna urna, tincidunt vel ullamcorper non, rutrum a quam. Suspendisse nec tincidunt arcu.",
      Name: "Tanya Prasad",
    },
    {
      From: "Tanya Prasad",
      Content:
        "Me hate youu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet diam nec est accumsan aliquet. Vestibulum eu sapien imperdiet, commodo tortor in, congue nisi. Cras sit amet urna eget velit tempor ornare ac in purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed gravida nunc ut sapien tempor, et tristique erat pretium. Mauris sed velit semper, ullamcorper erat quis, auctor lacus. Vivamus suscipit sollicitudin lacus, sed pretium erat semper sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam urna urna, tincidunt vel ullamcorper non, rutrum a quam. Suspendisse nec tincidunt arcu.",
      Name: "Nauty",
    },
    {
      From: "Tanya Prasad",
      Content:
        "Bhiayaa How sooo prooo?? Lorem ipsum dolor sit amet, consectetur adipiscing elit. In laoreet diam nec est accumsan aliquet. Vestibulum eu sapien imperdiet, commodo tortor in, congue nisi. Cras sit amet urna eget velit tempor ornare ac in purus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed gravida nunc ut sapien tempor, et tristique erat pretium. Mauris sed velit semper, ullamcorper erat quis, auctor lacus. Vivamus suscipit sollicitudin lacus, sed pretium erat semper sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam urna urna, tincidunt vel ullamcorper non, rutrum a quam. Suspendisse nec tincidunt arcu.",
      Name: "Chirag Jaju",
    },
  ],
};

export default function Preview() {
  const { user } = useContext(AuthContext);
  //   console.log
  return (
    <Container style={{ margin: "2vh  0vh 0vh 55vh", width: "70%", height: "80vh" }}>
      <PDFViewer
        showToolbar={true}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.left_section}>
              <View style={styles.profile_container}>
                {/* <Image style={styles.profile_img} src={user.ProfilePic} /> */}

                <View
                  style={{
                    justifyContent: "center",
                  }}
                >
                  <Text style={styles.name_text}>{user.Name}</Text>
                </View>
                <Text style={styles.profession_text}>{user.ID}</Text>
                {/* <Text style={styles.nick_text}>
									{user.NickName}
								</Text> */}
              </View>
              {user.PhotoAlbum.map((item) => (
                <Image style={styles.album_img} src={item} />
              ))}
              {/* <Image style={styles.album_img} src={user.PhotoAlbum[1]} /> */}
            </View>
            <View style={styles.right_section}>
              <Text style={styles.right_heading}>Testimonials</Text>
              {user.TestimonialsReceived.map((details) => (
                <View style={styles.test_view}>
                  <Text style={styles.test_content}>{details.Content}</Text>
                  <Text style={styles.test_name}>{details.Name}</Text>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
}
