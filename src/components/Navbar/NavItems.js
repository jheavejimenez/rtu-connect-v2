import Link from 'next/link';

function NavItems({ url, active, logo }) {
  return (
    <Link href={url}>
      <li className={'w-1/5 md:w-max text-center'}>
        <div
          className={`${active && 'bg-gray-200'}
            inline-block rounded text-gray-600 w-full 
            text-md py-2 px-3 xl:px-12 cursor-pointer 
            hover:bg-gray-100 relative`}
        >
          {logo}
        </div>
      </li>
    </Link>
  );
}

export default NavItems;
