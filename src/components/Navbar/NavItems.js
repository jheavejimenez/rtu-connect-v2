import Link from 'next/link';

function NavItems({ url, name, current, logo }) {
  return (
    <Link href={url} aria-current={current ? 'page' : undefined}>
      <li className={' w-max md:w-max text-center '}>
        <div
          className={`${current}
            inline-block rounded text-gray-600 w-full 
            text-md py-2 px-3 xl:px-12 cursor-pointer 
            hover:bg-gray-200 relative`}
        >
          {logo}
        </div>
      </li>
    </Link>
  );
}

export default NavItems;
