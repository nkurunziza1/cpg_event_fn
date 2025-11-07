import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
	children: ReactNode;
	label?: string;
	error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<
	FieldWrapperProps,
	'className' | 'children'
>;

export const FieldWrapper = (props: FieldWrapperProps) => {
	const { children, label, error } = props;

	return (
		<div className='block w-full'>
			<label>
				{label && (
					<p className='mb-2 text-sm font-medium text-dark-blue'>{label}</p>
				)}

				<div>{children}</div>
			</label>

			{error?.message && (
				<div
					role='alert'
					aria-label={error.message}
					className='mt-3 text-sm font-normal text-red-300'
				>
					{error.message}
				</div>
			)}
		</div>
	);
};
