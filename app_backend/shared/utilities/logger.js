import pino from "pino";
import path from "path";
import fs from "fs";


const logDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const logFilePath = path.join(logDir, "app.log");
const prettyTransport = pino.transport({
  target: "pino-pretty",
  options: {
    colorize: true,         
    translateTime: "yyyy-mm-dd HH:MM:ss",
    ignore: "pid,hostname", 
    // singleLine: true,
  },
});

const logger = pino(
  {
    level: "debug",
    base: undefined, 
    serializers: {
      err: pino.stdSerializers.err, 
      req: (req) => ({
        method: req.method,
        url: req.url,
        body: req.body,
        params: req.params,
        query: req.query
      }),
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  },
  pino.multistream([
  
    { stream: pino.destination({ dest: logFilePath, sync: false }) },
    
    { stream: prettyTransport },
  ])
);

export default logger;
