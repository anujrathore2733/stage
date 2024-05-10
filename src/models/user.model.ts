import * as mongoose from "mongoose";
import { User } from "../interfaces/user.interface";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, require: true, trim: true },
        preferences: {
            favoriteGenres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
            dislikedGenres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }]
        },
        watchHistory: [{
            contentId: { type: String, required: true },
            watchedOn: { type: Date, required: true },
            rating: { type: Number, default: undefined }
        }],
        myList: [{ type: String, required: true }]
    },
    {
        timestamps: true
    }
);

const UserModel = mongoose.model<User & mongoose.Document>(
    "User",
    UserSchema
);

export default UserModel;
