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
      alt="ImpactX Global logo"
      className={`${className.replace(/text-\[[^\]]+\]/, '')} object-contain shadow-sm`}
    />
  );
};
