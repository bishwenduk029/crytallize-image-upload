# Description

A simple node.js server to upload an image and return a URL to the consumer of API. When the user clicks on the returned URL the image is displayed in the browser.

# Following are the steps to run the same

- git clone https://github.com/bishwenduk029/crytallize-image-upload.git
- cd crytallize-image-upload
- npm install
- npm run dev

# Testing from POSTMAN

- Upload Example
  - POST http://127.0.0.1:8000/uploads
  - Select form-data
  - enter image as key
  - for value select any image from your local computer
  - Now hit SEND button
- Response:
  - {"url":"http://127.0.0.1:8000/uploads/((name_of_image_file))"}
  - Now simply click or past the URL in the browser to access the file.
