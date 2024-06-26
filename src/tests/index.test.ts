import * as request from 'supertest';
import App from '../app';
import IndexRoute from '../routes/index.route';

describe('Testing Index', () => {
    describe('[GET] /', () => {
        it('response statusCode 200', () => {
            const indexRoute = new IndexRoute();
            const app = new App([indexRoute]);

            return request(app.getServer())
                .get(`${indexRoute.path}`)
                .expect(200);
        });
    });
});
