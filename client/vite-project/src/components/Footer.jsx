import logo from "../../images/logo.png";

const Footer = () => {
  return (
    <div className="w-full flex md:justify-cener justify-between items-center flex-col p-4 gradient-bg-footer">
      <div className="flex w-full sm:flex-row flex-col justify-between items-center my-4">
        <div className="flex flex-[0.5] justify-center items-center">
          <img src={logo} alt="logo" className="w-32" />
        </div>
        <div className="flex flex-1 justify-evenly items center flex-wrap sm:mt-0 mt-5 w-full">
          <p className="text-white text-base mx-2 text-center cursor-pointer">
            Market Place
          </p>
          <p className="text-white text-base mx-2 text-center cursor-pointer">
            Exchange
          </p>
          <p className="text-white text-base mx-2 text-center cursor-pointer">
            Tutorials
          </p>
          <p className="text-white text-base mx-2 text-center cursor-pointer">
            Blogs
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col mt-5">
        <p className="text-white text-sm text-base text-center">
          For more enquiries
        </p>
        <p className="text-white text-sm text-center">
          info@kryptnftanddeffi.com
        </p>
      </div>
      <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5" />
      <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
        <p className="text-white text-sm text-base text-center">
          @kyrptorg 2023
        </p>
        <p className="text-white text-sm text-base text-center">
          All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
