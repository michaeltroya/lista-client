import React, { Fragment } from 'react';
import Nav from '../../layout/Nav/Nav';

const CreateList = props => {
  return (
    <Fragment>
      <Nav type="compose" history={props.history} />
    </Fragment>
  );
};

export default CreateList;
