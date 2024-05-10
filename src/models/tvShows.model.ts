import * as mongoose from "mongoose";
import { TvShow } from "../interfaces/tvShows.interface";

const Schema = mongoose.Schema;

const TvShowSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        genres: [{ type: String, enum: ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'SciFi'] }],
        episodes: [{
            episodeNumber: { type: Number, required: true },
            seasonNumber: { type: Number, required: true },
            releaseDate: { type: Date, required: true },
            director: { type: String, required: true },
            actors: [{ type: String, required: true }],
        }],
    },
    {
        timestamps: true
    }
);

const TvShowModel = mongoose.model<TvShow & mongoose.Document>(
    "TVShow",
    TvShowSchema
);

export default TvShowModel;

