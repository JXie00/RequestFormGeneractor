const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = (params, body) => {
  return {
    query: { ...params },
    body: { ...body },
  };
};

module.exports = { mockRequest, mockResponse };
