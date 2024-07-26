'use client';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Deal, dealSchema } from '@/app/_schemas/deal';
import { zodResolver } from '@hookform/resolvers/zod';
import { formHandlerAction } from '../_actions/formHandler';

export default function DealForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Deal>({
    resolver: zodResolver(dealSchema),
    defaultValues: {
      name: '',
      link: '',
      couponCode: '',
      discount: 10,
    },
    mode: 'onBlur',
  });

  const onSubmit = async (deal: Deal) => {
    const { successMsg } = await formHandlerAction(deal);
    if (successMsg) {
      toast.success(successMsg);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-4">
        <div>
          <label className="block " htmlFor="name">
            Name
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.name && (
              <small className="text-red-400">{errors.name?.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="link">
            Link
          </label>
          <input
            type="text"
            {...register('link')}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.link && (
              <small className="text-red-400">{errors.link?.message}</small>
            )}
          </div>
        </div>
        <div>
          <label className="block " htmlFor="couponCode">
            Coupon Code
          </label>
          <input
            type="text"
            {...register('couponCode')}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.couponCode && (
              <small className="text-red-400">
                {errors.couponCode.message}
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
            {...register('discount')}
            className="w-full p-2 rounded-md text-gray-900"
          />
          <div className="h-8">
            {errors?.discount && (
              <small className="text-red-400">{errors.discount.message}</small>
            )}
          </div>
        </div>
        <button
          className="bg-blue-500 py-2 px-4 rounded-md w-full hover:bg-blue-700"
          type="submit"
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
