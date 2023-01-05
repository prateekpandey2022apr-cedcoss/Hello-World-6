import { NewSidebar } from "@cedcommerce/ounce-ui";
import { sub } from "date-fns";
import React from "react";

import {
  Home,
  Settings,
  LifeBuoy,
  HelpCircle,
  Box,
  LogOut,
} from "react-feather";
import Logo from "../../Assets/Images/svg/Logo";
import MobileLogo from "../../Assets/Images/svg/MobileLogo";

const Sidebar = () => {
  const menu = [
    {
      url: "/overview",
      content: "Dashboard",
      path: "dashboard",
      heading: "Dashboard",
      icon: <Home size="20" color="#3B424F" />,
      showTargetSelect: true,
      showPage: true,
      page_description:
        "You can find a quick update on all of your crucial operations and activities here including your Product(s) and Order(s) updates.",
    },
    {
      url: "/product",
      content: "Product List",
      path: "product",
      hidden: false,
      showPage: true,
      icon: <Box size={20} color="#3B424F" />,
      showTargetSelect: true,
      heading: "Product Listing",
      page_description:
        "Find the list of Shopify Product(s) here that are enabled for `Amazon by CedCommerce’. You can use Match from Amazon to sync your existing Listing with the same SKU(s) or can select and upload New product(s) on Amazon",
    },
    {
      url: "/config",
      content: "Settings",
      showPage: true,
      showTargetSelect: true,
      icon: <Settings size="20" color="#3B424F" />,
      path: "config",
      heading: "Settings",
      page_description:
        "Add or update your Amazon account connectivity within the App. Manage Product Templates or apply Order Synchronization settings.",
    },
    {
      url: "/help",
      content: "Help",
      showPage: true,
      showTargetSelect: true,
      icon: <LifeBuoy size="20" color="#3B424F" />,
      path: "help",
      heading: "Settings",
      page_description:
        "Add or update your Amazon account connectivity within the App. Manage Product Templates or apply Order Synchronization settings.",
    },
    {
      url: "/faq",
      content: "FAQ",
      showPage: true,
      path: "faq",
      icon: <HelpCircle size="20" color="#3B424F" />,
      heading: "FAQ & Troubleshoot",
      page_description: "Find solutions to all your Queries",
    },
    {
      url: "/logout",
      content: "Logout",
      showPage: true,
      path: "logout",
      icon: <LogOut size="20" color="#3B424F" />,
      heading: "Logout",
      page_description: "User will logout",
      extraClass: "custom_logout",
    },
  ];

  const submenu = [];

  return (
    <NewSidebar
      subMenu={submenu}
      //   path={getCurrentPath(props.location.pathname)}
      menu={menu}
      //   onChange={(e: any) => onChange(e)}
      logo={<Logo />}
      mobileLogo={<MobileLogo />}
    />
  );
};

export default Sidebar;
