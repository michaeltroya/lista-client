import React from 'react';
import { Container } from 'react-bootstrap';

const CreateListItems = ({ items, setItems }) => {
  const handleItemsSubmit = e => {
    e.preventDefault();
    console.log(items);
  };
  return (
    <section className="create-list-items">
      <Container>
        <form onSubmit={handleItemsSubmit}>
          {items.map((item, i) => (
            <div className="list-name-description" key={item.order}>
              <input
                type="text"
                className="form-input"
                placeholder={`Item ${item.order}`}
                value={items[i].name}
                onChange={e =>
                  setItems(
                    items.map(element =>
                      element.order == item.order ? { ...element, name: e.target.value } : element
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
                    items.map(element =>
                      element.order == item.order ? { ...element, description: e.target.value } : element
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
