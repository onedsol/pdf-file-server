const searchParams = new URLSearchParams(window.location.search);
console.log(searchParams.get('file')); // true
console.log(searchParams.get('title')); // true
console.log(searchParams.get('readOnly'));

const readOnly = searchParams.get('readOnly') && searchParams.get('readOnly').toLowerCase() === "true" ? true : false // Set as read only by params
// const baseUrl = `http://${host}:${port}`

//console.log(readOnly)

/* Control the viewer customization.
 * It lists down all supported variables with default values.
 **/
const viewerConfig = {
  showAnnotationTools: showAnnotationTools,
  showBookmarks: showBookmarks,
  enableFormFilling: !readOnly,
  showDownloadPDF: showDownloadPDF,
  showPrintPDF: showPrintPDF,
  // showDisabledSaveButton: true,
  showZoomControl: showZoomControl,
  embedMode: embedMode,
  defaultViewMode: defaultViewMode,
  focusOnRendering: focusOnRendering
};

const saveOptions = {
  autoSaveFrequency: autoSaveFrequency,
  enableFocusPolling: enableFocusPolling,
  showSaveButton: showSaveButton
}

const showSuccessMessage = () => {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastEl = toastElList[0]
  const toast = new bootstrap.Toast(toastEl)
  toast.show()
}

const showErrorMessage = () => {
  const toastElList = [].slice.call(document.querySelectorAll('.toast'))
  const toastEl = toastElList[1]
  const toast = new bootstrap.Toast(toastEl)
  toast.show()
}

document.addEventListener('adobe_dc_view_sdk.ready', function () {
  const adobeDCView = new AdobeDC.View({clientId: clientId, divId: 'adobe-dc-view'});
  adobeDCView.previewFile({
    content: {location: {url: `${baseUrl}/file?file=${searchParams.get('file')}`}},
    metaData: {fileName: searchParams.get('title')}
  }, viewerConfig);

  adobeDCView.registerCallback(AdobeDC.View.Enum.CallbackType.SAVE_API, async function (metaData, content, options) {
      /* Add your custom save implementation here...and based on that resolve or reject response in given format */
      // request to send file
      const uint8Array = new Uint8Array(content);
      const blob = new Blob([uint8Array], {type: 'application/pdf'});
      const formData = new FormData();
      const pdfFilename = searchParams.get('title');
      formData.append('file', blob, pdfFilename);

      const response = await fetch(`${baseUrl}/file?filePath=${searchParams.get('file')}`, {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        showSuccessMessage()
        return new Promise((resolve, reject) => {
          resolve({
            code: AdobeDC.View.Enum.ApiResponseCode.SUCCESS,
            data: { /* Updated file metadata after successful save operation */
              metaData: {fileName: searchParams.get('title')}
            }
          });
        });
      }
      showErrorMessage()
      return new Promise((resolve, reject) => {
        reject({
          code: AdobeDC.View.Enum.ApiResponseCode.FAIL,
          data: { /* Updated file metadata after successful save operation */
            metaData: {fileName: searchParams.get('title')}
          }
        });
      });
    },
    saveOptions
  );
});