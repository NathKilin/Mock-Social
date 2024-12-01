const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

// make hashed password
const makeHashedPassword = async (password, superSecretKey, saltNum) => {
  try {
    const combainKey = password + superSecretKey;
    const hashedPassword = await bcrypt.hash(combainKey, Number(saltNum));
    return hashedPassword;
  } catch (error) {
    console.log(`server error: ${error}`);
  }
};

//login function to compare the input Password with stored hashed password
const logInAuth = async (inputPassword, storedHashedPassword) => {
  try {
    // combine the input password with our secret key
    const combinedPassword = inputPassword + process.env.BCRYPT_KEY;

    // check if the combination of the two matches our stored password
    const isMatch = await bcrypt.compare(
      combinedPassword,
      storedHashedPassword
    );

    return isMatch;
  } catch (error) {
    console.log(`server error: ${error}`);
    return false;
  }
};

// creating jwt token
async function creatToken(userID, role, jwtKey) {
  const roles = [
    "user",
    "editor",
    "moderator",
    "admin",
    "super admin",
    "elchanan",
  ];
  !roles.includes(role) ? (role = "user") : role;
  const token = jwt.sign({ userID, role }, jwtKey, { expiresIn: "1h" });

  return token;
}

// const token = await creatToken("6725ef33079565d853d6c488", process.env.JWT_KEY);
// console.log(token);

module.exports = {
  makeHashedPassword,
  logInAuth,
  creatToken,
};
