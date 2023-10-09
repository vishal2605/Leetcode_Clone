import mongoose,{Schema} from "mongoose";
const userSchema = new mongoose.Schema({
    username: {type: String},
    name:String,
    password: String
  });
  
  const adminSchema = new mongoose.Schema({
    username: String,
    name:String,
    password: String
  });
  const ProblemSchema = new mongoose.Schema({
    title: String,
    difficulty:String,
    tag:String,
    videoLink:String,
    questionLink:String
  });
  const TagSchema = new mongoose.Schema({
    tag:String,
    length:Number
  })
  
  // Define mongoose models
  export const User = mongoose.model('User', userSchema);
  export const Admin = mongoose.model('Admin', adminSchema);
  export const Problems = mongoose.model('Problems', ProblemSchema);
  export const Tag = mongoose.model('Tag',TagSchema);
