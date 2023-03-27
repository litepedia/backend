const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const runApplication = async () => {
    // Connect to redis at 127.0.0.1 port 6379 no password.
    const client = redis.createClient();
    await client.connect();
    await client.set('foo', 'bar');

    let data = await client.get('foo');
    console.log(data);
    
};

runApplication();