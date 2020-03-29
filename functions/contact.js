exports.handler = (event, _context, callback) => {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ foo: true })
  });
};

// Gatsby/netlify will work together to pick these funcs up and serve them as defined
// in netlify.toml
// The presence of a gatsby-config file is what tells netlify to look for gatsby project
