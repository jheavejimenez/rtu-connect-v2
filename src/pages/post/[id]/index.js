import { useRouter } from 'next/router';

import Feed from '../../../components/Home/Feed';
import UserProfile from '../../../components/Profile';
import Publication from '../../../components/Publication/Publication';
import { GridLayout } from '../../../components/UI/GridLayout';
import { useAppStore } from '../../../store/app';

function ViewPublication() {
  const currentProfile = useAppStore((state) => state.currentProfile);
  const {
    query: { id }
  } = useRouter();

  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <div className={'divide-y-[1px] rounded-none sm:rounded-xl border bg-white'}>
          <Publication publication={publication} />
        </div>
        <Feed publication={publication} />
      </div>
      <div className={'space-y-5 lg:col-span-4 md:col-span-12 col-span-12'}>
        <aside className={'p-5 divide-y-[1px] rounded-none sm:rounded-xl border bg-white'}>
          <UserProfile
            profile={
              publication.__typename === 'Mirror' ? publication?.mirrorOf?.profile : publication?.profile
            }
            showBio
          />
        </aside>
      </div>
    </GridLayout>
  );
}

export default ViewPublication;
