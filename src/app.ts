import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import Route from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import * as dotenv from 'dotenv'
import RedisService from './redis/service';

dotenv.config()

class App {
    public app: express.Application;
    public port: string | number;
    public env: boolean;

    constructor(routes: Route[]) {
        this.app = express();
        this.port = process.env.PORT || 3001;
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
        this.connectToDatabase();
        new RedisService()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`🚀 App listening on the port ${this.port}`);
        });
    }

    public getServer() {
        return this.app;
    }

    private initializeMiddlewares() {
        
        this.app.use(cors({ origin: true, credentials: true }));
        this.app.use(bodyParser.json({ limit: '5mb' })); // support json encoded bodies
        this.app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
        this.app.use(express.json());
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach((route) => {
            if (route.path === '/') {
                this.app.use('/', route.router); // for checking health of system
            }
            this.app.use('/api', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private connectToDatabase() {
        console.log("MONGO",process.env.MONGO_URL)
        const MONGO_URL = process.env.MONGO_URL
        mongoose.connect(MONGO_URL);

        //Bind connection to error event (to get notification of connection errors)
        const db = mongoose.connection;
        db.on(
            'error',
            (error)=>{
                console.log("Failed to connect to mongo",error)
            }
        );
        db.once('open', function () {
            console.log('Connected to Database!');
        });
    }
}

export default App;
