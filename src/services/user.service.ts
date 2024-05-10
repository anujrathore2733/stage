import UserDAO from '../dao/user.dao';
import MovieDAO from '../dao/movie.dao';
import TvShowDAO from '../dao/tvShow.dao';
import HttpException from '../exceptions/HttpException';
import { Options } from 'interfaces/options.interface';
import RedisService from '../redis/service';

class UserService {
    private userDao = new UserDAO();
    private movieDao = new MovieDAO();
    private tvShowDao = new TvShowDAO();
    private redisService = new RedisService()


    public getList = async (
        userId: string,
        options: Options
    ) => {

        // TODO implement get list logic
        // fetch the user data
        // from the user data get the list
        // slice the list as per pagination
        // fetch all the content data from redis with key as id
        // filter all ids whose data is not available in redis
        // fetch all those data from mongo
        // add them to redis
        // update the TTL for all those ids in redis
        // return the data
        const user = await this.userDao.findDocById(userId)
        if(!user){
            throw new HttpException(404,"user not found")
        }
        const userList = user.myList
        let page = options.page || 1
        let limit = options.limit || 5
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const contentIds = userList.slice(startIndex, endIndex);
        let fetchedData = await this.redisService.readAndUpdateTTL(contentIds)
        console.log(fetchedData,"data")
        const missingKeys = fetchedData.missingKeys
        let newFetchedData:any = []
        if(missingKeys.length > 0){
            const moviesData = await this.movieDao.findDocsByIdList(missingKeys)
            const tvShowsData = await this.tvShowDao.findDocsByIdList(missingKeys)
            newFetchedData = [...moviesData,...tvShowsData]
            const isSuccess = await this.redisService.addAndUpdateTTL(newFetchedData)              
        }
        let finalDataToReturn = [...fetchedData.data,...newFetchedData]
        return finalDataToReturn
    };


    public addToList = async (
        userId: string,
        contentId:string
    ) => {
        // fetch the user
        // check if content id is already present or not
        // if present throw error
        // if not add the id and update the user
        const user = await this.userDao.findDocById(userId)
        if (!user){
            throw new HttpException(404,"user not found")
        }
        const userList = user.myList
        if(userList.includes(contentId)){
            throw new HttpException(409,"Content is already added")
        }
        const updatedUser = await this.userDao.addToMyList(userId,contentId)
        return updatedUser
    };

    public removeFromList = async (
        userId: string,
        contentId:string
    ) => {
        // fetch the user
        // check if content id is present or not
        // if not present throw error
        // if present remove it from user list
        // update the user
        const user = await this.userDao.findDocById(userId)
        if(!user){
            throw new HttpException(404,"user not found")
        }
        if(!user.myList.includes(contentId)){
            throw new HttpException(404,"Content is not in users list")
        }
        const updatedDoc = await this.userDao.removeFromMyList(userId,contentId)
        return updatedDoc
    };


}

export default UserService;
