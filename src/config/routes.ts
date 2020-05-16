import jwt from "jsonwebtoken";
import { ProfilesController } from "../controllers/profile.controller";
import { TweetsController } from "../controllers/tweet.controller";
import { AuthController } from "../controllers/authController";
const multer = require("multer")
const storage = multer.diskStorage({
    destination: (_: any, file: any, cb: Function) => {
        cb(null, `${__dirname}/../img/${file.fieldname}/`)
    },
    filename: (req: any, _: any, cb: Function) => {
        cb(null, `${req.user.username}.png`)
    },
})
const upload = multer({ storage });

const authVerify = (req: any, res: any, next: Function) => {
    const token = req.headers.authorization
    if (token == null) return res.status(401).json({ "error": "token not found" })
    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(403).json({ "error": "invalid token" })
        req.user = user
        next()
    })
}

export class Routes {

    public profileController: ProfilesController = new ProfilesController();
    public tweetsController: TweetsController = new TweetsController();
    public authController: AuthController = new AuthController();

    public routes(app: any): void {

        //auth routes
        app.route("/login")
            .post(this.authController.auth);

        //profile routes
        app.route("/profiles/:username")
            .get(authVerify, this.profileController.show)
            .put(authVerify, this.profileController.update);

        app.route("/profiles/:username/upload/photo")
            .post(authVerify, upload.single('profile'), this.profileController.uploadPhoto);

        app.route("/profiles/:username/upload/cover")
            .post(authVerify, upload.single('cover'), this.profileController.uploadCover);

        app.route("/profiles")
            .get(authVerify, this.profileController.index)
            .post(this.profileController.create);

        //tweet routes
        app.route("/tweets")
            .get(authVerify, this.tweetsController.index)
            .post(authVerify, this.tweetsController.create);

        app.route("/tweets/:id")
            .get(authVerify, this.tweetsController.show)
            .put(authVerify, this.tweetsController.update)
            .delete(authVerify, this.tweetsController.delete);

        app.route("/tweets/profile/:username")
            .get(authVerify, this.tweetsController.showByUsername);

    }
}