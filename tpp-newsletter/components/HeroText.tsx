function HeroText() {
  return (
    <div className="m-4 mb-10 space-y-1 content-center text-center">
      <h1 className="text-tppBlack font-space z-10 text-6xl sm:text-6xl md:text-7xl lg:text-[80px] xl:text-[100px] text-center whitespace-nowrap bg-clip-text">
        Welcome to <br />
        <span className="text-tppBlack font-bold font-space flex items-center justify-center animate-fade-in text-4xl sm:text-5xl md:text-6xl lg:text-[80px] xl:text-[100px]">
          The Pattern&apos;s Place
          {/* <img
            className="w-20 ml-4"
            src="./src/assets/tppLogo.png"
            alt="The Pattern's Place Logo"
          /> */}
        </span>
      </h1>
      <p className="text-tppBlack font-inter font-normal leading-normal text-base sm:text-lg md:text-xl">
        We&apos;re a place <span className="font-extrabold">for sewists</span>{" "}
        to buy and sell patterns with features like video tutorials, reviews,
        and difficulty levels! <br /> We&apos;re currently under construction
        but would love to keep in contact. Drop your email below to stay
        updated!
      </p>
    </div>
  );
}

export default HeroText;
