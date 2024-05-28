// Upload.test.js
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Upload from "../src/components/Upload";
// import Retrieve from "../src/components/Retrieve";

describe('Upload component', () => {
  it('should render file input and upload button', () => {
    render(<Upload />);
    // expect(screen.getByLabelText('Choose File')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  // it('should update selectedFile state on file input change', () => {
  //   render(<Upload />);
  //   const fileInput = screen.getByLabelText('Choose File');
  //   fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.txt')] } });
  //   expect(screen.getByLabelText('Choose File').files[0]).toBeDefined();
  // });

  // it('should update CID state after successful file upload', async () => {
  //   global.fetch = jest.fn().mockResolvedValue({
  //     json: () => Promise.resolve({ IpfsHash: 'test_cid' }),
  //   });
  
  //   render(<Upload />);
  //   const fileInput = screen.getByLabelText('Choose File');
  //   fireEvent.change(fileInput, { target: { files: [new File(['test'], 'test.txt')] } });
  //   const submitButton = screen.getByRole('button', { name: 'Submit' });
  //   fireEvent.click(submitButton);
  
  //   // Wait for state update
  //   await screen.findByText('CID:');
  //   expect(screen.getByText('test_cid')).toBeInTheDocument();
  // });
  
  
  
  
});



// describe('Retrieve component', () => {

//   it('should update CID state on input change', () => {
//     render(<Retrieve />);
//     const input = screen.getByPlaceholderText('Enter CID...');
//     fireEvent.change(input, { target: { value: 'your_cid_here' } });
//     expect(input.value).toBe('your_cid_here');
//   });

  // it('should not display image and QR code if CID is empty', () => {
  //   render(<Retrieve />);
  //   expect(screen.queryByRole('img')).not.toBeInTheDocument();
  //   expect(screen.queryByText('Scan this to download →')).not.toBeInTheDocument();
  // });

  // it('should update CID state on input change', () => {
  //   render(<Retrieve />);
  //   const input = screen.getByLabelText('CID:');
  //   fireEvent.change(input, { target: { value: 'your_cid_here' } });
  //   expect(input.value).toBe('your_cid_here');
  // });

  // it('should not display download button initially', () => {
  //   render(<Retrieve />);
  //   expect(screen.queryByRole('button', { name: 'Download Image' })).toBeNull();
  // });


  

  // Add more test cases as needed
// });