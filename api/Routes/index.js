const router = require("express").Router();
const orgRouter=require("../Organisation/org.router");
const userRouter=require("../Users/user.router");
const authRouter=require("../Auth/auth.router");
const userregisterRouter = require("../UserRegister/Reg.router");
const departmentRouter=require("../Department/dept.router");
const sectionRouter=require("../Section/sec.router");
const reportRouter=require("../Report/report.router");
const headerRouter=require("../Header/header.router");
const checkRouter=require("../Checklist/check.router");
const titleRouter=require("../Title/title.router");
const usercheckRouter=require("../UserChecklist/usercheck.router");
const categoryRouter=require("../Category/cat.router");
const productRouter=require("../Products/product.router");
const trackRouter=require("../Purchase_Track/track.router");
const stockRouter=require("../Stock/stock.router");
const purchaseRouter=require("../Purchase/purchase.router");
const feedbackRouter=require("../Feedback/feedback.router");
const serviceRouter=require("../Service/service.router");
const checkoutRouter=require("../Checkout/checkout.router");
const paymentRouter=require("../Payment/payment.router");
const bookingRouter = require("../Booking/booking.router");
const orderRouter=require("../Order/order.router");
const placeRouter = require("../Place/cat.router");
const {verifyToken} = require("../Auth/auth.controller");


router.use("/api/organisation",orgRouter);
router.use("/api/users",userRouter);
router.use("/api/auth",authRouter);
router.use("/api/userRegister",userregisterRouter);
router.use("/api/department",departmentRouter);
router.use("/api/section",sectionRouter);
router.use("/api/report",reportRouter);
router.use("/api/header",headerRouter);
router.use("/api/checklist",checkRouter);
router.use("/api/title",titleRouter);
router.use("/api/userchecklist",usercheckRouter);
router.use("/api/category",categoryRouter);
router.use("/api/products",productRouter);
router.use("/api/track",trackRouter);
router.use("/api/stock",stockRouter);
router.use("/api/purchase",purchaseRouter);
router.use("/api/feedback",feedbackRouter);
router.use("/api/service",serviceRouter);
router.use("/api/checkout",checkoutRouter);
router.use("/api/payment",paymentRouter);
router.use("/api/order",orderRouter);
router.use("/api/place",placeRouter);


//cafe
router.use("/api/booking",bookingRouter);

module.exports = router; 