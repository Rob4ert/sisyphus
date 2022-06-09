export interface User {
  id: string,
  name: string,
  email: String,
  password: string,
  passwordRepeat?: string,
  routines: any[],
  exercise: any[],
}

// model User {
//   id        Int @id @default (autoincrement())
//   createdAt DateTime @default (now())
//   updatedAt DateTime @updatedAt
//   email     String @unique
//   password  String
//   name      String

// }