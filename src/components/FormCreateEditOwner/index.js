import style from './styles.module.css';

import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormErrorField from '../FormErrorField';

const FormCreateEditOwner = ({
    formType,
    owner,
    errors,
    onSubmitHandler 
}) => {

    return (
        <form className={style['owner-form']} onSubmit={onSubmitHandler}>
            <FormInput
                name="firstName"
                type="text" 
                defaultValue={owner.firstName}
                label='First Name'
                required
            />
            <FormErrorField message={errors.firstName} />

            <FormInput
                name="lastName"
                type="text" 
                defaultValue={owner.lastName}
                label='Last Name'
                required
            />
            <FormErrorField message={errors.lastName} />

            <FormInput
                name="egn"
                type="number" 
                defaultValue={owner.egn}
                label='EGN'
                required
            />
            <FormErrorField message={errors.egn} />

            <FormInput
                name="address"
                type="text" 
                defaultValue={owner.address}
                label='Address'
                required
            />
            <FormErrorField message={errors.address} />

            <FormInput
                name="phone"
                type="text" 
                defaultValue={owner.phone}
                label='Phone'
                required
            />
            <FormErrorField message={errors.phone} />

            <div className={style['button-wrapper']}>
            {(formType == "edit") 
            ? <input type="submit" value="Edit"  />
            : <input type="submit" value="Add"  />
            }
                <Link to={`/owners`}>Cancel</Link>
            </div>
        </form>
    );
}

export default FormCreateEditOwner;