import LrsOauthClient from "src/class/oath"

export let OauthObj = new LrsOauthClient({
  key: process.env.NEXT_PUBLIC_CONSUMER_KEY as string,
  secret: process.env.NEXT_PUBLIC_CONSUMER_SECRET as string,
})
