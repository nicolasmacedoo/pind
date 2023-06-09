import { InputHTMLAttributes, forwardRef } from 'react'
import { useFormContext } from 'react-hook-form'
import { InputForm } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, ref) => {
    const { register } = useFormContext()

    return (
      <InputForm
        id={props.name}
        {...register(props.name)}
        {...props}
        ref={ref}
      />
    )
  },
)

// export function Input(props: InputProps) {
//   const { register } = useFormContext()

//   return (
//     <InputForm
//       id={props.name}
//       {...register(props.name)}
//       {...props}
//     />
//   )
// }
