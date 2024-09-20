import SendRoundedIcon from '@mui/icons-material/SendRounded';
import WarningIcon from '@mui/icons-material/Warning';
import { Box, Button, FormControl, FormLabel, Input } from '@mui/joy';
import Alert from '@mui/joy/Alert';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';

import { useAuth } from '../../../auth/auth';
import {
  Categories_I,
  CategoryFromParent,
  TreeViewCategories_I,
} from '../../models/Categories_I';
import { ChosenIconState } from '../../models/IconPicker_I';
import {
  apiCreateCategoryFromParentId,
  apiCreateNewCategory,
  apiGetCategories,
} from '../../services/category.service';
import IconPicker from '../IconPicker/IconPicker';

interface CategoriesFormProps {
  categories: Categories_I[];
  parentCategoryId: string;
  isCategoryChosen: boolean;
  categoriesTree: TreeViewCategories_I[];

  setIsCategoryChosen: (isCategoryChosen: boolean) => void;
}

const CategoriesForm: FC<CategoriesFormProps> = ({
  parentCategoryId,
  isCategoryChosen,
  categories,
}) => {
  const { refreshTokenHandler, logout } = useAuth();
  const [chosenIcon, setChosenIcon] = useState<ChosenIconState | null>(null);
  const [errorNewCategory, setErrorNewCategory] = useState<string[]>([]);
  const [errorParentCategory, setErrorParentCategory] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState<Categories_I>({
    name: '',
    description: '',
    parent_id: null,
    iconName: '',
  });
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
    setNewCategory((prev) => ({
      ...prev,
      iconName,
    }));
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

  const sendNewCategory = async () => {
    // if (newCategory.name && newCategory.description && newCategory.iconName) {
    const res = await apiCreateNewCategory({
      refreshTokenHandler,
      logout,
      newCategory,
    });
    console.log(res);
    if (res.statusCode === 400) {
      // setChosenIcon(null);
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
      });
      setChosenIcon(null);
      setErrorNewCategory([]);
    }
    refetch();
    // }
  };

  const sendFromParentCategory = async () => {
    if (
      newParentCategory.name &&
      newParentCategory.description &&
      newParentCategory.iconName
    ) {
      await apiCreateCategoryFromParentId({
        refreshTokenHandler,
        logout,
        newParentCategory,
      });
      setErrorNewCategory([]);
      // setChosenIcon(null);
      setNewParentCategory({
        name: '',
        description: '',
        parent_id: 0,
        iconName: '',
      });
      refetch();
    }
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
            {errorParentCategory && errorParentCategory}
            <FormControl>
              <FormLabel>Add category from existing category</FormLabel>
              <Input
                placeholder="extended"
                value={extendedCategory ? extendedCategory?.name : ''}
                disabled
              />
            </FormControl>
            <FormControl>
              <FormLabel>Create new Category</FormLabel>
              <Input
                name="name"
                placeholder="New category"
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
                chosenIcon={chosenIcon}
                // iconClean={iconClean}
                // setIconClean={setIconClean}
                setChosenIcon={setChosenIcon}
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
            <IconPicker chosenIcon={chosenIcon} setChosenIcon={setChosenIcon} />
          </FormControl>
          <Button
            endDecorator={<SendRoundedIcon />}
            color="primary"
            onClick={sendNewCategory}
          >
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default CategoriesForm;
