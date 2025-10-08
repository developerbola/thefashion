const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col gap-5 mx-auto w-full max-w-7xl p-4">
        <div className="md:flex md:justify-between">
          <div className="flex flex-col gap-5 mb-6 md:mb-0 lg:max-w-[30%] sm:max-w-[50%] vxs:max-w-full">
            <a
              href="/"
              className="flex items-center"
            >
              <img
                src="/logo.svg"
                className="h-8 me-3"
                alt="the fashion Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                the fashion.
              </span>
            </a>
            <p>
              the fashion. - Minimal e-market for shopping clothes, shoes and watches.
              You can easily buy what you want. Make your style, make your
              dream.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Made with
              </h2>
              <ul className="text-gray-500 font-medium flex flex-col gap-4">
                <li>
                  <a href="https://react.dev/" className="hover:underline">
                    NextJS
                  </a>
                </li>
                <li>
                  <a
                    href="https://tailwindcss.com/"
                    className="hover:underline"
                  >
                    Tailwind CSS
                  </a>
                </li>
                <li>
                  <a href="https://hono.dev" className="hover:underline">
                    HonoJS
                  </a>
                </li>
                <li>
                  <a href="https://appwrite.io" className="hover:underline">
                    Appwrite
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Find me
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a
                    href="https://github.com/developerbola"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://t.me/mutawirr" className="hover:underline">
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <a href="/#" className="hover:underline">
                    Cookie Preferences
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:underline">
                    Shipping & Returns
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between h-[70px]">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <a href="/" className="hover:underline">
              StyleSphere
            </a>
            . All Rights Reserved. Made by{" "}
            <a href="https://github.com/developerbola" className="underline">
              developerbola
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
