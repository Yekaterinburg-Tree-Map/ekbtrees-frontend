export interface IModalProps {
    show: boolean;
    onClose: () => void;
    danger?: boolean;
    modalHeadingMessage?: string;
}

