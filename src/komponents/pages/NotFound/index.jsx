import React from 'react';
import { PageHeader, ButtonLink } from '../../ui';
import { usePageTitle } from '../../ui/hooks';

const NotFound = () => {
  usePageTitle('Page not found', 'This page does not exist in the HelloFresh practice clone. Go back to the home page to browse meal plans, the sample weekly menu and gift cards.');
  return (
    <PageHeader title="Page not found" intro="This page does not exist in the clone.">
      <div className="mt-6"><ButtonLink to="/">Back to home</ButtonLink></div>
    </PageHeader>
  );
};

export default NotFound;
