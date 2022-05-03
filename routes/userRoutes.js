const router = require("express").Router();
let User = require("../models/User");

// GET All users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET user by ID
router.route("/id/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// GET user ID by EMAIL
router.route("/email/:email").get((req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  User.findOne({ Email: req.params.email }, (err, doc) => {
    if (err) {
      res.status(400).json("Error: " + err);
    } else {
      if (doc) res.json(doc);
      else {
        res.json({ _id: null });
      }
    }
  });
});

// POST new user
router.route("/add").post((req, res) => {
  const user = new User(req.body);
  //   console.log(user);
  user
    .save()
    .then(res.json(user))
    .catch((err) => {
      res.status(400).json("Error" + err);
    });
});

// PUT (update) user by ID
router.route("/update/:id").put((req, res) => {
  // Validate the request to protect from nosql injection

  User.findById(req.params.id)
    .then((user) => {
      var update_query = {};
      for (let key in req.body) {
        if (user[key] !== undefined && user[key] !== req.body[key])
          // if the field we have in req.body exists, we're gonna update it
          update_query[key] = req.body[key];
      }

      // now send it back
      User.updateOne({ _id: req.params.id }, update_query, { new: true })
        .then((doc) => {
          console.log(doc);
          User.findById(req.params.id).then((user) => res.json(user));
        })
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

// DELETE user by ID
router.route("/delete/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).json("User not found!");
      } else {
        res.json("User deleted: " + user.id);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/photoUpload/:id").post(async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    const oldAlbum = currentUser.PhotoAlbum;
    const response = await User.findByIdAndUpdate(req.params.id, {
      PhotoAlbum: [req.body.url, ...oldAlbum],
    });
    if (response) res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
});

router.route("/delete/photo").put(async (req, res) => {
  try {
    const id = req.body.id;
    const linkToDelete = req.body.link;
    const response = await User.findById(id);
    // console.log(linkToDelete);
    const newAlbum = response.PhotoAlbum.filter((link) => {
      if (link != linkToDelete) return true;
      else return false;
    });
    const result = await User.findByIdAndUpdate(id, { PhotoAlbum: newAlbum });
    res.send(true);
  } catch (err) {
    console.error(err);
    res.status(500).send(false);
  }
});

module.exports = router;

router.route("/createTest").post(async (req, res) => {
  try {
    const { id, to, from, content, Name } = req.body;
    const user = await User.findById(id);
    const currTest = user.TestimonialsSent;
    if (
      (await currTest.filter((post) => {
        if (post.To === to) {
          return true;
        }
      }).length) > 0
    )
      res.send({ result: "Repeated" });
    else {
      //
      const receiver = await User.findOne({ Email: to });
      const response = await User.findByIdAndUpdate(id, {
        TestimonialsSent: [
          ...currTest,
          { To: to, Content: content, Name: receiver.Name },
        ],
      });
      console.log(response);
      //Adding the Testimonial to TestimonialsReceived for receiver.
      const existingTest = receiver.TestimonialsReceived;
      const receiverRequests = receiver.ToRequests;
      // console.log(receiverRequests);
      // Removing request from receiver's ToRequest if any
      const newToRequests = receiverRequests.filter((x) => {
        if (x.Email === from) return false;
        return true;
      });
      // console.log(Name);
      const response2 = await User.findOneAndUpdate(
        { Email: to },
        {
          TestimonialsReceived: [
            ...existingTest,
            { From: from, Content: content, Name: Name },
          ],
          ToRequests: newToRequests,
        }
      );
      // console.log(response2);
      res.status(200).send({ result: "Sent" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send(false);
  }
});

router.route("/createReq").post(async (req, res) => {
  try {
    const { id, from, to, message, name } = req.body;
    const creator = await User.findById(id);
    const updatedCreator = await User.findByIdAndUpdate(id, {
      ToRequests: [...creator.ToRequests, { Email: to, Message: message }],
    });
    const receiver = await User.findOne({ Email: to });
    const updatedReceiver = await User.findByIdAndUpdate(receiver._id, {
      FromRequests: [
        ...receiver.FromRequests,
        { Email: from, Name: name, Message: message },
      ],
    });

    res.status(200).send({ result: "Added" });
  } catch (err) {
    console.log(err);
    res.status(500).send(false);
  }
});
