import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


import Notification from '../Notification';

const Owner = ({
    ownerObj,
    setIsDeleted
}) => {

    const [subNotification, setSubNotification] = useState('');

    const deleteConfirmation = (id) => {
        setSubNotification('');
        setIsDeleted(false);
        confirmAlert({
            title: 'Confirm delete',
            message: 'Do you really want to delete the owner with EGN: ' + ownerObj.egn,
            buttons: [
              {
                label: 'Yes',
                onClick: () => deleteBrand(id)
              },
              {
                label: 'No',
                //onClick: () => alert('Click No')
              }
            ]
        });
    }
    
    const deleteBrand = (id) => {
        requester.dataSet.deleteEntity('owners', id)
        .then(res => {
            if(res.status == 200){
                setIsDeleted(true);
            }
            else
                setSubNotification('The owner is not deleted!');
        })
        .catch(() => {
            setSubNotification('The owner is not deleted!');
        });
    }

    return (

        <li className={style['owner-item']}>
        <article className={style['row']}>
        <Notification message={subNotification} />
        <article className={style['subrow']}>
        <div>Name: {ownerObj.firstName} {ownerObj.lastName}</div>
        <div>EGN: {ownerObj.egn}</div>
        <div>Address: {ownerObj.address}</div>
        <div>Phone: {ownerObj.phone}</div>

        <div className={style['button-wrapper']}>
            <Link to={`/owners/edit/${ownerObj.id}`}><button>Edit</button></Link>
        </div>
        <div className={style['button-wrapper']}>
            <button onClick={() => deleteConfirmation(ownerObj.id)}>Delete</button>
        </div>
        </article>
        </article>
        </li>
    );
}

/*
<li className={style['owner-item']}>
            <article className={style['row']}>
            <Notification message={subNotification} />
            <article className={style['subrow']}>
            <div>Name: {ownerObj.firstName} {ownerObj.lastName}</div>
            <div>EGN: {ownerObj.egn}</div>
            
            <div className={style['button-wrapper']}>
                <Link to={`/owners/edit/${ownerObj.id}`}><button>Edit</button></Link>
            </div>
            <div className={style['button-wrapper']}>
                <button onClick={() => deleteConfirmation(ownerObj.id)}>Delete</button>
            </div>

            </article>

            <article className={style['subrow']}>
            <div>Address: {ownerObj.address}</div>
            <div>Phone: {ownerObj.phone}</div>
            </article>

            </article>
        </li>
*/
export default Owner;