import { Request, Response } from "express";
import { Profile } from "../models/profile.model";
import { UpdateOptions } from "sequelize/types";

export class ProfilesController {

  public index(_: Request, res: Response) {
    Profile.findAll<Profile>({})
      .then((profiles: Array<Profile>) => res.json(profiles))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    console.log(req.body)
    Profile.create<Profile>(req.body)
      .then((profile: Profile) => res.status(201).json(profile))
      .catch((err: Error) => res.status(500).json(err));
  }

  public uploadPhoto(_: any, res: Response) {
    res.json({ ok: 'updated' });
  }

  public uploadCover(_: any, res: Response) {
    res.json({ ok: 'updated' });
  }

  public async update(req: Request, res: Response) {
    const options: UpdateOptions = {
      where: { username: req.params.username },
      limit: 1
    };

    if (await Profile.findByPk<Profile>(req.params.username)) {
      Profile.update(req.body, options)
        .then(async () => {
          const record = await Profile.findByPk<Profile>(req.params.username);
          res.status(202).json({ data: "success", result: record })
        }).catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(404).json({ errors: ["Profile not found"] });
    }
  }

  public show(req: Request, res: Response) {
    Profile.findByPk<Profile>(req.params.username)
      .then((profile: Profile | null) => {
        if (profile) {
          res.json(profile);
        } else {
          res.status(404).json({ errors: ["Profile not found"] });
        }
      }).catch((err: Error) => res.status(500).json(err));
  }
}