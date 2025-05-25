
import React from 'react';

const ThinkingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <circle cx="15.5" cy="9.5" r="1.5" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10S22 17.52 22 12 17.52 2 11.99 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-6c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm10 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-5 2h.01c1.3 0 2.42-.83 2.83-2H9.17c.41 1.17 1.53 2 2.83 2z" />
  </svg>
);
export default ThinkingIcon;
