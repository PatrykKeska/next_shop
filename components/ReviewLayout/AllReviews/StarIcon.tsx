interface StarIconProps {
  value: number;
}
export const StarIcon = ({ value }: StarIconProps) => {
  const starsToRender = renderStars(value);
  return <div className='flex'>{starsToRender}</div>;
};

const FullStarIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      className='w-6 h-6'
    >
      <path
        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        fill='rgb(250 204 21)'
      />
      <path
        d='M12 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        fill='rgb(250 204 21)'
        clipPath='url(#halfStarClip)'
      />
      <clipPath id='halfStarClip'>
        <rect x='0' y='0' width='12' height='24' />
      </clipPath>
    </svg>
  );
};

const HalfStarIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      className='w-6 h-6'
    >
      <path
        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        fill='rgb(156 163 175)'
      />
      <path
        d='M12 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        fill='rgb(250 204 21)'
        clipPath='url(#halfStarClip)'
      />
      <clipPath id='halfStarClip'>
        <rect x='0' y='0' width='12' height='24' />
      </clipPath>
    </svg>
  );
};

const GrayStarIcon = () => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      className='w-6 h-6'
    >
      <path
        d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        fill='rgb(156 163 175)'
      />
      <path
        d='M12 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
        fill='rgb(156 163 175)'
        clipPath='url(#halfStarClip)'
      />
      <clipPath id='halfStarClip'>
        <rect x='0' y='0' width='12' height='24' />
      </clipPath>
    </svg>
  );
};

const renderStars = (value: number) => {
  const stars = [];
  const fullStars = Math.floor(value);
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FullStarIcon key={i} />);
  }

  const decimal = value - Math.floor(value);
  if (decimal >= 0.5) {
    stars.push(<HalfStarIcon key={value} />);
  }

  const emptyStars = 5 - stars.length;
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<GrayStarIcon key={i + 5} />);
  }
  return stars;
};
