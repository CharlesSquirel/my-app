export const options = {
  filename: 'my-document.pdf',
  margin: 0.25,
  image: { type: 'jpeg' }, //jpeg is the best regarding to file size
  html2canvas: { scale: 3 }, //it is in charge of resolution as I noticed
  jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
};
