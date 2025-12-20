
import {  Sidebar, SidebarItemGroup, SidebarItems } from "flowbite-react";
import SidebarContent from "./Sidebaritems";
import NavItems from "./NavItems";
import SimpleBar from "simplebar-react";
import React from "react";
import FullLogo from "../shared/logo/FullLogo";
import NavCollapse from "./NavCollapse";

const SidebarLayout = () => {
  return (
    <div className="xl:block hidden">
      <Sidebar
        className="fixed menu-sidebar bg-white dark:bg-darkgray top-[72px] bottom-0 w-64"
        aria-label="Sidebar"
      >
       
        <div className="flex flex-col h-full">
          
          <div className="px-5 py-4 flex-none sidebarlogo">
            <FullLogo />
          </div>

         
          <SimpleBar className="flex-1 overflow-y-auto px-2">
            <SidebarItems>
              <SidebarItemGroup className="sidebar-nav hide-menu">
                {SidebarContent &&
                  SidebarContent.map((item, index) => (
                    <div className="caption" key={item.heading || index}>
                      <h5 className="text-dark/60 uppercase font-medium leading-6 text-xs pb-2 ps-6">
                        {item.heading}
                      </h5>
                      {item.children?.map((child, idx) => (
                        <React.Fragment key={child.id || idx}>
                          {child.children ? (
                            <NavCollapse item={child} />
                          ) : (
                            <NavItems item={child} />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  ))}
              </SidebarItemGroup>
            </SidebarItems>
          </SimpleBar>
          
        </div>
      </Sidebar>
    </div>
  );
};

export default SidebarLayout;
