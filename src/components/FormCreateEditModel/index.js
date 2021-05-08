import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormDropdown from '../FormDropdown';
import FormErrorField from '../FormErrorField';

const FormCreateEditModel = ({
    formType,
    model,
    setModelBrand,
    errors,
    onSubmitHandler 
}) => {

    const [brands, setBrands] = useState([]);
    const [canBeEmpty, setCanBeEmpty] = useState((formType == "edit" ? false : true));
    //const [currentBrandId, setCurrentBrandId] = useState('');

    useEffect(() => {
        getBrands();
    }, [])

    const getBrands = () => {
        
        requester.dataSet.getAll('brands')
        .then(res => {
            if(res.length > 0){
                setBrands(res);
            }
            else{
                setBrands([]);
            }
        })
        .catch(() => {
            console.log('There are no result from the server!');
        });

    }

    const searchBrandClickHandler = (id) => {
        //setCurrentBrandId(id);
        requester.dataSet.getById("brands", id)
        .then(res => {
            setModelBrand(res);
        });
    }

    return (
        <form className={style['model-form']} onSubmit={onSubmitHandler}>
            <FormInput
                name="name"
                type="text" 
                defaultValue={model.name}
                label='Model Name'
                required
            />
            <FormErrorField message={errors.name} />

            {(model.brand) ? 
            <>
            <FormDropdown
                name="brand" 
                id="brand" 
                label='Brand' 
                options={brands} 
                selectedValueId={model.brand.id} 
                canBeEmpty={canBeEmpty} 
                handleChange={searchBrandClickHandler} 
            />
            <FormErrorField message={errors.brand} />
            </>
            : 
            <>
            <FormDropdown
                name="brand" 
                id="brand" 
                label='Brand' 
                options={brands} 
                selectedValueId='' 
                canBeEmpty={canBeEmpty} 
                handleChange={searchBrandClickHandler} 
            />
            <FormErrorField message={errors.brand} />
            </>
            }

            <div className={style['button-wrapper']}>
            {(formType == "edit") 
            ? <input type="submit" value="Edit"  />
            : <input type="submit" value="Add"  />
            }
                <Link to={`/models`}>Cancel</Link>
            </div>
        </form>
    );
}

export default FormCreateEditModel;