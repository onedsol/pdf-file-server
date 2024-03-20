import nw from 'node-windows';

const svc = new nw.Service({
  name: 'PDF Files Server',
  description: 'Simple PDF Files Server Hosting',
  script: 'C:\\path\\to\\your\\app\\app.js'
});
svc.on('install', () => {
  svc.start();
});
svc.install();

// Listen for the "uninstall" event so we know when it's done.
svc.on('uninstall',function(){
  console.log('Uninstall complete.');
  console.log('The service exists: ',svc.exists);
});

// Uninstall the service.
svc.uninstall();