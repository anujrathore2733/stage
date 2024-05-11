import { time } from 'console';
import { createClient } from 'redis';

class RedisConnection {
    private static instance: RedisConnection;
    private client: any | null = null;

    private constructor() {
        
    }

    public static getInstance(): RedisConnection {
        if (!RedisConnection.instance) {
            RedisConnection.instance = new RedisConnection();
        }
        return RedisConnection.instance;
    }

    public async connect(){
        if (!this.client) {
            this.client = createClient({url:process.env.REDIS_URL})
            this.client.on('error', (err: any) => console.log('Redis Client Error', err));
            this.client.on('connect', () => {
                console.log('REDIS CONNECTED');

            });
            this.client.connect()
        }
    }

    public getClient(): any | null {
        return this.client;
    }
}

export default RedisConnection;
