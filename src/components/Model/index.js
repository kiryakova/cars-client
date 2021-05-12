import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Notification from '../Notification';

const Model = ({
    modelObj,
    setIsDeleted,
    currentModelItem,
    setCurrentModelItem
}) => {

    const [subNotification, setSubNotification] = useState('');

    const deleteConfirmation = (id) => {
        setSubNotification('');
        setIsDeleted(false);
        confirmAlert({
            title: 'Confirm delete',
            message: 'Do you really want to delete the model with name: ' + modelObj.name,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteModel(id)
              },
              {
                label: 'No'
              }
            ]
        });
    }
    
    const deleteModel = (id) => {
        requester.dataSet.deleteEntity('models', id)
        .then(res => {
            if(res.status === 200){
                if(currentModelItem !== '')
                    setCurrentModelItem('');
                setIsDeleted(true);
            }
            else
                setSubNotification('This model can not be deleted!');
        })
        .catch(() => {
            setSubNotification('The model is not deleted!');
        });
    }

    return (
        <li className={style['model-item']}>
            <article className={style['row']}>
            <Notification message={subNotification} />
            <article className={style['subrow']}>
            <div>Brand: {modelObj.brand.name}</div>
            <div>Model: {modelObj.name}</div>
            
            <div className={style['button-wrapper']}>
                <Link to={`/models/edit/${modelObj.id}`}><button>Edit</button></Link>
            </div>
            <div className={style['button-wrapper']}>
                <button onClick={() => deleteConfirmation(modelObj.id)}>Delete</button>
            </div>
            </article>
            </article>
        </li>
    );
}
export default Model;