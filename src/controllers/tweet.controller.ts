import { Request, Response } from "express";
import { Tweet } from "../models/tweet.model";
import { UpdateOptions, DestroyOptions } from "sequelize";
import { Profile } from "../models/profile.model";

export class TweetsController {

  public index(_req: Request, res: Response) {
    Profile.hasMany(Tweet, { foreignKey: 'profileId' });
    Tweet.belongsTo(Profile, { foreignKey: 'profileId' });
    Tweet.findAll<Tweet>({ include: [Profile] })
      .then((tweets: Array<Tweet>) => res.json(tweets))
      .catch((err: Error) => res.status(500).json(err));
  }

  public create(req: Request, res: Response) {
    console.log('req', req.body)
    Tweet.create<Tweet>(req.body)
      .then((tweet: Tweet) => res.status(201).json(tweet))
      .catch((err: Error) => res.status(500).json(err));
  }

  public show(req: Request, res: Response) {
    Tweet.findByPk<Tweet>(req.params.id)
      .then((tweet: Tweet | null) => {
        if (tweet) {
          res.json(tweet);
        } else {
          res.status(404).json({ errors: ["Tweet not found"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  public showByUsername(req: Request, res: Response) {
    Profile.hasMany(Tweet, { foreignKey: 'profileId' })
    Tweet.belongsTo(Profile, { foreignKey: 'profileId' })
    Tweet.findAll<Tweet>({
      where: {
        profileId: req.params.username
      },
      include: [Profile]
    }).then((tweets: Array<Tweet> | null) => {
      if (tweets) {
        res.json(tweets);
      } else {
        res.status(404).json({ errors: ["Tweet not found"] });
      }
    }).catch((err: Error) => res.status(500).json(err));
  }

  public async update(req: Request, res: Response) {
    const options: UpdateOptions = {
      where: { id: req.params.id },
      limit: 1
    };

    if (await Tweet.findByPk<Tweet>(req.params.id)) {
      Tweet.update(req.body, options)
        .then(async () => {
          const record = await Tweet.findByPk<Tweet>(req.params.id);
          res.status(202).json({ data: "success", result: record })
        }).catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(404).json({ errors: ["Tweet not found"] });
    }
  }

  public async delete(req: Request, res: Response) {
    const options: DestroyOptions = {
      where: { id: req.params.id },
      limit: 1
    };

    if (await Tweet.findByPk<Tweet>(req.params.id)) {
      Tweet.destroy(options)
        .then(() => res.status(201).json({ data: "success" }))
        .catch((err: Error) => res.status(500).json(err));
    } else {
      res.status(404).json({ errors: ["Tweet not found"] });
    }
  }
}