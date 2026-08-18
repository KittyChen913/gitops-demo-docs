import React from 'react';
import {Redirect} from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home(): React.JSX.Element {
  // 必須經過 useBaseUrl 換算，否則在 baseUrl 非 '/' 的情況下
  // （本站為 '/gitops-demo-docs/'）會導向不存在的路徑而 404。
  return <Redirect to={useBaseUrl('/docs/main')} />;
}
