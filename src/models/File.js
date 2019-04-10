const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const File = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

File.virtual("url").get(function() {
  return `http://localhost:3030/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);