require("dotenv").config({ path: "./config.env" });
const express = require("express");
// const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error");

// Express app
const app = express();

// Connect to MongoDB
const dbURI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose
	.connect(dbURI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: true,
	})
	.then((result) => {
		const server = app.listen(PORT);
		console.log("Server Listening at port " + PORT);
	})
	.catch((err) => console.log(err));

// Get data from request.body
app.use(express.json());

// redirect all api/auth/... to the auth router
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private/", require("./routes/private"));
// app.use("/api/User/details", require("./routes/private"));
// app.use("/api/Admin/convertUser", require("./routes/private"));
// app.use("/api/Agent/convertUser", require("./routes/private"));

// Error Handler (Has to be last piece of middleware)
app.use(errorHandler);
