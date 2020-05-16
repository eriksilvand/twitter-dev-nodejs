import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { Profile } from "../models/profile.model";

export class AuthController {

    public auth(req: Request, res: Response) {
        Profile.findByPk(req.body.username).then((profile: Profile | null) => {
            if (profile && profile.password === req.body.password) {
                const token = jwt.sign(
                    { username: profile.username },
                    process.env.JWT_SECRET as string,
                    { expiresIn: 1800 }
                );
                res.status(200).json({ token, profile });
            } else {
                res.status(200).json({ error: 'login/password invalid' });
            }
        })
            .catch((err: Error) => res.status(500).json(err));
    }

}