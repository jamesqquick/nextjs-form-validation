'use client';
import { StringMap } from '../../types';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/app/_components/SubmitButton';
import { formHandlerAction } from '../_actions/formHandler';

export default function DealForm() {
  const [errors, setErrors] = useState<StringMap>({});
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (formData: FormData) => {
    const { errors, successMsg } = await formHandlerAction(formData);
    setErrors(errors || {});
    if (successMsg) {
      toast.success(successMsg);
      formRef.current?.reset();
    }
  };

  return (
    <form action={handleFormSubmit} ref={formRef}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            required={true}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.name && (
              <small className="text-red-400">{errors.name}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="link">
            Link (must start with https://)
          </label>
          <input
            type="text"
            name="link"
            id="link"
            className="w-full p-2 rounded-md text-gray-900"
            required={true}
            pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
            title="Please enter a valid url"
          />
          <div className="h-8">
            {errors?.link && (
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
            required={true}
            minLength={5}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.couponCode && (
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
            defaultValue={10}
            required={true}
            min={1}
            max={99}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.discount && (
              <small className="text-red-400">{errors.discount}</small>
            )}
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
