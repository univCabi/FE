const ProfileSkeleton = () => {
  return (
    <div className="p-10 w-96 sl:w-full bg-neutral-150 rounded-2xl flex flex-col justify-start items-start gap-5 animate-pulse shadow-md">
      <div className="w-24 h-8 bg-gray-200 rounded"></div>
      <div className="w-32 h-16 bg-gray-200 rounded"></div>
      <div className="w-24 h-8 bg-gray-200 rounded"></div>
      <div className="px-5 py-5 w-80 h-32 bg-white rounded-lg flex flex-col justify-start items-start gap-5 shadow"></div>
    </div>
  );
};

export default ProfileSkeleton;
