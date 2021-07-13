import type { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

const handler = nextConnect<NextApiRequest, NextApiResponse>();

handler.get((req, res) =>
  res.end(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <script>
          if (window.opener) {
            window.opener.focus();
            window.opener.loginRef?.();
          }
          window.close();
        </script>
      </body>
    </html>
    `)
);

export default handler;
