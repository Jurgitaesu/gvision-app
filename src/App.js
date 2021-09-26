import { Container, Form, Alert, Button } from 'react-bootstrap';
import { useState } from 'react';

const App = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [message, setMessage] = useState('');
  const regEx = /\.(jpe?g|png|gif|bmp|webp|raw|ico|pdf|tiff?)$/i;

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const validateFile = (e) => {
    e.preventDefault();
    setMessage('');
    if (!selectedFile) return setMessage('Image was not selected');
    const fileSize = selectedFile.size;
    const fileSizeMB = Math.round(fileSize / 1024) / 1000;
    const maxFileSize = 20;
    if (fileSizeMB < maxFileSize) {
      if (!regEx.test(String(selectedFile.name))) {
        return setMessage(
          'Image type should be: jpg, jpeg, png, gif, animated gif, bmp, webp, raw, ico, pdf or tiff'
        );
      } else handleSubmitFile();
    } else {
      setMessage('Image files should not exceed 20MB');
    }
  };

  const handleSubmitFile = () => {
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadFile(reader.result);
    };
    reader.onerror = () => {
      console.log('Error');
    };
  };

  const uploadFile = async (encodedImage) => {
    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: encodedImage }),
      });
      const data = await response.json();
      if (data.error) {
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
      setSelectedFile('');
    } catch (error) {
      console.log(error);
    }
  };

  //Suggested future improvements:
  //+ show uploaded image on frontend
  //+ show related objects on frontend after submit
  //+ remove selected file name after submit
  //+ improve app's style

  return (
    <Container>
      <h2 className="text-center mt-4">Image recognition using Google Vision</h2>
      {!!message ? <Alert variant="warning">{message}</Alert> : <Alert></Alert>}
      <h5 className="text-center">Choose file from computer:</h5>
      <Form>
        <Form.Group className="d-flex justify-content-center my-4">
          <Form.File onChange={handleFileInputChange} type="file" className="mx-auto bg-light p-3" />
        </Form.Group>
        <div className="d-flex justify-content-center my-4">
          <Button className="btn btn-warning" onClick={validateFile}>
            Submit
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default App;
