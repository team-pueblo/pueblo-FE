import React, { useState } from "react";
import {
  ProfileSectionStyled,
  ProfileCardStyled,
  AvatarStyled,
  UserInfoStyled,
  UsernameStyled,
  EmailStyled,
  ButtonGroupStyled,
  ButtonStyled,
} from "./UserProfileCard.styled";
import { UserIcon } from "./UserIcon";
import { ProfileUploadModal } from "./ProfileUploadModal";

interface UserProfileCardProps {
  username?: string;
  email?: string;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  username = "fybax51",
  email = "su****@gmail.com",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [styleImage, setStyleImage] = useState<string | null>(null);

  const handleProfileImageChange = (image: string | null) => {
    setProfileImage(image);
  };

  return (
    <ProfileSectionStyled>
      <ProfileCardStyled>
        <AvatarStyled onClick={() => {}}>
          {profileImage ? (
            <img 
              src={profileImage} 
              alt="프로필" 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover", 
                borderRadius: "50%" 
              }} 
            />
          ) : (
            <UserIcon size={32} color="#666" />
          )}
        </AvatarStyled>
        <UserInfoStyled>
          <UsernameStyled>{username}</UsernameStyled>
          <EmailStyled>{email}</EmailStyled>
        </UserInfoStyled>
        <ButtonGroupStyled>
          <ButtonStyled>프로필 관리</ButtonStyled>
          <ButtonStyled onClick={() => setIsModalOpen(true)}>내 스타일</ButtonStyled>
        </ButtonGroupStyled>
      </ProfileCardStyled>


      <ProfileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentImage={styleImage ?? undefined}
        onImageChange={setStyleImage}
      />
    </ProfileSectionStyled>
  );
};
