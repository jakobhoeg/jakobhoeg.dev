import { ComponentProps, forwardRef } from 'react';
import cx from '@/utils/cx';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PaperPlaneIcon,
} from '@radix-ui/react-icons';

export interface Props extends ComponentProps<'form'> {
  inputProps: ComponentProps<'input'>;
  buttonProps: ComponentProps<'button'>;
}

const Form = ({ inputProps, buttonProps, onSubmit }: Props, ref: any) => {
  return (
    <form onSubmit={onSubmit} className="relative flex w-full" ref={ref}>
      <input
        placeholder="Your question..."
        required
        {...inputProps}
        className={cx(
          'h-10 flex-1 rounded-xl pl-4 pr-12 transition md:h-12',
          'border border-neutral-400 text-sm dark:border-neutral-600 dark:bg-neutral-900',
          'disabled:bg-neutral-100 dark:disabled:bg-neutral-800',
          inputProps.className,
        )}
        type="text"
      />

      <button
        {...buttonProps}
        type="submit"
        tabIndex={-1}
        className={cx(
          'absolute right-3 top-1/2 -translate-y-1/2',
          'opacity-50',
        )}
      >
        <PaperPlaneIcon className="h-5 w-5" />
      </button>
    </form>
  );
};

export default forwardRef(Form);
