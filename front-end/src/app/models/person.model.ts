type Gender = 'male' | 'female';


export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
}


export interface PeopleResponse {
  message: string;
  people: Person[];
}

export interface createPersonRequest {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
}

export interface updatePersonRequest {
  firstName?: string;
  lastName?: string;
  age?: number;
  gender?: Gender;
}