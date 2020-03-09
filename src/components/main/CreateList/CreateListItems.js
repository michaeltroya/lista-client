import React, { useState, Fragment } from 'react';
import { Container } from 'react-bootstrap';

const CreateListItems = ({ items, setItems, handleItemsSubmit }) => {
  const [isOpen, setIsOpen] = useState([]);

  return (
    <section className="create-list-items">
      <Container>
        <form onSubmit={handleItemsSubmit}>
          {items.map((_, i) => (
            <div className="list-name-description" key={i}>
              <input
                type="text"
                className="form-input"
                placeholder={`Item ${i + 1}`}
                value={items[i].name}
                onChange={e =>
                  setItems(
                    items.map((element, index) =>
                      index === i ? { ...element, name: e.target.value } : element
                    )
                  )
                }
              />

              {isOpen.includes(i) ? (
                <Fragment>
                  <textarea
                    type="text"
                    className="form-input"
                    placeholder="Description"
                    value={items[i].description}
                    onChange={e =>
                      setItems(
                        items.map((element, index) =>
                          index === i ? { ...element, description: e.target.value } : element
                        )
                      )
                    }
                  />
                  <div
                    className="btn btn-clear o-text"
                    onClick={() => setIsOpen(isOpen.filter(item => item !== i))}
                  >
                    - Hide Description
                  </div>
                </Fragment>
              ) : (
                <div className="btn btn-clear o-text" onClick={() => setIsOpen([...isOpen, i])}>
                  + Add Description
                </div>
              )}
            </div>
          ))}
          <input type="submit" className="btn" />
        </form>
      </Container>
    </section>
  );
};

export default CreateListItems;
