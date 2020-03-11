import React, { useState, Fragment } from 'react';
//bs imports
import { Accordion } from 'react-bootstrap';
//Redux Imports
import { useSelector } from 'react-redux';
//FA imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
const ListItems = ({ items, username }) => {
  const authUsername = useSelector(state => state.user.credentials.username);
  const [isOpen, setIsOpen] = useState([]);

  const [isEditing, setIsEditing] = useState([]);

  return (
    <div className="list-content">
      {items.map((item, i) => (
        <Fragment key={item.order}>
          <Accordion className="list-item">
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
              <p className="item-description">{item.description}</p>
            </Accordion.Collapse>
          </Accordion>
          {isEditing.includes(i) ? (
            <form>
              <textarea className="form-input" type="text" value={item.description} />
              <input type="submit" className="btn" />
              <div
                className="btn btn-dimmed"
                onClick={() => {
                  isEditing.includes(i)
                    ? setIsEditing(isEditing.filter(item => item !== i))
                    : setIsEditing([...isEditing, i]);
                }}
              >
                Cancel
              </div>
            </form>
          ) : null}

          {username === authUsername ? (
            <div
              className="edit-description"
              onClick={() => {
                isEditing.includes(i)
                  ? setIsEditing(isEditing.filter(item => item !== i))
                  : setIsEditing([...isEditing, i]);
              }}
            >
              {isEditing.includes(i) ? null : (
                <p className="o-text">+ {item.description === '' ? 'Add' : 'Edit'} description</p>
              )}
            </div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
};

export default ListItems;
