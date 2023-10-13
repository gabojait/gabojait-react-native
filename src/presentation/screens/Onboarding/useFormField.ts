import { ValidatorState } from '@/presentation/components/props/StateProps';
import { useState } from 'react';
import { FormField } from '@/presentation/screens/Onboarding/useValidator';

export default function <T>(initialValue: T): FormField<T> {
  const [value, setValue] = useState<T>(initialValue);
  return {
    value,
    setValue,
    validate: async () => {},
    state: {
      state: ValidatorState.valid,
    },
    formatValidate: () => ({
      state: ValidatorState.valid,
    }),
  };
}
