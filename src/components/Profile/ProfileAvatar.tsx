"use client";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useUser } from "@/context/UserContext";
import { urlFor } from "@/sanity/lib/image";

const ProfileAvatar = () => {
  const { user } = useUser();

  return (
    <span className="hover:bg-gray-200  w-[28px] h-[28px] rounded">
      <Link href="/account">
        <Avatar>
          <AvatarImage src={user.image? urlFor(user.image).url() : "/images/profile.png"} alt={user?.name || "Profile Image"} />
          <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </Link>
    </span>
  );
};

export default ProfileAvatar;
