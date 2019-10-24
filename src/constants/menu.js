const data = [
  {
    id: "men",
    icon: "iconsminds-male",
    label: "menu.men",
    to: "/app/men",
    subs: [
      {
        icon: "iconsminds-t-shirt",
        label: "menu.tshirts",
        to: "/app/men/t-shirts"
      },
      {
        icon: "iconsminds-magic-wand",
        label: "menu.bestselling",
        to: "/app/men/best-selling"
      },
      {
        icon: "iconsminds-film",
        label: "menu.latestcollection",
        to: "/app/men/latest-collection"
      } ,
      {
        icon: "iconsminds-stopwatch",
        label: "menu.dealoftheday",
        to: "/app/men/deal-of-the-day"
      }       
    ]
  },
  {
    id: "women",
    icon: "iconsminds-female",
    label: "menu.women",
    to: "/app/women",
    subs: [
      {
        icon: "iconsminds-t-shirt",
        label: "menu.tops",
        to: "/app/women/tops"
      },
      {
        icon: "iconsminds-magic-wand",
        label: "menu.wbestselling",
        to: "/app/women/best-selling"
      },
      {
        icon: "iconsminds-film",
        label: "menu.wlatestcollection",
        to: "/app/women/latest-collection"
      } ,
      {
        icon: "iconsminds-stopwatch",
        label: "menu.wdealoftheday",
        to: "/app/women/deal-of-the-day"
      }       
    ]
  },
  ,
  {
    id: "mobile",
    icon: "iconsminds-smartphone-3",
    label: "menu.covers",
    to: "/app/mobile-covers",
    subs: [
      {
        icon: "iconsminds-smartphone-4",
        label: "menu.xiaomi",
        to: "/app/mobile-covers/xiaomi"
      },
      {
        icon: "iconsminds-smartphone-4",
        label: "menu.oneplus",
        to: "/app/mobile-covers/oneplus"
      },
      {
        icon: "iconsminds-smartphone-4",
        label: "menu.apple",
        to: "/app/mobile-covers/apple"
      } ,
      {
        icon: "iconsminds-smartphone-4",
        label: "menu.samsung",
        to: "/app/mobile-covers/samsung"
      }       
    ]
  }
];
export default data;
