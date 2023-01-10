import Card from './Card';

function Empty({ message }) {
  return (
    <Card className={'p-5 space-y-3 !rounded-xl'}>
      <div className={'flex items-center space-x-3'}>
        <span className={'text-gray-400'}>{message}</span>
      </div>
    </Card>
  );
}

export default Empty;
