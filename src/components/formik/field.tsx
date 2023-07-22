'use client'

import { Field } from 'formik'
import {TextField} from '@mui/material'

export default function FormikField({name, label, ...rest}: any) {
    return (
        <Field name={name}>
            {({field, form}: any) => {
                // const { setFieldValue } = form
                // const handleFieldChange = (value) => {
                //     setFieldValue(name, value);
                // }
                // const handleFieldChangeDebounced = debounce(handleFieldChange, 500);
                return (
                    <TextField
                        fullWidth
                        label={label}
                        size="small"
                        {...field} //ввод с задержкой
                        // onChange={(e) => handleFieldChangeDebounced(e.target.value)} //ввод без задержки
                        {...rest}
                        error={form.touched[name] && form.errors[name]}
                        helperText={form.touched[name] && form.errors[name]}
                    />
                )
            }}
        </Field>
    )
}