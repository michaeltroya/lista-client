import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
//gql
import { useMutation } from '@apollo/react-hooks';
import { UPDATE_TAGS } from '../../../graphql/mutations';
//Redux Imports
import { useSelector } from 'react-redux';
import CreateListTags from '../CreateList/CreateListTags';

const ListInfo = ({ data }) => {
  const username = useSelector(state => state.user.credentials.username);
  const [openTags, setOpenTags] = useState(false);
  const [tags, setTags] = useState([...data.getList.tags]);

  const [updateTags] = useMutation(UPDATE_TAGS, {
    update() {
      setOpenTags(false);
    },
    onError(err) {
      console.log(err);
    },
    variables: {
      listId: data.getList.id,
      tags
    }
  });

  return (
    <section className="list-info">
      <h2>{`${data.getList.title.phrase} ${data.getList.title.count} ${data.getList.title.description}`}</h2>

      <Link to={`/${data.getList.username}`}>
        <h3 className="o-text">{`@${data.getList.username}`}</h3>
      </Link>
      {data.getList.username === username ? (
        data.getList.tags.length === 0 ? (
          openTags ? (
            <div className="list-add-tags">
              <CreateListTags tags={tags} setTags={setTags} type="listPage" />
              <div className="btn btn-dimmed" onClick={() => setOpenTags(false)}>
                Cancel
              </div>
              <div className="btn " onClick={() => updateTags()}>
                Save
              </div>
            </div>
          ) : (
            <div className="btn btn-clear o-text" onClick={() => setOpenTags(true)}>
              + Add tags
            </div>
          )
        ) : openTags ? (
          <div className="list-add-tags">
            <CreateListTags tags={tags} setTags={setTags} type="listPage" />
            <div className="btn btn-dimmed" onClick={() => setOpenTags(false)}>
              Cancel
            </div>
            <div className="btn " onClick={() => updateTags()}>
              Save
            </div>
          </div>
        ) : (
          <Fragment>
            <div className="list-tags">
              {data.getList.tags.map((tag, index) => (
                <Link to={`/tag/${tag}`} key={index} className="list-tag">
                  #{tag}
                </Link>
              ))}
            </div>
            <div className="btn btn-clear o-text" onClick={() => setOpenTags(true)}>
              + Edit Tags
            </div>
          </Fragment>
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
