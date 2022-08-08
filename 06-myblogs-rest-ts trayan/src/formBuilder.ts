import { ChangedStatus, ValidationStatus } from "./state-enums";

export type FormComponents<Entity> = {
    [Prop in keyof Entity]?: FormComponent<Prop>
}

interface FormComponent<State> {
    id: string;
    value: State;
    valid: ValidationStatus;
    changed: ChangedStatus;
    readonly initialValue?: State;
    reset(): void;
    validate(): string[]; //validation errors, empty array if not errors

}

export interface FormTextComponent extends FormComponent<string> {
    multiline: boolean; 
}
export type FormCheckboxComponent = FormComponent<boolean>
export interface FormNumberComponent extends FormComponent<number>{
    min: number;
    max: number;
}
export interface FormUrlComponent extends FormComponent<string>{
    allowRelative: boolean;
    allowInsecure: boolean; //HTTP/S
}



export type FormComponentType<Prop> = Prop extends string ? FormTextComponent 
: Prop extends number ? FormNumberComponent 
: Prop extends boolean ? FormCheckboxComponent : never;
