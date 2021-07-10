var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const port = 8081;
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var sign = require("./routes/signup");
var blog = require("./routes/connect");
var Vendor = require("./routes/vendor");
var cors = require("cors");
const Blog = require("./routes/connect");
const mongoose = require("mongoose");
const Signup = require("./routes/signup");
const Kandukur = require("./routes/Kandukur");
const kmart = require("./routes/kmart");
const harini = require("./routes/harini");
const ramesh = require("./routes/ramesh");
const delux = require("./routes/delux");
const jayasree = require("./routes/jayasree");
const kls = require("./routes/kls");
const more = require("./routes/more");
const dmart = require("./routes/dmart");
const order = require("./routes/orders");
const vindamart = require("./routes/vindamart");
const bestmart = require("./routes/bestmart");
const uday = require("./routes/uday");
const srirastu = require("./routes/srirastu");
const { resolveSoa } = require("dns");
var app = express();
var url =
  "mongodb+srv://mounica:Goutham@123@cluster0.z5ah0.mongodb.net/user?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongodb.....");
  });
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//Update order status
app.post("/updateOrders", (req, res) => {
  const query = {
    shop: res.req.body.shop,
    name: res.req.body.name,
    progress: res.req.body.progress,
  };
  console.log(query);
  const update = {
    $set: {
      progress: "Completed",
    },
  };
  const options = {
    upsert: false,
  };
  order.updateMany(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from dmart
app.post("/dmartItems", (req, res) => {
  const item = new dmart({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,
    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//dmart items retrieval
app.post("/dmart", (req, res) => {
  dmart
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete dmart items
app.post("/deletedmart", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  dmart.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update dmart items
app.post("/updatedmart", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  dmart.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from uday
app.post("/udayItems", (req, res) => {
  const item = new uday({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//uday items retrieval
app.post("/uday", (req, res) => {
  uday
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete uday items
app.post("/deleteuday", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  uday.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update uday items
app.post("/updateuday", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  uday.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from srirastu
app.get("/srirastuItems", (req, res) => {
  const item = new srirastu({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//srirastu items retrieval
app.post("/srirastu", (req, res) => {
  srirastu
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete srirastu items
app.post("/deletesrirastu", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  srirastu.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update srirastu items
app.post("/updatesrirastu", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  srirastu.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from more
app.get("/moreItems", (req, res) => {
  const item = new more({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//more items retrieval
app.post("/more", (req, res) => {
  more
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete more items
app.post("/deletemore", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  more.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update more items
app.post("/updatemore", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  more.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from harini
app.get("/hariniItems", (req, res) => {
  const item = new harini({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//harini items retrieval
app.post("/harini", (req, res) => {
  harini
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete harini items
app.post("/deleteharini", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  harini.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update harini items
app.post("/updateharini", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  harini.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from ramesh
app.get("/rameshItems", (req, res) => {
  const item = new ramesh({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//ramesh items retrieval
app.post("/ramesh", (req, res) => {
  ramesh
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete ramesh items
app.post("/deleteramesh", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  ramesh.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update harini items
app.post("/updateramesh", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  ramesh.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from delux
app.get("/deluxItems", (req, res) => {
  const item = new delux({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    //   ItemName: "Salt",
    //   price: 30,
    //   img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    //   desc: "1kg packs",
    //   pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//delux items retrieval
app.post("/delux", (req, res) => {
  delux
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete delux items
app.post("/deletedelux", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  delux.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update delux items
app.post("/updatedelux", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  delux.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from kls
app.get("/klsItems", (req, res) => {
  const item = new kls({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//kls items retrieval
app.post("/kls", (req, res) => {
  kls
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete kls items
app.post("/deletekls", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  kls.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update kls items
app.post("/updatekls", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  kls.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from kls
app.get("/jayasreeItems", (req, res) => {
  const item = new jayasree({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//jayasree items retrieval
app.post("/jayasree", (req, res) => {
  jayasree
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete jayasree items
app.post("/deletejayasree", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  jayasree.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update jayasree items
app.post("/updatejayasree", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  jayasree.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from vindamart
app.get("/vindamartItems", (req, res) => {
  const item = new vindamart({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
    // pantryType: "Cooking Essentials",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//vindamart items retrieval
app.post("/vindamart", (req, res) => {
  vindamart
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete vindamart items
app.post("/deletevindamart", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  vindamart.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update vindamart items
app.post("/updatevindamart", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  vindamart.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items from dmart
app.post("/bestmartItems", (req, res) => {
  const item = new bestmart({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,

    // ItemName: "Salt",
    // price: 30,
    // img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7dW1jfTuFIvGuLszve22GAlNx0ml6gUuF5-Hpt0Dwl2VG1q8Sw4U1YD76nrwl1zTRuD0&usqp=CAU",
    // desc: "1kg packs",
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//bestmart items retrieval
app.post("/bestmart", (req, res) => {
  bestmart
    .find()
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete bestmart items
app.post("/deletebestmart", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  bestmart.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update bestmart items
app.post("/updatebestmart", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  bestmart.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//delete kmart items
app.post("/deletekmart", (req, res) => {
  const query = {
    _id: res.req.body.name,
  };
  kmart.deleteOne(query).then((result) => {
    res.send("success");
  });
});

//update kmart items
app.post("/updatekmart", (req, res) => {
  const query = {
    _id: res.req.body.id,
  };
  console.log(query);
  const update = {
    $set: {
      ItemName: res.req.body.ItemName,
      price: res.req.body.price,
      img: res.req.body.img,
      desc: res.req.body.desc,
      pantryType: res.req.body.pantryType,
    },
  };
  console.log(update);
  const options = {
    upsert: false,
  };
  kmart.updateOne(query, update, options).then((result) => {
    res.send("success");
    console.log("success");
  });
});

//retrieve items
app.post("/kmartItems", (req, res) => {
  const item = new kmart({
    ItemName: res.req.body.name,
    price: res.req.body.price,
    img: res.req.body.img,
    desc: res.req.body.desc,
    pantryType: res.req.body.pantryType,
  });
  item
    .save()
    .then((result) => {
      res.send("successful");
    })
    .catch((err) => {
      console.log(err);
    });
});

//kmart items retrieval
app.post("/kmart", (req, res) => {
  kmart
    .find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// to add any shop into database
app.get("/add-kandukur", (req, res) => {
  const kandukur = new Kandukur({
    city: "Bhimavaram",
    name: "Delux Super Market",
    desc: "All in One, Home Delivery Contact : 7668 905 9187",
    img: "https://content3.jdmagicbox.com/comp/bhimavaram/g7/9999p8816.8816.171122130007.f5g7/catalogue/delux-super-market-bhimavaram-bazar-bhimavaram-supermarkets-f1rky.jpg",
    api: "delux",
  });
  kandukur
    .save()
    .then((result) => res.send("succesfully updates"))
    .catch((err) => console.log(err));
});

//update password for users
app.post("/updatePassword", (req, res) => {
  const pass = res.req.body.pass1;
  const phone1 = res.req.body.phone;
  var d = null;
  Signup.find().then((result) => {
    var ans = [];
    for (var i in result) {
      console.log(result[i].phone, phone1);
      if (result[i].phone == phone1) {
        d = result[i]._id;
      }
    }
    console.log(d);
    if (d != null) {
      Signup.findOneAndUpdate(
        { _id: d },
        { password: pass },
        function (err, data) {
          if (err) {
            console.log(err);
          } else {
            res.send(data);
            console.log(data);
          }
        }
      );
    }
  });
});

// for shops in any city
app.post("/shops", (req, res) => {
  Kandukur.find()
    .then((result) => {
      if (res.req.body.loc === "personal") {
        res.send(result);
      } else {
        var ans = [];
        for (var i in result) {
          if (result[i].city == res.req.body.loc) {
            ans.push(result[i]);
          }
        }
        res.send(ans);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// for shops in any city to vendor page
app.post("/shopsVendor", (req, res) => {
  Kandukur.find()
    .then((result) => {
      var ans = [];

      for (var i in result) {
        if (result[i].api == res.req.body.name) {
          ans.push(result[i]);
        }
      }
      res.send(ans);
    })
    .catch((err) => {
      console.log(err);
    });
});

//orders to vendors
app.post("/ordersVendor", (req, res) => {
  order
    .find()
    .then((result) => {
      var ans = [];
      for (var i in result) {
        ans.push(result[i]);
      }
      res.send(ans);
    })
    .catch((err) => {
      console.log(err);
    });
});

//orders to user
app.post("/sendOrders", (req, res) => {
  order
    .find()
    .then((result) => {
      var ans = [];
      for (var i in result) {
        if (result[i].name == res.req.body.name) {
          ans.push(result[i]);
        }
      }
      res.send(ans);
    })
    .catch((err) => {
      console.log(err);
    });
});
//orders from users

app.post("/orders", (req, res) => {
  let newDate = new Date();
  let p = newDate.getDate();
  let q = newDate.getMonth() + 1;
  let r = newDate.getFullYear();
  let s =
    newDate.getHours() +
    ":" +
    newDate.getMinutes() +
    ":" +
    newDate.getSeconds();
  console.log(
    p.toString() + "-" + q.toString() + "-" + r.toString() + s.toString()
  );
  var d = res.req.body.items;
  console.log(d);
  console.log(d.length);
  for (var i = 0; i < d.length; i++) {
    const items = new order({
      name: res.req.body.name,
      img: d[i].img,
      price: d[i].price,
      ItemName: d[i].ItemName,
      desc: d[i].desc,
      address: res.req.body.address,
      quantity: d[i].quantity,
      shop: d[i].shopName,
      phone: res.req.body.phone,
      progress: res.req.body.progress,
      dates: p.toString(),
      months: q.toString(),
      years: r.toString(),
      times: s.toString(),
    });
    console.log(items);
    items.save().then((result) => res.send("success"));
  }
  console.log(res.req.body.phone);
});

//used to signup a user
app.post("/add-user", (req, res) => {
  console.log(res);
  const sign = new Signup({
    name: res.req.body.name1,
    email: res.req.body.email1,
    password: res.req.body.pass1,
    phone: res.req.body.phone,
  });
  sign
    .save()
    .then((result) => res.send(res.req.body.name1))
    .catch((err) => console.log(err));
});

//used to get all the users details
app.post("/userDetails", (req, res) => {
  var details = null;
  Signup.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//used to display the profile
app.post("/profile", (req, res) => {
  var details = null;
  Signup.find()
    .then((result) => {
      details = result;
      for (var i in details) {
        if (details[i].email == res.req.body.name) {
          res.send(details[i]);
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

//insert vendors here
app.get("/vendorInsert", (req, res) => {
  const vendor = new Vendor({
    name: "more",
    email: "more@gmail.com",
    password: "more",
    shopName: "more",
    Address: "Palukur",
  });
  vendor
    .save()
    .then((result) => {
      console.log("successful");
    })
    .catch((err) => console.log(err));
});

//api validation for vendor login
app.post("/vendorLogin", (req, res) => {
  Vendor.find()
    .then((result) => {
      var details = result;
      var d = 0;
      for (var i in details) {
        if (
          details[i].email == res.req.body.name &&
          details[i].password == res.req.body.pass1
        ) {
          var p = details[i].name;
          res.send(p + "");
        }
      }
      res.send("failed");
    })
    .catch((err) => {
      console.log(err);
    });
});

// vendor to ui
app.post("/vendors", (req, res) => {
  Vendor.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//api to validate user login
app.post("/login", (req, res) => {
  var details = null;
  Signup.find()
    .then((result) => {
      details = result;
      for (var i in details) {
        if (
          details[i].email == res.req.body.name &&
          details[i].password == res.req.body.pass1
        ) {
          var p = details[i].name;
          res.send(p + "");
        }
      }
      res.send("failed");
    })
    .catch((err) => {
      console.log(err);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port);
module.exports = app;
