import Button from '../../UI/Button';
import Card from '../../UI/Card';

function NewComment() {
  return (
    <Card className={'border-none rounded-none pb-3'}>
      <div className={'block items-center sm:flex px-5'}>
        <div className={'ml-auto pt-2 sm:pt-0'}>
          <Button>{'Comment'}</Button>
        </div>
      </div>
    </Card>
  );
}

export default NewComment;
