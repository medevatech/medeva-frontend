import { useState } from 'react'
import { omit } from 'lodash'

const useForm = (callback) => {
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        switch (name) {
            case 'nama':
                if (value === '') {
                    setErrors({
                        ...errors,
                        nama: 'Kolom ini wajib diisi'
                    })
                } else {
                    let newObj = omit(errors, "nama");
                    setErrors(newObj);
                }
                break;
            default:
                break;
        }
    }

    return {
        errors,
        validate,
    }
}

export default useForm;