### Simple file server using Node and Express

This is a simple PDFs file server

### To install dependencies ###

npm install

### Config ###

Please follow the doc: https://developer.adobe.com/document-services/apis/pdf-embed/
create your account in Adobe console and add a new KEY pointed to localhost or DNS where to run the app.

Replace CLIENT_ID var in the .env file with your created KEY.
Replace DOC_DIR var in the .env file with your desired path


### To run ###

npm start

### Params ###

index.html needs some query params:

* filePath: The file path. 
* fileName: The file name.
* title: The file title to show

Sample:

http://localhost:3000/index.html?filePath=/autonomy/docs&fileName=form.pdf

This will load embedded PDF from current path with tha name using Adobe PDF Embed API.