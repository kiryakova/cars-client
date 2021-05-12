import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import FormCreateEditCar from '../FormCreateEditCar';
import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';

const CarCreate = ({
    history
}) => {
    const [car] = useState({});
    const [carModel, setCarModel] = useState(null);
    const [carOwner, setCarOwner] = useState(null);
    const [carEngineType, setCarEngineType] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(2);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        setErrors({});

        const { regNumber, engineVolume, enginePower, color } = e.target;
        
        const data = {
            'regNumber' : regNumber.value.replace(' ', ''),
            'model' : carModel,
            'engineType' : carEngineType,
            'engineVolume' : engineVolume.value, 
            'enginePower' : enginePower.value,
            'color' : color.value, 
            'owner' : carOwner,
        };

        createCar(data);

        e.stopPropagation();
        
    };

    const createCar = async (data) => {
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
                    
                    if(res.message.indexOf('[') >= 0)
                        setNotification('The car is not created!');
                    else
                        setNotification('The car is not created!' + res.message);
                    //setNotification('The car is not created!');
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