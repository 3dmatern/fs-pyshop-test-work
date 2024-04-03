export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    url: process.env.POSTGRES_PRISMA_URL,
  },
});
