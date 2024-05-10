import { Genre } from "./common.interface"
export interface User {
    id: string;
    username: string;
    preferences: {
        favoriteGenres: Genre[];
        dislikedGenres: Genre[];
    };
    watchHistory: Array<{
        contentId: string;
        watchedOn: Date;
        rating?: number;
    }>;
    myList:string[];  // added for the new feature My List
}
