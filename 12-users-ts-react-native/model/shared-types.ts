// import { FilterType } from "./TodoApp";
import { Views } from "../App";
import { User, UserStatus } from "./user.model";

export type IdType = number | undefined

export type Identifiable<K> = {id: K }

export type FormFieldDict<Value> = {
    [field: string]: Value
};

export type Optional<V> = V | undefined

export interface UserListener {
    (user: User): void;
  }

  export interface UserListener {
    (user: User): void;
  }
  
  export interface FilterChangeListener {
    (filter: FilterType): void;
  }
  
  export interface AppStateListener {
    (currentView: Views) : void;
  }
  
  export type FilterType = UserStatus | undefined;
  
  // export interface FilterChangeListener {
  //   (filter: FilterType): void;
  // }