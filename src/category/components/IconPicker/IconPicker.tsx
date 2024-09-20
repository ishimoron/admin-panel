import * as Icons from '@mui/icons-material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  SvgIcon,
} from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import { FC, useMemo, useState } from 'react';
import { FixedSizeList as ListVirtualization } from 'react-window';

import { ChosenIconState } from '../../models/IconPicker_I';

interface IconPickerProps {
  fileIcon?: File;
  isChosenIcon?: boolean;
  isChosenIconParent?: boolean;
  placeholder?: string;
  disabled?: boolean;
  customStyles?: React.CSSProperties;
  chosenIcon: ChosenIconState | null;
  setChosenIcon: (value: ChosenIconState | null) => void;
  setIsChosenIcon?: (value: boolean) => void;
  setIsChosenIconParent?: (value: boolean) => void;
}

const IconPicker: FC<IconPickerProps> = ({
  fileIcon,
  chosenIcon,
  setChosenIcon,
  isChosenIcon,
  setIsChosenIcon,
  placeholder = 'Choose icon',
  disabled = false,
  customStyles,
  isChosenIconParent,
  setIsChosenIconParent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const icons = useMemo(
    () =>
      Object.entries(Icons).map(([key, IconComponent]) => ({
        name: key,
        icon: IconComponent,
      })),
    [],
  );

  const filteredIcons = useMemo(() => {
    if (!searchTerm) return [];
    return icons.filter((icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [icons, searchTerm]);

  const handleIconClick = (
    icon: (typeof Icons)[keyof typeof Icons],
    name: string,
  ) => {
    setChosenIcon({
      name,
      icon,
    });
    setIsChosenIcon?.(true);
    setIsChosenIconParent?.(true);
    setSearchTerm('');
  };
  return (
    <div style={customStyles}>
      <FormControl>
        <FormLabel>Label</FormLabel>
        <Input
          placeholder={placeholder}
          variant="outlined"
          fullWidth
          value={searchTerm}
          disabled={disabled || isChosenIcon || isChosenIconParent}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FormHelperText>More than {icons.length} icons</FormHelperText>
      </FormControl>
      {filteredIcons.length > 0 && !isChosenIcon && !isChosenIconParent && (
        <ListVirtualization
          height={300}
          itemCount={filteredIcons.length}
          itemSize={50}
          width={'100%'}
          style={{ marginTop: 16 }}
        >
          {({ index, style }) => (
            <div style={style}>
              <Box>
                <ListItem nested key={index}>
                  <List>
                    <ListItem key={index}>
                      <ListItemButton
                        sx={{ padding: '10px' }}
                        onClick={() =>
                          handleIconClick(
                            filteredIcons[index].icon,
                            filteredIcons[index].name,
                          )
                        }
                      >
                        <SvgIcon
                          component={filteredIcons[index].icon}
                          style={{ marginRight: 8 }}
                        />
                        {filteredIcons[index].name}
                      </ListItemButton>
                    </ListItem>
                  </List>
                </ListItem>
              </Box>
            </div>
          )}
        </ListVirtualization>
      )}
      {!isChosenIcon &&
        filteredIcons.length === 0 &&
        searchTerm !== '' &&
        'Nothing found'}
      {chosenIcon && chosenIcon.icon && (
        <>
          <SvgIcon component={chosenIcon.icon} />
          <IconButton
            size="sm"
            onClick={() => {
              setChosenIcon(null);
              setIsChosenIcon?.(false);
              setIsChosenIconParent?.(false);
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default IconPicker;
