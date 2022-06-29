import { Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

export const Test = () => {
  const addNotification = () => {
    // use a random type of notification
    toast('Lorem ipsum dolor sit amet, consectetur adipiscing elit', {
      type: 'info',
    });
  };

  return (
    <>
      <Button onClick={addNotification}>Click me</Button>
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
};
