use actix_web::HttpRequest;

use crate::services::constants::REDIS;

use redis::{AsyncCommands, RedisError};

pub async fn is_valid_author(requested_id: u64, token: &str) -> Result<bool, RedisError> {
    let mut connection = REDIS.get_async_connection().await?;

    let id = connection.get::<&str, u64>(token).await?;

    Ok(requested_id == id)
}

pub async fn valid_authority(id: u64, request: &HttpRequest) -> Result<bool, RedisError> {
    let token = request.cookie("token");

    if token.is_none() {
        return Ok(false)
    }

    let valid = is_valid_author(
        id, 
        token.unwrap().value()
    ).await?;

    Ok(valid)
}

pub async fn get_user_id(request: &HttpRequest) -> Result<u64, RedisError> {
    let token = request.cookie("token");

    if token.is_none() {
        return Ok(0)
    }

    println!("K");

    let mut connection = REDIS.get_async_connection().await?;

    let id = connection.get::<&str, u64>(token.unwrap().value()).await?;

    println!("id: {}", id);

    Ok(id)
}
