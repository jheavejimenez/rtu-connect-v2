function GridLayout({ children }) {
  return (
    <div className={'mx-auto max-w-screen-xl flex-grow pt-8 pb-2 px-0'}>
      <div className={'grid grid-cols-12'}>{children}</div>
    </div>
  );
}

export default GridLayout;
