export const Home = () => {
  return (
    <>
      <div className="mb-10">
        <h1 className="text-center mt-4 text-violet-500 font-medium text-2xl">
          Здравейте в Kitch Track!
        </h1>

        <p className="text-center font-medium text-violet-400">
          Управлявайте проекти и екипи с лекота и ефикасност чрез нашата
          интуитивна платформа за управление на задачи и проекти!
        </p>
      </div>

      <div className="flex flex-col justify-center mt-5">
        <img
          src="/home-image-1.png"
          className="rounded-xl object-contain w-full h-auto max-w-md mx-auto"
        />

        <img
          src="/home-image-2.jpg"
          className="rounded-xl object-contain w-full h-auto max-w-md mx-auto"
        />

        <img
          src="/home-image-3.jpg"
          className="rounded-xl object-contain w-full h-auto max-w-md mx-auto"
        />
      </div>
    </>
  );
};
