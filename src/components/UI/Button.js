function Button({ loading, icon, children, ...props }) {
  return (
    <button
      className={
        'w-60 px-4 py-2 font-bold text-white bg-blue-500 rounded-full ' +
        +'hover:bg-blue-700 focus:outline-none focus:shadow-outline'
      }
      disabled={loading}
      {...props}
    >
      {icon}
      <div>{children}</div>
    </button>
  );
}

export default Button;
