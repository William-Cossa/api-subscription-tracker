import { Router } from "express";

const userRouter = Router();
userRouter.get("/", (req, res) => {
    res.end({title: " GET all users" })
});
userRouter.get("/:id", (req, res) => {
    res.end({title: " GET  users details" })
});
userRouter.post("/", (req, res) => {
    res.end({title: "CREATE all users" })
});
userRouter.put("/:id", (req, res) => {
    res.end({title: "UPDATE users" })
});
userRouter.delete("/:id", (req, res) => {
    res.end({title: " DELETE user" })
});

export default userRouter;