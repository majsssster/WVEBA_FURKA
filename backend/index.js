const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDb
mongoose.connect(
  "mongodb+srv://majsssster:ab23c46d@cluster0.zc82arl.mongodb.net/e-comerce"
);
//API Creation

// app.use((req,res,next) => {
//     res.setHeader('Access-Control-Allow-Origin:',"*");
//     res.setHeader('Access-Control-Allow-Methods:','POST, PUT, GET, OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers:','Origin, X-Requested-With, Content-Type, Accept, Authorization');

//     next();
// });

app.get("/", (req, res) => {
  res.send("Express App is running");
});

//Image Storage Engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

//Creating Upload Endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// Schema pre produkt

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  aviable: {
    type: Boolean,
    default: true,
  },
});

//Schema pre pouzivatela
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//Vytvorenie produktu

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Vyzobrazovanie all produktov

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products Fetched");
  res.send(products);
});

//Odstranenie produktu
app.delete("/removeproduct/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

//Uprava produktu
app.put("/editproduct/:id", async (req, res) => {
  try {
    const { name, image, category, new_price, old_price } = req.body;

    console.log("PUT request received for product ID:", req.params.id);
    console.log("Request body:", req.body);

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
      },
      { new: true }
    );

    console.log(updatedProduct);

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product updated successfully");
    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Pouzivatel
app.get("/allusers", async (req, res) => {
  let users = await Users.find({});
  console.log("All Users Fetched");
  res.send(users);
});

app.post("/removeuser/:id", async (req, res) => {
  await Users.findByIdAndDelete(req.params.id);
  console.log("Removed");
  res.json({
    success: true,
    name: req.body.name,
  });
});

app.put("/edituser/:id", async (req, res) => {
  try {
    const { name, email } = req.body;

    console.log("PUT request received for user ID:", req.params.id);
    console.log("Request body:", req.body);

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email },
      { new: true }
    );

    console.log(updatedUser);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("User updated successfully");
    res.json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//SIGN UP
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "Táto emailová adresa je už zaregistrovaná, použi inú",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();

  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//LOGIN
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Nespravné heslo" });
    }
  } else {
    res.json({ success: false, errors: "Nesprávna emailová adresa" });
  }
});
//midleware-fetchujem Userov pomocou tokenu
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      // res.status(401).send({errors:'please authenticate a valid token'})
      if (error.name === "JsonWebTokenError") {
        // Handle specific JWT errors
        return res.status(401).send({ error: "Invalid authentication token" });
      } else {
        // Handle other errors
        console.error("Error verifying token:", error.message);
        return res.status(500).send({ error: "Internal server error" });
      }
    }
  }
};

//Pridavanie productov do databaze konkretnemu userovi
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Added");
});
//Odstranenie produktu z userhovao kosika
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("removed", req.body.itemId);
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.send("Removed");
});
// creating
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server Running on Port" + port);
  } else {
    console.log("Error: " + error);
  }
});
