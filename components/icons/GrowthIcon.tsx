
import React from 'react';

const GrowthIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15V9h4v8H10zm5-10H9v2h8V7zM7 17v-3.08c0-1.3.73-2.43 1.82-2.99L12 9.36l3.18 1.56c1.09.55 1.82 1.69 1.82 2.99V17H7z" opacity=".3"/>
    <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zm-2.5-11H12v7.43L9.5 13V7zm5 0h-1.75v6L14.5 13V7z"/>
    <path d="M12 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8 8-3.59-8-8-8z"/>
    <path d="M9.17 11H7v6h2.17c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zm7.66 0H15v6h2.17c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1zm-3.91 0h-1.84v6h1.84c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1z"/>
    <path d="M16.83 11h-2.17c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2.17V11zm-5.66 0H9v6h2.17V11zm-3.71 0H5v6h2.12V11z" fill="currentColor" />
  </svg>
);
export default GrowthIcon;
