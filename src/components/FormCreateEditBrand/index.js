import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormDropdown from '../FormDropdown';
import FormErrorField from '../FormErrorField';

const FormCreateEditBrand = ({
    formType,
    brand,
    errors,
    onSubmitHandler 
}) => {

    return (
        <form className={style['brand-form']} onSubmit={onSubmitHandler}>
            <FormInput
                name="name"
                type="text" 
                defaultValue={brand.name}
                label='Brand Name'
                required
            />
            <FormErrorField message={errors.name} />

            <div className={style['button-wrapper']}>
            {(formType == "edit") 
            ? <input type="submit" value="Edit"  />
            : <input type="submit" value="Add"  />
            }
                <Link to={`/brands`}>Cancel</Link>
            </div>
        </form>
    );
}

export default FormCreateEditBrand;