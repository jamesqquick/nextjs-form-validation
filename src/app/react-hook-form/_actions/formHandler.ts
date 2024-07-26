'use server';

import { sleep } from '@/app/_lib/utils';
import { Deal, dealSchema } from '../../_schemas/deal';
import { DealFormState } from '@/app/types';

export const formHandlerAction = async (
  data: unknown
): Promise<DealFormState> => {
  //uncomment to easily view loading state in submit button
  //await sleep(1000);
  const validated = dealSchema.safeParse(data);

  if (!validated.success) {
    const errors = validated.error.issues.reduce(
      (acc: { [key: string]: string }, issue) => {
        acc[issue.path[0]] = issue.message;
        return acc;
      },
      {}
    );
    return {
      errors,
    };
  } else {
    return { successMsg: 'Deal added successfully!', data: {} };
  }
};
