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
              src="https://cdn.discordapp.com/attachments/993570904544124972/1264878060965199912/images-removebg-preview.png?ex=669f78fe&is=669e277e&hm=8846c3f1aa8d2f26b41b860850706153f18b493c144198c0d980773287a4aa86&"
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
