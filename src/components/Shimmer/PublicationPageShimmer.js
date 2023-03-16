import BetaWarning from '../Home/BetaWarning';
import { GridLayout } from '../UI/GridLayout';
import ProfileShimmer from './ProfileShimmer';
import PublicationShimmer from './PublicationShimmer';

function PublicationPageShimmer() {
  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <PublicationShimmer />
      </div>
      <div className={'space-y-5 lg:col-span-4 md:col-span-12 col-span-12'}>
        <aside className={'p-5 divide-y-[1px] rounded-none sm:rounded-xl border bg-gray-100 animate-pulse'}>
          <ProfileShimmer />
        </aside>
        <BetaWarning />
      </div>
    </GridLayout>
  );
}

export default PublicationPageShimmer;
