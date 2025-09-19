import React from 'react';
import NoExisteScreen from './noexiste';

// Expo Router special file: any unmatched route renders this component
export default function NotFoundBoundary() {
  return <NoExisteScreen />;
}
