import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

import { useSearchProfilesLazyQuery } from '../../../generated';
import useOnClickOutside from '../../utils/hooks/useClickOutside';
import UserProfile from '../Profile';
import Card from '../UI/Card';
import Spinner from '../UI/Spinner';

function Search({ hideDropdown = false }) {
  const { push, pathname } = useRouter();
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);

  useOnClickOutside(dropdownRef, () => setSearchText(''));

  const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] = useSearchProfilesLazyQuery();

  const handleSearch = async (e) => {
    const keyword = e.target.value;
    setSearchText(keyword);
    if (pathname !== '/search' && !hideDropdown) {
      await searchUsers({
        variables: {
          request: {
            query: keyword,
            type: 'PROFILE',
            customFilters: ['GARDENERS'],
            limit: 8
          }
        }
      });
    }
  };

  const handleKeyDown = (evt) => {
    evt.preventDefault();
    if (pathname === '/search') {
      push(`/search?q=${searchText}`);
    }
    setSearchText('');
  };

  const searchResult = searchUsersData?.search;
  const isProfileSearchResult = searchResult && searchResult.hasOwnProperty('items');
  const profiles = isProfileSearchResult ? searchResult.items : [];

  return (
    <div aria-hidden={'true'} className={'w-full'}>
      <form onSubmit={handleKeyDown}>
        <input
          className={
            'w-full pt-2 pl-2 pb-2 pr-3 text-sm text-black outline-none focus:outline-none bg-transparent'
          }
          onChange={handleSearch}
          placeholder={'Search'}
          type={'search'}
        />
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div className={'absolute flex justify-start w-[94%] flex-col'} ref={dropdownRef}>
          <Card className={'max-h-[80vh] bg-gray-300 overflow-y-auto py-2 z-10 shrink w-full'}>
            {searchUsersLoading ? (
              <div className={'space-y-2 py-2 px-4 text-center text-sm font-bold'}>
                <div className={'flex items-center justify-center'}>
                  <Spinner />
                </div>
                <div>{'Searching users'}</div>
              </div>
            ) : (
              <>
                {profiles.map((profile) => (
                  <div key={profile?.handle} className={'cursor-pointer py-2 px-4 hover:bg-gray-100'}>
                    <UserProfile profile={profile} />
                  </div>
                ))}
                {profiles.length === 0 && (
                  <div className={'py-2 px-4 text-center text-sm font-bold'}>{'No matching users'}</div>
                )}
              </>
            )}
          </Card>
        </div>
      )}
    </div>
  );
}

export default Search;
