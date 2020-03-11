import React from 'react';
import { Container } from 'react-bootstrap';
const CreateListTags = ({ tags, setTags, type }) => {
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = event => {
    if (event.target.value !== '') {
      setTags([...tags, event.target.value]);
      event.target.value = '';
    }
  };

  console.log(tags);

  return (
    <section className="create-list-tags">
      <Container>
        <div className="tags-input">
          <ul id="tags">
            {tags.map((tag, index) => (
              <li key={index} className="tag">
                <span className="tag-title">{tag}</span>
                <span className="tag-close-icon" onClick={() => removeTags(index)}>
                  x
                </span>
              </li>
            ))}
          </ul>
          <input
            type="text"
            onKeyUp={event => (event.key === 'Enter' ? addTags(event) : null)}
            placeholder="Press enter to add tags"
          />
        </div>
      </Container>
    </section>
  );
};

export default CreateListTags;
