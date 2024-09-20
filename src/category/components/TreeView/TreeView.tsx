import * as MUIcon from '@mui/icons-material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Avatar, Box, IconButton, Input, Stack } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import { IconTypeMap } from '@mui/material';
import {
  RichTreeView,
  TreeItem2,
  TreeItem2Label,
  TreeItem2Props,
} from '@mui/x-tree-view';
import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import {
  UseTreeItem2LabelInputSlotOwnProps,
  UseTreeItem2LabelSlotOwnProps,
} from '@mui/x-tree-view/useTreeItem2';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  FC,
  MouseEvent,
  Ref,
  SyntheticEvent,
  forwardRef,
  useEffect,
  useState,
} from 'react';

import { getErrorToast } from '../../../app/utils/toastUtils';
import { useAuth } from '../../../auth/auth';
import { ErrorResponse } from '../../models/CategoriesApi_I';
import { TreeViewCategories_I } from '../../models/Categories_I';
import {
  apiDeleteCategory,
  apiUpdateCategory,
} from '../../services/category.service';
import {
  findIconNameById,
  findIconPathById,
} from '../../utils/categories.utils';

interface TreeViewProps {
  categoriesTree: TreeViewCategories_I[];
  isRejectionConfirmed: boolean;
  setIsRejectionConfirmed: (isRejection: boolean) => void;
  setRejectionModal: (modal: boolean) => void;
  setIsCategoryChosen: (сategoryChosen: boolean) => void;
  setParentCategoryId: (parentId: string) => void;
}

