import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState, useContext } from 'react';
import { timeoutRedirect } from '../../helpers/timeout-redirect';

import FormCreateEditCar from '../FormCreateEditCar';
import Notification from '../Notification';

import {PageContext} from '../../ContextWrapper';

const CarEdit = ({
    match,
    history
}) => {
    let [car, setCar] = useState({});
    const [carModel, setCarModel] = useState(null);
    const [carOwner, setCarOwner] = useState(null);
    const [carEngineType, setCarEngineType] = useState('');
    const [notification, setNotification] = useState('');
    const [errors, setErrors] = useState({});
    const [currentHeaderItem, setCurrentHeaderItem] = useContext(PageContext);
    //setCurrentHeaderItem(currentHeaderItem);
    setCurrentHeaderItem(2);

    useEffect(async() => {

        await requester.dataSet.getById('cars', match.params.id)
            .then(res => {
                setCar(res);
                setCarModel(res.model);
                setCarOwner(res.owner);
                setCarEngineType(res.engineType);
            })
            .catch(() => {
                setNotification('The car is not found!');
            });

    }, []);

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

        editCar(data, match.params.id);

        e.stopPropagation();
        
    };

    const editCar = async (data, id) => {
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

                    if(res.message.indexOf('[') >= 0)
                        setNotification('The car is not edited!');
                    else
                        setNotification('The car is not edited!' + res.message);
                    //setNotification('The car is not edited!');
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