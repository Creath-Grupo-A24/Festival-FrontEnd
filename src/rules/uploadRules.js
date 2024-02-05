import React, { useState } from 'react';
import { uploadRules } from '../components/festivalService';

const UploadForm = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    if (!selectedFile) {
      alert('Por favor, selecione um arquivo para fazer upload.');
      return;
    }
    try {
      await uploadRules(selectedFile, id); 
      alert('Upload realizado com sucesso!');
    } catch (error) {
      alert('Falha no upload do arquivo.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Fazer Upload</button>
    </form>
  );
};

export default UploadForm;
