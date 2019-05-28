export default app => app.use(async (ctx, next) => {
    ctx.redirect('/')
})