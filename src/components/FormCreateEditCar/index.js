import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import FormInput from '../FormInput';
import FormDropdown from '../FormDropdown';
import FormErrorField from '../FormErrorField';

const FormCreateEditCar = ({
    formType,
    car,
    errors,
    setCarModel,
    setCarOwner,
    setCarEngineType,
    onSubmitHandler 
}) => {

    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [owners, setOwners] = useState([]);
    const [engineTypes, setEngineTypes] = useState([]);
    const [canBeEmpty] = useState((formType == "edit" ? false : true));
    const [currentBrandId, setCurrentBrandId] = useState('');
    const [currentModelId, setCurrentModelId] = useState('');
    const [currentOwnerId, setCurrentOwnerId] = useState('');
    const [currentEngineTypeId, setCurrentEngineTypeId] = useState('');

    useEffect(() => {
        getBrands();
        getModels(currentBrandId);
        getOwners();
        getEngineTypes();
    }, [currentBrandId])

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

    const getModels = (currentBrandId) => {
        
        requester.dataSet.getAll('models', currentBrandId)
        .then(res => {
            if(res.length > 0){
                setModels(res);
            }
            else{
                setModels([]);
            }
        })
        .catch(() => {
            console.log('There are no result from the server!');
        });

    }

    const getOwners = () => {
        
        requester.dataSet.getAll('owners')
        .then(res => {
            if(res.length > 0){
                setOwners(res);
            }
            else{
                setOwners([]);
            }
        })
        .catch(() => {
            console.log('There are no result from the server!');
        });

    }

    const getEngineTypes = async () => {
        
        requester.dataSet.getEnumValues('cars', 'engine-types')
        .then(res => {
            if(res.length > 0){
                return res;
            }
            else{
                return [];
            }
        })
        .then(res => {
            setEngineTypes(res);
        })
        .catch(() => {
            console.log('There are no result from the server!');
        });       

    }

    const searchBrandClickHandler = (id) => {
        setCurrentBrandId(id);
    }

    const searchModelClickHandler = (id) => {
        setCurrentModelId(id);
        requester.dataSet.getById("models", id)
        .then(res => {
            setCarModel(res);
        });
    }

    const searchOwnerClickHandler = (id) => {
        setCurrentOwnerId(id);
        requester.dataSet.getById("owners", id)
        .then(res => {
            setCarOwner(res);
        })
    }

    const searchEngineTypeClickHandler = (id) => {
        setCurrentEngineTypeId(id);
        setCarEngineType(id);
    }

    return (
        <form className={style['car-form']} onSubmit={onSubmitHandler}>
            <FormInput
                name="regNumber"
                type="text" 
                defaultValue={car.regNumber}
                label='Register Number'
                required
            />
            <FormErrorField message={errors.regNumber} />

            {(car.model) ? 
            <>
            <FormDropdown
                name="brand" 
                id="brand" 
                label='Brand' 
                options={brands} 
                selectedValueId={car.model.brand.id} 
                canBeEmpty={canBeEmpty} 
                handleChange={searchBrandClickHandler} 
            /> 

            <FormDropdown
                name="model" 
                id="model" 
                label='Model' 
                options={models} 
                selectedValueId={car.model.id} 
                canBeEmpty={canBeEmpty} 
                handleChange={searchModelClickHandler} 
            />
            <FormErrorField message={errors.model} />
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

            <FormDropdown
                name="model" 
                id="model" 
                label='Model' 
                options={models} 
                selectedValueId='' 
                canBeEmpty={canBeEmpty} 
                handleChange={searchModelClickHandler} 
            />
            <FormErrorField message={errors.model} />
            </>
            }

            {(car.engineType) ? 
            <>
            <FormDropdown
            name="engineType" 
            id="engineType" 
            label='Engine Type' 
            options={engineTypes} 
            selectedValueId={car.engineType} 
            canBeEmpty={canBeEmpty} 
            handleChange={searchEngineTypeClickHandler} 
            />
            <FormErrorField message={errors.engineType} />
            </>
            :
            <>
            <FormDropdown
                name="engineType" 
                id="engineType" 
                label='Engine Type' 
                options={engineTypes} 
                selectedValueId='' 
                canBeEmpty={canBeEmpty} 
                handleChange={searchEngineTypeClickHandler} 
            />
            <FormErrorField message={errors.engineType} />
            </>
            }

            <FormInput
                name="engineVolume"
                type="text" 
                defaultValue={car.engineVolume}
                label='Engine Volume'
                required
            />
            <FormErrorField message={errors.engineVolume} />

            <FormInput
                name="enginePower"
                type="text" 
                defaultValue={car.enginePower}
                label='Engine Power'
                required
            />
            <FormErrorField message={errors.enginePower} />

            <FormInput
                name="color"
                type="text" 
                defaultValue={car.color}
                label='Color'
                required
            />
            <FormErrorField message={errors.color} />

            {(car.owner) ? 
            <>
            <FormDropdown
                name="owner" 
                id="owner" 
                label='Owner' 
                options={owners} 
                selectedValueId={car.owner.id} 
                canBeEmpty={canBeEmpty} 
                handleChange={searchOwnerClickHandler} 
            />
            <FormErrorField message={errors.owner} />
            </>
            : 
            <>
            <FormDropdown
                name="owner" 
                id="owner" 
                label='Owner' 
                options={owners} 
                selectedValueId='' 
                canBeEmpty={canBeEmpty} 
                handleChange={searchOwnerClickHandler} 
            />
            <FormErrorField message={errors.owner} />
            </>
            }

            <div className={style['button-wrapper']}>
                {(formType == "edit") 
                ? <input type="submit" value="Edit"  />
                : <input type="submit" value="Add"  />
            }
                <Link to={`/cars`}>Cancel</Link>
            </div>
        </form>
    );
}

export default FormCreateEditCar;
