import React, { useState, useRef } from "react";
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalBody,
  UploadArea,
  UploadIcon,
  UploadText,
  UploadButton,
  ImagePreview,
  ImageContainer,
  RemoveButton,
  GuideText,
  ModalFooter,
  ActionButton,
} from "./ProfileUploadModal.styled";

interface ProfileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImage?: string;
  onImageChange: (image: string | null) => void;
}

export const ProfileUploadModal: React.FC<ProfileUploadModalProps> = ({
  isOpen,
  onClose,
  currentImage,
  onImageChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        onImageChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    onImageChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>내 스타일</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <UploadArea
            onClick={() => fileInputRef.current?.click()}
            hasImage={!!previewImage}
          >
            {previewImage ? (
              <ImageContainer>
                <ImagePreview src={previewImage} alt="프로필 미리보기" />
                <RemoveButton onClick={handleRemoveImage}>×</RemoveButton>
              </ImageContainer>
            ) : (
              <>
                <UploadIcon>📷</UploadIcon>
                <UploadText>사진을 업로드하세요</UploadText>
                <UploadButton>파일 선택</UploadButton>
              </>
            )}
          </UploadArea>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          
          <GuideText>
            최대한 전신이 다 나오도록 찍어야 착용샷이 안정적으로 나옵니다
          </GuideText>
        </ModalBody>
        
        <ModalFooter>
          <ActionButton onClick={onClose}>취소</ActionButton>
          <ActionButton primary onClick={handleSave}>저장</ActionButton>
        </ModalFooter>
      </ModalContent>
    </ModalOverlay>
  );
};
