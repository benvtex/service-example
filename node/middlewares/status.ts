export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },
    clients: { status: statusClient },
  } = ctx

  console.info('Received code:', code)

  const statusResponse = await statusClient.getStatus(code)

  console.info('Status response:', statusResponse)

  const {
    headers,
    data,
    status: responseStatus,
  } = await statusClient.getStatusWithHeaders(code)

  console.info('Status headers', headers)
  console.info('Status data:', data)
  console.info('Settings: ', ctx.vtex.settings)

  ctx.status = responseStatus
  ctx.body = ctx.vtex.settings
  ctx.set('Cache-Control', headers['cache-control'])

  await next()
}
