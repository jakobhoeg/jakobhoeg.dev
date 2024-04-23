import { ComponentProps, forwardRef } from 'react';
import cx from '@/utils/cx';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export interface Props extends ComponentProps<'form'> {
  inputProps: ComponentProps<'input'>;
  buttonProps: ComponentProps<'button'>;
}

const Form = ({ inputProps, buttonProps, onSubmit }: Props, ref: any) => {
  return (
    <form
      onSubmit={onSubmit}
      className="relative m-auto flex items-center justify-center gap-4"
      ref={ref}
    >
      {/*<Avatar isUser={true} className="md:size-10 bg-gray-300" />*/}

      <input
        placeholder="Your question..."
        required
        {...inputProps}
        className={cx(
          'h-10 flex-1 rounded-xl pl-4 pr-12 transition md:h-12',
          'border border-gray-400 text-base',
          'disabled:bg-gray-100',
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
        <ArrowLeftIcon className="h-6 w-6" />
      </button>
    </form>
  );
};

export default forwardRef(Form);
