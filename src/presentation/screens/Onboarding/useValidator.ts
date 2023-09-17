import { useState } from 'react';
import { ValidatorState } from '@/presentation/components/props/StateProps';
import { ValidatorResult } from '@/presentation/screens/Onboarding/Register';

const referenceOrCall = (functionOrValue: Function | any, ...params: any[]) => {
  if (typeof functionOrValue === 'function') {
    return functionOrValue(...params);
  } else {
    return functionOrValue;
  }
};

export enum ValidationLevel {
  None = 'none',
  Format = 'format',
  Additional = 'additional',
}

export interface FormField<T> {
  value: T;
  setValue: (newValueOrUpdateFunction: T | ((prev: T) => T)) => void;
  validate: () => Promise<void>;
  state: ValidatorResult;
  formatValidate: () => ValidatorResult;
  additionalValidate?: () => Promise<ValidatorResult>;
}

/**
 * @param initialValue
 * @param formatValidator 포맷(길이, 정규식) 등을 검증하는 validator 함수
 * @param additionalValidator 추가적인 것 (중복확인, 이메일인증) 등을 검증하는 validator 함수
 * @param validateOnInput 입력할때마다 검증할 범위 (미검증, 포맷, 추가검증까지)
 */
export default function <T>(
  initialValue: T,
  formatValidator: (value: T) => ValidatorResult,
  additionalValidator?: (value: T) => ValidatorResult | Promise<ValidatorResult>,
  validateOnInput: ValidationLevel = ValidationLevel.None,
): FormField<T> {
  const [value, setValue] = useState(initialValue);
  const [validState, setValidState] = useState<ValidatorResult>({
    state: ValidatorState.none,
    message: '',
  });

  return {
    value,
    setValue: async (newValueOrUpdateFunction: T | ((prev: T) => T)) => {
      const newValue = referenceOrCall(newValueOrUpdateFunction, value);
      setValue(newValue);
      console.log('validateOnInput: ', validateOnInput);
      if (validateOnInput === ValidationLevel.Format) {
        setValidState(formatValidator(newValue));
      } else if (validateOnInput === ValidationLevel.Additional) {
        if (additionalValidator && formatValidator(newValue).state === ValidatorState.valid) {
          setValidState(await additionalValidator(newValue));
        }
      }
    },
    validate: async () => {
      const formatValidatorResult = formatValidator(value);
      setValidState(formatValidatorResult);
      if (additionalValidator && formatValidatorResult.state !== ValidatorState.invalid) {
        setValidState(await additionalValidator(value));
      }
    },
    formatValidate: () => {
      const res = formatValidator(value);
      setValidState(res);
      return res;
    },
    additionalValidate: additionalValidator
      ? async () => {
          const res = await additionalValidator(value);
          setValidState(res);
          return res;
        }
      : undefined,
    state: validState,
  };
}
