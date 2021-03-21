import { useForm } from 'react-hook-form'

/**
 * The type of the `register` method provided by the useForm hook
 */
export type FormRegisterType = ReturnType<typeof useForm>['register']
