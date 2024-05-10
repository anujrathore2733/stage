import mongoose from 'mongoose';
import * as fs from 'fs';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, trim: true },
    preferences: {
        favoriteGenres: [
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
        dislikedGenres: [
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
        ]
    },
    watchHistory: [
        {
            contentId: { type: String, required: true },
            watchedOn: { type: Date, required: true },
            rating: { type: Number, default: undefined }
        }
    ],
    myList: [{ type: String, required: true }]
});

const MovieSchema = new mongoose.Schema({
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
});

const TVShowSchema = new mongoose.Schema({
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
    episodes: [
        {
            episodeNumber: { type: Number, required: true },
            seasonNumber: { type: Number, required: true },
            releaseDate: { type: Date, required: true },
            director: { type: String, required: true },
            actors: [{ type: String, required: true }]
        }
    ]
});

const userData = JSON.parse(fs.readFileSync('./data/users.json', 'utf-8'));
const movieData = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));
const tvShowData = JSON.parse(fs.readFileSync('./data/tvshows.json', 'utf-8'));

mongoose
    .connect('mongodb://localhost:27017/stage')
    .then(async() => {
        console.log('Connected to MongoDB');

        const UserModel = mongoose.model('User', UserSchema);
        const MovieModel = mongoose.model('Movie', MovieSchema);
        const TVShowModel = mongoose.model('TVShow', TVShowSchema);

        await UserModel.insertMany(userData)
        const users = await UserModel.find()
        console.log('----------------------USER IDS ---------------------')
        users.forEach((user)=>{
            console.log(user._id.toString())
        })

        await MovieModel.insertMany(movieData)
        const movies = await MovieModel.find()
        console.log('----------------------MOVIES IDS ---------------------')
        movies.forEach((movie)=>{
            console.log(movie._id.toString())
        })
            
        await TVShowModel.insertMany(tvShowData)
        const tvshows = await TVShowModel.find()
        console.log('----------------------TVSHOWS IDS ---------------------')
        tvshows.forEach((show)=>{
            console.log(show._id.toString())
        })
            
    })
    .catch((err) => console.error('MongoDB connection error:', err));
