"use client";

import { useSession, signOut } from "next-auth/react";
import { Avatar } from "@/catalyst/avatar";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "@/catalyst/dropdown";
import {
  Navbar,
  NavbarDivider,
  NavbarItem,
  NavbarLabel,
  NavbarSection,
  NavbarSpacer,
} from "@/catalyst/navbar";
import { LOGO_SVG, USER_PLACEHOLDER } from "@/constants/assets";
import {
  ArrowRightStartOnRectangleIcon,
  ChartBarIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  InboxIcon,
  LightBulbIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ShieldCheckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Gutter from "./Gutter";
import { Button } from "@/catalyst/button";

const Nav = () => {
  const { data: session } = useSession();

  return (
    <Gutter>
      <Navbar>
        <Dropdown>
          <DropdownButton as={NavbarItem}>
            <Avatar
              src={LOGO_SVG}
              alt="So-Cal Home Buyers Hub"
              className="size-10"
            />
            <NavbarLabel className="text-2xl dark:text-white">
              So-Cal Home Buyers Hub
            </NavbarLabel>
            <ChevronDownIcon />
          </DropdownButton>
          <DropdownMenu className="min-w-64" anchor="bottom start">
            <DropdownItem href="/user/id/settings">
              <Cog8ToothIcon />
              <DropdownLabel>Settings</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/teams/1">
              <Avatar slot="icon" src="/tailwind-logo.svg" />
              <DropdownLabel>Tailwind Labs</DropdownLabel>
            </DropdownItem>
            <DropdownItem href="/teams/2">
              <Avatar
                slot="icon"
                initials="WC"
                className="bg-purple-500 text-white"
              />
              <DropdownLabel>Workcation</DropdownLabel>
            </DropdownItem>
            <DropdownDivider />
            <DropdownItem href="/teams/create">
              <PlusIcon />
              <DropdownLabel>New team&hellip;</DropdownLabel>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarDivider className="max-lg:hidden" />
        <NavbarSection className="max-lg:hidden">
          <NavbarItem href="/" current>
            Home
          </NavbarItem>
          <NavbarItem href="/events">Locations</NavbarItem>
          <NavbarItem href="/orders">Orders</NavbarItem>
        </NavbarSection>
        <NavbarSpacer />

        {session ? (
          <NavbarSection>
            <NavbarItem href="/dashboard" aria-label="dashboard">
              <ChartBarIcon />
            </NavbarItem>
            <NavbarItem href="/inbox" aria-label="Inbox">
              <InboxIcon />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src={USER_PLACEHOLDER} square />
              </DropdownButton>
              <DropdownMenu className="min-w-64" anchor="bottom end">
                <DropdownItem href="/my-profile">
                  <UserIcon />
                  <DropdownLabel>My profile</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="/privacy-policy">
                  <ShieldCheckIcon />
                  <DropdownLabel>Privacy policy</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="/share-feedback">
                  <LightBulbIcon />
                  <DropdownLabel>Share feedback</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem
                  onClick={() => signOut()}
                  className="cursor-pointer"
                >
                  <ArrowRightStartOnRectangleIcon />
                  <DropdownLabel>Sign out</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarSection>
        ) : (
          // If the user is not logged in, show login button
          <NavbarSection>
            <Button
              type="button"
              className="cursor-pointer"
              onClick={() => {
                window.location.href = "/api/auth/signin";
              }}
            >
              Login
            </Button>
          </NavbarSection>
        )}
      </Navbar>
    </Gutter>
  );
};

export default Nav;
