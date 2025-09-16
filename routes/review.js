const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn,isreviewAuthor}=require("../utils/middleware.js");
const reviewController=require("../controllers/reviews.js");



//review ka post route

router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview));

//delete review  route

router.delete("/:reviewId",isreviewAuthor,isLoggedIn,wrapAsync(reviewController.destroyReview));

module.exports=router;