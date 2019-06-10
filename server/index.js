import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import phoneNumber from './routes/phoneNumber';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', phoneNumber); 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('App started on port:', port);
});

