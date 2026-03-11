
"use client";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";

export function NavMain({ items, dropdownLabel }) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{dropdownLabel}</SidebarGroupLabel>
      <SidebarMenu className="bg-background">
        {items.map((item) => {
          console.log(item)
          // check if active
          const isItemActive =
            pathname === item.url ||
            item?.items?.some((subItem) => pathname === subItem.url);

          // ✅ if item has sub-items
          if (item?.items?.length) {
            return (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={isItemActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={item.title}
                      disabled={item.disabled} // disable root if needed
                      className={
                        item.disabled
                          ? "text-gray-400 cursor-not-allowed"
                          : isItemActive
                          ? "bg-[#004CAC] font-medium text-white"
                          : ""
                      }
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {!item.disabled && (
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items?.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            {subItem.disabled ? (
                              <SidebarMenuSubButton className="text-gray-400 cursor-not-allowed">
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            ) : (
                              <SidebarMenuSubButton
                                asChild
                                className={
                                  isActive
                                    ? "bg-[#004CAC] font-medium text-white"
                                    : ""
                                }
                              >
                                <Link to={subItem.url}>
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            )}
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          //  if item has no sub-items
          return (
            <SidebarMenuItem key={item.title}>
              {item.disabled ? (
                <SidebarMenuButton className="text-gray-400 cursor-not-allowed">
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              ) : (
                <SidebarMenuButton
                  asChild
                  className={
                    (isItemActive ? "bg-[#004CAC] font-medium text-white" : "")+" "+
                    "hover:bg-[#186ed8] hover:text-white hover:font-medium"
                  }
                >
                  <Link to={item.url}>
                    {item.icon && <item.icon className={`text-[${item?.iconColor}]` +" "+ (isItemActive ? "bg-[#004CAC] font-medium text-white" : "")} />}
                    <span>{item?.title}</span>
                    {/* <span>{item?.module_name}</span> */}
                  </Link>
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

