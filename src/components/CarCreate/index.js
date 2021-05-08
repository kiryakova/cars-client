import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import { Link } from 'react-router-dom';

import FormCreateEditCar from '../FormCreateEditCar';
/*import FormInput from '../FormInput';
import FormDropdown from '../FormDropdown';
import FormErrorField from '../FormErrorField';
*/
import Notification from '../Notification';
import { Fragment } from 'react';

import {PageContext} from '../../ContextWrapper';

const CarCreate = ({
    history
}) => {
    let [car, setCar] = useState({});
    //const [carBrand, setCarBrand] = useState({});
    const [carModel, setCarModel] = useState(null);
    const [carOwner, setCarOwner] = useState(null);
    const [carEngineType, setCarEngineType] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    //const [brands, setBrands] = useState([]);
    //const [models, setModels] = useState([]);
    //const [currentBrandId, setCurrentBrandId] = useState('');
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    setCurrentHeaderItem(currentHeaderItem);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { regNumber, engineVolume, enginePower, color } = e.target;
        
        const data = {
            'regNumber' : regNumber.value,
            //'brand': JSON.stringify(brand.value),
            'model' : carModel,
            'engineType' : carEngineType,
            'engineVolume' : engineVolume.value, 
            'enginePower' : enginePower.value,
            'color' : color.value, 
            'owner' : carOwner,
        };

        //console.log(data);

        //if(Object.keys(errors).length == 0){
            createCar(data);
        //}

        e.stopPropagation();
        
    };

    const createCar = async (data) => {
        //console.log(data);
        try{
            await requester.dataSet.createEntity("cars", data)
            .then((res) => {
                if(res.status == 200){
                    setNotification('The car is created!');
                    timeoutRedirect(history, `/cars`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    
                    //setNotification(res.message);
                    setNotification('The car is not created!');
                }
            })
        }
        catch(e){
            setNotification('The car is not created!');
        };
    }

    return (
        <section className = {style['container-car-create']}>
            <article className = {style['car-create']}>
                <Notification message={notification} />
                <FormCreateEditCar formType="create" car={car} errors={errors} setCarModel={setCarModel} setCarOwner={setCarOwner} setCarEngineType={setCarEngineType} onSubmitHandler={onSubmitHandler}></FormCreateEditCar>
            </article>
        </section>
    );
};

export default CarCreate;