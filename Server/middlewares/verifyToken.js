const jwt = require("jsonwebtoken");

const verifySplitToken = async (req, res, next) => {
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
        decoded.role ? (req.role = decoded.role) : (req.role = "user");
        // console.log(`req- role: ${req.role} user id: ${req.userID}`);
        next();
      }
    });
  } catch (error) {
    res.status(500).send({ massage: "server error", error });
  }
};

module.exports = {
  verifySplitToken,
};
