'use client';
import { useFormState } from 'react-dom';
import { DealFormState } from '../../types';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import SubmitButton from '@/app/_components/SubmitButton';
import { formHandlerAction } from '../_actions/formHandler';

const initialState: DealFormState = {};
export default function DealForm() {
  const [serverState, formAction] = useFormState(
    formHandlerAction,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (serverState.successMsg) {
      toast.success(serverState.successMsg);
      formRef.current?.reset();
    }
  }, [serverState]);

  return (
    <form action={formAction} ref={formRef}>
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
            defaultValue={serverState.data?.name}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {serverState.errors?.name && (
              <small className="text-red-400">{serverState.errors.name}</small>
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
            required={true}
            pattern="[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?"
            title="Please enter a valid url"
            defaultValue={serverState.data?.link}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {serverState.errors?.link && (
              <small className="text-red-400">{serverState.errors.link}</small>
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
            defaultValue={serverState.data?.couponCode}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {serverState.errors?.couponCode && (
              <small className="text-red-400">
                {serverState.errors.couponCode}
              </small>
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
            required={true}
            min={1}
            max={99}
            defaultValue={serverState.data?.discount || 10}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {serverState.errors?.discount && (
              <small className="text-red-400">
                {serverState.errors.discount}
              </small>
            )}
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
}
