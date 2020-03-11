import React, { useState } from 'react';
import { Link } from 'react-router-dom';
//Redux Imports
import { useSelector } from 'react-redux';
import CreateListTags from '../CreateList/CreateListTags';

const ListInfo = ({ data }) => {
  const username = useSelector(state => state.user.credentials.username);
  const [openTags, setOpenTags] = useState(false);
  const [tags, setTags] = useState([...data.getList.tags]);

  return (
    <section className="list-info">
      <h2>{`${data.getList.title.phrase} ${data.getList.title.count} ${data.getList.title.description}`}</h2>

      <Link to={`/${data.getList.username}`}>
        <h3 className="o-text">{`@${data.getList.username}`}</h3>
      </Link>
      {data.getList.username === username ? (
        data.getList.tags.length === 0 ? (
          openTags ? (
            <CreateListTags tags={tags} setTags={setTags} type="listPage" />
          ) : (
            <div className="btn btn-dimmed" onClick={() => setOpenTags(true)}>
              Add Tags
            </div>
          )
        ) : openTags ? (
          <CreateListTags tags={tags} setTags={setTags} type="listPage" />
        ) : (
          <div className="list-tags">
            {data.getList.tags.map((tag, index) => (
              <Link to={`/tag/${tag}`} key={index} className="list-tag">
                #{tag}
              </Link>
            ))}
            <div className="btn btn-dimmed" onClick={() => setOpenTags(true)}>
              Edit Tags
            </div>
          </div>
        )
      ) : data.getList.tags.length === 0 ? null : (
        <div className="list-tags">
          {data.getList.tags.map((tag, index) => (
            <Link to={`/tag/${tag}`} key={index} className="list-tag">
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListInfo;
