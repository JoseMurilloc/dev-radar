import { Schema, model } from 'mongoose';

const DevSchema = new Schema({
  name: Number,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
});

export default model('Dev', DevSchema);