function CustomAvatar({ address, ensImage, size }) {
  return ensImage ? (
    <img src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
  ) : (
    <div
      style={{
        backgroundColor: 'rgba(56,113,245,0.8)',
        borderRadius: 999,
        height: size,
        width: size
      }}
    >
      {':^)'}
    </div>
  );
}

export default CustomAvatar;
