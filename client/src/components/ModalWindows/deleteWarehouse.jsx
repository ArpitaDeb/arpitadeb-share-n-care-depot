import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Close from '../../assets/icons/close-24px.svg';

import './modalWindows.scss';

const apiURL = process.env.REACT_APP_API_URL;

export const DeleteWarehouse = () => {
  const navigate = useNavigate();
  const { warehouseId } = useParams();
  const [warehouseName, setWarehouseName] = useState();

  //get warehouse details
  useEffect(() => {
    const fetchWarehouseName = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/warehouses/${warehouseId}`);
        setWarehouseName(response.data.warehouse_name);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
      }
    };
    fetchWarehouseName();
  }, [warehouseId]);

  const handleDelete = () => {
    axios
      .delete(`${apiURL}/api/warehouses/${warehouseId}`)
      .then((response) => {
        alert('Warehouse deleted successfully');
        navigate('/');
      })
      .catch((error) => {
        console.error('Error deleting warehouse:', error);
      });
  };

  return (
    <div className="modal__active">
      <div className="modal__wrapper">
        <div className="modal__description">
          <button className="modal__close">
            <Link to={'/'}>
              <img src={Close} alt="close" />
            </Link>
          </button>
          <h1 className="modal__title">{`Delete ${warehouseName} warehouse?`}</h1>
          <p className="modal__text">
            {`Please confirm that you’d like to delete the ${warehouseName} from the list of warehouses. You won’t be able to undo this action.`}
          </p>
        </div>
        <div className="modal__buttons">
          <button className="modal__cancel">
            <Link to={'/'}>
              <p>Cancel</p>
            </Link>
          </button>
          <button className="modal__delete" onClick={handleDelete}>
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  );
};
