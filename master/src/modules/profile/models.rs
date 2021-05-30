use serde::{ Serialize, Deserialize };

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct ProfileBridge {
    pub profile: ProfileDataBridge,
    pub totalFollowing: u64,
    pub totalFollowedBy: u64
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct ProfileDataBridge {
    pub name: String,
    pub bio: Option<String>,
    pub cover: Option<String>,
    pub image: Option<String>,
    pub joinAt: String
}

#[derive(Serialize, Deserialize)]
pub struct FollowRequest {
    pub to: u64
}

#[derive(Serialize, Deserialize)]
pub struct FollowBody {
    pub from: u64,
    pub to: u64
}

#[derive(Serialize, Deserialize)]
pub struct FollowBridge {
    pub to: u64,
    pub r#type: String,
}

#[derive(Serialize, Deserialize)]
pub struct PostBridge {
    post: Vec<PostDataBridge>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct PostDataBridge {
    id: u64,
    content: String,
    images: Vec<String>,
    createdAt: String,
    retweetFromPost: Option<PostDataReferenceBridge>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct PostDataReferenceBridge {
    id: u64,
    content: String,
    images: Vec<String>,
    createdAt: String
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct FollowingBridge {
    following: Vec<FollowUserBridge>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct FollowedByBridge {
    followedBy: Vec<FollowUserBridge>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct FollowUserBridge {
    pub profile: FollowProfileBridge
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct FollowProfileBridge {
    pub id: u64,
    pub name: String,
    pub bio: Option<String>,
    pub image: Option<String>
}