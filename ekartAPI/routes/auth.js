const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTER

router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body,password,
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }   catch (err) {
        res.status(500).json(err);
    }
});

//LOGIN

router.post('/login', async (req, res) => {
 try {
   const user = await User.findOne(
    {
        userName: req.body.user_name
    }
   );
   
   !user && res.status(401).json("wrongg credentials!")

   res.status(401).json("wrong credentials!");

   const accessToken = jwt.sign({
    id:user._id,
    idAdmin: user.isAdmin,
   },
   process.env.JWT_SEC,
        {expiresIn: "3d"}
   );

   const { password, ...others } = user.doc;
   res.status(200).json({...others, accessToken});

} catch (err) {
    res.status(500).json(err);
}
});



module.exports = router;