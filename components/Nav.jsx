"use client";


import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  useEffect(() => {
    (async () => {
        const res = await getProviders();
        setProviders(res);
      })();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* mobile navigation */}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"}>Create Post</Link>
            <button type="button" className="outlin_btn" onClick={signOut}>
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src="/assets/images/logo.svg"
                alt="profile"
                width={37}
                height={37}
                className="object-contain"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (<button key={provider.id}
                  className="black_btn"
                  type="button"
                  onClick={() => signIn(provider.id)}
                >
                  sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
