import * as Joi from '@hapi/joi';

export type ValidationSchema = Joi.AnySchema | Joi.AnySchema[];
export type TypeValidationRules<T> = { [K in keyof T]?: ValidationSchema };

export const getEnumValues = <T extends string | number>(e: any): T[] => {
    return typeof e === 'object' ? Object.keys(e).map(key => e[key]) : [];
}

export enum valueTypes {
    string = 'string',
    array = 'array',
}

export interface ReferenceData {
    REF_MSISDN: string,
    REF_IMSI: string,
    REF_SERVPROFID: string,
}

const ReferenceDataSchema: TypeValidationRules<ReferenceData> = {
    REF_MSISDN: Joi.string().min(0).max(50).required(),
    REF_IMSI: Joi.string().min(0).max(50).required(),
    REF_SERVPROFID: Joi.string().min(0).max(50).required(),
};

export const ReferenceDataValidator = Joi.object(ReferenceDataSchema);

export interface DataElement {
    name: string
    valueType: valueTypes,
    value: string | DataElement[],
}

const ElementSchema: TypeValidationRules<DataElement> = {
    name: Joi.string().min(1).max(50).required(),
    valueType: Joi.string().valid(...getEnumValues(valueTypes)),
    value: Joi.alternatives().try(
        Joi.string().min(1).max(50).required(),
        Joi.array().items(Joi.link('#DataElement'))
    ).required()
};

export const ElementValidator = Joi.object(ElementSchema).id('DataElement');;

export interface TransformationInput {
    payload: DataElement,
    referenceData: ReferenceData
}

export const TransformationInputValidator = Joi.object({
    payload: ElementValidator.required(),
    referenceData: ReferenceDataValidator.required()
});

