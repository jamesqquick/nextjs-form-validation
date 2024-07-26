'use server';

import { sleep } from '@/app/_lib/utils';
import { dealSchema } from '../../_schemas/deal';
import { DealFormState } from '../../types';
import { convertZodErrors } from '@/utils/forms';

export const formHandlerAction = async (
  prevState: DealFormState,
  formData: FormData
): Promise<DealFormState> => {
  //uncomment to easily view loading state in submit button
  //await sleep(1000);

  const unvalidatedData = {
    name: formData.get('name'),
    link: formData.get('link'),
    couponCode: formData.get('couponCode'),
    discount: formData.get('discount'),
  };

  const validated = dealSchema.safeParse(unvalidatedData);

  if (!validated.success) {
    const errors = convertZodErrors(validated.error);
    return {
      errors,
      data: validated.data,
    };
  } else {
    return {
      successMsg: 'Deal added successfully!',
    };
  }
};
