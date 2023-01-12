import Card from './Card';

function Empty({ message }) {
  return (
    <Card className={'p-5 space-y-3 !rounded-xl'}>
      <div className={'flex items-center space-x-3'}>
        <h1 className={'text-gray-600 font-bold'}>{message}</h1>
      </div>
    </Card>
  );
}

export default Empty;
