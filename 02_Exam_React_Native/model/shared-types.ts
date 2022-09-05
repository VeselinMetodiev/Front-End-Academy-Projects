import { ImageModel } from "./Image";

export type IdType = number | undefined

export type Identifiable<K> = {id: K }

export type Optional<V> = V | undefined

export interface ImageListener {
  (image: ImageModel): void;
}

export interface Point {
  x: number;
  y: number;
}