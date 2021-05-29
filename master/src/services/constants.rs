use std::env;

use redis;
use reqwest;

lazy_static! {
    pub static ref REDIS: redis::Client = redis::Client::open(env::var("REDIS_URL").unwrap()).unwrap();
    pub static ref REQUEST: reqwest::Client = reqwest::Client::new();
}
