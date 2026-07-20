"use client";
import Image from "next/image";
import { type PropsWithChildren } from "react";
import { ShieldCheck, Vote, Car } from "@/lib/icons/icons";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Branded image side - hidden on smaller screens, visible on lg and above */}
      <div className="hidden lg:flex lg:w-[60%] relative h-full flex-col justify-end p-12 overflow-hidden">
        <Image
          src="/images/signup-image.png"
          alt="Smart Housing community"
          fill
          priority
          className="object-cover"
          sizes="60vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

        <div className="relative z-10 flex flex-col gap-6 text-white max-w-lg">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="Smart Housing" width={36} height={36} className="rounded" />
            <span className="text-lg font-semibold">Smart Housing</span>
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold leading-tight text-balance">
            Secure, smart, and connected housing societies
          </h2>
          <p className="text-white/80 text-base leading-relaxed">
            AI surveillance, vehicle access control, and digital voting — everything your society
            needs in one place.
          </p>
          <div className="flex items-center gap-6 pt-2 text-sm text-white/85">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span>Live surveillance</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span>Vehicle access</span>
            </div>
            <div className="flex items-center gap-2">
              <Vote className="h-4 w-4" />
              <span>Digital voting</span>
            </div>
          </div>
        </div>
      </div>

      {/* Form Area - scrolls independently if content is too tall */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-6 sm:p-10 h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
