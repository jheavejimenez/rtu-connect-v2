import Card from '../../UI/Card';

function Post() {
  return (
    <Card className={'p-5 space-y-3 !rounded-md'}>
      <div className={'flex items-center space-x-3'}>
        <img
          src={'https://avatars.dicebear.com/api/adventurer-neutral/mail%40ashallendesign.co.uk.svg'}
          className={'h-9 w-9 bg-gray-200 rounded-full border'}
          alt={'Profile'}
        />
        <button
          className={
            'w-full flex items-center space-x-2 bg-gray-100  px-4 py-2 rounded-full border border-gray-200'
          }
          type={'button'}
        >
          <span className={'text-gray-400'}>{"What's on your mind?, Jhv"}</span>
        </button>
      </div>
    </Card>
  );
}

export default Post;
