import React, { useMemo, useState } from 'react';
import RegisterRequestDto from '@/data/model/RegisterRequestDto';
import { FormField } from '@/presentation/screens/Onboarding/Register';

export default function <T>(initialData: {
  [key in keyof T]: FormField<T[keyof T]>;
}) {
  const [form, setForm] = useState<{
    [key in keyof T]: FormField<T[keyof T]>;
  }>(initialData);

  console.log(form);
  const setFormValue = (fieldName: keyof T, value: any) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: { ...prev[fieldName], value },
    }));
  };

  // const realForm = useMemo(() => {
  //   const newForm = { ...form };
  //   for (const key in newForm) {
  //     newForm[key] = { ...newForm[key], setValue: (value: any) => setFormValue(key, value) };
  //     console.log(newForm[key])
  //   }
  //   return newForm;
  // }, [form]);

  return {
    form,
    setForm: setFormValue,
  };
}
