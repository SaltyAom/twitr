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

#[derive(Serialize, Deserialize)]
pub struct SignUpBridge {
    pub id: u64,
    pub username: String
}

#[derive(Serialize, Deserialize)]
pub struct SignUpRequest {
    pub username: String,
    pub password: String,
    pub name: String,
    pub email: String
}
