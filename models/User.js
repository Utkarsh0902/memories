var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var User = new Schema({
  Name: String,
  Email: String,
  ID: String,
  ProfilePic: String,
  Address: String,
  Branch: String,
  MobileNumber: String,
  NickName: String,
  PhotoAlbum: [String],
  ToRequests: [
    {
      Email: String,
      IsRecieved: Boolean,
    },
  ],
  FromRequests: [
    {
      Email: String,
      IsSent: Boolean,
      Name: String,
      Message: String,
    },
  ],
  TestimonialsSent: [
    {
      Name: String,
      To: String,
      Content: String,
    },
  ],
  TestimonialsReceived: [
    {
      From: String,
      Content: String,
      Name: String,
    },
  ],
});

module.exports = User = mongoose.model("users", User);
