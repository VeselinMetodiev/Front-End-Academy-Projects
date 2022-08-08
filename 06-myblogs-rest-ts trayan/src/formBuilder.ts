import { ChangedStatus, ValidationStatus } from "./state-enums";

export type FormComponents<Entity> = {
  [Prop in keyof Entity]?: FormComponent<Prop>;
};

interface FormComponent<State> {
  id: string;
  value: State;
  valid: ValidationStatus;
  changed: ChangedStatus;
  readonly initialValue: State;
  reset(): void;
  validate(): string[]; //validation errors, empty array if not errors
  render(): string;
}

export interface FormTextComponentType extends FormComponent<string> {
  multiline: boolean;
}
export type FormCheckboxComponentType = FormComponent<boolean>;
export interface FormNumberComponentType extends FormComponent<number> {
  min: number;
  max: number;
}
export interface FormUrlComponentType extends FormComponent<string> {
  allowRelative: boolean;
  allowInsecure: boolean; //HTTP/S
}

export type FormComponentType<Prop> = Prop extends string
  ? FormTextComponentType
  : Prop extends number
  ? FormNumberComponentType
  : Prop extends boolean
  ? FormCheckboxComponentType
  : never;

export class FormTextComponent implements FormTextComponentType {
  constructor(
    public id: string,
    public value: string,
    public multiline: boolean = false,
    public valid: ValidationStatus = ValidationStatus.INVALID,
    public changed: ChangedStatus = ChangedStatus.PRISTINE,
    public initialValue = ' '
  ) {}
  reset(): void {
    throw new Error("Method not implemented.");
  }
  validate(): string[] {
    throw new Error("Method not implemented.");
  }
  render(): string {
    throw new Error("Method not implemented.");
  }
}
