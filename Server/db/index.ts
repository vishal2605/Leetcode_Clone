import mongoose,{Schema} from "mongoose";
const userSchema = new mongoose.Schema({
    username: {type: String},
    name:String,
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
  const adminSchema = new mongoose.Schema({
    username: String,
    name:String,
    password: String
  });
  const ProblemSchema = new mongoose.Schema({
    title: String,
    difficulty:String,
    description: String,
    topicTag: [{ type: Schema.Types.String }],
    example: [{
        input:String,
        output:String,
    }],
    constraints: String,
    testcase:[{
      input:String,
      output:String,
    }]
  });
  
  // Define mongoose models
  export const User = mongoose.model('User', userSchema);
  export const Admin = mongoose.model('Admin', adminSchema);
  export const Problems = mongoose.model('Problems', ProblemSchema);
