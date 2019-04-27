let custom = {
  plugins: ["serverless-dynamodb-local", "serverless-offline"],
  custom: {
    dynamodb: {
      start: {
        port: 8000,
        inMemory: true,
        migrate: true
      },
      migration: {
        dir: "offline/migrations"
      }
    }
  }
};

export default custom;
