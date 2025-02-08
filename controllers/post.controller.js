function index(req, res) {
  const tasks = "Tasks list";
  res.send(tasks);
}

module.exports = {
  index: index,
};
