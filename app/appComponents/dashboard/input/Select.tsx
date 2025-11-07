/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'

import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

interface SelectWithErrorProps {
  label?: string
  name: string
  options: { value: string; label: string }[]
  error?: string
  isMulti?: boolean
  value?: any
  type?: 'creatable' | 'normal'
  placeholder?: string
  className?: string
  onChange: ({ value, name }: { value: string | []; name: string }) => void
  [x: string | number | symbol]: unknown
}
export default function SelectWithError({
  label,
  name,
  options,
  value,
  onChange,
  error,
  type,
  isMulti = false,
  placeholder,
  className,
  ...props
}: SelectWithErrorProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className='text-co-black font-bold text-base' htmlFor={name}>
          {label}
        </label>
      )}
      {type === 'creatable' ? (
        <CreatableSelect
          className='w-full'
          isMulti={isMulti}
          options={options}
          id={name}
          onChange={e => {
            isMulti
              ? onChange({
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  value: e!.map(
                    (item: { value: string; label: string }) => item.value
                  ),
                  name: name,
                })
              : onChange({
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  target: {
                    // @ts-ignore
                    value: e.value!,
                    name: name,
                  },
                })
          }}
          defaultValue={value}
        />
      ) : (
        <Select
          className='w-full'
          defaultInputValue={value}
          placeholder={placeholder}
          styles={{
            control: baseStyles => ({
              ...baseStyles,
              borderColor: !error ? 'grey' : 'red',
            }),
          }}
          options={options}
          isMulti={isMulti}
          id={name}
          inputId={name}
          instanceId={name}
          onChange={e => {
            isMulti
              ? onChange({
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  value: e!.map(
                    (item: { value: string; label: string }) => item.value
                  ),
                  name: name,
                })
              : onChange({
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  target: {
                    // @ts-ignore
                    value: e.value!,
                    name: name,
                  },
                })
          }}
        />
      )}
      {error && <p className='text-red-500 text-xs'>{error}</p>}
    </div>
  )
}