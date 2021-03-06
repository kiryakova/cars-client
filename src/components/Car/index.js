import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useState } from 'react';
import { Link } from 'react-router-dom';


import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


import Notification from '../Notification';

const Car = ({
    carObj,
    setIsDeleted
}) => {

    const [carDetails, setCarDetails] = useState({});
    const [showDetails, setShowDetails] = useState(false);
    const [subNotification, setSubNotification] = useState('');

    const showCarById = (id) => {
        setSubNotification('');

        requester.dataSet.getById('cars', id)
        .then(res => {
            setCarDetails(res);
            setShowDetails(true);
        })
        .catch(() => {
            setCarDetails({});
            setSubNotification('There are no details for this car!');
        });

    }

    const hideCarById = () => {
        setShowDetails(false);
        setSubNotification('');
    }

    const deleteConfirmation = (id) => {
        setSubNotification('');
        setIsDeleted(false);
        confirmAlert({
            title: 'Confirm delete',
            message: 'Do you really want to delete the car with register number: ' + carObj.regNumber,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteCar(id)
              },
              {
                label: 'No'
              }
            ]
        });
    }
    
    const deleteCar = (id) => {
        requester.dataSet.deleteEntity('cars', id)
        .then(res => {
            if(res.status == 200){
                setIsDeleted(true);
            }
            else
                setSubNotification('The car is not deleted!');
        })
        .catch(() => {
            setSubNotification('The car is not deleted!');
        });
    }

    return (
        <li className={style['car-item']}>
            <article className={style['row']}>
            <Notification message={subNotification} />
            <article className={style['subrow']}>
            <div>{carObj.regNumber}</div>
            <div>Brand: {carObj.model.brand.name}</div>
            <div>Model: <span>{carObj.model.name}</span>
            
            </div>
            <div className={style['button-wrapper']}>
            {(!showDetails) ? (<button onClick={() => showCarById(carObj.id)}>Show Details</button>) 
                : (<button onClick={() => hideCarById(carObj.id)}>Hide Details</button>)}
            </div>
            <div className={style['button-wrapper']}>
                <Link to={`/cars/edit/${carObj.id}`}><button>Edit</button></Link>
            </div>
            <div className={style['button-wrapper']}>
                <button onClick={() => deleteConfirmation(carObj.id)}>Delete</button>
            </div>

            </article>
            {(showDetails) ? (<article className={style['subrow']}>
                <div>Engine Type: {carDetails.engineType}</div>
                <div>Engine Volume: {carDetails.engineVolume}</div>
                <div>Engine Power: {carDetails.enginePower}</div>
                <div>Color: {carDetails.color}</div>
                </article>) 
                : ''}

            {(showDetails) ? (<article className={style['subrow']}>
            <div>Owner: {carDetails.owner.firstName} {carDetails.owner.lastName}</div>
            <div>EGN: {carDetails.owner.egn}</div>
            <div>Address: {carDetails.owner.address}</div>
            <div>Phone: {carDetails.owner.phone}</div>
            </article>) 
            : ''}
            </article>
        </li>
    );
}

export default Car;