import React from 'react';

const List = ({
  list: {
    username,
    title: { phrase, count, description },
    tags,
    items,
    commentCount,
    likeCount
  }
}) => {
  return (
    <div className="list-card">
      <header className="list-card-header">
        <div className="list-card-title">
          <h3>{`${phrase} ${count} ${description}`}</h3>
        </div>
        <div className="list-card-username">
          <h4>@{username}</h4>
        </div>
        <div className="list-card-tags">
          {tags.map((tag, index) => (
            <p className="tag" key={index}>
              {tag}
            </p>
          ))}
        </div>
      </header>
      <main className="list-card-body">
        {items.map(item => (
          <div className="item" key={item.order}>
            <h4>{item.name}</h4>
            <p>{item.description}</p>
          </div>
        ))}
      </main>
      <footer className="list-card-footer">
        <div className="list-card-likes">{likeCount}</div>
        <div className="list-card-comments">{commentCount}</div>
      </footer>
    </div>
  );
};
export default List;
