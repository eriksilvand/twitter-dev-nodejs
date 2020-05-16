import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
// import { Profile } from "./profile.model";

export class Tweet extends Model {
    public id!: number;
    public profileId!: string;
    public message!: string;
    public like?: boolean;
    public retweet?: boolean;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Tweet.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        profileId: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        message: {
            type: new DataTypes.STRING(240),
            allowNull: false
        },
        like: {
            type: DataTypes.BOOLEAN
        },
        retweet: {
            type: DataTypes.BOOLEAN
        },
    },
    {
        tableName: "tweets",
        sequelize: database
    }
);

if (process.env.MODE === 'dev') Tweet.sync({ force: true }).then(() => console.log("[SEQUELIZE] Tweets table created"));

export interface TweetInterface {
    message: string,
    like: boolean,
    retweet: boolean,
}