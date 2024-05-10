import * as mongoose from 'mongoose';
import { Movie } from '../interfaces/movies.interface';

const Schema = mongoose.Schema;

const MovieSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        genres: [
            {
                type: String,
                enum: [
                    'Action',
                    'Comedy',
                    'Drama',
                    'Fantasy',
                    'Horror',
                    'Romance',
                    'SciFi'
                ]
            }
        ],
        releaseDate: { type: Date, required: true },
        director: { type: String, required: true },
        actors: [{ type: String, required: true }]
    },
    {
        timestamps: true
    }
);

const MovieModel = mongoose.model<Movie & mongoose.Document>(
    'Movie',
    MovieSchema
);

export default MovieModel;
