import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isNavabarHidden, setNavbarHidden] = useState(false);
  useEffect(() => {
    const hadleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setNavbarHidden(true);
      } else {
        setNavbarHidden(false);
      }
    };
    window.addEventListener("scroll", hadleScroll);

    return () => {
      window.removeEventListener("scroll", hadleScroll);
    };
  }, []);
  return (
    <>
      <header
        className={`top-0 left-0 sticky w-full h-[5rem] border-b border-gray-200 bg-gray-50 px-10 transform transition-transform duration-500 ${
          isNavabarHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <nav className="w-full h-full flex items-center justify-between">
          <Link className="text-2xl italic cursor-pointer font-semibold tracking-wider underline underline-offset-[7px]">
            Management
          </Link>
          <button
            onClick={() => navigate("/create")}
            className="border px-4 py-2 text-xl font-semibold text-white italic rounded-md bg-gray-600 hover:text-gray-600 hover:bg-white transition-all duration-200 focus:ring-2 focus:ring-blue-300"
          >
            Add User
          </button>
        </nav>
      </header>
    </>
  );
};
export default Header;
