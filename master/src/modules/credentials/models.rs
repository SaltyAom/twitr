use serde::{ Serialize, Deserialize };

#[derive(Serialize, Deserialize)]
pub struct SignInRequest {
    pub username: String,
    pub password: String
}

#[derive(Serialize, Deserialize)]
pub struct SignInBridge {
    pub id: i64
}