import { Schema, model } from 'mongoose';

const DevSchema = new Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
});

export default model('Dev', DevSchema);