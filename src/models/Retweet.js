const mongoose = require("mongoose");
const { Schema } = mongoose;

const retweetSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model.Retweet ||
  mongoose.model("Retweet", retweetSchema);
