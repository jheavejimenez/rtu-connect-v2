function NavItems({ items }) {
  return (
    <ul className={'flex w-full lg:w-max items-center justify-center'}>
      {items.map((item, index) => (
        <li key={index} className={'w-1/5 md:w-max text-center'}>
          <div
            className={
              'w-full text-md py-2 px-3 xl:px-12 cursor-pointer ' +
              'text-center inline-block rounded text-gray-600' +
              ' hover:bg-gray-100 relative'
            }
          >
            {item}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default NavItems;
