import React from 'react';
import { withRouter } from 'react-router-dom';

function TestRoute() {
  return <div>This is authenticated route</div>;
}

export default withRouter(TestRoute);
