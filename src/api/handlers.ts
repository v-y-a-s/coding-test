import Joi, { array, string } from '@hapi/joi';
import { Request, Response } from 'express';
import { DataElement, TransformationInputValidator, TransformationInput, valueTypes, ReferenceData } from '../types/basic';

export const rootHandler = (_req: Request, res: Response) => {
  return res.send('API is working');
};

export const transformationHandler = (req: Request, res: Response) => {

  try {
    const inputData: TransformationInput = <TransformationInput>req.body;
    Joi.attempt(inputData, TransformationInputValidator);
    const { payload, referenceData: refs } = inputData;
    replaceValue(payload, refs)
    return res.json(inputData);
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: e.details || e.message
    });
  }
};

export const replaceValue = (input: DataElement, refs: ReferenceData) => {
  if (input.valueType === valueTypes.array && Array.isArray(input.value)) {
    input.value.forEach(element => {
      return replaceValue(element, refs);
    });
  } else {
    Object.entries(refs).forEach((e) => {
      if (input.value.toString().includes(e[0])) {
        input.value = input.value.toString().replace(`{${e[0]}}`, e[1]);
      }
    })
    return input;
  }
}