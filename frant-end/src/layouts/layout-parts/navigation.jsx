// CUSTOM ICON COMPONENT
import duotone from "@/icons/duotone"; // type ChildItem = { name: string; path: string };
// type ChildItemWithChildren = {
//   name: string;
//   path: string;
//   children?: ChildItemWithChildren[];
// };

export const navigations = [{
  type: "label",
  label: "Dashboard"
}, {
  name: "Home",
  path: "",
  icon: duotone.HomeIcon
}
, {
  name: "Users",
  path: "/users",
  icon: duotone.UserList
}
];

export const leaderLayout = [{
  type: "label",
  label: "Dashboard"
}, {
  name: "Home",
  path: "",
  icon: duotone.HomeIcon
}
, {
  name: "Users",
  path: "/ousers",
  icon: duotone.UserList
}
];