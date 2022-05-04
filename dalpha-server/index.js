const config = require("./config");
const logger = require("./logger");
const ExpressServer = require("./expressServer");
const mongoose = require("mongoose");
const { application } = require("express");
const uri =
  "mongodb+srv://mukul:Pass%400000@cluster0.kdwef.gcp.mongodb.net/interiit?retryWrites=true&w=majority";

// const launchServer = async () => {
//   try {
//     mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//     this.expressServer = new ExpressServer(
//       process.env.PORT || config.URL_PORT,
//       config.OPENAPI_YAML
//     );
//     this.expressServer.launch();
//     logger.info("Express server running");
//   } catch (error) {
//     logger.error("Express Server failure", error.message);
//     await this.close();
//   }
// };

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then((result) => {
    console.log("Connected to mongodb");
    this.expressServer = new ExpressServer(
      process.env.PORT || config.URL_PORT,
      config.OPENAPI_YAML
    );
    this.expressServer.launch();
    logger.info("Express server running");
  })
  .catch((err) => console.log(err));


// launchServer().catch((e) => logger.error(e));
