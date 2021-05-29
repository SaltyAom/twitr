use crate::services::constants::REDIS;

use redis::{AsyncCommands, RedisError};

pub async fn _get_sessions() -> Result<Vec<String>, RedisError> {
    let mut connection = REDIS.get_async_connection().await?;

    let list = connection.lrange::<&str, Vec<String>>("session:1", 0, -1).await?;

    Ok(list)
}

pub async fn _reset_sessions(id: i64) -> Result<isize, RedisError> {
    let mut connection = REDIS.get_async_connection().await?;

    connection.del(format!("session:{}", id)).await
}

async fn _list() {
    let sessions = _get_sessions().await;

    if sessions.is_err() {
        println!("{:?}", sessions.unwrap_err().to_string());
        return;
    }

    println!("{:?}", sessions.unwrap());
}
