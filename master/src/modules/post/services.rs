use crate::services::request::{ DatabaseBridge, DatabaseBridgeRequest };

use super::models::{FavoriteRequest, PostBridge, PostRequest, RetweetRequest};

pub async fn create_post(post: &PostRequest) -> DatabaseBridgeRequest<PostBridge> {
    Ok(
        DatabaseBridge::put::<PostBridge, PostRequest>(
            "post/create", 
            post
        )
        .await?
    )
}

pub async fn retweet(post: &RetweetRequest) -> DatabaseBridgeRequest<PostBridge> {
    Ok(
        DatabaseBridge::put::<PostBridge, RetweetRequest>(
            "post/retweet", 
            post
        )
        .await?
    )
}

pub async fn favorite(post: &FavoriteRequest) -> DatabaseBridgeRequest<PostBridge> {
    Ok(
        DatabaseBridge::patch::<PostBridge, FavoriteRequest>(
            "post/favorite", 
            post
        )
        .await?
    )
}
