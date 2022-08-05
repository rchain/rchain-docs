import React from 'react';
import { Redirect } from 'react-router-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home () {
  const context = useDocusaurusContext();

  // Retrieve reference to home page redirect
  const homeDoc = context.siteConfig.themeConfig.navbar.items[0]
  const homeDocUrl = useBaseUrl(`docs/${homeDoc.docId}`)

  return <Redirect to={homeDocUrl} />;
}
