/* istanbul ignore file */
function internalServerError(res: any) {
  expect(res).toMatchObject({ error: 'Internal Server Error' });
}

const verify = {
  internalServerError
};

export { verify };
