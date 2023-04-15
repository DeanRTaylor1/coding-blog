import { ModalNames } from "@/types/modals";

interface FuzzyModalProps {
  isVisible: boolean;
  onClose: (ModalNames: ModalNames) => void;
}

const FuzzyModal: React.FC<FuzzyModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <div className="fuzzy-modal">
      <div className="fuzzy-files">Files</div>
      <div className="fuzzy-search">Search</div>
    </div>
  );
};

export default FuzzyModal;
