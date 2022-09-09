import { Question } from "./Question";

export type IdType = number | undefined

export type Identifiable<K> = {id: K }

export type Optional<V> = V | undefined

export interface QuestionListener {
  (question: Question): void;
}

export enum QuestionTypes {
  MultipleChoice = 1, MultipleResponse, DragAndDrop
}

export interface Point {
  x: number;
  y: number;
}