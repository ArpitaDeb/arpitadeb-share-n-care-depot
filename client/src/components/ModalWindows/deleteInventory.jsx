import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import Close from '../../assets/icons/close-24px.svg';

import './modalWindows.scss';

const apiURL = process.env.REACT_APP_API_URL;

export const DeleteInventory = () => {
  const navigate = useNavigate();
  const { inventoryId } = useParams();
  const [getInventory, setGetInvenory] = useState('');

  useEffect(() => {
    const fetchOneInventory = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/inventories/${inventoryId}`);
        setGetInvenory(response.data);
      } catch (error) {
        console.error('Error fetching warehouse:', error);
      }
    };
    fetchOneInventory();
  }, [inventoryId]);

  const handleDelete = () => {
    axios
      .delete(`${apiURL}/api/inventories/${inventoryId}`)
      .then((response) => {
        alert('Inventory deleted successfully');
        navigate('/inventory');
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
            <Link to={'/inventory'}>
              <img src={Close} alt="close" />
            </Link>
          </button>
          <h1 className="modal__title">{`Delete ${getInventory?.item_name} inventory item?`}</h1>
          <p className="modal__text">
            {`Please confirm that you’d like to delete  ${getInventory?.item_name} from the inventory list. You won’t be able to undo this action.`}
          </p>
        </div>
        <div className="modal__buttons">
          <button className="modal__cancel">
            <Link to={'/inventory'}>
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
