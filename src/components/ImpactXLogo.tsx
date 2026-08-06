import React from 'react';

interface ImpactXLogoProps {
  className?: string;
  color?: string;
}

export const ImpactXLogo: React.FC<ImpactXLogoProps> = ({
  className = "w-5 h-5",
  color = "currentColor",
}) => {
  return (
    <img 
      src="/impactx-logo.jpg" 
      alt="ImpactX Logo" 
      className={`${className.replace(/text-\[[^\]]+\]/, '')} object-cover rounded-full shadow-sm`}
    />
  );
};
