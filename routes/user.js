const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const{saveRedirectUrl}=require("../utils/middleware.js");

const userContoller=require("../controllers/users.js");

//signup route
router.route("/signup")
      .get(userContoller.renderSingupForm)
      .post(wrapAsync(userContoller.singup)
    );

//login route
router.route("/login")
      .get(userContoller.renderLoginForm)
      .post(saveRedirectUrl,passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,  
        }),
        userContoller.login
);  

router.get("/logout",userContoller.logOut);

module.exports=router;