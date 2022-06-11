export interface User {
  id: string,
  name?: string,
  email: String,
  password: string,
  repeatPassword?: string,
  routines: any[],
  exercise: Routine[],
}

export interface ApiResponse {
  data: User;
  error: string;
}

export interface Routine {
  id?: string,
  name: string,
  days: any[],
}


// model User {
//   id        Int @id @default (autoincrement())
//   createdAt DateTime @default (now())
//   updatedAt DateTime @updatedAt
//   email     String @unique
//   password  String
//   name      String

// }