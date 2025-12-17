import { Button } from 'flowbite-react';
import { useEffect, useState } from 'react';

type Props = {
  handleNew: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancel: (e: React.MouseEvent<HTMLButtonElement>) => void;
  mode: number;
  // ADD THIS: You need the setter function from the parent
  setMode: (mode: number) => void;
};

const CustomButtons = (props: Props) => {
  const [isNewDisabled, setIsNewDisabled] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(false);
  const [isCancelDisabled, setIsCancelDisabled] = useState(false);

  useEffect(() => {
    if (props.mode === 0) {
      setIsNewDisabled(false);
      setIsSubmitDisabled(false);
      setIsDeleteDisabled(true);
      setIsCancelDisabled(false);
    } else if (props.mode === 1) {
      setIsNewDisabled(false);
      setIsSubmitDisabled(false);
      setIsDeleteDisabled(false);
      setIsCancelDisabled(false);
    }
  }, [props.mode]);

  return (
    <div>
      <div className="col-span-12 flex gap-3 justify-end mt-4">
        {/* NEW BUTTON */}
        <Button
          color={'green'}
          onClick={(e) => {
            props.setMode(0); // Call the setter, don't assign to prop
            props.handleNew(e); // ADD () TO FIRE THE FUNCTION
          }}
          disabled={isNewDisabled}
        >
          New
        </Button>

        {/* SAVE BUTTON */}
        <Button
          color={'blue'}
          disabled={isSubmitDisabled}
          onClick={(e) => {
            props.handleSubmit(e); // FIRE THE FUNCTION
            props.setMode(0);
          }}
        >
          Save
        </Button>

        {/* DELETE BUTTON */}
        <Button
          color={'red'}
          disabled={isDeleteDisabled}
          onClick={(e) => {
            props.handleDelete(e); // FIRE THE FUNCTION
            props.setMode(0);
          }}
        >
          Delete
        </Button>

        {/* CANCEL BUTTON */}
        <Button
          color={'gray'}
          disabled={isCancelDisabled}
          onClick={(e) => {
            props.setMode(0);
            props.handleCancel(e); // FIRE THE FUNCTION
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CustomButtons;
