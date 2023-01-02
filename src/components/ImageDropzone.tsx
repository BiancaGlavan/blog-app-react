import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

interface IPropsImageDropzone {
  onChange: (file: File) => void;
}

const StyledImageDropZone = styled('div')`
flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: grey;
  border-style: dashed;
  background-color: #fafafa;
  color: ${props => props.theme.palette.primary.main};
  outline: none;
  transition: border .24s ease-in-out;
  cursor: pointer;

  &: focus {
    border-color: #2196f3;
  }
`;

const ImageDropzone = ({onChange}: IPropsImageDropzone) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files

    console.log('accepted files: ', acceptedFiles);

    if (acceptedFiles && acceptedFiles.length > 0) {
      onChange(acceptedFiles[0])
    }

  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  return (
    <StyledImageDropZone {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? <Typography variant="h6">Drop the image here ...</Typography> : <Typography variant="h6">Drag 'n' drop your image here, or click to select image</Typography>}
    </StyledImageDropZone>
  );
};

export default ImageDropzone;
