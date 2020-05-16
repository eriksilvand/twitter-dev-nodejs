import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";
import { Tweet } from "./tweet.model";

export class Profile extends Model {
  public username!: string;
  public name!: string;
  public photo!: string;
  public verified!: boolean;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  toJSON() {
    let attributes: any = Object.assign({}, this.get())
    delete attributes['password'];
    return attributes
  }
}

Profile.init(
  {
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    photo: {
      type: new DataTypes.STRING(255),
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN
    },
    password: {
      type: new DataTypes.STRING(10),
      allowNull: false
    }
  },
  {
    tableName: "profiles",
    sequelize: database
  }
);

if (process.env.MODE === 'dev') Profile.sync({ force: true }).then(() => console.log("[SEQUELIZE] Profile table created"));

Profile.hasMany(Tweet, {
  sourceKey: "username",
  foreignKey: "profileId",
  as: "teste"
});

export interface ProfileInterface {
  username: string,
  name: string,
  photo: string,
  verified: boolean
}