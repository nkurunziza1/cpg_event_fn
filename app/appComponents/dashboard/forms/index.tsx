import { ZodType, ZodTypeDef } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	useForm,
	UseFormReturn,
	SubmitHandler,
	UseFormProps,
	FieldValues,
} from 'react-hook-form';


type FormProps<TFormValues extends FieldValues, Schema> = {
	children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
	options?: UseFormProps<TFormValues>;
	schema?: Schema;
	onSubmit: SubmitHandler<TFormValues>;
	className?: string;
};

export const Form = <
	TFormValues extends FieldValues = Record<string, unknown>,
	Schema extends ZodType<TFormValues, ZodTypeDef, unknown> = ZodType<
		TFormValues,
		ZodTypeDef,
		unknown
	>
>(
	props: FormProps<TFormValues, Schema>
) => {
	const { children, options, schema, onSubmit, className } = props;

	const methods = useForm<TFormValues>({
		shouldUnregister: true,
		...options,
		resolver: schema && zodResolver(schema),
	});

	return (
		<form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
			{children(methods)}
		</form>
	);
};