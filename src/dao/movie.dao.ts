import { Movie } from "../interfaces/movies.interface";
import BaseDAO from "./base.dao";
import MovieModel from "../models/movies.model";

class MovieDAO extends BaseDAO<Movie> {
    constructor() {
        super(MovieModel);
    }
}

export default MovieDAO;