const TreeView: FC<TreeViewProps> = ({
  categoriesTree,
  isRejectionConfirmed,
  setIsRejectionConfirmed,
  setRejectionModal,
  setIsCategoryChosen,
  setParentCategoryId,
}) => {
  const { refreshTokenHandler, logout } = useAuth();
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null);
  const { refetch } = useQuery({
    queryKey: ['categories'],
  });
  const mutationDelete = useMutation({
    mutationFn: async (id: number) =>
      await apiDeleteCategory({ refreshTokenHandler, logout, id }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const mutationUpdate = useMutation({
    mutationFn: async ({
      id,
      categoryName,
    }: {
      id: number;
      categoryName: string;
    }) =>
      await apiUpdateCategory({
        refreshTokenHandler,
        logout,
        id,
        categoryName,
      }),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleCategoryDelete = async (id: number) => {
    try {
      await mutationDelete.mutateAsync(id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryUpdate = async (
    id: number,
    categoryName: string,
  ): Promise<ErrorResponse | undefined> => {
    try {
      const res = await mutationUpdate.mutateAsync({ id, categoryName });
      if (res.statusCode === 409) {
        getErrorToast(res.message);
        return {
          statusCode: res.statusCode,
          message: res.message,
          error: res.error,
        };
      }
    } catch (error) {
      console.error(error);
    }
  };
  // const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // const getAllItemsWithChildrenItemIds = () => {
  //   const itemIds: string[] = [];
  //   const registerItemId = (item: TreeViewCategories_I) => {
  //     if (item.children?.length) {
  //       itemIds.push(item.id);
  //       item.children.forEach(registerItemId);
  //     }
  //   };

  //   categoriesMock.forEach(registerItemId);

  //   return itemIds;
  // };

  // const handleExpandedItemsChange = (
  //   event: SyntheticEvent,
  //   itemIds: string[],
  // ) => {
  //   setExpandedItems(itemIds);
  // };

  // const handleExpandClick = () => {
  //   setExpandedItems((oldExpanded) =>
  //     oldExpanded.length === 0 ? getAllItemsWithChildrenItemIds() : [],
  //   );
  // };

  type IconProps = IconTypeMap['props'];

  interface MIconProps extends IconProps {
    name: string | undefined;
  }

  function MIcon(props: MIconProps) {
    const { name } = props;
    const Icon = MUIcon[name as keyof typeof MUIcon];
    if (Icon == null) {
      throw `There is no "${name}" Icon`;
    }
    return <Icon {...props} />;
  }

  useEffect(() => {
    if (isRejectionConfirmed && categoryToDelete) {
      handleCategoryDelete(categoryToDelete);
      setIsRejectionConfirmed(false);
    }
  }, [isRejectionConfirmed, categoryToDelete]);

  interface CustomLabelProps extends UseTreeItem2LabelSlotOwnProps {
    editable: boolean;
    editing: boolean;
    itemId: string;
    toggleItemEditing: () => void;
  }

  function CustomLabel({
    editing,
    editable,
    children,
    itemId,
    toggleItemEditing,
    ...props
  }: CustomLabelProps) {
    const iconName = findIconNameById(categoriesTree, +itemId);
    const iconPath = findIconPathById(categoriesTree, +itemId);
    return (
      <TreeItem2Label
        {...props}
        data-item-id={itemId}
        editable={editable}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {iconPath ? (
            <Stack spacing={2} alignItems="center">
              <Avatar
                sx={{
                  width: '50px',
                  height: '50px',
                }}
              >
                <img
                  src={iconPath}
                  alt="icon"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Avatar>
            </Stack>
          ) : (
            iconName && <MIcon name={iconName} sx={{ mr: 0.5 }} />
          )}
          <Typography sx={{ marginLeft: '5px' }}>{children}</Typography>
        </Box>
        <Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              toggleItemEditing();
            }}
            sx={{ color: 'text.secondary' }}
          >
            <EditOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setIsCategoryChosen(true);
              setParentCategoryId(itemId);
            }}
            sx={{ color: 'text.secondary' }}
          >
            <AddCircleOutlineOutlinedIcon fontSize="small" />
          </IconButton>
          <IconButton
            onClick={async (e) => {
              e.stopPropagation();
              setRejectionModal(true);
              setCategoryToDelete(+itemId);
            }}
            sx={{ color: 'text.secondary' }}
          >
            <DeleteOutlineOutlinedIcon fontSize="small" />
          </IconButton>
        </Box>
      </TreeItem2Label>
    );
  }

  interface CustomLabelInputProps extends UseTreeItem2LabelInputSlotOwnProps {
    handleCancelItemLabelEditing: (event: SyntheticEvent) => void;
    handleSaveItemLabel: (event: SyntheticEvent, label: string) => void;
    value: string;
    itemId: string;
  }

  function CustomLabelInput(props: Omit<CustomLabelInputProps, 'ref'>) {
    const {
      handleCancelItemLabelEditing,
      handleSaveItemLabel,
      value,
      itemId,
      ...other
    } = props;

    return (
      <>
        <Input
          {...other}
          value={value}
          onClick={(e) => e.stopPropagation()}
          fullWidth
          onKeyDown={async (e) => {
            e.stopPropagation();
            if (e.key === 'Enter') {
              e.preventDefault();

              const res = await handleCategoryUpdate(+itemId, value);
              if (res?.statusCode === 409) {
                handleCancelItemLabelEditing(e);
                return;
              }

              handleSaveItemLabel(e, value);
            }
            if (e.key === 'Escape') {
              handleCancelItemLabelEditing(e);
            }
          }}
        />
        <IconButton
          color="success"
          onClick={async (e: MouseEvent) => {
            e.stopPropagation();
            const res = await handleCategoryUpdate(+itemId, value);
            if (res?.statusCode === 409) {
              handleCancelItemLabelEditing(e);
            }
            handleSaveItemLabel(e, value);
          }}
        >
          <CheckIcon fontSize="small" />
        </IconButton>
        <IconButton
          color="danger"
          onClick={(e) => {
            e.stopPropagation();
            handleCancelItemLabelEditing(e);
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </>
    );
  }

  const CustomTreeItem2 = forwardRef(function CustomTreeItem2(
    props: TreeItem2Props,
    ref: Ref<HTMLLIElement>,
  ) {
    // console.log(props, '!');
    const { interactions, status } = useTreeItem2Utils({
      itemId: props.itemId,
      children: props.children,
      // iconName: props.iconName,
    });

    const handleContentDoubleClick: UseTreeItem2LabelSlotOwnProps['onDoubleClick'] =
      (event) => {
        event.defaultMuiPrevented = true;
      };

    const handleInputBlur: UseTreeItem2LabelInputSlotOwnProps['onBlur'] = (
      event,
    ) => {
      event.defaultMuiPrevented = true;
    };

    const handleInputKeyDown: UseTreeItem2LabelInputSlotOwnProps['onKeyDown'] =
      (event) => {
        event.defaultMuiPrevented = true;
      };
    return (
      <TreeItem2
        {...props}
        ref={ref}
        slots={{ label: CustomLabel, labelInput: CustomLabelInput }}
        slotProps={{
          label: {
            itemId: props.itemId,
            onDoubleClick: handleContentDoubleClick,
            editable: status.editable,
            editing: status.editing,
            toggleItemEditing: interactions.toggleItemEditing,
          } as CustomLabelProps,
          labelInput: {
            itemId: props.itemId,
            onBlur: handleInputBlur,
            onKeyDown: handleInputKeyDown,
            handleSaveItemLabel: interactions.handleSaveItemLabel,
            handleCancelItemLabelEditing:
              interactions.handleCancelItemLabelEditing,
          } as CustomLabelInputProps,
        }}
      />
    );
  });

  return (
    <>
      {/* <Button onClick={handleExpandClick}>
        {expandedItems.length === 0 ? 'Expand all' : 'Collapse all'}
      </Button> */}
      <RichTreeView
        isItemEditable
        items={categoriesTree}
        slots={{ item: CustomTreeItem2 }}
        experimentalFeatures={{ labelEditing: true }}
        defaultExpandedItems={['grid', 'pickers']}
        expansionTrigger="content"
        // expandedItems={expandedItems}
        // onExpandedItemsChange={handleExpandedItemsChange}
      />
    </>
  );
};

export default TreeView;
