"use client";

import { ISocialLink } from "@/types/settings/social-links";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { useTranslations } from "next-intl";
import Link from "next/link";



interface Prop {
  socialLink: ISocialLink;
}

export const ContactUsLink: React.FC<Prop> = ({
  socialLink
}) => {
  const t = useTranslations("pages.general_settings");
  return (
    <>
      <div className="flex-col gap-3">
        {/* <label>{socialLink?.title}</label> */}
        <Link href={socialLink?.url}>
          <div className="flex items-start gap-3">
            <Avatar className="h-11 w-11 mt-[-2px] rounded-full">
              <AvatarImage
                src={socialLink.logo ?? ""}
                alt={socialLink.title ?? ""}
              />
              <AvatarFallback>{socialLink.title[0]}</AvatarFallback>
            </Avatar>

            <div className="grow mt-2">
              <p>{socialLink?.title}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
