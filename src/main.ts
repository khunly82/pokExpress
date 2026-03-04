import express, { json } from 'express';
import cors from 'cors';
import { InversifyExpressHttpAdapter } from '@inversifyjs/http-express';
import { container } from './ioc/container.js';

(async () => {
const expressApp = express();

expressApp.use(cors());

expressApp.use(json());

const adapter = new InversifyExpressHttpAdapter(
    container,
    {
      logger: true,
      useCookies: true,
      useJson: true,
      useUrlEncoded: true,
    },
    expressApp
);

// await initializeDatabase();
const app = await adapter.build();

app.listen(
    process.env.PORT ?? 3000, 
    () => console.log('Server is running and listen')
)
})()
