import RedisConnection from './connection';

const redisConnection = RedisConnection.getInstance();

class RedisService {
    private redisClient: any = null;

    constructor() {
        redisConnection.connect().then(() => {
            this.redisClient = redisConnection.getClient();
        });
    }

    public async readAndUpdateTTL(keys: string[]) {
        const data: Array<Object> = [];
        const missingKeys: string[] = [];
        try {
            console.log(keys, 'keys');
            let fetchedData = await this.redisClient.mGet(keys);
            const multi = this.redisClient.multi();
            for (let i = 0; i < fetchedData.length; i++) {
                const reply = fetchedData[i];
                if (reply === null) {
                    missingKeys.push(keys[i]);
                } else {
                    const value = JSON.parse(reply);
                    data.push(value);
                    multi.expire(keys[i], 15 * 24 * 60 * 60); // 15 days in seconds
                }
            }
            await multi.exec();
            return { data, missingKeys };
        } catch (error) {
            console.log(error, 'error');
            let data: any = [];
            return { data: data, missingKeys: keys };
        }
    }

    public async addAndUpdateTTL(data: any[]){
        try {
            console.log(data.map((elm) => [elm._id.toString(), JSON.stringify(elm)]),"new data")
            await this.redisClient.mSet(data.map((elm) => [elm._id.toString(), JSON.stringify(elm)]));
            const multi = this.redisClient.multi();
            data.forEach((elm)=>{
                multi.expire(elm._id.toString(),15 * 24 * 60 * 60)
            })
            await multi.exec()
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

export default RedisService;
