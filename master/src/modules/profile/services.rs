use crate::services::request::{DatabaseBridge, DatabaseBridgeRequest};

use super::models::{FollowBody, FollowBridge, PostBridge, ProfileBridge, FollowingBridge, FollowedByBridge};

pub async fn get_profile_detail(id: u64) -> DatabaseBridgeRequest<ProfileBridge> {
    Ok(
        DatabaseBridge::get(
            &format!("profile/{}", id)
        ).await?
    )
}

pub async fn follow(request: &FollowBody) -> DatabaseBridgeRequest<FollowBridge> {
    Ok(
        DatabaseBridge::patch::<FollowBridge, FollowBody>(
            "profile/follow",
            request
        ).await?
    )
}

pub async fn post_pagination(id: u64, pagination: u64) -> DatabaseBridgeRequest<PostBridge> {
    Ok(
        DatabaseBridge::get(
            &format!("profile/{}/post/{}", id, pagination)
        ).await?
    )
}
pub async fn following_pagination(id: u64, pagination: u64) -> DatabaseBridgeRequest<FollowingBridge> {
    Ok(
        DatabaseBridge::get(
            &format!("profile/{}/following/{}", id, pagination)
        ).await?
    )
}

pub async fn followed_by_pagination(id: u64, pagination: u64) -> DatabaseBridgeRequest<FollowedByBridge> {
    Ok(
        DatabaseBridge::get(
            &format!("profile/{}/followedBy/{}", id, pagination)
        ).await?
    )
}
