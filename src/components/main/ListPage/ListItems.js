import React from 'react';
//bs imports
import { Accordion } from 'react-bootstrap';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
const ListItems = ({ items }) => {
  return (
    <div className="list-content">
      {items.map(item => (
        <Accordion className="list-item" key={item.order}>
          <div className="list-item-header">
            <div className="list-item-info">
              <div className="item-order">
                <h3>{item.order}</h3>
              </div>
              <div className="item-name">
                <h4>{item.name}</h4>
              </div>
            </div>
            <Accordion.Toggle eventKey="0" className="btn btn-clear">
              <FontAwesomeIcon icon={faArrowDown} />
            </Accordion.Toggle>
          </div>
          <Accordion.Collapse eventKey="0">
            <p className="item-description">{item.description}</p>
          </Accordion.Collapse>
        </Accordion>
      ))}
    </div>
  );
};

export default ListItems;
