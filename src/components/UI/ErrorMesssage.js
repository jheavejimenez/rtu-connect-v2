function ErrorMessage({ title, error, className }) {
  if (!error) {
    return null;
  }

  return (
    <div
      className={`bg-red-50 dark:bg-red-900 dark:bg-opacity-10 border-2 border-red-500 border-opacity-50 p-4 space-y-1 rounded-xl ${className}`}
    >
      {title && <h3 className={'text-sm font-medium text-red-800'}>{title}</h3>}
      <div className={'text-sm text-red-700'}>{error?.message}</div>
    </div>
  );
}

export default ErrorMessage;
