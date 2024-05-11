
# Stage Task (MyList)

A feature for existing Stage App where user can make a list of content(Movies, Tv Shows) which they can access later

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file, Providing url for cloud redis and mongodb with prefilled data

`PORT=3001`

`MONGO_URL`

`REDIS_URL`



## Run Locally

#### use latest node version >= 18.x

Clone the project

```bash
  git clone https://github.com/anujrathore2733/stage.git
```

Go to the project directory

```bash
  cd stage
```

Install dependencies

```bash
  npm install
```

If using your own mongodb and redis then to load test data use the command.

```
npm run loaddata
```
this will insert some dummy data into mongodb's user collection, movies collection and tvshows collection.

For testing

```bash
  npm run test
```

Start the server without build

```bash
  npm run dev
```

Start the server with build

```bash
  npm run build
```

```bash
  npm run start
```


## API Reference

**NOTE**- All the ids used in api are mongodb's ObjectId once test data is inserted in mongodb then use those ids in the api

#### To get the user's mylist

```http
  GET /api/user/${userId}/list
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `userId` | `string` | mongodb ObjectId(_id) of user document |

#### add content to users mylist 

```http
  PUT /api/user/${userId}/add/${contentId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | mongodb ObjectId(_id) of user document |
| `contentId`      | `string` | mongodb ObjectId(_id) of movie document or tvshow document |

#### Remove content from users mylist 

```http
  DELETE /api/user/${userId}/remove/${contentId}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId`      | `string` | mongodb ObjectId(_id) of user document |
| `contentId`      | `string` | mongodb ObjectId(_id) of movie document or tvshow document |

## Optimizations

The code is in modular format each module like user, movies, tvshow have there seperate model,service,controller,DAO.

to improve the performance of get List api `GET /api/user/${userId}/list` caching is used with the help of redis.

#### caching strategy
when the user hits the get list api `GET /api/user/${userId}/list`.

First, it checks Redis to determine whether the content is available. If the content is found in Redis, it retrieves the data from Redis and updates the TTL (Time To Live) of the stored content to 15 days. If the data is not found in Redis, it retrieves the data from MongoDB and adds it to Redis with a TTL of 15 days.

Therefore, each time the content is read from Redis, its TTL is updated to 15 days. This approach ensures that frequently accessed content remains in Redis, while less frequently accessed content is automatically removed from Redis after 15 days.


## Deployment
Code is deployed on aws EC2 instance using nginx web server and app is running using pm2 on public ip -> `http://15.206.164.218/`



