import env from '../main/config/env'

const app = async (): Promise<any> => (await import('./config/app')).default

app().then((server: any) => {
  server.listen(env.port, () => console.log(`Server is running on port ${env.port}`))
}).catch(error => {
  console.error(error)
})
