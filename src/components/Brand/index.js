import style from './styles.module.css';

import requester from '../../services/rest-app-service';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


import Notification from '../Notification';

const Brand = ({
    brandObj,
    setIsDeleted
}) => {

    const [subNotification, setSubNotification] = useState('');

    const deleteConfirmation = (id) => {
        setSubNotification('');
        setIsDeleted(false);
        confirmAlert({
            title: 'Confirm delete',
            message: 'Do you really want to delete the brand with name: ' + brandObj.name,
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
        requester.dataSet.deleteEntity('brands', id)
        .then(res => {
            if(res.status == 200){
                setIsDeleted(true);
            }
            else
                setSubNotification('The brand is not deleted!');
        })
        .catch(() => {
            setSubNotification('The brand is not deleted!');
        });
    }

    return (
        <li className={style['brand-item']}>
            <article className={style['row']}>
            <Notification message={subNotification} />
            <article className={style['subrow']}>
            <div>{brandObj.name}</div>
            
            <div className={style['button-wrapper']}>
                <Link to={`/brands/edit/${brandObj.id}`}><button>Edit</button></Link>
            </div>
            <div className={style['button-wrapper']}>
                <button onClick={() => deleteConfirmation(brandObj.id)}>Delete</button>
            </div>
            </article>
            </article>
        </li>
    );
}

export default Brand;