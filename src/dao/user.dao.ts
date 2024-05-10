import { User } from '../interfaces/user.interface';
import BaseDAO from './base.dao';
import UserModel from '../models/user.model';
import { ObjectId } from 'mongodb';

class UserDAO extends BaseDAO<User> {
    constructor() {
        super(UserModel);
    }

    public async addToMyList(
        userId: string,
        contentId: string
    ): Promise<User> {
        const updatedDoc = await this.docs.findByIdAndUpdate(userId, {
            $push: { myList: contentId }
        });
        updatedDoc.myList.push(contentId)
        return updatedDoc;
    }

    public async removeFromMyList(
        userId: string,
        contentId: string
    ): Promise<User> {
        const updatedDoc = await this.docs.findByIdAndUpdate(userId, {
            $pull: { myList: contentId }
        });
        const index = updatedDoc.myList.indexOf(contentId)
        updatedDoc.myList.splice(index,1)
        return updatedDoc;
    }
}

export default UserDAO;
