const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const session = new Schema({
  uid: Schema.Types.ObjectId,
});

const Session = mongoose.model("session", session);
module.exports = { Session };
