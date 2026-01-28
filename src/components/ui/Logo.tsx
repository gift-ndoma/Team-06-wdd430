'use client';

import Image from 'next/image';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const sizeMap = {
  small: 36,
  medium: 48,
  large: 60,
};

export default function Logo({ size = 'medium', showText = true }: LogoProps) {
  const dimension = sizeMap[size];

  return (
    <div className={`logo logo--${size}`}>
      <div className="logo__icon">
        <Image
          src="/Logo 3.svg"
          alt="Handcrafted Haven Logo"
          width={dimension}
          height={dimension}
          className="logo__svg"
          priority
        />
      </div>
      {showText && <span className="logo__text">Handcrafted Haven</span>}
    </div>
  );
}
