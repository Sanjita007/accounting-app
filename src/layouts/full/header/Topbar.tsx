import { Icon } from '@iconify/react/dist/iconify.js';
import { Link } from 'react-router';
import { Dropdown, DropdownItem } from 'flowbite-react/components/Dropdown';

import img1 from 'src/assets/images/svgs/react-cat-icon.svg';
import img2 from 'src/assets/images/svgs/angular-cat-icon.svg';

const Topbar = () => {
  const dropdownItems = [
    {
      id: 1,
      img: img1,
      title: 'Log Out',
      href: '/auth/login',
    },
    {
      id: 2,
      img: img2,
      title: 'Sign Up',
      href: '/auth/register',
    }
  ];
  return (
    <div className="py-[15px] px-6 z-40 sticky top-0 bg-[linear-gradient(90deg,_#0f0533_0%,_#1b0a5c_100%)]">
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="md:flex hidden items-center gap-5">
          <Link target="_black" to="">
            {/* <img src={wrappixel_logo} alt="logo" width={147} /> */}
          </Link>
          <div className="xl:flex items-center gap-4 pl-5 border-l border-opacity-20 border-white hidden">
            <Link
              target="_black"
              to="https://www.wrappixel.com/templates/category/react-templates/"
              className="flex items-center gap-2 text-white bg-transparent hover:text-[#714bff]"
            >
              <Icon icon="solar:window-frame-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-white hover:text-[#714bff]">
                Templates
              </h4>
            </Link>
            <Link
              target="_black"
              to="https://support.wrappixel.com/"
              className="flex items-center gap-2 text-white bg-transparent hover:text-[#714bff]"
            >
              <Icon icon="solar:question-circle-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-white hover:text-[#714bff]">
                Help
              </h4>
            </Link>
            <Link
              target="_black"
              to="https://www.wrappixel.com/hire-us/"
              className="flex items-center gap-2 text-white bg-transparent hover:text-[#714bff]"
            >
              <Icon icon="solar:case-round-linear" width={20} />
              <h4 className="text-base font-normal leading-none text-white hover:text-[#714bff]">
                Hire Us
              </h4>
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center">
          <div className="flex flex-col sm:flex-row items-center gap-[10px]">
            <div className="flex items-center gap-[10px]">
              <div className="live-preview-drop !rounded-sm border border-[#ffffff66] hover:bg-[#8d70f8]">
                <Dropdown
                  label={<p className="text-base text-white font-normal"></p>}
                  color=""
                  size="sm"
                  className="py-3 px-4 text-white"
                >
                  {dropdownItems.map((item) => {
                    return (
                      <DropdownItem
                        to={item.href}
                        key={item.id}
                        className="flex items-center gap-3 text-base text-[#000c29] py-3 px-[18px] group rounded-sm hover:bg-[#000c290d] hover:text-[#000c29]"
                        as={Link}
                        href={item.href}
                        target="_blank"
                        icon={() => <img src={item.img} width={18} alt="logo" />}
                      >
                        <span className="group-hover:text-[#000c29]">{item.title}</span>
                      </DropdownItem>
                    );
                  })}
                </Dropdown>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
