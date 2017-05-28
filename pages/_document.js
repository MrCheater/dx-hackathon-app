import React from 'react'
import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta
            name="viewport"
            content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
          />
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link rel="stylesheet" type="text/css" href="/static/reset.css" />
          <link rel="stylesheet" type="text/css" href="/static/styles.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
