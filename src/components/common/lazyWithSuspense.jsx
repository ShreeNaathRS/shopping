import React, { Suspense } from 'react';
import CenteredIndicator from './CenteredIndicator';

export const lazyWithSuspense = (importFn, props = {}) => {
  const LazyComponent = React.lazy(importFn);
  const Component = () => (
    <Suspense fallback={<CenteredIndicator loader={true} />}>
      <LazyComponent {...props} />
    </Suspense>
  );
  return { Component };
};
