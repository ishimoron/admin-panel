import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button, FormControl, FormLabel, Input } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import UploadIcon from '../../../../app/components/UploadIcon/UploadIcon';
import { useAuth } from '../../../../auth/auth';
import { Categories_I } from '../../../models/Categories_I';
import { ChosenIconState } from '../../../models/IconPicker_I';
import {
  apiCreateIconPath,
  apiCreateNewCategory,
  apiGetCategories,
} from '../../../services/category.service';
import IconPicker from '../../IconPicker/IconPicker';

interface NewCategoryProps {
  parentCategoryId: string;
}

const NewCategory: FC<NewCategoryProps> = ({ parentCategoryId }) => {
  const { refreshTokenHandler, logout } = useAuth();
  const [chosenIcon, setChosenIcon] = useState<ChosenIconState | null>(null);
  const [isChosenIcon, setIsChosenIcon] = useState(false);
  const [errorNewCategory, setErrorNewCategory] = useState<string[]>([]);
  const [fileIcon, setFileIcon] = useState<File | null>(null);
  const [newCategory, setNewCategory] = useState<Categories_I>({
    name: '',
    description: '',
    parent_id: null,
    iconName: '',
  });
  const { refetch } = useQuery({
    queryKey: ['categories'],
    refetchOnWindowFocus: false,
    queryFn: async () =>
      await apiGetCategories({ refreshTokenHandler, logout }),
  });

  useEffect(() => {
    const iconName = chosenIcon?.name ?? '';
    setNewCategory((prev) => ({
      ...prev,
      iconName,
    }));
  }, [chosenIcon, parentCategoryId]);

  const sendNewCategory = async () => {
    let fileData;
    if (fileIcon && newCategory.name) {
      fileData = await apiCreateIconPath({
        refreshTokenHandler,
        logout,
        fileIcon: fileIcon ?? undefined,
      });
    }
    const res = await apiCreateNewCategory({
      refreshTokenHandler,
      logout,
      newCategory,
      fileUrl: fileData?.fileUrl,
    });
    if (res.statusCode === 400) {
      setErrorNewCategory(res.message);
      if (Array.isArray(res.message)) {
        setErrorNewCategory(res.message);
      } else {
        setErrorNewCategory([res.message]);
      }
    }
    if (res.id) {
      setNewCategory({
        name: '',
        description: '',
        parent_id: null,
        iconName: '',
        iconPath: '',
      });
      setChosenIcon(null);
      setFileIcon(null);
      setIsChosenIcon(false);
      setErrorNewCategory([]);
    }
    refetch();
  };

  const handleValueChangeCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
      <form>
        <FormControl>
          <FormLabel>Create new Category</FormLabel>
          {errorNewCategory.length > 0 &&
            errorNewCategory.map((error, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  width: '100%',
                  marginBottom: '7px',
                  flexDirection: 'column',
                }}
              >
                <Alert
                  startDecorator={<WarningIcon />}
                  variant="outlined"
                  color="danger"
                >
                  {error}
                </Alert>
              </Box>
            ))}

          <Input
            name="name"
            placeholder="New category"
            value={newCategory.name}
            onChange={(e) => handleValueChangeCategory(e)}
          />
        </FormControl>
        <FormControl>
          <Input
            name="description"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) => handleValueChangeCategory(e)}
          />
        </FormControl>
        <FormControl>
          <IconPicker
            fileIcon={fileIcon!}
            chosenIcon={chosenIcon}
            setChosenIcon={setChosenIcon}
            isChosenIcon={isChosenIcon}
            setIsChosenIcon={setIsChosenIcon}
          />
          OR
          <UploadIcon
            fileIcon={fileIcon!}
            setFileIcon={setFileIcon}
            isChosenIcon={isChosenIcon}
            setIsChosenIcon={setIsChosenIcon}
          />
        </FormControl>
        <FormControl></FormControl>
        <Button
          endDecorator={<SendRoundedIcon />}
          color="primary"
          onClick={sendNewCategory}
        >
          Create
        </Button>
      </form>
    </Box>
  );
};

export default NewCategory;
