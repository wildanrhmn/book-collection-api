import express, { Response as ExResponse, Request as ExRequest, NextFunction } from 'express';
import { ValidateError } from 'tsoa';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { RegisterRoutes } from '../build/routes';
import * as dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Register all application routes
RegisterRoutes(app);

// serve swagger docs
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(swaggerUi.generateHTML(await import('../build/swagger.json')));
});

// Catch 404 and forward to error handler
app.use(function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }
  if (err instanceof Error) {
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }

  next();
});

app.use(function notFoundHandler(_req, res: ExResponse) {
  res.status(404).send({
    message: 'Not Found',
  });
});

// start server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});