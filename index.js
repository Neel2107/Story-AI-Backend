const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userPrompt = require("./models/story");
const bcrypt = require("bcrypt");
const userDetails = require("./models/user")



// const bodyParser = require("body-parser");

const app = express();
app.use(cors()); // Enable CORS for your Express app
app.use(express.json());


const promptRouter = require("./routes/prompt")

app.post("/api/prompt", promptRouter)


mongoose.connect("mongodb://127.0.0.1:27017/react-ai");


app.get("/getPrompt", (req, res) => {
  userPrompt
    .find()
    .then((users) => res.json(users))
    .catch((err) => res.json(err));
});




  app.post("/createPrompt", (req, res) => {
    userPrompt.create(req.body)
    .then(inputs => res.json(inputs))
    .catch(err => res.json(err))
    // console.log("req body------>", req.body)
  });
  

  app.post("/api/signup", async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      // Check if the user with the same email already exists
      const existingUser = await userDetails.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
  
      // Hash the password (you can use libraries like bcrypt)
      // const hashedPassword = await hashPassword(password);
  
      // Create a new user with hashed password
      const newUser = new userDetails({ name, email, password });
      await newUser.save();
  
      // Redirect the user to the login page after successful signup
       // Send status 201 when the user successfully signs up
    res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      console.log(err.stack);

      res.status(500).json({ message: "Server error" });
    }
  });


  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("--------------------------->")
    try {
      // Find the user by email
      const user = await userDetails.findOne({ email });
      console.log("<<<<<<<--------------------------->", user)
      
      if (!user) {
        console.log("<<<<<<<-----------invalid---------------->", )
        return res.status(401).json({ message: "Invalid credentials" });
      }
      console.log("<<<<<<<-----------Password---------------->")
      // Compare the hashed password with the provided password
      const providedPassword = password.trim();
      // const passwordMatch = await comparePasswords(providedPassword, user.password);
      
      console.log(password)
      console.log(user.password)
      // console.log(passwordMatch)
  
      if (password !== user.password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      else{
        res.status(200).json({ message: "Login successful", });      }
  
      // User is authenticated, you can generate a JWT token here for further authentication
  
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.post("/api/upvotes", async (req, res) => {

    const { upvoteValue, storyId } = req.body;
    // const storyId = mongoose.Types.ObjectId().toString();
  
    try {
      // Find the story by ID
      console.log(storyId, typeof(storyId), "<<<---------- storyId")
      const story = await userPrompt.findById(storyId);
      console.log(story, "<<<---------- story")
  
      if (!story) {
        return res.status(404).json({ message: 'Story not found' });
      }
  
      // Increment the upvote for the story by 1
      story.upvotes = upvoteValue ? story.upvotes + 1 : story.upvotes;
  

      // Save the updated story to the database
      await story.save();
  
      res.status(200).json({ message: 'Upvote successful' , upvotes: story.upvotes});

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  app.listen(5000, () => {
    console.log("App listening at port 5000");
  });





  // app.post("/upvote/:id", (req, res) => {
  //   const storyId = req.params.id;
  
  //   // Find the document by ID and increment the upvotes
  //   userPrompt
  //     .findByIdAndUpdate(
  //       storyId,
  //       { $inc: { upvotes: 1 } }, // Increment upvotes by 1
  //       { new: true } // Return the updated document
  //     )
  //     .then((updatedStory) => {
  //       res.json(updatedStory); // Respond with the updated story data
  //     })
  //     .catch((err) => {
  //       res.status(500).json({ error: "Failed to upvote story" });
  //     });
  // });


  
// app.get("/api", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   res.json({ message: "Hello from servers" });

  
// });


// // MongoDB connection URL and options
// const mongoURI = "mongodb://127.0.0.1:27017/react-ai"; // Update with your database name
// const mongooseOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

// // Connect to MongoDB using promises
// mongoose
//   .connect(mongoURI, mongooseOptions)
//   .then(() => {
//     console.log("Connected to MongoDB");
    
   
    
//   })
//   .catch((error) => {
//     console.error("Error connecting to MongoDB:", error);
//   });


// // Define your routes and other middleware as needed

// // Example route:
// app.get("/", (req, res) => {
//   res.send("Hello, World!");
// })


// const corsOptions = {
//     origin: "*",
//     credentials: true, //access-control-allow-credentials:true
//     optionSuccessStatus: 200,
// };


// app.use(cors(corsOptions));


// // Configure body-parser middleware
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());