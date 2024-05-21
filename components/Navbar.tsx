"use client";

import useCart from "@/lib/hooks/useCart";

import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart, ShieldClose, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-10 py-2 px-10 flex gap-2 justify-between items-center bg-white max-sm:px-2">
      <Link href="/">
        <Image src="/logo.png" alt="logo" width={50} height={50} className="transform scale-150" />
      </Link>

      <div className="flex gap-4 text-base-bold max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-red-1 ${pathname === "/" && "text-red-1"
            }`}
        >
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === "/wishlist" && "text-red-1"
            }`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-red-1 ${pathname === "/orders" && "text-red-1"
            }`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-grey-2 px-3 py-1 items-center rounded-lg">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          disabled={query === ""}
          onClick={() => router.push(`/search/${query}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-red-1" />
        </button>
      </div>

      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className="flex items-center gap-3 border rounded-lg px-2 py-1 hover:bg-black hover:text-white max-md:hidden"
        >
          <ShoppingCart />
          <p className="text-base-bold">Cart ({cart.cartItems.length})</p>
        </Link>

        <Menu
          className="cursor-pointer lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        <div className={`fixed top-12 ${dropdownMenu ? 'right-0' : 'right-[-200px]'} 
          transition-transform transform ${dropdownMenu ? 'translate-x-0' : 'translate-x-full'}`}
          ref={dropdownRef}
        >
          <div className="w-[70vw] min-h-[90vh] flex flex-col gap-4 p-3 rounded-lg border bg-white text-base-bold lg:hidden">

            <div className="flex justify-between">

              {/* <X /> */}
              <XCircle size={35} onClick={() => setDropdownMenu(!dropdownMenu)} />
              {user ? (
                <UserButton afterSignOutUrl="/sign-in" />
              ) : (
                <Link href="/sign-in">
                  <CircleUserRound size={35} />
                </Link>
              )}
            </div>

            <div className="hover:text-red-1 flex justify-center max-800px:mt-2 p-2 border-b rounded-lg">
              <a onClick={(event) => {
                event.preventDefault();
                setDropdownMenu(!dropdownMenu);
                router.push('/')
              }}>Home</a>
            </div>

            <div
              className="hover:text-red-1 flex justify-center max-800px:mt-2 p-2 border-b rounded-lg"
            >
              <a onClick={(event) => {
                event.preventDefault();
                setDropdownMenu(!dropdownMenu);
                router.push(user ? "/wishlist" : "/sign-in")
              }}>Wishlist</a>
            </div>
            <div
              className="hover:text-red-1 flex justify-center max-800px:mt-2 p-2 border-b rounded-lg"
            >
              <a onClick={(event) => {
                event.preventDefault();
                setDropdownMenu(!dropdownMenu);
                router.push(user ? "/orders" : "/sign-in")
              }}>Orders</a>
            </div>

            <div
              className="flex items-center justify-center gap-3 border-b rounded-lg px-2 py-1 hover:bg-black hover:text-white max-800px:mt-2"
            >
              <a className="flex"
                onClick={(event) => {
                  event.preventDefault();
                  setDropdownMenu(!dropdownMenu);
                  router.push('/cart')
                }}
              >
                <ShoppingCart />
                <p className="text-base-bold pl-2 my-auto">Cart ({cart.cartItems.length})</p>
              </a>
            </div>
          </div>
        </div>

        <div className="hidden sm:visible">
          {user ? (
            <UserButton afterSignOutUrl="/sign-in" />
          ) : (
            <Link href="/sign-in">
              <CircleUserRound size={35} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
