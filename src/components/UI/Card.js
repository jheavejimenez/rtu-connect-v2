function Card({ className, children }) {
  return <div className={`rounded-none sm:rounded-xl border bg-white ${className}`}>{children}</div>;
}

export default Card;
