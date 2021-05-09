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
                name="firstname"
                type="text" 
                defaultValue={owner.firstName}
                label='First Name'
                required
            />
            <FormErrorField message={errors.firstName} />

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