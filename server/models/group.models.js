const mongoose = require("mongoose");

const group = new mongoose.Schema(
  {
    groupname: {
      type: String,
      required: true,
    },
    description:{
        type:String
    },
    admin:{
        type:Object,
        required:true
    },
    users:{
        type:Array,
        required:true,
    },
    messages:{
        type:Array
    }
  }
);

const GroupModel = mongoose.model("group",group);

module.exports = GroupModel;
