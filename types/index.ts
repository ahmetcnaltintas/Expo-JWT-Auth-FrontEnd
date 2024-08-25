export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    user_id: number;
  }