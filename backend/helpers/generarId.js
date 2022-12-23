const generarId = () => {
  const random = Math.random().toString(32).substring(2);
  const now = Date.now().toString(32);

  return random + now;
};

module.exports = generarId;
