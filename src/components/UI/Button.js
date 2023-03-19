function Button({ loading, icon = '', children, ...props }) {
  const className =
    'btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline';

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
