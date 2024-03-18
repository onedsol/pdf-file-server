const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get('file')); // true
console.log(searchParams.get('fileName')); // true
console.log(searchParams.get('title')); // true

const url = `http://${host}:${port}/file?file=${searchParams.get('file')}`

/* Control the viewer customization.
 * It lists down all supported variables with default values.
 **/
const viewerConfig = {
  showAnnotationTools: true,
  enableFormFilling: true,
  showDownloadPDF: true,
  showSaveButton: true,
  showDisabledSaveButton: true,
  showPrintPDF: true,
  showZoomControl: true,
  defaultViewMode: "", /* Allowed possible values are 'FIT_PAGE', 'FIT_WIDTH', 'TWO_COLUMN', 'TWO_COLUMN_FIT_PAGE' or "". */
};

const saveOptions = {
  autoSaveFrequency: 0,
  enableFocusPolling: false,
  showSaveButton: true
}

document.addEventListener('adobe_dc_view_sdk.ready', function () {
  var adobeDCView = new AdobeDC.View({clientId: clientId, divId: 'adobe-dc-view'});
  adobeDCView.previewFile({
    content: {location: {url: url}},
    metaData: {fileName: searchParams.get('title')}
  });

  adobeDCView.registerCallback(AdobeDC.View.Enum.CallbackType.SAVE_API, async function (metaData, content, options) {
      /* Add your custom save implementation here...and based on that resolve or reject response in given format */
      // request to send file
      console.log(metaData);
      console.log(content);
      console.log(AdobeDC.View.Enum.ApiResponseCode)

      const uint8Array = new Uint8Array(content);
      const blob = new Blob([uint8Array], {type: 'application/pdf'});
      const formData = new FormData();
      const pdfFilename = searchParams.get('title');
      formData.append('file', blob, pdfFilename);

      await fetch('http://localhost:3000/save?filePath=' + searchParams.get('filePath') + '&fileName=' + searchParams.get('fileName'), {
        method: 'POST',
        body: formData
      })
        .then(() => {
          alert('The file has been uploaded successfully.');
          return new Promise((resolve, reject) => {
            resolve({
              code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
              data: { /* Updated file metadata after successful save operation */
                metaData: {fileName: searchParams.get('title')}
              }
            });
          });
        })
        .catch((err) => {
          alert('Oh no, something went wrong!');
          return new Promise((resolve, reject) => {
            reject({
              code: AdobeDC.View.Enum.ApiResponseCode.FAIL,
              data: { /* Updated file metadata after successful save operation */
                metaData: {fileName: searchParams.get('title')}
              }
            });
          });
        });
    },
    saveOptions
  );
});