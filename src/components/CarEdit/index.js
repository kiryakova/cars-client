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

const CarEdit = ({
    match,
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

    useEffect(async() => {
        //console.log('2');
        //console.log(brands);

        await requester.dataSet.getById('cars', match.params.id)
            .then(res => {
                setCar(res);
                setCarModel(res.model);
                setCarOwner(res.owner);
                setCarEngineType(res.engineType);
                //console.log(carModel);
                //return car;
                //console.log("bbb");
            })
            .catch(() => {
                setNotification('The car is not found!');
            });

    }, []);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { regNumber, engineVolume, enginePower, color } = e.target;
        
        //console.log(model.value);
        /*await requester.dataSet.getById("models", model.value)
        .then(res => {
            //console.log(res);
            setCarModel(res);
        })
        .then(console.log(carModel));
        //console.log(carModel);
        await requester.dataSet.getById("owners", owner.value)
        .then(res => {
            setCarOwner(res);
            return carOwner;
        })
        .then(carOwner => console.log(carOwner));
        */
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
            editCar(data, match.params.id);
        //}

        e.stopPropagation();
        
    };

    const editCar = async (data, id) => {
        //console.log(data);
        try{
            await requester.dataSet.updateEntity("cars", data, id)
            .then((res) => {
                if(res.status == 200){
                    setNotification('The car is edited!');
                    timeoutRedirect(history, `/cars`);
                }
                else{
                    
                    let message = res.message.replace('[', '').replace(']', '');
                    message = message.split(", ");
                    message.forEach(elem => {
                        let elemArray = elem.split(":");
                        setErrors(oldErrors => ({[elemArray[0]]: `${elemArray[1]}`, ...oldErrors}));
                    })
                    //console.log(errors);
                    setNotification('The car is not edited!');
                }
            })
        }
        catch(e){
            setNotification('The car is not edited!');
        };
    }

    return (
        <section className = {style['container-car-edit']}>
            <article className = {style['car-edit']}>
                <Notification message={notification} />
                <FormCreateEditCar formType="edit" car={car} errors={errors} setCarModel={setCarModel} setCarOwner={setCarOwner} setCarEngineType={setCarEngineType} onSubmitHandler={onSubmitHandler}></FormCreateEditCar>
            </article>
        </section>
    );
};

export default CarEdit;