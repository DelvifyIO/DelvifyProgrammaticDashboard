/* eslint-disable @typescript-eslint/camelcase */
import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/doubleclickbidmanager'];

export const auth = new google.auth.GoogleAuth({
  scopes: SCOPES,
  credentials: {
    private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5Ngt9CjTX5aPH\nNwEI548/RY4Mzyeb6ENy6XOCb4O1qa5TnF+n8T3C/S5D2tVIIOefzrfzv3NG/I7z\nWR+r2pRavALqi6ZuPrISTl2bgL/XqK/QiJx/GU9HHXEeHwjY6yW0nrK6Gn8iCPFh\naDYuZhTdAwhyezXnUBstnfL8bqFXiHYWbfmOYhvorazFNs99WmeXAp6XDHlCHTG3\n5Xyw0CGgpkItyB0oUw9bk+QoSAK4Efa3DrDt4wFI13rcbkkMN9uiECt2BMlcJpi6\nsVsq0WGC6UQBYU/uSapwJ6XLIn5bAraTNZEKEMdlgkYN2WoSmVQw+xioEqOIAGyg\n9yyOg1HXAgMBAAECggEADkbZZYbwYjC8SmJ14iBWEqFYx6mo8CPcHdMGCZNxWoMH\nwj/cax81ohQPHsGTIu9lEL9dabIj1OB/X8h1IF5bL5ACRN8v8fFDm7/5B5V0nvn3\nV4KjAZ8gqnwyrd45jzMNIdpWhPGpmXoz/8y0hH4aSfEZE8Nl+ScxI804SkzNg2g1\nYXnYUGabP52qLsaoJIYCSKB5VXvUxG4KXUU5i0fmAjEqmA4C+vaqvFwWMVtPmogJ\nnrD5gTzjSaBUeJPKOc2++Oi1p0nMNrBkspbUvi067/cgvdYEe5wVwK0Df34uMMn0\nAXsMQn3gblEfi6TMMfRhG9gZkYb60OeMJBSW7oErCQKBgQDjWxQdeFVahYij+sYD\noIFOgg56cOZbxTuS2V7AduAbXo6oU4PG6i73z46LJ1bbBqN0ZhjvekjG1XKZ99Hq\nIAyllSu8igQ42nNfumuhz0xVzqUwCAnuejKSSr92xtHVgfkiClesLPQQq7OiTyPL\nS9cIVQ2yodP3nW2E+LMryDkKGQKBgQDQi6vt9jrrwcaLczIF4m50Vw3eeTaUhrr7\nrljZrSy5+tFeSCH6SU6qXfVKIi81TH0wR3zLMhgPiXt1I1U1TAehyQnE10Ux3SmW\naYoCG+p5RzpFO0osFityejbky4ZqhP6gxHlvqN48XtW/322LLYgpK12/q34S0S0F\nbBPpgpeZbwKBgQDLE01STWuf4Wp9Xb+E+dbF8zFPeIyqJ+/gaTxTGVtv1vQBsicg\ng4jUXJZsAQV5ueJCU/et4EIlJ/6nPE5Jm7rwI9/fFkBTL/yh4vfEnk8Gzf+KeYO1\neXy2YwHF7Cz9UozfNPG+nqCaS2O2dI36RpGZpa8Igbe9kuaCQUp4ru0T8QKBgAS8\nJxswDAZuT+O6qdgYXAmoMFhsyCB3LqeoPbwzgmB2oWpSmPLl1zNnDrqwLAI5yl3e\nQacbbBBuPq9aLgUXxNSXi/E8MgX/z4Hqw4doutomE9yejACUQEhJHhXzyQmCG4Xq\n8Bbo7qLQRGom2IXgcsb8hRRlAGfM+Ai3e3xBys9hAoGACnr0MQyGk+dOzMxdeOXy\nZ205GMIqjSOGtxGdY5qkuFjugxH0Iqwxzj4ySMrdk3dxZDzTNS09y64W649BFiuL\nEz/5i4NUnTlKy/00fvHf1eqp7ZvT1sD/lenvRnaZ8/PJsJS/60gPPOMKo5zzr2lW\n/mQq9JwBr7X3afss631TfD4=\n-----END PRIVATE KEY-----\n',
    // private_key: process.env.GAPI_PRIVATE_KEY,
    client_email: process.env.GAPI_CLIENT_EMAIL,
  },
});

export const googleDbm = google.doubleclickbidmanager({ version: 'v1.1' });
