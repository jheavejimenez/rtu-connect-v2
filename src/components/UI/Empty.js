import Card from './Card';

function Empty({ message }) {
  return (
    <Card className={'p-5 space-y-3 !rounded-xl'}>
      <div className={'flex items-center space-x-3'}>
        <h6 className={'text-gray-600 text-sm font-bold'}>{message}</h6>
      </div>
    </Card>
  );
}

export default Empty;
