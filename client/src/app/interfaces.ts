
export interface User {
  id: string,
  name?: string,
  email: String,
  password: string,
  repeatPassword?: string,
  routines: Routine[],
  exercise: any[],
}

export interface ApiResponseUser {
  data: User;
  error: string;
}

export interface ApiResponseRoutine {
  data: Routine;
  error: string;
}
export interface ApiResponseRoutines {
  data: Routine[];
  error: string;
}


export interface Routine {
  isActive?: boolean;
  id?: string,
  routineName: string,
  days: any[],
}

export interface Day {
  id?: string,
  dayName: string,
  exercises: any[],
  weekDays: number[];
}


// model User {
//   id        Int @id @default (autoincrement())
//   createdAt DateTime @default (now())
//   updatedAt DateTime @updatedAt
//   email     String @unique
//   password  String
//   name      String

// }