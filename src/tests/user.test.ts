import * as request from 'supertest';
import App from '../app';
import UserRoute from '../routes/user.route';


describe('User Routes', () => {
    const userRoute = new UserRoute();
    const app = new App([userRoute]);

    describe('[GET] /api/user/:userId/list', () => {

        // get user list with correct user id
        it('should respond with status code 200', async () => {
            const userId = '663f9dad16bf4f3c9b3c9867';
            const response = await request(app.getServer()).get(
                `/api/user/${userId}/list`
            );
            expect(response.status).toBe(200);
        });

        // get user list with wrong user id
        it('should respond with status code 404', async () => {
            const userId = '663d541983c59f08216db4e0';
            const response = await request(app.getServer()).get(
                `/api/user/${userId}/list`
            );
            expect(response.status).toBe(404);
        });
    });

    describe('[PUT] /api/user/:userId/add/:contentId', () => {

        // addding a content which is not present with valid user id
        it('should respond with status code 200', async () => {
            const userId = '663f9dad16bf4f3c9b3c9867'; 
            const contentId = '663f9dad16bf4f3c9b3c9873';
            const response = await request(app.getServer()).put(
                `/api/user/${userId}/add/${contentId}`
            );
            expect(response.status).toBe(200);
        });


        // when user is not present
        it('should respond with status code 404', async () => {
            const userId = '663d541983c59f08317db3e0'; 
            const contentId = '663f9dad16bf4f3c9b3c9873';
            const response = await request(app.getServer()).put(
                `/api/user/${userId}/add/${contentId}`
            );
            expect(response.status).toBe(404);
        });

        // adding content which is already present in users myList
        it('should respond with status code 409', async () => {
            const userId = '663f9dad16bf4f3c9b3c9867'; 
            const contentId = '663f9dad16bf4f3c9b3c9873'; // adding content which is already present
            const response = await request(app.getServer()).put(
                `/api/user/${userId}/add/${contentId}`
            );

            expect(response.status).toBe(409);
        });
    });

    describe('[DELETE] /api/user/:userId/remove/:contentId', () => {

        // deleting a content which is already present in user list with correct user id
        it('should respond with status code 200', async () => {
            const userId = '663f9dad16bf4f3c9b3c9867';
            const contentId = '663f9dad16bf4f3c9b3c9873';
            const response = await request(app.getServer()).delete(
                `/api/user/${userId}/remove/${contentId}`
            );
            expect(response.status).toBe(200);
        });
        // deleting a content which is not present in users list with correct user id
        it('should respond with status code 404', async () => {
            const userId = '663d541983c59f08217db3e0';
            const contentId = '663d549957301509a0418d88';
            const response = await request(app.getServer()).delete(
                `/api/user/${userId}/remove/${contentId}`
            );
            expect(response.status).toBe(404);
        });
    });
});
