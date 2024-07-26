import React from 'react';

interface HeaderProps {
  heading: string;
  description?: string;
}

export default function Header({ heading, description }: HeaderProps) {
  return (
    <div className="pb-10">
      <h1 className="text-4xl">{heading}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
