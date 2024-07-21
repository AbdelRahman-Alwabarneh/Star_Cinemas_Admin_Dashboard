function Footer() {
  return (
    <>
      <footer className="mx-auto w-full max-w-container bg-[#19002E] px-4 sm:px-6 lg:px-8 ">
        <div className="border-t border-slate-900/5 py-10">
          <a
            href="#"
            className="flex justify-center items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Star Cinemas
            </span>
          </a>
          <p className="mt-5 text-center text-sm leading-6 text-white">
            All rights reserved &copy; Star Cinemas 2024
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer;
