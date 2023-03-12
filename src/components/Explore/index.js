import { Tab } from '@headlessui/react';

import BetaWarning from '../Home/BetaWarning';
import RecommendedProfile from '../Home/RecommendedProfile';
import { GridLayout } from '../UI/GridLayout';
import ExploreFeed from './Feed';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Explore() {
  const tabs = [
    { name: 'For you', type: 'CURATED_PROFILES' },
    { name: 'RTU Connect Community Post', sources: 'rtutest' }
  ];
  return (
    <GridLayout>
      <div className={'space-y-5 lg:col-span-8 md:col-span-12 col-span-12 mb-5'}>
        <Tab.Group>
          <Tab.List className={'divider space-x-8 pb-3'}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                defaultChecked={index === 1}
                className={({ selected }) =>
                  classNames(
                    'px-4 pb-2 lt-text-gray-500 outline-none font-medium text-xs sm:text-sm',
                    selected && 'border-b-2 border-blue-500'
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab, index) => (
              <Tab.Panel key={index}>
                <ExploreFeed feedType={tab.type} sources={tab.sources} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <div className={'lg:col-span-4 md:col-span-12 col-span-12'}>
        <BetaWarning />
        <RecommendedProfile />
      </div>
    </GridLayout>
  );
}

export default Explore;
