use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub struct PostData {
    pub content: String,
    pub images: Vec<String>
}

#[derive(Serialize, Deserialize)]
pub struct PostRequest {
    pub id: u64,
    pub content: String,
    pub images: Vec<String>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct PostBridge {
    pub id: u64,
    pub content: String,
    pub createdAt: String,
    pub authorId: u64,
    pub images: Vec<String>,
    pub retweetId: Option<u64>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct RetweetData {
    pub postId: u64,
    pub content: String,
    pub images: Vec<String>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize, Debug)]
pub struct RetweetRequest {
    pub userId: u64,
    pub postId: u64,
    pub content: String,
    pub images: Vec<String>
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct FavoriteData {
    pub postId: u64
}

#[allow(non_snake_case)]
#[derive(Serialize, Deserialize)]
pub struct FavoriteRequest {
    pub userId: u64,
    pub postId: u64
}
