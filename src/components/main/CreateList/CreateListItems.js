import React from 'react';
import { Container } from 'react-bootstrap';

const CreateListItems = ({ items, setItems, handleItemsSubmit }) => {
  return (
    <section className="create-list-items">
      <Container>
        <form onSubmit={handleItemsSubmit}>
          {items.map((item, i) => (
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
            </div>
          ))}
          <input type="submit" className="btn" />
        </form>
      </Container>
    </section>
  );
};

export default CreateListItems;
