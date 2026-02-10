function HomeBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl p-10 mb-10 relative overflow-hidden">
      <div className="max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">
          Learn skills that shape your future
        </h1>
        <p className="text-lg opacity-90">
          Explore thousands of courses from expert instructors.
        </p>
      </div>

      {/* simple animated circles */}
      <div className="absolute w-72 h-72 bg-white/10 rounded-full top-[-80px] right-[-80px] animate-pulse" />
      <div className="absolute w-52 h-52 bg-white/10 rounded-full bottom-[-60px] left-[-60px] animate-pulse" />
    </div>
  );
}

export default HomeBanner;
