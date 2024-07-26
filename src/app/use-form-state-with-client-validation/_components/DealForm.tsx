'use client';
import { DealFormState, StringMap, StringToBooleanMap } from '../../types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Deal, dealSchema } from '@/app/_schemas/deal';
import SubmitButton from '@/app/_components/SubmitButton';
import { formHandlerAction } from '../_actions/formHandler';
import { useFormState } from 'react-dom';
import { convertZodErrors } from '@/utils/forms';

const inputNames = ['name', 'link', 'couponCode', 'discount'];
const initialState: DealFormState = {};

const initialData: Deal = {
  name: '',
  link: '',
  couponCode: '',
  discount: 10,
};

export default function DealForm() {
  const [serverState, formAction] = useFormState(
    formHandlerAction,
    initialState
  );
  const [errors, setErrors] = useState<StringMap>(serverState.errors || {});

  const [blurs, setBlurs] = useState<StringToBooleanMap>(
    serverState.blurs || {}
  );
  const [deal, setDeal] = useState<Deal>(serverState.data || initialData);

  useEffect(() => {
    if (serverState.successMsg) {
      toast.success(serverState.successMsg);
      setBlurs({});
    } else if (serverState.errors) {
      setAllBlurred();
    }
    if (serverState.data) {
      setDeal(serverState.data);
    }
    setErrors(serverState.errors || {});
  }, [serverState]);

  const setAllBlurred = () => {
    const blurred: StringToBooleanMap = {};
    inputNames.forEach((name) => {
      blurred[name] = true;
    });
    setBlurs(blurred);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setBlurs((prev) => ({ ...prev, [name]: true }));
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeal((prev) => {
      const updatedData = { ...prev, [name]: value };
      const validated = dealSchema.safeParse(updatedData);
      if (validated.success) {
        setErrors({});
      } else {
        const errors = convertZodErrors(validated.error);
        setErrors(errors);
      }
      return updatedData;
    });
  };
  return (
    <form action={formAction}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full p-2 rounded-md text-gray-900"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            value={deal.name}
          />
          <div className="h-8">
            {blurs.name && errors?.name && (
              <small className="text-red-400">{errors.name}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="link">
            Link
          </label>
          <input
            type="text"
            name="link"
            id="link"
            value={deal.link}
            className="w-full p-2 rounded-md text-gray-900"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />
          <div className="h-8">
            {blurs.link && errors?.link && (
              <small className="text-red-400">{errors.link}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="couponCode">
            Coupon Code
          </label>
          <input
            type="text"
            name="couponCode"
            id="couponCode"
            value={deal.couponCode}
            className="w-full p-2 rounded-md text-gray-900"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />
          <div className="h-8">
            {blurs.couponCode && errors?.couponCode && (
              <small className="text-red-400">{errors.couponCode}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="discount">
            Discount (%)
          </label>
          <input
            type="number"
            name="discount"
            id="discount"
            value={deal.discount}
            className="w-full p-2 rounded-md text-gray-900"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
          />
          <div className="h-8">
            {blurs.discount && errors?.discount && (
              <small className="text-red-400">{errors.discount}</small>
            )}
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
