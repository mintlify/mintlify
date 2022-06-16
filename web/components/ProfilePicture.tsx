import { User } from "../context/ProfileContex";

export default function ProfilePicture({ size, user }: { size: number; user: User }) {
  const textSize = size <= 8 ? "text-xs" : "text-base";
  if (!user.profilePicture) {
    const initials = (user.firstName ? user.firstName[0] : '') + (user.lastName ? user.lastName[0] : '');

    return (
      <div className={`h-${size} aspect-square bg-hover text-white flex items-center justify-center rounded-full ${textSize}`}>
        {initials}
      </div>
    );
  }

  return (
    <img
      className={`h-${size} aspect-square rounded-full`}
      src="https://res.cloudinary.com/mintlify/image/upload/v1652115323/han_o6mnrb.jpg"
      alt="Profile"
    />
  );
}
