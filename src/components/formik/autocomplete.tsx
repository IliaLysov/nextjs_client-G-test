'use client'

import { Formik, Form, Field } from 'formik'
import {TextField, Autocomplete} from '@mui/material'

export default function FormikAutocomplete({ name, label, options, ...rest }: any) {
    return (
        <Field name={name}>
            {({ field, form }: any) => {
                const { setFieldValue } = form;
                return (
                    <Autocomplete
                        key={field.name}
                        limitTags={1}
                        size="small"
                        {...field}
                        {...rest}
                        options={options}
                        getOptionLabel={(option: any) => option.label}
                        isOptionEqualToValue={(option: any, value: any) => option.value === value.value}
                        onChange={(e, value) => setFieldValue(name, value)}
                        renderInput={(params) => (
                            <TextField
                                key={field.name}
                                {...params}
                                label={label}
                                error={form.touched[name] && form.errors[name]}
                                helperText={form.touched[name] && form.errors[name]}
                            />
                        )}
                    />
                );
            }}
        </Field>
    );
}