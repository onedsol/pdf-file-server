// Create an instance of node file logger
import log from 'node-file-logger'

const options = {
  folderPath: './logs/',
  dateBasedFileNaming: true,
  fileNamePrefix: 'daily-logs_',
  fileNameExtension: '.log',
  dateFormat: 'YYYY_MM_D',
  timeFormat: 'h:mm:ss A',
  logLevel: 'debug',
  onlyFileLogging: true
}

log.SetUserOptions(options) // Options are optional

export default log