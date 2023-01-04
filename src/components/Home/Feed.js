import SinglePublication from '../Publication/SinglePublication';

function Feed() {
  return (
    <div className={'divide-y-[1px] dark:divide-gray-700/80'}>
      {publications?.map((publication, index) => (
        <SinglePublication
          key={`${publication?.root.id}_${index}`}
          feedItem={publication}
          publication={publication.root}
        />
      ))}
    </div>
  );
}

export default Feed;
