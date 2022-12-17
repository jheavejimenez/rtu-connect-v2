export const GridLayout = ({ children, classname }) => {
  return (
    <div className={`mx-auto max-w-screen-xl flex-grow pt-20 pb-2 px-0 ${classname}`}>
      <div className={'grid grid-cols-12'}>{children}</div>
    </div>
  );
};

export const GridItem = ({ children, classname }) => {
  return <div className={`lg:col-span-12} md:col-span-12 col-span-12 ${classname}`}>{children}</div>;
};
