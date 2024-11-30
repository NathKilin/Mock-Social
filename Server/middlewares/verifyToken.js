const jwt = require("jsonwebtoken");
// const validate = (req, res, next) => {
//   if (!req.body. || !req.body.) {
//     return res.status(400).send({
//       message: "Missing Fileds",
//     });
//   }
//   next();
// };

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).send({ message: "token miss!" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ massage: "invalid token", err });
      } else {
        //   reasiment to req (req is object so i cen add keys)
        req.userID = decoded.userID;
        req.role ? (req.userRole = decoded.role) : "";
        // console.log(decoded.userID);
        // console.log(decoded.role);

        next();
      }
    });
  } catch (error) {
    res.status(500).send({ massage: "server error", error });
  }
};

module.exports = {
  verifyToken,
};
