import { TvShow } from "../interfaces/tvShows.interface";
import BaseDAO from "./base.dao";
import TvShowModel from "../models/tvShows.model";

class TvShowDAO extends BaseDAO<TvShow> {
    constructor() {
        super(TvShowModel);
    }
}

export default TvShowDAO;