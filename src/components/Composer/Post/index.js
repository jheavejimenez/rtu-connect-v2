function Post() {
  function handleChange() {
    // ...
  }

  return (
    <div className={'relative z-10 p-0'} aria-labelledby={'modal-title'} role={'dialog'} aria-modal={'true'}>
      <div className={'relative inset-0 overflow-auto'}>
        <div className={'flex min-h-full items-end justify-center text-center md:items-center md'}>
          <div className={'mx-auto shadow-md bg-white font-bold rounded-md mb-5 w-full'}>
            <div className={'bg-white px-4 pt-5 sm:p-6 sm:pb-3'}>
              <textarea
                id={'message'}
                rows={'4'}
                className={
                  'block p-2.5 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border' +
                  ' focus:ring-blue-500 focus:border-blue-500 whitespace-pre-wrap'
                }
                placeholder={"What's on your mind"}
                // value={content}
                // onChange={(e) => setContent(e.target.value)}
              />
              {/*{attachments.length > 0 && (*/}
              {/*  <div className={"mt-3 overflow-hidden rounded-xl col-span-3 max-h-[30rem]"}>*/}
              {/*    <img src={imagePostUrl} alt={"img"} />*/}
              {/*  </div>*/}
              {/*)}*/}
              <div className={'sm:flex sm:items-start'}>
                <div className={'mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'}>
                  <div className={'mt-2'} />
                </div>
              </div>
            </div>
            <div className={'bg-white px-4 pt-3 pb-5 flex justify-between px-6'}>
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label>
                {/*<Gallery />*/}
                <input
                  type={'file'}
                  className={'hidden'}
                  accept={'image/png, image/jpeg'}
                  onChange={handleChange}
                />
              </label>
              <button
                type={'button'}
                className={
                  'inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
                }
              >
                {'Post'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
