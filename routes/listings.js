const express=require("express");
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing}=require("../utils/middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js");
const upload = multer({ storage });
const listingController=require("../controllers/listings.js");


//search route
router.get("/search", async (req, res) => {
    const { country } = req.query;

    // Prevent empty query
    if (!country || country.trim() === "") {
        req.flash("error", "Please enter a country name.");
        return res.redirect("/listings");
    }

    try {
        const listings = await Listing.find({
            country: { $regex: country, $options: "i" }
        });

        res.render("listings/index", { allListings: listings });
    } catch (err) {
        console.error("Search error:", err);
        req.flash("error", "Search failed.");
        res.redirect("/listings");
    }
});

//index and create route
router.route("/")
      .get(wrapAsync(listingController.index))
      .post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(listingController.createListing)
    );
    

//create new Listing
router.get("/new",isLoggedIn,listingController.renderNewForm);


//show and update route and delete
router.route("/:id")
      .get(wrapAsync(listingController.showListing))
      .put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.updateListing))
      .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)
    );


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));


module.exports=router;