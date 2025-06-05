interface AddProductButtonProps {
  handleAddClick: () => void;
}

export const AddProductButton: React.FC<AddProductButtonProps> = ({ handleAddClick }) => {
  return (
    <button className="add-product-button" onClick={handleAddClick}>
      Add New Product
    </button>
  );
};