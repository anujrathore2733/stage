import { Options } from "../interfaces/options.interface";
import mongoose  from "mongoose";


abstract class BaseDAO<T> {
    public docs: mongoose.Model<any>;

    private updateOptions: any = { runValidators: true, new: true };

    constructor(model: any) {
        this.docs = model;
    }

    private constructOptions(options: Options): Options {
        return {
            page: options.page || 0,
            limit: options.limit || 0,
            sortBy:
                !options.sortBy || options.sortBy === "undefined"
                    ? "updatedAt"
                    : options.sortBy,
            sortOrder:
                !options.sortOrder || options.sortOrder === "undefined"
                    ? "DESC"
                    : options.sortOrder
        };
    }

    public async findDocs(
        filters: any,
        options: Options,
        projections?: string
    ): Promise<T[]> {
        options = this.constructOptions(options || {});
        const skip = (options.page - 1) * options.limit;
        const sortBy = options.sortBy;
        const sortOrder =
            (options.sortOrder === "DESC" || options.sortOrder === "desc"
                ? -1
                : 1) || -1;
        const docs: T[] = await this.docs
            .find(filters, projections)
            .sort({ [sortBy]: sortOrder })
            .skip(skip)
            .limit(options.limit)
            .lean();
        return docs;
    }

    public async findDocsByIdList(docIdList: Array<string>): Promise<T[]> {
        console.log(this.docs,"model")
        const docs: T[] = await this.docs
            .find({ _id: { $in: docIdList } })
            .lean();
        return docs;
    }

    public async findDocById(docId: string): Promise<T> {
        const doc: any = await this.docs.findById(docId).lean();
        return <T>doc;
    }

    public async createDoc(docData: T): Promise<T> {
        const createdDocData: T = await this.docs.create(docData);
        const jsonStr = JSON.stringify(createdDocData);
        return <T>JSON.parse(jsonStr);
    }
    
    public async createDocs(docData: Array<T>): Promise<T> {
        const createdDocData: Array<T> = await this.docs.insertMany(docData)
        const jsonStr = JSON.stringify(createdDocData);
        return <T>JSON.parse(jsonStr);
    }

    public async updateDocById(
        docId: string,
        updateBody: any,
        options?: any
    ): Promise<T> {
        const updateDocData: any = await this.docs
            .findByIdAndUpdate(
                docId,
                updateBody,
                options
                    ? { ...this.updateOptions, ...options }
                    : this.updateOptions
            )
            .lean();
        return updateDocData;
    }

    public async findOneAndUpdate(
        filters: any,
        docData: any,
        options?: any
    ): Promise<T> {
        const updatedDocData: any = await this.docs
            .findOneAndUpdate(
                filters,
                docData,
                options
                    ? { ...this.updateOptions, ...options }
                    : this.updateOptions
            )
            .lean();
        return updatedDocData;
    }
}

export default BaseDAO;
