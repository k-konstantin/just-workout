export const init = app => app.use(async (ctx, next) => {
	ctx.redirect('/')
})