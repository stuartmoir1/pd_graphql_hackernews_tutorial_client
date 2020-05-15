Query: {
  human(obj, args, context, info) {
    return context.db.loadHumanByID(args.id)
      .then(userData => new Human(userData));
  }
}

// In Query.js, which is included in resolver object

async function human(parent, args, context) {
  const pl = await context.db.loadHumanByID(args.id);
  return new Human(pl);
}

// --------------------------------------------------------------------------

// index.js

const resolvers = {
  Query: { // type
    human(obj, args, context) { // resolver (asynchronous)
      return context.db.loadHumanByID(args.id)
        .then(data => new Human(data) // Human type object
    }
  }!
  Human: { // type
    name(obj) { // trivial resolver - can be omitted
      return obj.name;
    }
  }
}

// Alternative... (via Prisma)

// schema.graphql

type Query {
  human(id: ID!): Human
}

type Human {
  name: String!
}

// index.js

const resolvers = {
  Query,
  Human
}

// Query.js

async function human(parent, args, context) { // resolver - synchronous
  const data = await context.prisma.loadHumanByID(args.id);
  return { data };
}

// or...

const human => async (parent, args, context) => {
  const data = await context.prisma.loadHumanByID(args.id);
  return { data };
}

module.exports = {
  human 
};

// Human.js

function name(parent) { // trivial resolver - can be omitted
  return parent.name;
}

// or...

const name = parent => {
  return name;
}

module.exports = {
  name
};
