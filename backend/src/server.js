import server from './app';

const port = process.env.PORT || 3333;

server.listen(port, () =>
  // eslint-disable-next-line
  console.log(`Server is running at http://localhost:${port}`)
);
