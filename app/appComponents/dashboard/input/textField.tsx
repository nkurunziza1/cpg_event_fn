import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from '../fieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
	className?: string;
	placeholder?: string;
	autoFocus?: boolean;
	disabled?: boolean;
	registration?: Partial<UseFormRegisterReturn>;
	isLoading?: boolean;
};

export const TextField = (props: InputFieldProps) => {
	const {
		label,
		placeholder,
		autoFocus = false,
		disabled = false,
		className = '',
		registration,
		error,
		isLoading = false,
	} = props;

	return (
		<FieldWrapper label={label} error={error}>
			<textarea
				className={clsx(
					'form-control resize-none',
					error?.message
						? 'border-red-300  focus:border-red-300'
						: 'border-slate-300 focus:border-primary',
					className
				)}
				autoComplete='off'
				autoFocus={autoFocus}
				placeholder={placeholder}
				disabled={disabled || isLoading}
				{...registration}
			></textarea>
		</FieldWrapper>
	);
};
