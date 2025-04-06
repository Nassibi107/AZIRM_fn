// CUSTOM ICON COMPONENT
import duotone from "@/icons/duotone";
import flag from "@/icons/flag";
// type ChildItem = { name: string; path: string };
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
, {
  name: "Bank",
  path: "/square",
  icon: duotone.Pricing
}
,
{
  name: "Cash",
  path: "/cash",
  icon: duotone.Credit
},
{
  name: "Square",
  path: "/Report",
  icon: duotone.Report
}
, {
  name: "maping",
  path: "/maping",
  icon: flag
}
, {
  name: "map",
  path: "/map",
  icon: duotone.ActiveCode
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