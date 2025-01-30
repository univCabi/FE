const CanbinetButtonSkeleton = () => {
  const columns = 12;
  const rows = 4;

  return (
    <div className="w-full h-[80%] flex items-center justify-center">
      <div className="relative h-[30rem] overflow-scroll lg:w-[67rem] md:w-[80%] sm:w-[75%] w-[100%]">
        {Array.from({ length: columns * rows }).map((_, index) => {
          const row = Math.floor(index / columns);
          const column = index % columns;
          return (
            <div
              key={index}
              className="absolute w-16 h-20 rounded-md bg-gray-300 animate-pulse"
              style={{
                top: `${50 + row * 100}px`,
                left: `${column * 90}px`,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default CanbinetButtonSkeleton;
