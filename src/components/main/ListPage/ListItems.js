import React, { useState } from 'react';
//bs imports
import { Accordion } from 'react-bootstrap';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
const ListItems = ({ items }) => {
  const [isOpen, setIsOpen] = useState([]);

  return (
    <div className="list-content">
      {items.map((item, i) => (
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

            {item.description === '' ? null : (
              <Accordion.Toggle
                eventKey="0"
                className="btn btn-clear"
                onClick={() => {
                  isOpen.includes(i)
                    ? setIsOpen(isOpen.filter(item => item !== i))
                    : setIsOpen([...isOpen, i]);
                }}
              >
                <FontAwesomeIcon icon={isOpen.includes(i) ? faArrowUp : faArrowDown} />
              </Accordion.Toggle>
            )}
          </div>
          <Accordion.Collapse eventKey="0">
            {item.description === '' ? (
              <p className="item-description">No Description</p>
            ) : (
              <p className="item-description">{item.description}</p>
            )}
          </Accordion.Collapse>
        </Accordion>
      ))}
    </div>
  );
};

export default ListItems;
