import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Button from '@mui/joy/Button';
import DialogActions from '@mui/joy/DialogActions';
import DialogContent from '@mui/joy/DialogContent';
import DialogTitle from '@mui/joy/DialogTitle';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { FC } from 'react';

interface CategoryModalRejectionProps {
  rejectionModal: boolean;
  setIsRejectionConfirmed: (isRejection: boolean) => void;
  setRejectionModal: (rejectionModal: boolean) => void;
}

const CategoryModalRejection: FC<CategoryModalRejectionProps> = ({
  rejectionModal,
  setRejectionModal,
  setIsRejectionConfirmed,
}) => {
  return (
    <>
      <Modal open={rejectionModal} onClose={() => setRejectionModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete this category?
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={() => {
                setRejectionModal(false);
                setIsRejectionConfirmed(true);
              }}
            >
              Delete category
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setRejectionModal(false)}
            >
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
};
export default CategoryModalRejection;
