use redis::{AsyncCommands, RedisError};

use rand::{thread_rng, Rng, seq::SliceRandom};
use rand::distributions::Distribution;

use crate::services::constants::REDIS;
use crate::services::request::{ DatabaseBridge, DatabaseBridgeRequest };

use super::models::{SignInBridge, SignInRequest};

struct Tokens;

impl Distribution<char> for Tokens {
    fn sample<R: Rng + ?Sized>(&self, rng: &mut R) -> char {
        *b"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()[]{}:".choose(rng).unwrap() as char
    }
}

pub fn generate_token() -> String {
    thread_rng().sample_iter(&Tokens)
        .take(127)
        .collect::<String>()
}

pub async fn add_session(id: i64) -> Result<String, RedisError> {
    let mut connection = REDIS.get_async_connection().await?;

    let token = generate_token();

    connection.lpush(
        format!("session:{}", id), 
        token.to_owned()
    ).await?;

    connection.set(
        token.to_owned(),
        id
    ).await?;

    Ok(token)
}

pub async fn delete_sessions(token: &str) -> Result<bool, RedisError> {
    let mut connection = REDIS.get_async_connection().await?;

    let id = connection.get::<&str, String>(token).await?;

    connection.lrem(format!("session:{}", id), 1, token).await?;
    connection.del(id).await?;

    Ok(true)
}

pub async fn validate(credentials: &SignInRequest) -> DatabaseBridgeRequest<SignInBridge> {
    Ok(
        DatabaseBridge::post::<SignInBridge, SignInRequest>(
            "credential/validate", 
            credentials
        ).await?
    )
}
