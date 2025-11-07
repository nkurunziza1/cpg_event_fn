import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FieldWrapper, FieldWrapperPassThroughProps } from '../fieldWrapper';

type SelectFieldProps = FieldWrapperPassThroughProps & {
	options: {
		value: string;
		label: string;
	}[];
	defaultValue?: string;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	registration?: Partial<UseFormRegisterReturn>;
	isLoading?: boolean;
	error?:any;
};


export const SelectField = (props: SelectFieldProps) => {
	const {
		options,
		defaultValue,
		placeholder,
		label,
		disabled = false,
		className = '',
		registration,
		error,
		isLoading = false,
	} = props;

	return (
		<FieldWrapper label={label} error={error}>
			<select
				className={clsx(
					'form-control py-0',
					error
						? 'border-danger focus:border-danger'
						: 'border-slate-300 focus:border-primary',
					className
				)}
				defaultValue={defaultValue}
				disabled={disabled || isLoading}
				{...registration}
			>
				{placeholder && (
					<option value='' selected disabled>
						{placeholder}
					</option>
				)}

				{options.map((option, key) => (
					<option key={key} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</FieldWrapper>
	);
};