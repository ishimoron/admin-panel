import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Button, IconButton, SvgIcon, Typography, styled } from '@mui/joy';
import { ChangeEvent, FC, useEffect } from 'react';

import { getErrorToast } from '../../utils/toastUtils';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

interface UploadIconProps {
  isChosenIcon?: boolean;
  isChosenIconParent?: boolean;
  fileIcon: File | null;
  setFileIcon: (file: File | null) => void;
  setIsChosenIconParent?: (iconParent: boolean) => void;
  setIsChosenIcon?: (iconParent: boolean) => void;
}

const UploadIcon: FC<UploadIconProps> = ({
  fileIcon,
  isChosenIcon,
  setFileIcon,
  isChosenIconParent,
  setIsChosenIconParent,
  setIsChosenIcon,
}) => {
  const allowedFilesType = ['.png', '.jpg', '.jpeg'];
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileIcon(files[0]);
    }
    setIsChosenIconParent?.(true);
    setIsChosenIcon?.(true);
  };

  useEffect(() => {
    const checkFileType = () => {
      if (fileIcon) {
        const fileExtension = fileIcon.name.slice(fileIcon.name.indexOf('.'));
        if (!allowedFilesType.includes(fileExtension)) {
          getErrorToast(
            `File type should be one of the following: ${allowedFilesType.join(', ')}`,
          );
          setFileIcon(null);
        }
      }
    };
    checkFileType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileIcon, setFileIcon]);

  return (
    <Box>
      <Button
        component="label"
        disabled={isChosenIcon || isChosenIconParent}
        variant="outlined"
        color="neutral"
        startDecorator={
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </SvgIcon>
        }
      >
        Upload icon
        <VisuallyHiddenInput
          type="file"
          accept={allowedFilesType.join(',')}
          onChange={(e) => handleFileChange(e)}
        />
      </Button>

      {fileIcon && fileIcon.name && (
        <>
          {fileIcon && <Typography>{fileIcon.name}</Typography>}
          <IconButton
            size="sm"
            onClick={() => {
              setFileIcon(null);
              setIsChosenIconParent?.(false);
              setIsChosenIcon?.(false);
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default UploadIcon;
