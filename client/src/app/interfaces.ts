export interface User {
  id: string,
  name?: string,
  email: String,
  password: string,
  repeatPassword?: string,
  routines: any[],
  exercise: any[],
}

export interface ApiResponse {
  data: User;
  error: string;
}

// model User {
//   id        Int @id @default (autoincrement())
//   createdAt DateTime @default (now())
//   updatedAt DateTime @updatedAt
//   email     String @unique
//   password  String
//   name      String

// }