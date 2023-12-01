import { Button, Modal } from "flowbite-react";

export interface AppModalProps {
  title: string;
  onClose: () => void;
  visible: boolean;
  children: React.ReactNode;
  actions?: React.ReactNode[];
}

export function AppModal({
  title,
  visible,
  onClose,
  children,
  actions,
}: AppModalProps) {
  const close = () => {
    onClose && onClose();
  };

  return (
    <Modal show={visible} onClose={close}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button.Group>
          {actions && actions}

          <Button color="gray" onClick={close}>
            Close
          </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal>
  );
}
