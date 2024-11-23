import userPicture from "../../../assets/images/userPicture.png";

interface ImageContentProps {
  imageString?: string;
  className?: string;
}

export const ImageContent = ({ imageString, className }: ImageContentProps) => {
  const avatar = imageString ? imageString : userPicture;
  return (
    <div className={className}>
      <img src={avatar} alt="Avatar user image" />
    </div>
  );
};
