import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
    res.end({title: " GET all Subcriptions" })
});
subscriptionRouter.get("/:id", (req, res) => {
    res.end({title: " GET  Subcriptions details" })
});
subscriptionRouter.post("/", (req, res) => {
    res.end({title: "CREATE all Subcriptions" })
});
subscriptionRouter.put("/:id", (req, res) => {
    res.end({title: "UPDATE Subcriptions" })
});
subscriptionRouter.delete("/:id", (req, res) => {
    res.end({title: " DELETE user" })
});
subscriptionRouter.get("/user/:id", (req, res) => {
    res.end({title: " GET all user subscriptions " })
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
    res.end({title: " Cancel Subscription " })
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
    res.end({title: "GET upcoming renewals " })
});

export default subscriptionRouter;