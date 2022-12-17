export const GridLayout = ({ children }) => {
  return (
    <div className={'mx-auto max-w-screen-xl flex-grow pt-20 pb-2 px-0'}>
      <div className={'grid grid-cols-12'}>{children}</div>
    </div>
  );
};

export const GridItem = ({ children, span }) => {
  return <div className={`lg:col-span-${span} md:col-span-12 col-span-12`}>{children}</div>;
};
