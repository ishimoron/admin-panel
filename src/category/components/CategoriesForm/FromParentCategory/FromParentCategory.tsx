import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WarningIcon from '@mui/icons-material/Warning';
import { Alert, Box, Button, FormControl, FormLabel, Input } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import UploadIcon from '../../../../app/components/UploadIcon/UploadIcon';
import { useAuth } from '../../../../auth/auth';
import { Categories_I, CategoryFromParent } from '../../../models/Categories_I';
import { ChosenIconState } from '../../../models/IconPicker_I';
import {
  apiCreateCategoryFromParentId,
  apiCreateIconPath,
  apiGetCategories,
} from '../../../services/category.service';
import IconPicker from '../../IconPicker/IconPicker';

interface FromParentCategoryProps {
  categories: Categories_I[];
  isCategoryChosen: boolean;
  parentCategoryId: string;
}

const FromParentCategory: FC<FromParentCategoryProps> = ({
  categories,
  isCategoryChosen,
  parentCategoryId,
}) => {
  const { refreshTokenHandler, logout } = useAuth();
  const [chosenIcon, setChosenIcon] = useState<ChosenIconState | null>(null);
  const [isChosenIconParent, setIsChosenIconParent] = useState(false);
  const [errorParentCategory, setErrorParentCategory] = useState<string[]>([]);
  const [fileIcon, setFileIcon] = useState<File | null>(null);
  const [newParentCategory, setNewParentCategory] =
    useState<CategoryFromParent>({
      name: '',
      description: '',
      parent_id: 0,
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
    setNewParentCategory((prev) => ({
      ...prev,
      parent_id: Number(parentCategoryId),
      iconName,
    }));
  }, [chosenIcon, parentCategoryId]);

  const foundCategory = () => {
    if (categories)
      return categories?.find(
        (category) => category.id === Number(parentCategoryId),
      );
    else return '';
  };

  const sendFromParentCategory = async () => {
    let fileData;
    if (fileIcon) {
      fileData = await apiCreateIconPath({
        refreshTokenHandler,
        logout,
        fileIcon: fileIcon ?? undefined,
      });
    }

    const res = await apiCreateCategoryFromParentId({
      refreshTokenHandler,
      logout,
      newParentCategory,
      fileUrl: fileData?.fileUrl,
    });
    if (res.statusCode === 400) {
      setErrorParentCategory(res.message);
      if (Array.isArray(res.message)) {
        setErrorParentCategory(res.message);
      } else {
        setErrorParentCategory([res.message]);
      }
    }
    if (res.id) {
      setNewParentCategory({
        name: '',
        description: '',
        parent_id: 0,
        iconName: '',
        iconPath: '',
      });
      setFileIcon(null);
      setChosenIcon(null);
      setIsChosenIconParent(false);
      setErrorParentCategory([]);
    }
    refetch();
  };

  const handleValueChangeParentCategory = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setNewParentCategory((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const extendedCategory = foundCategory();
  return (
    <Box sx={{ display: 'flex' }}>
      {isCategoryChosen && (
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <form>
            {errorParentCategory.length > 0 &&
              errorParentCategory.map((error, index) => (
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
            <FormControl>
              <FormLabel>Add category from existing category</FormLabel>
              <Input
                placeholder="extended"
                value={extendedCategory ? extendedCategory?.name : ''}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Create new parent Category</FormLabel>
              <Input
                name="name"
                placeholder="New parent category"
                value={newParentCategory?.name}
                onChange={(e) => handleValueChangeParentCategory(e)}
              />
            </FormControl>
            <FormControl>
              <Input
                name="description"
                placeholder="Description"
                value={newParentCategory?.description}
                onChange={(e) => handleValueChangeParentCategory(e)}
              />
            </FormControl>
            <FormControl>
              <IconPicker
                fileIcon={fileIcon!}
                chosenIcon={chosenIcon}
                setChosenIcon={setChosenIcon}
                isChosenIconParent={isChosenIconParent}
                setIsChosenIconParent={setIsChosenIconParent}
              />
              OR
              <UploadIcon
                fileIcon={fileIcon!}
                setFileIcon={setFileIcon}
                isChosenIconParent={isChosenIconParent}
                setIsChosenIconParent={setIsChosenIconParent}
              />
            </FormControl>
            <Button
              endDecorator={<SendRoundedIcon />}
              color="primary"
              onClick={sendFromParentCategory}
            >
              Create
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

export default FromParentCategory;
