const mongoose = require("mongoose");



const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please lracreq 'name' dashty"],
    minLength: ['2', "Anuny shat karj e"],
    maxLength: 100
  },
  age: {
    type: Number,
    required: true,
    // Կաշխատի եթե բոլոր դաշտերը ճիշտ են լրացված
    //կամ եթե բացակաըում է այլ ստուգումներ
    //Օրինակ min: ['2', "age shat poqr e"],
    validate: (value) => {
      // այս ֆունկցիայում եթե լինի "syntax"-ի error; կոդի "chatch" բլոկը կաշխատի
      console.log("validate Function running", value);
      if (Math.sign(value) !== 1) {
        throw new Error("Age must by positive number")
      }
      return true;
    }

  },
  gender: {
    type: String,
    enum: ["male", "female"],
    lowercase: true,
  }
});


module.exports = mongoose.model("Client", UserSchema);