function HeroText() {
  return (
    <div className="m-4 mb-10 text-3xl ">
      <h1 className="text-stone-800 font-space">
        Welcome to <br />
        <span className="font-bold font-space flex items-center justify-center">
          The Pattern&apos;s Place
          {/* <img
            className="w-20 ml-4"
            src="./src/assets/tppLogo.png"
            alt="The Pattern's Place Logo"
          /> */}
        </span>
      </h1>
      <p className="text-stone-800 text-base">
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
