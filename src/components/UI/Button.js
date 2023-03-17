function Button({ loading, icon = '', children, ...props }) {
  const className =
    'btn bg-blue-500 text-[12px] h-11 w-24 sm:w-22 relative hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md focus:outline-none focus:shadow-outline';

  return (
    <button
      className={`${className} ${loading && 'disabled:opacity-50 shadow-sm'} ${
        loading && 'disabled:cursor-not-allowed'
      }`}
      disabled={loading}
      {...props}
    >
      {icon}
      <div>{children}</div>
    </button>
  );
}

export default Button;
